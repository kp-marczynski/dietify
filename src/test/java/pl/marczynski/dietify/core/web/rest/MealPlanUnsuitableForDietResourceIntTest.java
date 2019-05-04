package pl.marczynski.dietify.core.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.mealplans.domain.MealPlanUnsuitableForDiet;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.repository.MealPlanUnsuitableForDietRepository;
import pl.marczynski.dietify.mealplans.service.MealPlanUnsuitableForDietService;
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
import pl.marczynski.dietify.mealplans.web.rest.MealPlanUnsuitableForDietResource;

import javax.persistence.EntityManager;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MealPlanUnsuitableForDietResource REST controller.
 *
 * @see MealPlanUnsuitableForDietResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class MealPlanUnsuitableForDietResourceIntTest {

    private static final Long DEFAULT_DIET_TYPE_ID = 1L;
    private static final Long UPDATED_DIET_TYPE_ID = 2L;

    @Autowired
    private MealPlanUnsuitableForDietRepository mealPlanUnsuitableForDietRepository;

    @Autowired
    private MealPlanUnsuitableForDietService mealPlanUnsuitableForDietService;

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

    private MockMvc restMealPlanUnsuitableForDietMockMvc;

    private MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealPlanUnsuitableForDietResource mealPlanUnsuitableForDietResource = new MealPlanUnsuitableForDietResource(mealPlanUnsuitableForDietService);
        this.restMealPlanUnsuitableForDietMockMvc = MockMvcBuilders.standaloneSetup(mealPlanUnsuitableForDietResource)
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
    public static MealPlanUnsuitableForDiet createEntity(EntityManager em) {
        MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet = new MealPlanUnsuitableForDiet()
            .dietTypeId(DEFAULT_DIET_TYPE_ID);
        // Add required entity
        MealPlan mealPlan = MealPlanResourceIntTest.createEntity(em);
        em.persist(mealPlan);
        em.flush();
        mealPlanUnsuitableForDiet.setMealPlan(mealPlan);
        return mealPlanUnsuitableForDiet;
    }

    @Before
    public void initTest() {
        mealPlanUnsuitableForDiet = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealPlanUnsuitableForDiet() throws Exception {
        int databaseSizeBeforeCreate = mealPlanUnsuitableForDietRepository.findAll().size();

        // Create the MealPlanUnsuitableForDiet
        restMealPlanUnsuitableForDietMockMvc.perform(post("/api/meal-plan-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanUnsuitableForDiet)))
            .andExpect(status().isCreated());

        // Validate the MealPlanUnsuitableForDiet in the database
        List<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDietList = mealPlanUnsuitableForDietRepository.findAll();
        assertThat(mealPlanUnsuitableForDietList).hasSize(databaseSizeBeforeCreate + 1);
        MealPlanUnsuitableForDiet testMealPlanUnsuitableForDiet = mealPlanUnsuitableForDietList.get(mealPlanUnsuitableForDietList.size() - 1);
        assertThat(testMealPlanUnsuitableForDiet.getDietTypeId()).isEqualTo(DEFAULT_DIET_TYPE_ID);
    }

    @Test
    @Transactional
    public void createMealPlanUnsuitableForDietWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealPlanUnsuitableForDietRepository.findAll().size();

        // Create the MealPlanUnsuitableForDiet with an existing ID
        mealPlanUnsuitableForDiet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealPlanUnsuitableForDietMockMvc.perform(post("/api/meal-plan-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanUnsuitableForDiet)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlanUnsuitableForDiet in the database
        List<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDietList = mealPlanUnsuitableForDietRepository.findAll();
        assertThat(mealPlanUnsuitableForDietList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDietTypeIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealPlanUnsuitableForDietRepository.findAll().size();
        // set the field null
        mealPlanUnsuitableForDiet.setDietTypeId(null);

        // Create the MealPlanUnsuitableForDiet, which fails.

        restMealPlanUnsuitableForDietMockMvc.perform(post("/api/meal-plan-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanUnsuitableForDiet)))
            .andExpect(status().isBadRequest());

        List<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDietList = mealPlanUnsuitableForDietRepository.findAll();
        assertThat(mealPlanUnsuitableForDietList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealPlanUnsuitableForDiets() throws Exception {
        // Initialize the database
        mealPlanUnsuitableForDietRepository.saveAndFlush(mealPlanUnsuitableForDiet);

        // Get all the mealPlanUnsuitableForDietList
        restMealPlanUnsuitableForDietMockMvc.perform(get("/api/meal-plan-unsuitable-for-diets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealPlanUnsuitableForDiet.getId().intValue())))
            .andExpect(jsonPath("$.[*].dietTypeId").value(hasItem(DEFAULT_DIET_TYPE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getMealPlanUnsuitableForDiet() throws Exception {
        // Initialize the database
        mealPlanUnsuitableForDietRepository.saveAndFlush(mealPlanUnsuitableForDiet);

        // Get the mealPlanUnsuitableForDiet
        restMealPlanUnsuitableForDietMockMvc.perform(get("/api/meal-plan-unsuitable-for-diets/{id}", mealPlanUnsuitableForDiet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealPlanUnsuitableForDiet.getId().intValue()))
            .andExpect(jsonPath("$.dietTypeId").value(DEFAULT_DIET_TYPE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMealPlanUnsuitableForDiet() throws Exception {
        // Get the mealPlanUnsuitableForDiet
        restMealPlanUnsuitableForDietMockMvc.perform(get("/api/meal-plan-unsuitable-for-diets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealPlanUnsuitableForDiet() throws Exception {
        // Initialize the database
        mealPlanUnsuitableForDietService.save(mealPlanUnsuitableForDiet);

        int databaseSizeBeforeUpdate = mealPlanUnsuitableForDietRepository.findAll().size();

        // Update the mealPlanUnsuitableForDiet
        MealPlanUnsuitableForDiet updatedMealPlanUnsuitableForDiet = mealPlanUnsuitableForDietRepository.findById(mealPlanUnsuitableForDiet.getId()).get();
        // Disconnect from session so that the updates on updatedMealPlanUnsuitableForDiet are not directly saved in db
        em.detach(updatedMealPlanUnsuitableForDiet);
        updatedMealPlanUnsuitableForDiet
            .dietTypeId(UPDATED_DIET_TYPE_ID);

        restMealPlanUnsuitableForDietMockMvc.perform(put("/api/meal-plan-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealPlanUnsuitableForDiet)))
            .andExpect(status().isOk());

        // Validate the MealPlanUnsuitableForDiet in the database
        List<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDietList = mealPlanUnsuitableForDietRepository.findAll();
        assertThat(mealPlanUnsuitableForDietList).hasSize(databaseSizeBeforeUpdate);
        MealPlanUnsuitableForDiet testMealPlanUnsuitableForDiet = mealPlanUnsuitableForDietList.get(mealPlanUnsuitableForDietList.size() - 1);
        assertThat(testMealPlanUnsuitableForDiet.getDietTypeId()).isEqualTo(UPDATED_DIET_TYPE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingMealPlanUnsuitableForDiet() throws Exception {
        int databaseSizeBeforeUpdate = mealPlanUnsuitableForDietRepository.findAll().size();

        // Create the MealPlanUnsuitableForDiet

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealPlanUnsuitableForDietMockMvc.perform(put("/api/meal-plan-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealPlanUnsuitableForDiet)))
            .andExpect(status().isBadRequest());

        // Validate the MealPlanUnsuitableForDiet in the database
        List<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDietList = mealPlanUnsuitableForDietRepository.findAll();
        assertThat(mealPlanUnsuitableForDietList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMealPlanUnsuitableForDiet() throws Exception {
        // Initialize the database
        mealPlanUnsuitableForDietService.save(mealPlanUnsuitableForDiet);

        int databaseSizeBeforeDelete = mealPlanUnsuitableForDietRepository.findAll().size();

        // Delete the mealPlanUnsuitableForDiet
        restMealPlanUnsuitableForDietMockMvc.perform(delete("/api/meal-plan-unsuitable-for-diets/{id}", mealPlanUnsuitableForDiet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDietList = mealPlanUnsuitableForDietRepository.findAll();
        assertThat(mealPlanUnsuitableForDietList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealPlanUnsuitableForDiet.class);
        MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet1 = new MealPlanUnsuitableForDiet();
        mealPlanUnsuitableForDiet1.setId(1L);
        MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet2 = new MealPlanUnsuitableForDiet();
        mealPlanUnsuitableForDiet2.setId(mealPlanUnsuitableForDiet1.getId());
        assertThat(mealPlanUnsuitableForDiet1).isEqualTo(mealPlanUnsuitableForDiet2);
        mealPlanUnsuitableForDiet2.setId(2L);
        assertThat(mealPlanUnsuitableForDiet1).isNotEqualTo(mealPlanUnsuitableForDiet2);
        mealPlanUnsuitableForDiet1.setId(null);
        assertThat(mealPlanUnsuitableForDiet1).isNotEqualTo(mealPlanUnsuitableForDiet2);
    }
}
