package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.MealplansApp;
import pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.repository.MealPlanSuitableForDietRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealPlanSuitableForDietSearchRepository;
import pl.marczynski.dietify.mealplans.service.MealPlanSuitableForDietService;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanSuitableForDietDTO;
import pl.marczynski.dietify.mealplans.service.mapper.MealPlanSuitableForDietMapper;
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
 * Integration tests for the {@Link MealPlanSuitableForDietResource} REST controller.
 */
@SpringBootTest(classes = MealplansApp.class)
public class MealPlanSuitableForDietResourceIT {

    private static final Long DEFAULT_DIET_TYPE_ID = 1L;
    private static final Long UPDATED_DIET_TYPE_ID = 2L;

    @Autowired
    private MealPlanSuitableForDietRepository mealPlanSuitableForDietRepository;

    @Autowired
    private MealPlanSuitableForDietMapper mealPlanSuitableForDietMapper;

    @Autowired
    private MealPlanSuitableForDietService mealPlanSuitableForDietService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.mealplans.repository.search test package.
     *
     * @see pl.marczynski.dietify.mealplans.repository.search.MealPlanSuitableForDietSearchRepositoryMockConfiguration
     */
    @Autowired
    private MealPlanSuitableForDietSearchRepository mockMealPlanSuitableForDietSearchRepository;

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

    private MockMvc restMealPlanSuitableForDietMockMvc;

