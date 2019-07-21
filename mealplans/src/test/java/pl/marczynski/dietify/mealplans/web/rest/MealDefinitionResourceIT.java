package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.MealplansApp;
import pl.marczynski.dietify.mealplans.domain.MealDefinition;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.repository.MealDefinitionRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealDefinitionSearchRepository;
import pl.marczynski.dietify.mealplans.service.MealDefinitionService;
import pl.marczynski.dietify.mealplans.service.dto.MealDefinitionDTO;
import pl.marczynski.dietify.mealplans.service.mapper.MealDefinitionMapper;
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
 * Integration tests for the {@Link MealDefinitionResource} REST controller.
 */
@SpringBootTest(classes = MealplansApp.class)
public class MealDefinitionResourceIT {

    private static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    private static final Integer UPDATED_ORDINAL_NUMBER = 2;

    private static final Long DEFAULT_MEAL_TYPE_ID = 1L;
    private static final Long UPDATED_MEAL_TYPE_ID = 2L;

    private static final String DEFAULT_TIME_OF_MEAL = "83:16";
    private static final String UPDATED_TIME_OF_MEAL = "03:15";

    private static final Integer DEFAULT_PERCENT_OF_ENERGY = 0;
    private static final Integer UPDATED_PERCENT_OF_ENERGY = 1;

    @Autowired
    private MealDefinitionRepository mealDefinitionRepository;

    @Autowired
    private MealDefinitionMapper mealDefinitionMapper;

    @Autowired
    private MealDefinitionService mealDefinitionService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.mealplans.repository.search test package.
     *
     * @see pl.marczynski.dietify.mealplans.repository.search.MealDefinitionSearchRepositoryMockConfiguration
     */
    @Autowired
    private MealDefinitionSearchRepository mockMealDefinitionSearchRepository;

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

    private MockMvc restMealDefinitionMockMvc;

    private MealDefinition mealDefinition;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealDefinitionResource mealDefinitionResource = new MealDefinitionResource(mealDefinitionService);
        this.restMealDefinitionMockMvc = MockMvcBuilders.standaloneSetup(mealDefinitionResource)
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
    public static MealDefinition createEntity(EntityManager em) {
        MealDefinition mealDefinition = new MealDefinition();
        mealDefinition.setOrdinalNumber(DEFAULT_ORDINAL_NUMBER);
        mealDefinition.setMealTypeId(DEFAULT_MEAL_TYPE_ID);
        mealDefinition.setTimeOfMeal(DEFAULT_TIME_OF_MEAL);
        mealDefinition.setPercentOfEnergy(DEFAULT_PERCENT_OF_ENERGY);
        // Add required entity
        MealPlan mealPlan;
        if (TestUtil.findAll(em, MealPlan.class).isEmpty()) {
            mealPlan = MealPlanResourceIT.createEntity(em);
            em.persist(mealPlan);
            em.flush();
        } else {
            mealPlan = TestUtil.findAll(em, MealPlan.class).get(0);
        }
        mealDefinition.setMealPlan(mealPlan);
        return mealDefinition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealDefinition createUpdatedEntity(EntityManager em) {
        MealDefinition mealDefinition = new MealDefinition();
        mealDefinition.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        mealDefinition.setMealTypeId(UPDATED_MEAL_TYPE_ID);
        mealDefinition.setTimeOfMeal(UPDATED_TIME_OF_MEAL);
        mealDefinition.setPercentOfEnergy(UPDATED_PERCENT_OF_ENERGY);
        // Add required entity
        MealPlan mealPlan;
        if (TestUtil.findAll(em, MealPlan.class).isEmpty()) {
            mealPlan = MealPlanResourceIT.createUpdatedEntity(em);
            em.persist(mealPlan);
            em.flush();
        } else {
            mealPlan = TestUtil.findAll(em, MealPlan.class).get(0);
        }
        mealDefinition.setMealPlan(mealPlan);
        return mealDefinition;
    }

    @BeforeEach
    public void initTest() {
        mealDefinition = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealDefinition() throws Exception {
        int databaseSizeBeforeCreate = mealDefinitionRepository.findAll().size();

        // Create the MealDefinition
        MealDefinitionDTO mealDefinitionDTO = mealDefinitionMapper.toDto(mealDefinition);
        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinitionDTO)))
            .andExpect(status().isCreated());

