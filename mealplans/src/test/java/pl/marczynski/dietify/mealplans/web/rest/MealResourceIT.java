package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.MealplansApp;
import pl.marczynski.dietify.mealplans.domain.Meal;
import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import pl.marczynski.dietify.mealplans.repository.MealRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealSearchRepository;
import pl.marczynski.dietify.mealplans.service.MealService;
import pl.marczynski.dietify.mealplans.service.dto.MealDTO;
import pl.marczynski.dietify.mealplans.service.mapper.MealMapper;
import pl.marczynski.dietify.mealplans.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static pl.marczynski.dietify.mealplans.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link MealResource} REST controller.
 */
@SpringBootTest(classes = MealplansApp.class)
public class MealResourceIT {

    private static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    private static final Integer UPDATED_ORDINAL_NUMBER = 2;

    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private MealMapper mealMapper;

    @Autowired
    private MealService mealService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.mealplans.repository.search test package.
     *
     * @see pl.marczynski.dietify.mealplans.repository.search.MealSearchRepositoryMockConfiguration
     */
    @Autowired
    private MealSearchRepository mockMealSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMealMockMvc;

    private Meal meal;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealResource mealResource = new MealResource(mealService);
        this.restMealMockMvc = MockMvcBuilders.standaloneSetup(mealResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Meal createEntity(EntityManager em) {
        Meal meal = new Meal();
        meal.setOrdinalNumber(DEFAULT_ORDINAL_NUMBER);
        // Add required entity
        MealPlanDay mealPlanDay;
        if (TestUtil.findAll(em, MealPlanDay.class).isEmpty()) {
            mealPlanDay = MealPlanDayResourceIT.createEntity(em);
            em.persist(mealPlanDay);
            em.flush();
        } else {
            mealPlanDay = TestUtil.findAll(em, MealPlanDay.class).get(0);
        }
        meal.setMealPlanDay(mealPlanDay);
        return meal;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Meal createUpdatedEntity(EntityManager em) {
        Meal meal = new Meal();
        meal.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        // Add required entity
        MealPlanDay mealPlanDay;
        if (TestUtil.findAll(em, MealPlanDay.class).isEmpty()) {
            mealPlanDay = MealPlanDayResourceIT.createUpdatedEntity(em);
            em.persist(mealPlanDay);
            em.flush();
        } else {
            mealPlanDay = TestUtil.findAll(em, MealPlanDay.class).get(0);
        }
        meal.setMealPlanDay(mealPlanDay);
        return meal;
    }

    @BeforeEach
    public void initTest() {
        meal = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeal() throws Exception {
        int databaseSizeBeforeCreate = mealRepository.findAll().size();

        // Create the Meal
        MealDTO mealDTO = mealMapper.toDto(meal);
        restMealMockMvc.perform(post("/api/meals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDTO)))
            .andExpect(status().isCreated());

        // Validate the Meal in the database
        List<Meal> mealList = mealRepository.findAll();
        assertThat(mealList).hasSize(databaseSizeBeforeCreate + 1);
        Meal testMeal = mealList.get(mealList.size() - 1);
        assertThat(testMeal.getOrdinalNumber()).isEqualTo(DEFAULT_ORDINAL_NUMBER);

        // Validate the Meal in Elasticsearch
        verify(mockMealSearchRepository, times(1)).save(testMeal);
    }

    @Test
    @Transactional
    public void createMealWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealRepository.findAll().size();

        // Create the Meal with an existing ID
        meal.setId(1L);
        MealDTO mealDTO = mealMapper.toDto(meal);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealMockMvc.perform(post("/api/meals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Meal in the database
        List<Meal> mealList = mealRepository.findAll();
        assertThat(mealList).hasSize(databaseSizeBeforeCreate);

        // Validate the Meal in Elasticsearch
        verify(mockMealSearchRepository, times(0)).save(meal);
    }


    @Test
    @Transactional
    public void checkOrdinalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealRepository.findAll().size();
        // set the field null
        meal.setOrdinalNumber(null);

        // Create the Meal, which fails.
        MealDTO mealDTO = mealMapper.toDto(meal);

        restMealMockMvc.perform(post("/api/meals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDTO)))
            .andExpect(status().isBadRequest());

        List<Meal> mealList = mealRepository.findAll();
        assertThat(mealList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMeals() throws Exception {
        // Initialize the database
        mealRepository.saveAndFlush(meal);

        // Get all the mealList
        restMealMockMvc.perform(get("/api/meals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meal.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getMeal() throws Exception {
        // Initialize the database
        mealRepository.saveAndFlush(meal);

        // Get the meal
        restMealMockMvc.perform(get("/api/meals/{id}", meal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(meal.getId().intValue()))
            .andExpect(jsonPath("$.ordinalNumber").value(DEFAULT_ORDINAL_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingMeal() throws Exception {
        // Get the meal
        restMealMockMvc.perform(get("/api/meals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeal() throws Exception {
        // Initialize the database
        mealRepository.saveAndFlush(meal);

        int databaseSizeBeforeUpdate = mealRepository.findAll().size();

        // Update the meal
        Meal updatedMeal = mealRepository.findById(meal.getId()).get();
        // Disconnect from session so that the updates on updatedMeal are not directly saved in db
        em.detach(updatedMeal);
        updatedMeal.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        MealDTO mealDTO = mealMapper.toDto(updatedMeal);

        restMealMockMvc.perform(put("/api/meals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDTO)))
            .andExpect(status().isOk());

        // Validate the Meal in the database
        List<Meal> mealList = mealRepository.findAll();
        assertThat(mealList).hasSize(databaseSizeBeforeUpdate);
        Meal testMeal = mealList.get(mealList.size() - 1);
        assertThat(testMeal.getOrdinalNumber()).isEqualTo(UPDATED_ORDINAL_NUMBER);

        // Validate the Meal in Elasticsearch
        verify(mockMealSearchRepository, times(1)).save(testMeal);
    }

    @Test
    @Transactional
    public void updateNonExistingMeal() throws Exception {
        int databaseSizeBeforeUpdate = mealRepository.findAll().size();

        // Create the Meal
        MealDTO mealDTO = mealMapper.toDto(meal);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealMockMvc.perform(put("/api/meals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Meal in the database
        List<Meal> mealList = mealRepository.findAll();
        assertThat(mealList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Meal in Elasticsearch
        verify(mockMealSearchRepository, times(0)).save(meal);
    }

    @Test
    @Transactional
    public void deleteMeal() throws Exception {
        // Initialize the database
        mealRepository.saveAndFlush(meal);

        int databaseSizeBeforeDelete = mealRepository.findAll().size();

        // Delete the meal
        restMealMockMvc.perform(delete("/api/meals/{id}", meal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Meal> mealList = mealRepository.findAll();
        assertThat(mealList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Meal in Elasticsearch
        verify(mockMealSearchRepository, times(1)).deleteById(meal.getId());
    }

    @Test
    @Transactional
    public void searchMeal() throws Exception {
        // Initialize the database
        mealRepository.saveAndFlush(meal);
        when(mockMealSearchRepository.search(queryStringQuery("id:" + meal.getId())))
            .thenReturn(Collections.singletonList(meal));
        // Search the meal
        restMealMockMvc.perform(get("/api/_search/meals?query=id:" + meal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meal.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Meal.class);
        Meal meal1 = new Meal();
        meal1.setId(1L);
        Meal meal2 = new Meal();
        meal2.setId(meal1.getId());
        assertThat(meal1).isEqualTo(meal2);
        meal2.setId(2L);
        assertThat(meal1).isNotEqualTo(meal2);
        meal1.setId(null);
        assertThat(meal1).isNotEqualTo(meal2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealDTO.class);
        MealDTO mealDTO1 = new MealDTO();
        mealDTO1.setId(1L);
        MealDTO mealDTO2 = new MealDTO();
        assertThat(mealDTO1).isNotEqualTo(mealDTO2);
        mealDTO2.setId(mealDTO1.getId());
        assertThat(mealDTO1).isEqualTo(mealDTO2);
        mealDTO2.setId(2L);
        assertThat(mealDTO1).isNotEqualTo(mealDTO2);
        mealDTO1.setId(null);
        assertThat(mealDTO1).isNotEqualTo(mealDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mealMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mealMapper.fromId(null)).isNull();
    }
}