    private MealPlanSuitableForDiet mealPlanSuitableForDiet;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealPlanSuitableForDietResource mealPlanSuitableForDietResource = new MealPlanSuitableForDietResource(mealPlanSuitableForDietService);
        this.restMealPlanSuitableForDietMockMvc = MockMvcBuilders.standaloneSetup(mealPlanSuitableForDietResource)
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
    public static MealPlanSuitableForDiet createEntity(EntityManager em) {
        MealPlanSuitableForDiet mealPlanSuitableForDiet = new MealPlanSuitableForDiet();
        mealPlanSuitableForDiet.setDietTypeId(DEFAULT_DIET_TYPE_ID);
        // Add required entity
        MealPlan mealPlan;
        if (TestUtil.findAll(em, MealPlan.class).isEmpty()) {
            mealPlan = MealPlanResourceIT.createEntity(em);
            em.persist(mealPlan);
            em.flush();
        } else {
            mealPlan = TestUtil.findAll(em, MealPlan.class).get(0);
        }
        mealPlanSuitableForDiet.setMealPlan(mealPlan);
        return mealPlanSuitableForDiet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealPlanSuitableForDiet createUpdatedEntity(EntityManager em) {
        MealPlanSuitableForDiet mealPlanSuitableForDiet = new MealPlanSuitableForDiet();
        mealPlanSuitableForDiet.setDietTypeId(UPDATED_DIET_TYPE_ID);
        // Add required entity
        MealPlan mealPlan;
        if (TestUtil.findAll(em, MealPlan.class).isEmpty()) {
            mealPlan = MealPlanResourceIT.createUpdatedEntity(em);
            em.persist(mealPlan);
            em.flush();
        } else {
            mealPlan = TestUtil.findAll(em, MealPlan.class).get(0);
        }
        mealPlanSuitableForDiet.setMealPlan(mealPlan);
        return mealPlanSuitableForDiet;
    }

    @BeforeEach
    public void initTest() {
        mealPlanSuitableForDiet = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealPlanSuitableForDiet() throws Exception {
        int databaseSizeBeforeCreate = mealPlanSuitableForDietRepository.findAll().size();

        // Create the MealPlanSuitableForDiet
        MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO = mealPlanSuitableForDietMapper.toDto(mealPlanSuitableForDiet);
        restMealPlanSuitableForDietMockMvc.perform(post("/api/meal-plan-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanSuitableForDietDTO)))
            .andExpect(status().isCreated());

        // Validate the MealPlanSuitableForDiet in the database
        List<MealPlanSuitableForDiet> mealPlanSuitableForDietList = mealPlanSuitableForDietRepository.findAll();
        assertThat(mealPlanSuitableForDietList).hasSize(databaseSizeBeforeCreate + 1);
        MealPlanSuitableForDiet testMealPlanSuitableForDiet = mealPlanSuitableForDietList.get(mealPlanSuitableForDietList.size() - 1);
        assertThat(testMealPlanSuitableForDiet.getDietTypeId()).isEqualTo(DEFAULT_DIET_TYPE_ID);

        // Validate the MealPlanSuitableForDiet in Elasticsearch
        verify(mockMealPlanSuitableForDietSearchRepository, times(1)).save(testMealPlanSuitableForDiet);
    }

    @Test
    @Transactional
    public void createMealPlanSuitableForDietWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealPlanSuitableForDietRepository.findAll().size();

        // Create the MealPlanSuitableForDiet with an existing ID
        mealPlanSuitableForDiet.setId(1L);
        MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO = mealPlanSuitableForDietMapper.toDto(mealPlanSuitableForDiet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealPlanSuitableForDietMockMvc.perform(post("/api/meal-plan-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanSuitableForDietDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlanSuitableForDiet in the database
        List<MealPlanSuitableForDiet> mealPlanSuitableForDietList = mealPlanSuitableForDietRepository.findAll();
        assertThat(mealPlanSuitableForDietList).hasSize(databaseSizeBeforeCreate);

        // Validate the MealPlanSuitableForDiet in Elasticsearch
        verify(mockMealPlanSuitableForDietSearchRepository, times(0)).save(mealPlanSuitableForDiet);
    }


    @Test
    @Transactional
    public void checkDietTypeIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanSuitableForDietRepository.findAll().size();
        // set the field null
        mealPlanSuitableForDiet.setDietTypeId(null);

        // Create the MealPlanSuitableForDiet, which fails.
        MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO = mealPlanSuitableForDietMapper.toDto(mealPlanSuitableForDiet);

        restMealPlanSuitableForDietMockMvc.perform(post("/api/meal-plan-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanSuitableForDietDTO)))
            .andExpect(status().isBadRequest());

        List<MealPlanSuitableForDiet> mealPlanSuitableForDietList = mealPlanSuitableForDietRepository.findAll();
        assertThat(mealPlanSuitableForDietList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealPlanSuitableForDiets() throws Exception {
        // Initialize the database
        mealPlanSuitableForDietRepository.saveAndFlush(mealPlanSuitableForDiet);

        // Get all the mealPlanSuitableForDietList
        restMealPlanSuitableForDietMockMvc.perform(get("/api/meal-plan-suitable-for-diets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealPlanSuitableForDiet.getId().intValue())))
            .andExpect(jsonPath("$.[*].dietTypeId").value(hasItem(DEFAULT_DIET_TYPE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getMealPlanSuitableForDiet() throws Exception {
        // Initialize the database
        mealPlanSuitableForDietRepository.saveAndFlush(mealPlanSuitableForDiet);

        // Get the mealPlanSuitableForDiet
        restMealPlanSuitableForDietMockMvc.perform(get("/api/meal-plan-suitable-for-diets/{id}", mealPlanSuitableForDiet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealPlanSuitableForDiet.getId().intValue()))
            .andExpect(jsonPath("$.dietTypeId").value(DEFAULT_DIET_TYPE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMealPlanSuitableForDiet() throws Exception {
        // Get the mealPlanSuitableForDiet
        restMealPlanSuitableForDietMockMvc.perform(get("/api/meal-plan-suitable-for-diets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealPlanSuitableForDiet() throws Exception {
        // Initialize the database
        mealPlanSuitableForDietRepository.saveAndFlush(mealPlanSuitableForDiet);

        int databaseSizeBeforeUpdate = mealPlanSuitableForDietRepository.findAll().size();

        // Update the mealPlanSuitableForDiet
        MealPlanSuitableForDiet updatedMealPlanSuitableForDiet = mealPlanSuitableForDietRepository.findById(mealPlanSuitableForDiet.getId()).get();
        // Disconnect from session so that the updates on updatedMealPlanSuitableForDiet are not directly saved in db
        em.detach(updatedMealPlanSuitableForDiet);
        updatedMealPlanSuitableForDiet.setDietTypeId(UPDATED_DIET_TYPE_ID);
        MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO = mealPlanSuitableForDietMapper.toDto(updatedMealPlanSuitableForDiet);

        restMealPlanSuitableForDietMockMvc.perform(put("/api/meal-plan-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanSuitableForDietDTO)))
            .andExpect(status().isOk());

        // Validate the MealPlanSuitableForDiet in the database
        List<MealPlanSuitableForDiet> mealPlanSuitableForDietList = mealPlanSuitableForDietRepository.findAll();
        assertThat(mealPlanSuitableForDietList).hasSize(databaseSizeBeforeUpdate);
        MealPlanSuitableForDiet testMealPlanSuitableForDiet = mealPlanSuitableForDietList.get(mealPlanSuitableForDietList.size() - 1);
        assertThat(testMealPlanSuitableForDiet.getDietTypeId()).isEqualTo(UPDATED_DIET_TYPE_ID);

        // Validate the MealPlanSuitableForDiet in Elasticsearch
        verify(mockMealPlanSuitableForDietSearchRepository, times(1)).save(testMealPlanSuitableForDiet);
    }

    @Test
    @Transactional
    public void updateNonExistingMealPlanSuitableForDiet() throws Exception {
        int databaseSizeBeforeUpdate = mealPlanSuitableForDietRepository.findAll().size();

        // Create the MealPlanSuitableForDiet
        MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO = mealPlanSuitableForDietMapper.toDto(mealPlanSuitableForDiet);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealPlanSuitableForDietMockMvc.perform(put("/api/meal-plan-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanSuitableForDietDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlanSuitableForDiet in the database
        List<MealPlanSuitableForDiet> mealPlanSuitableForDietList = mealPlanSuitableForDietRepository.findAll();
        assertThat(mealPlanSuitableForDietList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MealPlanSuitableForDiet in Elasticsearch
        verify(mockMealPlanSuitableForDietSearchRepository, times(0)).save(mealPlanSuitableForDiet);
    }

    @Test
    @Transactional
    public void deleteMealPlanSuitableForDiet() throws Exception {
        // Initialize the database
        mealPlanSuitableForDietRepository.saveAndFlush(mealPlanSuitableForDiet);

        int databaseSizeBeforeDelete = mealPlanSuitableForDietRepository.findAll().size();

        // Delete the mealPlanSuitableForDiet
        restMealPlanSuitableForDietMockMvc.perform(delete("/api/meal-plan-suitable-for-diets/{id}", mealPlanSuitableForDiet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MealPlanSuitableForDiet> mealPlanSuitableForDietList = mealPlanSuitableForDietRepository.findAll();
        assertThat(mealPlanSuitableForDietList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MealPlanSuitableForDiet in Elasticsearch
        verify(mockMealPlanSuitableForDietSearchRepository, times(1)).deleteById(mealPlanSuitableForDiet.getId());
    }

    @Test
    @Transactional
    public void searchMealPlanSuitableForDiet() throws Exception {
        // Initialize the database
        mealPlanSuitableForDietRepository.saveAndFlush(mealPlanSuitableForDiet);
        when(mockMealPlanSuitableForDietSearchRepository.search(queryStringQuery("id:" + mealPlanSuitableForDiet.getId())))
            .thenReturn(Collections.singletonList(mealPlanSuitableForDiet));
        // Search the mealPlanSuitableForDiet
        restMealPlanSuitableForDietMockMvc.perform(get("/api/_search/meal-plan-suitable-for-diets?query=id:" + mealPlanSuitableForDiet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealPlanSuitableForDiet.getId().intValue())))
            .andExpect(jsonPath("$.[*].dietTypeId").value(hasItem(DEFAULT_DIET_TYPE_ID.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealPlanSuitableForDiet.class);
        MealPlanSuitableForDiet mealPlanSuitableForDiet1 = new MealPlanSuitableForDiet();
        mealPlanSuitableForDiet1.setId(1L);
        MealPlanSuitableForDiet mealPlanSuitableForDiet2 = new MealPlanSuitableForDiet();
        mealPlanSuitableForDiet2.setId(mealPlanSuitableForDiet1.getId());
        assertThat(mealPlanSuitableForDiet1).isEqualTo(mealPlanSuitableForDiet2);
        mealPlanSuitableForDiet2.setId(2L);
        assertThat(mealPlanSuitableForDiet1).isNotEqualTo(mealPlanSuitableForDiet2);
        mealPlanSuitableForDiet1.setId(null);
        assertThat(mealPlanSuitableForDiet1).isNotEqualTo(mealPlanSuitableForDiet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealPlanSuitableForDietDTO.class);
        MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO1 = new MealPlanSuitableForDietDTO();
        mealPlanSuitableForDietDTO1.setId(1L);
        MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO2 = new MealPlanSuitableForDietDTO();
        assertThat(mealPlanSuitableForDietDTO1).isNotEqualTo(mealPlanSuitableForDietDTO2);
        mealPlanSuitableForDietDTO2.setId(mealPlanSuitableForDietDTO1.getId());
        assertThat(mealPlanSuitableForDietDTO1).isEqualTo(mealPlanSuitableForDietDTO2);
        mealPlanSuitableForDietDTO2.setId(2L);
        assertThat(mealPlanSuitableForDietDTO1).isNotEqualTo(mealPlanSuitableForDietDTO2);
        mealPlanSuitableForDietDTO1.setId(null);
        assertThat(mealPlanSuitableForDietDTO1).isNotEqualTo(mealPlanSuitableForDietDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mealPlanSuitableForDietMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mealPlanSuitableForDietMapper.fromId(null)).isNull();
    }
}
