package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.MealplansApp;
import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.repository.MealPlanDayRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealPlanDaySearchRepository;
import pl.marczynski.dietify.mealplans.service.MealPlanDayService;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanDayDTO;
import pl.marczynski.dietify.mealplans.service.mapper.MealPlanDayMapper;
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
 * Integration tests for the {@Link MealPlanDayResource} REST controller.
 */
@SpringBootTest(classes = MealplansApp.class)
public class MealPlanDayResourceIT {

    private static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    private static final Integer UPDATED_ORDINAL_NUMBER = 2;

    @Autowired
    private MealPlanDayRepository mealPlanDayRepository;

    @Autowired
    private MealPlanDayMapper mealPlanDayMapper;

    @Autowired
    private MealPlanDayService mealPlanDayService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.mealplans.repository.search test package.
     *
     * @see pl.marczynski.dietify.mealplans.repository.search.MealPlanDaySearchRepositoryMockConfiguration
     */
    @Autowired
    private MealPlanDaySearchRepository mockMealPlanDaySearchRepository;

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

    private MockMvc restMealPlanDayMockMvc;

    private MealPlanDay mealPlanDay;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealPlanDayResource mealPlanDayResource = new MealPlanDayResource(mealPlanDayService);
        this.restMealPlanDayMockMvc = MockMvcBuilders.standaloneSetup(mealPlanDayResource)
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
    public static MealPlanDay createEntity(EntityManager em) {
        MealPlanDay mealPlanDay = new MealPlanDay();
        mealPlanDay.setOrdinalNumber(DEFAULT_ORDINAL_NUMBER);
        // Add required entity
        MealPlan mealPlan;
        if (TestUtil.findAll(em, MealPlan.class).isEmpty()) {
            mealPlan = MealPlanResourceIT.createEntity(em);
            em.persist(mealPlan);
            em.flush();
        } else {
            mealPlan = TestUtil.findAll(em, MealPlan.class).get(0);
        }
        mealPlanDay.setMealPlan(mealPlan);
        return mealPlanDay;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealPlanDay createUpdatedEntity(EntityManager em) {
        MealPlanDay mealPlanDay = new MealPlanDay();
        mealPlanDay.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        // Add required entity
        MealPlan mealPlan;
        if (TestUtil.findAll(em, MealPlan.class).isEmpty()) {
            mealPlan = MealPlanResourceIT.createUpdatedEntity(em);
            em.persist(mealPlan);
            em.flush();
        } else {
            mealPlan = TestUtil.findAll(em, MealPlan.class).get(0);
        }
        mealPlanDay.setMealPlan(mealPlan);
        return mealPlanDay;
    }

    @BeforeEach
    public void initTest() {
        mealPlanDay = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealPlanDay() throws Exception {
        int databaseSizeBeforeCreate = mealPlanDayRepository.findAll().size();

        // Create the MealPlanDay
        MealPlanDayDTO mealPlanDayDTO = mealPlanDayMapper.toDto(mealPlanDay);
        restMealPlanDayMockMvc.perform(post("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanDayDTO)))
            .andExpect(status().isCreated());

        // Validate the MealPlanDay in the database
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeCreate + 1);
        MealPlanDay testMealPlanDay = mealPlanDayList.get(mealPlanDayList.size() - 1);
        assertThat(testMealPlanDay.getOrdinalNumber()).isEqualTo(DEFAULT_ORDINAL_NUMBER);

        // Validate the MealPlanDay in Elasticsearch
        verify(mockMealPlanDaySearchRepository, times(1)).save(testMealPlanDay);
    }

    @Test
    @Transactional
    public void createMealPlanDayWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealPlanDayRepository.findAll().size();

        // Create the MealPlanDay with an existing ID
        mealPlanDay.setId(1L);
        MealPlanDayDTO mealPlanDayDTO = mealPlanDayMapper.toDto(mealPlanDay);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealPlanDayMockMvc.perform(post("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanDayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlanDay in the database
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeCreate);

        // Validate the MealPlanDay in Elasticsearch
        verify(mockMealPlanDaySearchRepository, times(0)).save(mealPlanDay);
    }


    @Test
    @Transactional
    public void checkOrdinalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanDayRepository.findAll().size();
        // set the field null
        mealPlanDay.setOrdinalNumber(null);

        // Create the MealPlanDay, which fails.
        MealPlanDayDTO mealPlanDayDTO = mealPlanDayMapper.toDto(mealPlanDay);

        restMealPlanDayMockMvc.perform(post("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanDayDTO)))
            .andExpect(status().isBadRequest());

        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealPlanDays() throws Exception {
        // Initialize the database
        mealPlanDayRepository.saveAndFlush(mealPlanDay);

        // Get all the mealPlanDayList
        restMealPlanDayMockMvc.perform(get("/api/meal-plan-days?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealPlanDay.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getMealPlanDay() throws Exception {
        // Initialize the database
        mealPlanDayRepository.saveAndFlush(mealPlanDay);

        // Get the mealPlanDay
        restMealPlanDayMockMvc.perform(get("/api/meal-plan-days/{id}", mealPlanDay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealPlanDay.getId().intValue()))
            .andExpect(jsonPath("$.ordinalNumber").value(DEFAULT_ORDINAL_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingMealPlanDay() throws Exception {
        // Get the mealPlanDay
        restMealPlanDayMockMvc.perform(get("/api/meal-plan-days/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealPlanDay() throws Exception {
        // Initialize the database
        mealPlanDayRepository.saveAndFlush(mealPlanDay);

        int databaseSizeBeforeUpdate = mealPlanDayRepository.findAll().size();

        // Update the mealPlanDay
        MealPlanDay updatedMealPlanDay = mealPlanDayRepository.findById(mealPlanDay.getId()).get();
        // Disconnect from session so that the updates on updatedMealPlanDay are not directly saved in db
        em.detach(updatedMealPlanDay);
        updatedMealPlanDay.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        MealPlanDayDTO mealPlanDayDTO = mealPlanDayMapper.toDto(updatedMealPlanDay);

        restMealPlanDayMockMvc.perform(put("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanDayDTO)))
            .andExpect(status().isOk());

        // Validate the MealPlanDay in the database
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeUpdate);
        MealPlanDay testMealPlanDay = mealPlanDayList.get(mealPlanDayList.size() - 1);
        assertThat(testMealPlanDay.getOrdinalNumber()).isEqualTo(UPDATED_ORDINAL_NUMBER);

        // Validate the MealPlanDay in Elasticsearch
        verify(mockMealPlanDaySearchRepository, times(1)).save(testMealPlanDay);
    }

    @Test
    @Transactional
    public void updateNonExistingMealPlanDay() throws Exception {
        int databaseSizeBeforeUpdate = mealPlanDayRepository.findAll().size();

        // Create the MealPlanDay
        MealPlanDayDTO mealPlanDayDTO = mealPlanDayMapper.toDto(mealPlanDay);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealPlanDayMockMvc.perform(put("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanDayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlanDay in the database
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MealPlanDay in Elasticsearch
        verify(mockMealPlanDaySearchRepository, times(0)).save(mealPlanDay);
    }

    @Test
    @Transactional
    public void deleteMealPlanDay() throws Exception {
        // Initialize the database
        mealPlanDayRepository.saveAndFlush(mealPlanDay);

        int databaseSizeBeforeDelete = mealPlanDayRepository.findAll().size();

        // Delete the mealPlanDay
        restMealPlanDayMockMvc.perform(delete("/api/meal-plan-days/{id}", mealPlanDay.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MealPlanDay in Elasticsearch
        verify(mockMealPlanDaySearchRepository, times(1)).deleteById(mealPlanDay.getId());
    }

    @Test
    @Transactional
    public void searchMealPlanDay() throws Exception {
        // Initialize the database
        mealPlanDayRepository.saveAndFlush(mealPlanDay);
        when(mockMealPlanDaySearchRepository.search(queryStringQuery("id:" + mealPlanDay.getId())))
            .thenReturn(Collections.singletonList(mealPlanDay));
        // Search the mealPlanDay
        restMealPlanDayMockMvc.perform(get("/api/_search/meal-plan-days?query=id:" + mealPlanDay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealPlanDay.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealPlanDay.class);
        MealPlanDay mealPlanDay1 = new MealPlanDay();
        mealPlanDay1.setId(1L);
        MealPlanDay mealPlanDay2 = new MealPlanDay();
        mealPlanDay2.setId(mealPlanDay1.getId());
        assertThat(mealPlanDay1).isEqualTo(mealPlanDay2);
        mealPlanDay2.setId(2L);
        assertThat(mealPlanDay1).isNotEqualTo(mealPlanDay2);
        mealPlanDay1.setId(null);
        assertThat(mealPlanDay1).isNotEqualTo(mealPlanDay2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealPlanDayDTO.class);
        MealPlanDayDTO mealPlanDayDTO1 = new MealPlanDayDTO();
        mealPlanDayDTO1.setId(1L);
        MealPlanDayDTO mealPlanDayDTO2 = new MealPlanDayDTO();
        assertThat(mealPlanDayDTO1).isNotEqualTo(mealPlanDayDTO2);
        mealPlanDayDTO2.setId(mealPlanDayDTO1.getId());
        assertThat(mealPlanDayDTO1).isEqualTo(mealPlanDayDTO2);
        mealPlanDayDTO2.setId(2L);
        assertThat(mealPlanDayDTO1).isNotEqualTo(mealPlanDayDTO2);
        mealPlanDayDTO1.setId(null);
        assertThat(mealPlanDayDTO1).isNotEqualTo(mealPlanDayDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mealPlanDayMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mealPlanDayMapper.fromId(null)).isNull();
    }
}
