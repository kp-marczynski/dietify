package pl.marczynski.dietify.core.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import pl.marczynski.dietify.mealplans.domain.MealDefinition;
import pl.marczynski.dietify.mealplans.repository.MealPlanRepository;
import pl.marczynski.dietify.mealplans.service.MealPlanService;
import pl.marczynski.dietify.core.web.rest.errors.ExceptionTranslator;

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
import pl.marczynski.dietify.mealplans.web.rest.MealPlanResource;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MealPlanResource REST controller.
 *
 * @see MealPlanResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class MealPlanResourceIntTest {

    private static final Long DEFAULT_AUTHOR_ID = 1L;
    private static final Long UPDATED_AUTHOR_ID = 2L;

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_VISIBLE = false;
    private static final Boolean UPDATED_IS_VISIBLE = true;

    private static final Boolean DEFAULT_IS_LOCKED = false;
    private static final Boolean UPDATED_IS_LOCKED = true;

    private static final Long DEFAULT_LANGUAGE_ID = 1L;
    private static final Long UPDATED_LANGUAGE_ID = 2L;

    private static final Integer DEFAULT_NUMBER_OF_DAYS = 1;
    private static final Integer UPDATED_NUMBER_OF_DAYS = 2;

    private static final Integer DEFAULT_NUMBER_OF_MEALS_PER_DAY = 1;
    private static final Integer UPDATED_NUMBER_OF_MEALS_PER_DAY = 2;

    private static final Integer DEFAULT_TOTAL_DAILY_ENERGY_KCAL = 1;
    private static final Integer UPDATED_TOTAL_DAILY_ENERGY_KCAL = 2;

    private static final Integer DEFAULT_PERCENT_OF_PROTEIN = 0;
    private static final Integer UPDATED_PERCENT_OF_PROTEIN = 1;

    private static final Integer DEFAULT_PERCENT_OF_FAT = 0;
    private static final Integer UPDATED_PERCENT_OF_FAT = 1;

    private static final Integer DEFAULT_PERCENT_OF_CARBOHYDRATES = 0;
    private static final Integer UPDATED_PERCENT_OF_CARBOHYDRATES = 1;

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private MealPlanService mealPlanService;

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

    private MockMvc restMealPlanMockMvc;

    private MealPlan mealPlan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealPlanResource mealPlanResource = new MealPlanResource(mealPlanService);
        this.restMealPlanMockMvc = MockMvcBuilders.standaloneSetup(mealPlanResource)
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
    public static MealPlan createEntity(EntityManager em) {
        MealPlan mealPlan = new MealPlan()
            .authorId(DEFAULT_AUTHOR_ID)
            .creationDate(DEFAULT_CREATION_DATE)
            .name(DEFAULT_NAME)
            .isVisible(DEFAULT_IS_VISIBLE)
            .isLocked(DEFAULT_IS_LOCKED)
            .languageId(DEFAULT_LANGUAGE_ID)
            .numberOfDays(DEFAULT_NUMBER_OF_DAYS)
            .numberOfMealsPerDay(DEFAULT_NUMBER_OF_MEALS_PER_DAY)
            .totalDailyEnergyKcal(DEFAULT_TOTAL_DAILY_ENERGY_KCAL)
            .percentOfProtein(DEFAULT_PERCENT_OF_PROTEIN)
            .percentOfFat(DEFAULT_PERCENT_OF_FAT)
            .percentOfCarbohydrates(DEFAULT_PERCENT_OF_CARBOHYDRATES);
        // Add required entity
        MealPlanDay mealPlanDay = MealPlanDayResourceIntTest.createEntity(em);
        em.persist(mealPlanDay);
        em.flush();
        mealPlan.getDays().add(mealPlanDay);
        // Add required entity
        MealDefinition mealDefinition = MealDefinitionResourceIntTest.createEntity(em);
        em.persist(mealDefinition);
        em.flush();
        mealPlan.getMealDefinitions().add(mealDefinition);
        return mealPlan;
    }

    @Before
    public void initTest() {
        mealPlan = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealPlan() throws Exception {
        int databaseSizeBeforeCreate = mealPlanRepository.findAll().size();

        // Create the MealPlan
        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isCreated());

        // Validate the MealPlan in the database
        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeCreate + 1);
        MealPlan testMealPlan = mealPlanList.get(mealPlanList.size() - 1);
        assertThat(testMealPlan.getAuthorId()).isEqualTo(DEFAULT_AUTHOR_ID);
        assertThat(testMealPlan.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testMealPlan.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMealPlan.isIsVisible()).isEqualTo(DEFAULT_IS_VISIBLE);
        assertThat(testMealPlan.isIsLocked()).isEqualTo(DEFAULT_IS_LOCKED);
        assertThat(testMealPlan.getLanguageId()).isEqualTo(DEFAULT_LANGUAGE_ID);
        assertThat(testMealPlan.getNumberOfDays()).isEqualTo(DEFAULT_NUMBER_OF_DAYS);
        assertThat(testMealPlan.getNumberOfMealsPerDay()).isEqualTo(DEFAULT_NUMBER_OF_MEALS_PER_DAY);
        assertThat(testMealPlan.getTotalDailyEnergyKcal()).isEqualTo(DEFAULT_TOTAL_DAILY_ENERGY_KCAL);
        assertThat(testMealPlan.getPercentOfProtein()).isEqualTo(DEFAULT_PERCENT_OF_PROTEIN);
        assertThat(testMealPlan.getPercentOfFat()).isEqualTo(DEFAULT_PERCENT_OF_FAT);
        assertThat(testMealPlan.getPercentOfCarbohydrates()).isEqualTo(DEFAULT_PERCENT_OF_CARBOHYDRATES);
    }

    @Test
    @Transactional
    public void createMealPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealPlanRepository.findAll().size();

        // Create the MealPlan with an existing ID
        mealPlan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlan in the database
        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAuthorIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setAuthorId(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setCreationDate(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsVisibleIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setIsVisible(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsLockedIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setIsLocked(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setLanguageId(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumberOfDaysIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setNumberOfDays(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumberOfMealsPerDayIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setNumberOfMealsPerDay(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalDailyEnergyKcalIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setTotalDailyEnergyKcal(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPercentOfProteinIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setPercentOfProtein(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPercentOfFatIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setPercentOfFat(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPercentOfCarbohydratesIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanRepository.findAll().size();
        // set the field null
        mealPlan.setPercentOfCarbohydrates(null);

        // Create the MealPlan, which fails.

        restMealPlanMockMvc.perform(post("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealPlans() throws Exception {
        // Initialize the database
        mealPlanRepository.saveAndFlush(mealPlan);

        // Get all the mealPlanList
        restMealPlanMockMvc.perform(get("/api/meal-plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealPlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].authorId").value(hasItem(DEFAULT_AUTHOR_ID.intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].isVisible").value(hasItem(DEFAULT_IS_VISIBLE.booleanValue())))
            .andExpect(jsonPath("$.[*].isLocked").value(hasItem(DEFAULT_IS_LOCKED.booleanValue())))
            .andExpect(jsonPath("$.[*].languageId").value(hasItem(DEFAULT_LANGUAGE_ID.intValue())))
            .andExpect(jsonPath("$.[*].numberOfDays").value(hasItem(DEFAULT_NUMBER_OF_DAYS)))
            .andExpect(jsonPath("$.[*].numberOfMealsPerDay").value(hasItem(DEFAULT_NUMBER_OF_MEALS_PER_DAY)))
            .andExpect(jsonPath("$.[*].totalDailyEnergyKcal").value(hasItem(DEFAULT_TOTAL_DAILY_ENERGY_KCAL)))
            .andExpect(jsonPath("$.[*].percentOfProtein").value(hasItem(DEFAULT_PERCENT_OF_PROTEIN)))
            .andExpect(jsonPath("$.[*].percentOfFat").value(hasItem(DEFAULT_PERCENT_OF_FAT)))
            .andExpect(jsonPath("$.[*].percentOfCarbohydrates").value(hasItem(DEFAULT_PERCENT_OF_CARBOHYDRATES)));
    }
    
    @Test
    @Transactional
    public void getMealPlan() throws Exception {
        // Initialize the database
        mealPlanRepository.saveAndFlush(mealPlan);

        // Get the mealPlan
        restMealPlanMockMvc.perform(get("/api/meal-plans/{id}", mealPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealPlan.getId().intValue()))
            .andExpect(jsonPath("$.authorId").value(DEFAULT_AUTHOR_ID.intValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.isVisible").value(DEFAULT_IS_VISIBLE.booleanValue()))
            .andExpect(jsonPath("$.isLocked").value(DEFAULT_IS_LOCKED.booleanValue()))
            .andExpect(jsonPath("$.languageId").value(DEFAULT_LANGUAGE_ID.intValue()))
            .andExpect(jsonPath("$.numberOfDays").value(DEFAULT_NUMBER_OF_DAYS))
            .andExpect(jsonPath("$.numberOfMealsPerDay").value(DEFAULT_NUMBER_OF_MEALS_PER_DAY))
            .andExpect(jsonPath("$.totalDailyEnergyKcal").value(DEFAULT_TOTAL_DAILY_ENERGY_KCAL))
            .andExpect(jsonPath("$.percentOfProtein").value(DEFAULT_PERCENT_OF_PROTEIN))
            .andExpect(jsonPath("$.percentOfFat").value(DEFAULT_PERCENT_OF_FAT))
            .andExpect(jsonPath("$.percentOfCarbohydrates").value(DEFAULT_PERCENT_OF_CARBOHYDRATES));
    }

    @Test
    @Transactional
    public void getNonExistingMealPlan() throws Exception {
        // Get the mealPlan
        restMealPlanMockMvc.perform(get("/api/meal-plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealPlan() throws Exception {
        // Initialize the database
        mealPlanService.save(mealPlan);

        int databaseSizeBeforeUpdate = mealPlanRepository.findAll().size();

        // Update the mealPlan
        MealPlan updatedMealPlan = mealPlanRepository.findById(mealPlan.getId()).get();
        // Disconnect from session so that the updates on updatedMealPlan are not directly saved in db
        em.detach(updatedMealPlan);
        updatedMealPlan
            .authorId(UPDATED_AUTHOR_ID)
            .creationDate(UPDATED_CREATION_DATE)
            .name(UPDATED_NAME)
            .isVisible(UPDATED_IS_VISIBLE)
            .isLocked(UPDATED_IS_LOCKED)
            .languageId(UPDATED_LANGUAGE_ID)
            .numberOfDays(UPDATED_NUMBER_OF_DAYS)
            .numberOfMealsPerDay(UPDATED_NUMBER_OF_MEALS_PER_DAY)
            .totalDailyEnergyKcal(UPDATED_TOTAL_DAILY_ENERGY_KCAL)
            .percentOfProtein(UPDATED_PERCENT_OF_PROTEIN)
            .percentOfFat(UPDATED_PERCENT_OF_FAT)
            .percentOfCarbohydrates(UPDATED_PERCENT_OF_CARBOHYDRATES);

        restMealPlanMockMvc.perform(put("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealPlan)))
            .andExpect(status().isOk());

        // Validate the MealPlan in the database
        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeUpdate);
        MealPlan testMealPlan = mealPlanList.get(mealPlanList.size() - 1);
        assertThat(testMealPlan.getAuthorId()).isEqualTo(UPDATED_AUTHOR_ID);
        assertThat(testMealPlan.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testMealPlan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMealPlan.isIsVisible()).isEqualTo(UPDATED_IS_VISIBLE);
        assertThat(testMealPlan.isIsLocked()).isEqualTo(UPDATED_IS_LOCKED);
        assertThat(testMealPlan.getLanguageId()).isEqualTo(UPDATED_LANGUAGE_ID);
        assertThat(testMealPlan.getNumberOfDays()).isEqualTo(UPDATED_NUMBER_OF_DAYS);
        assertThat(testMealPlan.getNumberOfMealsPerDay()).isEqualTo(UPDATED_NUMBER_OF_MEALS_PER_DAY);
        assertThat(testMealPlan.getTotalDailyEnergyKcal()).isEqualTo(UPDATED_TOTAL_DAILY_ENERGY_KCAL);
        assertThat(testMealPlan.getPercentOfProtein()).isEqualTo(UPDATED_PERCENT_OF_PROTEIN);
        assertThat(testMealPlan.getPercentOfFat()).isEqualTo(UPDATED_PERCENT_OF_FAT);
        assertThat(testMealPlan.getPercentOfCarbohydrates()).isEqualTo(UPDATED_PERCENT_OF_CARBOHYDRATES);
    }

    @Test
    @Transactional
    public void updateNonExistingMealPlan() throws Exception {
        int databaseSizeBeforeUpdate = mealPlanRepository.findAll().size();

        // Create the MealPlan

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealPlanMockMvc.perform(put("/api/meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlan)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlan in the database
        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMealPlan() throws Exception {
        // Initialize the database
        mealPlanService.save(mealPlan);

        int databaseSizeBeforeDelete = mealPlanRepository.findAll().size();

        // Delete the mealPlan
        restMealPlanMockMvc.perform(delete("/api/meal-plans/{id}", mealPlan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MealPlan> mealPlanList = mealPlanRepository.findAll();
        assertThat(mealPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealPlan.class);
        MealPlan mealPlan1 = new MealPlan();
        mealPlan1.setId(1L);
        MealPlan mealPlan2 = new MealPlan();
        mealPlan2.setId(mealPlan1.getId());
        assertThat(mealPlan1).isEqualTo(mealPlan2);
        mealPlan2.setId(2L);
        assertThat(mealPlan1).isNotEqualTo(mealPlan2);
        mealPlan1.setId(null);
        assertThat(mealPlan1).isNotEqualTo(mealPlan2);
    }
}
