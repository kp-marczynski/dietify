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
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.domain.MealPlanCreator;
import pl.marczynski.dietify.mealplans.domain.MealRecipe;
import pl.marczynski.dietify.mealplans.domain.MealRecipeCreator;
import pl.marczynski.dietify.mealplans.repository.MealPlanRepository;
import pl.marczynski.dietify.mealplans.repository.MealRecipeRepository;
import pl.marczynski.dietify.mealplans.service.MealRecipeService;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static pl.marczynski.dietify.mealplans.domain.MealRecipeCreator.*;

/**
 * Test class for the MealRecipeResource REST controller.
 *
 * @see MealRecipeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class MealRecipeResourceIntTest {

    @Autowired
    private MealRecipeRepository mealRecipeRepository;

    @Autowired
    private MealRecipeService mealRecipeService;

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

    @Autowired
    private MealPlanRepository mealPlanRepository;

    private MealPlan mealPlan;

    private MockMvc restMealRecipeMockMvc;

    private MealRecipe mealRecipe;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealRecipeResource mealRecipeResource = new MealRecipeResource(mealRecipeService);
        this.restMealRecipeMockMvc = MockMvcBuilders.standaloneSetup(mealRecipeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    @Before
    public void initTest() {
        mealPlan = MealPlanCreator.createEntity();
        mealRecipe = mealPlan.getDays().iterator().next().getMeals().iterator().next().getMealRecipes().iterator().next();
    }


    @Test
    @Transactional
    public void createMealRecipeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealRecipeRepository.findAll().size();

        // Create the MealRecipe with an existing ID
        mealRecipe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealRecipeMockMvc.perform(post("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipe)))
            .andExpect(status().isBadRequest());

        // Validate the MealRecipe in the database
        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRecipeIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealRecipeRepository.findAll().size();
        // set the field null
        mealRecipe.setRecipeId(null);

        // Create the MealRecipe, which fails.

        restMealRecipeMockMvc.perform(post("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipe)))
            .andExpect(status().isBadRequest());

        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealRecipeRepository.findAll().size();
        // set the field null
        mealRecipe.setAmount(null);

        // Create the MealRecipe, which fails.

        restMealRecipeMockMvc.perform(post("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipe)))
            .andExpect(status().isBadRequest());

        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealRecipes() throws Exception {
        // Initialize the database
        mealPlanRepository.saveAndFlush(mealPlan);

        // Get all the mealRecipeList
        restMealRecipeMockMvc.perform(get("/api/meal-recipes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealRecipe.getId().intValue())))
            .andExpect(jsonPath("$.[*].recipeId").value(hasItem(DEFAULT_RECIPE_ID.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)));
    }

    @Test
    @Transactional
    public void getMealRecipe() throws Exception {
        // Initialize the database
        mealPlanRepository.saveAndFlush(mealPlan);

        // Get the mealRecipe
        restMealRecipeMockMvc.perform(get("/api/meal-recipes/{id}", mealRecipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealRecipe.getId().intValue()))
            .andExpect(jsonPath("$.recipeId").value(DEFAULT_RECIPE_ID.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT));
    }

    @Test
    @Transactional
    public void getNonExistingMealRecipe() throws Exception {
        // Get the mealRecipe
        restMealRecipeMockMvc.perform(get("/api/meal-recipes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNonExistingMealRecipe() throws Exception {
        int databaseSizeBeforeUpdate = mealRecipeRepository.findAll().size();

        // Create the MealRecipe

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealRecipeMockMvc.perform(put("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipe)))
            .andExpect(status().isBadRequest());

        // Validate the MealRecipe in the database
        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeUpdate);
    }


    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealRecipe.class);
        MealRecipe mealRecipe1 = new MealRecipe();
        mealRecipe1.setId(1L);
        MealRecipe mealRecipe2 = new MealRecipe();
        mealRecipe2.setId(mealRecipe1.getId());
        assertThat(mealRecipe1).isEqualTo(mealRecipe2);
        mealRecipe2.setId(2L);
        assertThat(mealRecipe1).isNotEqualTo(mealRecipe2);
        mealRecipe1.setId(null);
        assertThat(mealRecipe1).isNotEqualTo(mealRecipe2);
    }
}
