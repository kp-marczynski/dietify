package pl.marczynski.dietify.core.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.domain.Meal;
import pl.marczynski.dietify.mealplans.repository.MealPlanDayRepository;
import pl.marczynski.dietify.mealplans.service.MealPlanDayService;
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
import pl.marczynski.dietify.mealplans.web.rest.MealPlanDayResource;

import javax.persistence.EntityManager;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MealPlanDayResource REST controller.
 *
 * @see MealPlanDayResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class MealPlanDayResourceIntTest {

    private static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    private static final Integer UPDATED_ORDINAL_NUMBER = 2;

    @Autowired
    private MealPlanDayRepository mealPlanDayRepository;

    @Autowired
    private MealPlanDayService mealPlanDayService;

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

    @Before
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
        MealPlanDay mealPlanDay = new MealPlanDay()
            .ordinalNumber(DEFAULT_ORDINAL_NUMBER);
        // Add required entity
        MealPlan mealPlan = MealPlanResourceIntTest.createEntity(em);
        em.persist(mealPlan);
        em.flush();
        mealPlanDay.setMealPlan(mealPlan);
        // Add required entity
        Meal meal = MealResourceIntTest.createEntity(em);
        em.persist(meal);
        em.flush();
        mealPlanDay.getMeals().add(meal);
        return mealPlanDay;
    }

    @Before
    public void initTest() {
        mealPlanDay = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealPlanDay() throws Exception {
        int databaseSizeBeforeCreate = mealPlanDayRepository.findAll().size();

        // Create the MealPlanDay
        restMealPlanDayMockMvc.perform(post("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanDay)))
            .andExpect(status().isCreated());

        // Validate the MealPlanDay in the database
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeCreate + 1);
        MealPlanDay testMealPlanDay = mealPlanDayList.get(mealPlanDayList.size() - 1);
        assertThat(testMealPlanDay.getOrdinalNumber()).isEqualTo(DEFAULT_ORDINAL_NUMBER);
    }

    @Test
    @Transactional
    public void createMealPlanDayWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealPlanDayRepository.findAll().size();

        // Create the MealPlanDay with an existing ID
        mealPlanDay.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealPlanDayMockMvc.perform(post("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanDay)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlanDay in the database
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkOrdinalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanDayRepository.findAll().size();
        // set the field null
        mealPlanDay.setOrdinalNumber(null);

        // Create the MealPlanDay, which fails.

        restMealPlanDayMockMvc.perform(post("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanDay)))
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
        mealPlanDayService.save(mealPlanDay);

        int databaseSizeBeforeUpdate = mealPlanDayRepository.findAll().size();

        // Update the mealPlanDay
        MealPlanDay updatedMealPlanDay = mealPlanDayRepository.findById(mealPlanDay.getId()).get();
        // Disconnect from session so that the updates on updatedMealPlanDay are not directly saved in db
        em.detach(updatedMealPlanDay);
        updatedMealPlanDay
            .ordinalNumber(UPDATED_ORDINAL_NUMBER);

        restMealPlanDayMockMvc.perform(put("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealPlanDay)))
            .andExpect(status().isOk());

        // Validate the MealPlanDay in the database
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeUpdate);
        MealPlanDay testMealPlanDay = mealPlanDayList.get(mealPlanDayList.size() - 1);
        assertThat(testMealPlanDay.getOrdinalNumber()).isEqualTo(UPDATED_ORDINAL_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingMealPlanDay() throws Exception {
        int databaseSizeBeforeUpdate = mealPlanDayRepository.findAll().size();

        // Create the MealPlanDay

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealPlanDayMockMvc.perform(put("/api/meal-plan-days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanDay)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlanDay in the database
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMealPlanDay() throws Exception {
        // Initialize the database
        mealPlanDayService.save(mealPlanDay);

        int databaseSizeBeforeDelete = mealPlanDayRepository.findAll().size();

        // Delete the mealPlanDay
        restMealPlanDayMockMvc.perform(delete("/api/meal-plan-days/{id}", mealPlanDay.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MealPlanDay> mealPlanDayList = mealPlanDayRepository.findAll();
        assertThat(mealPlanDayList).hasSize(databaseSizeBeforeDelete - 1);
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
}