        // Validate the MealDefinition in the database
        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeCreate + 1);
        MealDefinition testMealDefinition = mealDefinitionList.get(mealDefinitionList.size() - 1);
        assertThat(testMealDefinition.getOrdinalNumber()).isEqualTo(DEFAULT_ORDINAL_NUMBER);
        assertThat(testMealDefinition.getMealTypeId()).isEqualTo(DEFAULT_MEAL_TYPE_ID);
        assertThat(testMealDefinition.getTimeOfMeal()).isEqualTo(DEFAULT_TIME_OF_MEAL);
        assertThat(testMealDefinition.getPercentOfEnergy()).isEqualTo(DEFAULT_PERCENT_OF_ENERGY);

        // Validate the MealDefinition in Elasticsearch
        verify(mockMealDefinitionSearchRepository, times(1)).save(testMealDefinition);
    }

    @Test
    @Transactional
    public void createMealDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealDefinitionRepository.findAll().size();

        // Create the MealDefinition with an existing ID
        mealDefinition.setId(1L);
        MealDefinitionDTO mealDefinitionDTO = mealDefinitionMapper.toDto(mealDefinition);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinitionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealDefinition in the database
        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeCreate);

        // Validate the MealDefinition in Elasticsearch
        verify(mockMealDefinitionSearchRepository, times(0)).save(mealDefinition);
    }


    @Test
    @Transactional
    public void checkOrdinalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealDefinitionRepository.findAll().size();
        // set the field null
        mealDefinition.setOrdinalNumber(null);

        // Create the MealDefinition, which fails.
        MealDefinitionDTO mealDefinitionDTO = mealDefinitionMapper.toDto(mealDefinition);

        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinitionDTO)))
            .andExpect(status().isBadRequest());

        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMealTypeIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealDefinitionRepository.findAll().size();
        // set the field null
        mealDefinition.setMealTypeId(null);

        // Create the MealDefinition, which fails.
        MealDefinitionDTO mealDefinitionDTO = mealDefinitionMapper.toDto(mealDefinition);

        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinitionDTO)))
            .andExpect(status().isBadRequest());

        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTimeOfMealIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealDefinitionRepository.findAll().size();
        // set the field null
        mealDefinition.setTimeOfMeal(null);

        // Create the MealDefinition, which fails.
        MealDefinitionDTO mealDefinitionDTO = mealDefinitionMapper.toDto(mealDefinition);

        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinitionDTO)))
            .andExpect(status().isBadRequest());

        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPercentOfEnergyIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealDefinitionRepository.findAll().size();
        // set the field null
        mealDefinition.setPercentOfEnergy(null);

        // Create the MealDefinition, which fails.
        MealDefinitionDTO mealDefinitionDTO = mealDefinitionMapper.toDto(mealDefinition);

        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinitionDTO)))
            .andExpect(status().isBadRequest());

        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealDefinitions() throws Exception {
        // Initialize the database
        mealDefinitionRepository.saveAndFlush(mealDefinition);

        // Get all the mealDefinitionList
        restMealDefinitionMockMvc.perform(get("/api/meal-definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)))
            .andExpect(jsonPath("$.[*].mealTypeId").value(hasItem(DEFAULT_MEAL_TYPE_ID.intValue())))
            .andExpect(jsonPath("$.[*].timeOfMeal").value(hasItem(DEFAULT_TIME_OF_MEAL.toString())))
            .andExpect(jsonPath("$.[*].percentOfEnergy").value(hasItem(DEFAULT_PERCENT_OF_ENERGY)));
    }
    
    @Test
    @Transactional
    public void getMealDefinition() throws Exception {
        // Initialize the database
        mealDefinitionRepository.saveAndFlush(mealDefinition);

        // Get the mealDefinition
        restMealDefinitionMockMvc.perform(get("/api/meal-definitions/{id}", mealDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealDefinition.getId().intValue()))
            .andExpect(jsonPath("$.ordinalNumber").value(DEFAULT_ORDINAL_NUMBER))
            .andExpect(jsonPath("$.mealTypeId").value(DEFAULT_MEAL_TYPE_ID.intValue()))
            .andExpect(jsonPath("$.timeOfMeal").value(DEFAULT_TIME_OF_MEAL.toString()))
            .andExpect(jsonPath("$.percentOfEnergy").value(DEFAULT_PERCENT_OF_ENERGY));
    }

    @Test
    @Transactional
    public void getNonExistingMealDefinition() throws Exception {
        // Get the mealDefinition
        restMealDefinitionMockMvc.perform(get("/api/meal-definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealDefinition() throws Exception {
        // Initialize the database
        mealDefinitionRepository.saveAndFlush(mealDefinition);

        int databaseSizeBeforeUpdate = mealDefinitionRepository.findAll().size();

        // Update the mealDefinition
        MealDefinition updatedMealDefinition = mealDefinitionRepository.findById(mealDefinition.getId()).get();
        // Disconnect from session so that the updates on updatedMealDefinition are not directly saved in db
        em.detach(updatedMealDefinition);
        updatedMealDefinition.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        updatedMealDefinition.setMealTypeId(UPDATED_MEAL_TYPE_ID);
        updatedMealDefinition.setTimeOfMeal(UPDATED_TIME_OF_MEAL);
        updatedMealDefinition.setPercentOfEnergy(UPDATED_PERCENT_OF_ENERGY);
        MealDefinitionDTO mealDefinitionDTO = mealDefinitionMapper.toDto(updatedMealDefinition);

        restMealDefinitionMockMvc.perform(put("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinitionDTO)))
            .andExpect(status().isOk());

        // Validate the MealDefinition in the database
        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeUpdate);
        MealDefinition testMealDefinition = mealDefinitionList.get(mealDefinitionList.size() - 1);
        assertThat(testMealDefinition.getOrdinalNumber()).isEqualTo(UPDATED_ORDINAL_NUMBER);
        assertThat(testMealDefinition.getMealTypeId()).isEqualTo(UPDATED_MEAL_TYPE_ID);
        assertThat(testMealDefinition.getTimeOfMeal()).isEqualTo(UPDATED_TIME_OF_MEAL);
        assertThat(testMealDefinition.getPercentOfEnergy()).isEqualTo(UPDATED_PERCENT_OF_ENERGY);

        // Validate the MealDefinition in Elasticsearch
        verify(mockMealDefinitionSearchRepository, times(1)).save(testMealDefinition);
    }

    @Test
    @Transactional
    public void updateNonExistingMealDefinition() throws Exception {
        int databaseSizeBeforeUpdate = mealDefinitionRepository.findAll().size();

        // Create the MealDefinition
        MealDefinitionDTO mealDefinitionDTO = mealDefinitionMapper.toDto(mealDefinition);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealDefinitionMockMvc.perform(put("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinitionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealDefinition in the database
        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MealDefinition in Elasticsearch
        verify(mockMealDefinitionSearchRepository, times(0)).save(mealDefinition);
    }

    @Test
    @Transactional
    public void deleteMealDefinition() throws Exception {
        // Initialize the database
        mealDefinitionRepository.saveAndFlush(mealDefinition);

        int databaseSizeBeforeDelete = mealDefinitionRepository.findAll().size();

        // Delete the mealDefinition
        restMealDefinitionMockMvc.perform(delete("/api/meal-definitions/{id}", mealDefinition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MealDefinition in Elasticsearch
        verify(mockMealDefinitionSearchRepository, times(1)).deleteById(mealDefinition.getId());
    }

    @Test
    @Transactional
    public void searchMealDefinition() throws Exception {
        // Initialize the database
        mealDefinitionRepository.saveAndFlush(mealDefinition);
        when(mockMealDefinitionSearchRepository.search(queryStringQuery("id:" + mealDefinition.getId())))
            .thenReturn(Collections.singletonList(mealDefinition));
        // Search the mealDefinition
        restMealDefinitionMockMvc.perform(get("/api/_search/meal-definitions?query=id:" + mealDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)))
            .andExpect(jsonPath("$.[*].mealTypeId").value(hasItem(DEFAULT_MEAL_TYPE_ID.intValue())))
            .andExpect(jsonPath("$.[*].timeOfMeal").value(hasItem(DEFAULT_TIME_OF_MEAL)))
            .andExpect(jsonPath("$.[*].percentOfEnergy").value(hasItem(DEFAULT_PERCENT_OF_ENERGY)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealDefinition.class);
        MealDefinition mealDefinition1 = new MealDefinition();
        mealDefinition1.setId(1L);
        MealDefinition mealDefinition2 = new MealDefinition();
        mealDefinition2.setId(mealDefinition1.getId());
        assertThat(mealDefinition1).isEqualTo(mealDefinition2);
        mealDefinition2.setId(2L);
        assertThat(mealDefinition1).isNotEqualTo(mealDefinition2);
        mealDefinition1.setId(null);
        assertThat(mealDefinition1).isNotEqualTo(mealDefinition2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealDefinitionDTO.class);
        MealDefinitionDTO mealDefinitionDTO1 = new MealDefinitionDTO();
        mealDefinitionDTO1.setId(1L);
        MealDefinitionDTO mealDefinitionDTO2 = new MealDefinitionDTO();
        assertThat(mealDefinitionDTO1).isNotEqualTo(mealDefinitionDTO2);
        mealDefinitionDTO2.setId(mealDefinitionDTO1.getId());
        assertThat(mealDefinitionDTO1).isEqualTo(mealDefinitionDTO2);
        mealDefinitionDTO2.setId(2L);
        assertThat(mealDefinitionDTO1).isNotEqualTo(mealDefinitionDTO2);
        mealDefinitionDTO1.setId(null);
        assertThat(mealDefinitionDTO1).isNotEqualTo(mealDefinitionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mealDefinitionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mealDefinitionMapper.fromId(null)).isNull();
    }
}
