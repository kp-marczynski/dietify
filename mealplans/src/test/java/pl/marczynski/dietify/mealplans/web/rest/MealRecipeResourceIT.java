package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.MealplansApp;
import pl.marczynski.dietify.mealplans.domain.MealRecipe;
import pl.marczynski.dietify.mealplans.domain.Meal;
import pl.marczynski.dietify.mealplans.repository.MealRecipeRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealRecipeSearchRepository;
import pl.marczynski.dietify.mealplans.service.MealRecipeService;
import pl.marczynski.dietify.mealplans.service.dto.MealRecipeDTO;
import pl.marczynski.dietify.mealplans.service.mapper.MealRecipeMapper;
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
 * Integration tests for the {@Link MealRecipeResource} REST controller.
 */
@SpringBootTest(classes = MealplansApp.class)
public class MealRecipeResourceIT {

    private static final Long DEFAULT_RECIPE_ID = 1L;
    private static final Long UPDATED_RECIPE_ID = 2L;

    private static final Integer DEFAULT_AMOUNT = 0;
    private static final Integer UPDATED_AMOUNT = 1;

    @Autowired
    private MealRecipeRepository mealRecipeRepository;

    @Autowired
    private MealRecipeMapper mealRecipeMapper;

    @Autowired
    private MealRecipeService mealRecipeService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.mealplans.repository.search test package.
     *
     * @see pl.marczynski.dietify.mealplans.repository.search.MealRecipeSearchRepositoryMockConfiguration
     */
    @Autowired
    private MealRecipeSearchRepository mockMealRecipeSearchRepository;

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

    private MockMvc restMealRecipeMockMvc;

    private MealRecipe mealRecipe;

