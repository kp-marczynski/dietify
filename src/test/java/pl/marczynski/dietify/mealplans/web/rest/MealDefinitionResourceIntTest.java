package pl.marczynski.dietify.mealplans.web.rest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;
import pl.marczynski.dietify.core.DietifyApp;
import pl.marczynski.dietify.core.web.rest.TestUtil;
import pl.marczynski.dietify.core.web.rest.errors.ExceptionTranslator;
import pl.marczynski.dietify.mealplans.domain.MealDefinition;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.domain.MealPlanCreator;
import pl.marczynski.dietify.mealplans.repository.MealDefinitionRepository;
import pl.marczynski.dietify.mealplans.repository.MealPlanRepository;
import pl.marczynski.dietify.mealplans.service.MealDefinitionService;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static pl.marczynski.dietify.mealplans.domain.MealDefinitionCreator.*;

/**
 * Test class for the MealDefinitionResource REST controller.
 *
 * @see MealDefinitionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class MealDefinitionResourceIntTest {

    @Autowired
    private MealDefinitionRepository mealDefinitionRepository;

    @Autowired
    private MealDefinitionService mealDefinitionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private Validator validator;

    private MockMvc restMealDefinitionMockMvc;

    private MealDefinition mealDefinition;

    private MealPlan mealPlan;

    @Before
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

    @Before
    public void initTest() {
        mealPlan = MealPlanCreator.createEntity();
        mealDefinition = mealPlan.getMealDefinitions().iterator().next();
    }


    @Test
    @Transactional
    public void createMealDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealDefinitionRepository.findAll().size();

        // Create the MealDefinition with an existing ID
        mealDefinition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the MealDefinition in the database
        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkOrdinalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealDefinitionRepository.findAll().size();
        // set the field null
        mealDefinition.setOrdinalNumber(null);

        // Create the MealDefinition, which fails.

        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinition)))
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

        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinition)))
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

        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinition)))
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

        restMealDefinitionMockMvc.perform(post("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinition)))
            .andExpect(status().isBadRequest());

        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealDefinitions() throws Exception {
        // Initialize the database
        mealPlanRepository.saveAndFlush(mealPlan);

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
        mealPlanRepository.saveAndFlush(mealPlan);

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
    public void updateNonExistingMealDefinition() throws Exception {
        int databaseSizeBeforeUpdate = mealDefinitionRepository.findAll().size();

        // Create the MealDefinition

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealDefinitionMockMvc.perform(put("/api/meal-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the MealDefinition in the database
        List<MealDefinition> mealDefinitionList = mealDefinitionRepository.findAll();
        assertThat(mealDefinitionList).hasSize(databaseSizeBeforeUpdate);
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
}