    @BeforeEach
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

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealRecipe createEntity(EntityManager em) {
        MealRecipe mealRecipe = new MealRecipe();
        mealRecipe.setRecipeId(DEFAULT_RECIPE_ID);
        mealRecipe.setAmount(DEFAULT_AMOUNT);
        // Add required entity
        Meal meal;
        if (TestUtil.findAll(em, Meal.class).isEmpty()) {
            meal = MealResourceIT.createEntity(em);
            em.persist(meal);
            em.flush();
        } else {
            meal = TestUtil.findAll(em, Meal.class).get(0);
        }
        mealRecipe.setMeal(meal);
        return mealRecipe;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealRecipe createUpdatedEntity(EntityManager em) {
        MealRecipe mealRecipe = new MealRecipe();
        mealRecipe.setRecipeId(UPDATED_RECIPE_ID);
        mealRecipe.setAmount(UPDATED_AMOUNT);
        // Add required entity
        Meal meal;
        if (TestUtil.findAll(em, Meal.class).isEmpty()) {
            meal = MealResourceIT.createUpdatedEntity(em);
            em.persist(meal);
            em.flush();
        } else {
            meal = TestUtil.findAll(em, Meal.class).get(0);
        }
        mealRecipe.setMeal(meal);
        return mealRecipe;
    }

    @BeforeEach
    public void initTest() {
        mealRecipe = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealRecipe() throws Exception {
        int databaseSizeBeforeCreate = mealRecipeRepository.findAll().size();

        // Create the MealRecipe
        MealRecipeDTO mealRecipeDTO = mealRecipeMapper.toDto(mealRecipe);
        restMealRecipeMockMvc.perform(post("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipeDTO)))
            .andExpect(status().isCreated());

        // Validate the MealRecipe in the database
        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeCreate + 1);
        MealRecipe testMealRecipe = mealRecipeList.get(mealRecipeList.size() - 1);
        assertThat(testMealRecipe.getRecipeId()).isEqualTo(DEFAULT_RECIPE_ID);
        assertThat(testMealRecipe.getAmount()).isEqualTo(DEFAULT_AMOUNT);

        // Validate the MealRecipe in Elasticsearch
        verify(mockMealRecipeSearchRepository, times(1)).save(testMealRecipe);
    }

    @Test
    @Transactional
    public void createMealRecipeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealRecipeRepository.findAll().size();

        // Create the MealRecipe with an existing ID
        mealRecipe.setId(1L);
        MealRecipeDTO mealRecipeDTO = mealRecipeMapper.toDto(mealRecipe);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealRecipeMockMvc.perform(post("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealRecipe in the database
        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeCreate);

        // Validate the MealRecipe in Elasticsearch
        verify(mockMealRecipeSearchRepository, times(0)).save(mealRecipe);
    }


    @Test
    @Transactional
    public void checkRecipeIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealRecipeRepository.findAll().size();
        // set the field null
        mealRecipe.setRecipeId(null);

        // Create the MealRecipe, which fails.
        MealRecipeDTO mealRecipeDTO = mealRecipeMapper.toDto(mealRecipe);

        restMealRecipeMockMvc.perform(post("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipeDTO)))
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
        MealRecipeDTO mealRecipeDTO = mealRecipeMapper.toDto(mealRecipe);

        restMealRecipeMockMvc.perform(post("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipeDTO)))
            .andExpect(status().isBadRequest());

        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealRecipes() throws Exception {
        // Initialize the database
        mealRecipeRepository.saveAndFlush(mealRecipe);

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
        mealRecipeRepository.saveAndFlush(mealRecipe);

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
    public void updateMealRecipe() throws Exception {
        // Initialize the database
        mealRecipeRepository.saveAndFlush(mealRecipe);

        int databaseSizeBeforeUpdate = mealRecipeRepository.findAll().size();

        // Update the mealRecipe
        MealRecipe updatedMealRecipe = mealRecipeRepository.findById(mealRecipe.getId()).get();
        // Disconnect from session so that the updates on updatedMealRecipe are not directly saved in db
        em.detach(updatedMealRecipe);
        updatedMealRecipe.setRecipeId(UPDATED_RECIPE_ID);
        updatedMealRecipe.setAmount(UPDATED_AMOUNT);
        MealRecipeDTO mealRecipeDTO = mealRecipeMapper.toDto(updatedMealRecipe);

        restMealRecipeMockMvc.perform(put("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipeDTO)))
            .andExpect(status().isOk());

        // Validate the MealRecipe in the database
        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeUpdate);
        MealRecipe testMealRecipe = mealRecipeList.get(mealRecipeList.size() - 1);
        assertThat(testMealRecipe.getRecipeId()).isEqualTo(UPDATED_RECIPE_ID);
        assertThat(testMealRecipe.getAmount()).isEqualTo(UPDATED_AMOUNT);

        // Validate the MealRecipe in Elasticsearch
        verify(mockMealRecipeSearchRepository, times(1)).save(testMealRecipe);
    }

    @Test
    @Transactional
    public void updateNonExistingMealRecipe() throws Exception {
        int databaseSizeBeforeUpdate = mealRecipeRepository.findAll().size();

        // Create the MealRecipe
        MealRecipeDTO mealRecipeDTO = mealRecipeMapper.toDto(mealRecipe);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealRecipeMockMvc.perform(put("/api/meal-recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRecipeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealRecipe in the database
        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MealRecipe in Elasticsearch
        verify(mockMealRecipeSearchRepository, times(0)).save(mealRecipe);
    }

    @Test
    @Transactional
    public void deleteMealRecipe() throws Exception {
        // Initialize the database
        mealRecipeRepository.saveAndFlush(mealRecipe);

        int databaseSizeBeforeDelete = mealRecipeRepository.findAll().size();

        // Delete the mealRecipe
        restMealRecipeMockMvc.perform(delete("/api/meal-recipes/{id}", mealRecipe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MealRecipe> mealRecipeList = mealRecipeRepository.findAll();
        assertThat(mealRecipeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MealRecipe in Elasticsearch
        verify(mockMealRecipeSearchRepository, times(1)).deleteById(mealRecipe.getId());
    }

    @Test
    @Transactional
    public void searchMealRecipe() throws Exception {
        // Initialize the database
        mealRecipeRepository.saveAndFlush(mealRecipe);
        when(mockMealRecipeSearchRepository.search(queryStringQuery("id:" + mealRecipe.getId())))
            .thenReturn(Collections.singletonList(mealRecipe));
        // Search the mealRecipe
        restMealRecipeMockMvc.perform(get("/api/_search/meal-recipes?query=id:" + mealRecipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealRecipe.getId().intValue())))
            .andExpect(jsonPath("$.[*].recipeId").value(hasItem(DEFAULT_RECIPE_ID.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)));
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

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealRecipeDTO.class);
        MealRecipeDTO mealRecipeDTO1 = new MealRecipeDTO();
        mealRecipeDTO1.setId(1L);
        MealRecipeDTO mealRecipeDTO2 = new MealRecipeDTO();
        assertThat(mealRecipeDTO1).isNotEqualTo(mealRecipeDTO2);
        mealRecipeDTO2.setId(mealRecipeDTO1.getId());
        assertThat(mealRecipeDTO1).isEqualTo(mealRecipeDTO2);
        mealRecipeDTO2.setId(2L);
        assertThat(mealRecipeDTO1).isNotEqualTo(mealRecipeDTO2);
        mealRecipeDTO1.setId(null);
        assertThat(mealRecipeDTO1).isNotEqualTo(mealRecipeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mealRecipeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mealRecipeMapper.fromId(null)).isNull();
    }
}
