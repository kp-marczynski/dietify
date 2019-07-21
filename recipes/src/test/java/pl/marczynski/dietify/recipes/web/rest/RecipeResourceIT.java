package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData;
import pl.marczynski.dietify.recipes.repository.RecipeRepository;
import pl.marczynski.dietify.recipes.repository.search.RecipeSearchRepository;
import pl.marczynski.dietify.recipes.service.RecipeService;
import pl.marczynski.dietify.recipes.service.dto.RecipeDTO;
import pl.marczynski.dietify.recipes.service.mapper.RecipeMapper;
import pl.marczynski.dietify.recipes.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static pl.marczynski.dietify.recipes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link RecipeResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class RecipeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PREPARATION_TIME_MINUTES = 0;
    private static final Integer UPDATED_PREPARATION_TIME_MINUTES = 1;

    private static final Double DEFAULT_NUMBER_OF_PORTIONS = 0D;
    private static final Double UPDATED_NUMBER_OF_PORTIONS = 1D;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Long DEFAULT_AUTHOR_ID = 1L;
    private static final Long UPDATED_AUTHOR_ID = 2L;

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LAST_EDIT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_EDIT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_IS_VISIBLE = false;
    private static final Boolean UPDATED_IS_VISIBLE = true;

    private static final String DEFAULT_LANGUAGE = "AA";
    private static final String UPDATED_LANGUAGE = "BB";

    private static final Double DEFAULT_TOTAL_GRAMS_WEIGHT = 0D;
    private static final Double UPDATED_TOTAL_GRAMS_WEIGHT = 1D;

    @Autowired
    private RecipeRepository recipeRepository;

    @Mock
    private RecipeRepository recipeRepositoryMock;

    @Autowired
    private RecipeMapper recipeMapper;

    @Mock
    private RecipeService recipeServiceMock;

    @Autowired
    private RecipeService recipeService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.RecipeSearchRepositoryMockConfiguration
     */
    @Autowired
    private RecipeSearchRepository mockRecipeSearchRepository;

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

    private MockMvc restRecipeMockMvc;

    private Recipe recipe;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecipeResource recipeResource = new RecipeResource(recipeService);
        this.restRecipeMockMvc = MockMvcBuilders.standaloneSetup(recipeResource)
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
    public static Recipe createEntity(EntityManager em) {
        Recipe recipe = new Recipe();
        recipe.setName(DEFAULT_NAME);
        recipe.setPreparationTimeMinutes(DEFAULT_PREPARATION_TIME_MINUTES);
        recipe.setNumberOfPortions(DEFAULT_NUMBER_OF_PORTIONS);
        recipe.setImage(DEFAULT_IMAGE);
        recipe.setImageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        recipe.setAuthorId(DEFAULT_AUTHOR_ID);
        recipe.setCreationDate(DEFAULT_CREATION_DATE);
        recipe.setLastEditDate(DEFAULT_LAST_EDIT_DATE);
        recipe.setIsVisible(DEFAULT_IS_VISIBLE);
        recipe.setLanguage(DEFAULT_LANGUAGE);
        recipe.setTotalGramsWeight(DEFAULT_TOTAL_GRAMS_WEIGHT);
        // Add required entity
        RecipeBasicNutritionData recipeBasicNutritionData;
        if (TestUtil.findAll(em, RecipeBasicNutritionData.class).isEmpty()) {
            recipeBasicNutritionData = RecipeBasicNutritionDataResourceIT.createEntity(em);
            em.persist(recipeBasicNutritionData);
            em.flush();
        } else {
            recipeBasicNutritionData = TestUtil.findAll(em, RecipeBasicNutritionData.class).get(0);
        }
        recipe.setBasicNutritionData(recipeBasicNutritionData);
        return recipe;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recipe createUpdatedEntity(EntityManager em) {
        Recipe recipe = new Recipe();
        recipe.setName(UPDATED_NAME);
        recipe.setPreparationTimeMinutes(UPDATED_PREPARATION_TIME_MINUTES);
        recipe.setNumberOfPortions(UPDATED_NUMBER_OF_PORTIONS);
        recipe.setImage(UPDATED_IMAGE);
        recipe.setImageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        recipe.setAuthorId(UPDATED_AUTHOR_ID);
        recipe.setCreationDate(UPDATED_CREATION_DATE);
        recipe.setLastEditDate(UPDATED_LAST_EDIT_DATE);
        recipe.setIsVisible(UPDATED_IS_VISIBLE);
        recipe.setLanguage(UPDATED_LANGUAGE);
        recipe.setTotalGramsWeight(UPDATED_TOTAL_GRAMS_WEIGHT);
        // Add required entity
        RecipeBasicNutritionData recipeBasicNutritionData;
        if (TestUtil.findAll(em, RecipeBasicNutritionData.class).isEmpty()) {
            recipeBasicNutritionData = RecipeBasicNutritionDataResourceIT.createUpdatedEntity(em);
            em.persist(recipeBasicNutritionData);
            em.flush();
        } else {
            recipeBasicNutritionData = TestUtil.findAll(em, RecipeBasicNutritionData.class).get(0);
        }
        recipe.setBasicNutritionData(recipeBasicNutritionData);
        return recipe;
    }

    @BeforeEach
    public void initTest() {
        recipe = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecipe() throws Exception {
        int databaseSizeBeforeCreate = recipeRepository.findAll().size();

        // Create the Recipe
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);
        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isCreated());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeCreate + 1);
        Recipe testRecipe = recipeList.get(recipeList.size() - 1);
        assertThat(testRecipe.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRecipe.getPreparationTimeMinutes()).isEqualTo(DEFAULT_PREPARATION_TIME_MINUTES);
        assertThat(testRecipe.getNumberOfPortions()).isEqualTo(DEFAULT_NUMBER_OF_PORTIONS);
        assertThat(testRecipe.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testRecipe.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testRecipe.getAuthorId()).isEqualTo(DEFAULT_AUTHOR_ID);
        assertThat(testRecipe.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testRecipe.getLastEditDate()).isEqualTo(DEFAULT_LAST_EDIT_DATE);
        assertThat(testRecipe.isIsVisible()).isEqualTo(DEFAULT_IS_VISIBLE);
        assertThat(testRecipe.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testRecipe.getTotalGramsWeight()).isEqualTo(DEFAULT_TOTAL_GRAMS_WEIGHT);

        // Validate the Recipe in Elasticsearch
        verify(mockRecipeSearchRepository, times(1)).save(testRecipe);
    }

    @Test
    @Transactional
    public void createRecipeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipeRepository.findAll().size();

        // Create the Recipe with an existing ID
        recipe.setId(1L);
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeCreate);

        // Validate the Recipe in Elasticsearch
        verify(mockRecipeSearchRepository, times(0)).save(recipe);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeRepository.findAll().size();
        // set the field null
        recipe.setName(null);

        // Create the Recipe, which fails.
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPreparationTimeMinutesIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeRepository.findAll().size();
        // set the field null
        recipe.setPreparationTimeMinutes(null);

        // Create the Recipe, which fails.
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumberOfPortionsIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeRepository.findAll().size();
        // set the field null
        recipe.setNumberOfPortions(null);

        // Create the Recipe, which fails.
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAuthorIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeRepository.findAll().size();
        // set the field null
        recipe.setAuthorId(null);

        // Create the Recipe, which fails.
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeRepository.findAll().size();
        // set the field null
        recipe.setCreationDate(null);

        // Create the Recipe, which fails.
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastEditDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeRepository.findAll().size();
        // set the field null
        recipe.setLastEditDate(null);

        // Create the Recipe, which fails.
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsVisibleIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeRepository.findAll().size();
        // set the field null
        recipe.setIsVisible(null);

        // Create the Recipe, which fails.
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeRepository.findAll().size();
        // set the field null
        recipe.setLanguage(null);

        // Create the Recipe, which fails.
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalGramsWeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeRepository.findAll().size();
        // set the field null
        recipe.setTotalGramsWeight(null);

        // Create the Recipe, which fails.
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        restRecipeMockMvc.perform(post("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecipes() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        // Get all the recipeList
        restRecipeMockMvc.perform(get("/api/recipes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipe.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].preparationTimeMinutes").value(hasItem(DEFAULT_PREPARATION_TIME_MINUTES)))
            .andExpect(jsonPath("$.[*].numberOfPortions").value(hasItem(DEFAULT_NUMBER_OF_PORTIONS.doubleValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].authorId").value(hasItem(DEFAULT_AUTHOR_ID.intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastEditDate").value(hasItem(DEFAULT_LAST_EDIT_DATE.toString())))
            .andExpect(jsonPath("$.[*].isVisible").value(hasItem(DEFAULT_IS_VISIBLE.booleanValue())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].totalGramsWeight").value(hasItem(DEFAULT_TOTAL_GRAMS_WEIGHT.doubleValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllRecipesWithEagerRelationshipsIsEnabled() throws Exception {
        RecipeResource recipeResource = new RecipeResource(recipeServiceMock);
        when(recipeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restRecipeMockMvc = MockMvcBuilders.standaloneSetup(recipeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restRecipeMockMvc.perform(get("/api/recipes?eagerload=true"))
        .andExpect(status().isOk());

        verify(recipeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllRecipesWithEagerRelationshipsIsNotEnabled() throws Exception {
        RecipeResource recipeResource = new RecipeResource(recipeServiceMock);
            when(recipeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restRecipeMockMvc = MockMvcBuilders.standaloneSetup(recipeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restRecipeMockMvc.perform(get("/api/recipes?eagerload=true"))
        .andExpect(status().isOk());

            verify(recipeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        // Get the recipe
        restRecipeMockMvc.perform(get("/api/recipes/{id}", recipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recipe.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.preparationTimeMinutes").value(DEFAULT_PREPARATION_TIME_MINUTES))
            .andExpect(jsonPath("$.numberOfPortions").value(DEFAULT_NUMBER_OF_PORTIONS.doubleValue()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.authorId").value(DEFAULT_AUTHOR_ID.intValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastEditDate").value(DEFAULT_LAST_EDIT_DATE.toString()))
            .andExpect(jsonPath("$.isVisible").value(DEFAULT_IS_VISIBLE.booleanValue()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.totalGramsWeight").value(DEFAULT_TOTAL_GRAMS_WEIGHT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRecipe() throws Exception {
        // Get the recipe
        restRecipeMockMvc.perform(get("/api/recipes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        int databaseSizeBeforeUpdate = recipeRepository.findAll().size();

        // Update the recipe
        Recipe updatedRecipe = recipeRepository.findById(recipe.getId()).get();
        // Disconnect from session so that the updates on updatedRecipe are not directly saved in db
        em.detach(updatedRecipe);
        updatedRecipe.setName(UPDATED_NAME);
        updatedRecipe.setPreparationTimeMinutes(UPDATED_PREPARATION_TIME_MINUTES);
        updatedRecipe.setNumberOfPortions(UPDATED_NUMBER_OF_PORTIONS);
        updatedRecipe.setImage(UPDATED_IMAGE);
        updatedRecipe.setImageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        updatedRecipe.setAuthorId(UPDATED_AUTHOR_ID);
        updatedRecipe.setCreationDate(UPDATED_CREATION_DATE);
        updatedRecipe.setLastEditDate(UPDATED_LAST_EDIT_DATE);
        updatedRecipe.setIsVisible(UPDATED_IS_VISIBLE);
        updatedRecipe.setLanguage(UPDATED_LANGUAGE);
        updatedRecipe.setTotalGramsWeight(UPDATED_TOTAL_GRAMS_WEIGHT);
        RecipeDTO recipeDTO = recipeMapper.toDto(updatedRecipe);

        restRecipeMockMvc.perform(put("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isOk());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeUpdate);
        Recipe testRecipe = recipeList.get(recipeList.size() - 1);
        assertThat(testRecipe.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRecipe.getPreparationTimeMinutes()).isEqualTo(UPDATED_PREPARATION_TIME_MINUTES);
        assertThat(testRecipe.getNumberOfPortions()).isEqualTo(UPDATED_NUMBER_OF_PORTIONS);
        assertThat(testRecipe.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testRecipe.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testRecipe.getAuthorId()).isEqualTo(UPDATED_AUTHOR_ID);
        assertThat(testRecipe.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testRecipe.getLastEditDate()).isEqualTo(UPDATED_LAST_EDIT_DATE);
        assertThat(testRecipe.isIsVisible()).isEqualTo(UPDATED_IS_VISIBLE);
        assertThat(testRecipe.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testRecipe.getTotalGramsWeight()).isEqualTo(UPDATED_TOTAL_GRAMS_WEIGHT);

        // Validate the Recipe in Elasticsearch
        verify(mockRecipeSearchRepository, times(1)).save(testRecipe);
    }

    @Test
    @Transactional
    public void updateNonExistingRecipe() throws Exception {
        int databaseSizeBeforeUpdate = recipeRepository.findAll().size();

        // Create the Recipe
        RecipeDTO recipeDTO = recipeMapper.toDto(recipe);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecipeMockMvc.perform(put("/api/recipes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Recipe in the database
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Recipe in Elasticsearch
        verify(mockRecipeSearchRepository, times(0)).save(recipe);
    }

    @Test
    @Transactional
    public void deleteRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        int databaseSizeBeforeDelete = recipeRepository.findAll().size();

        // Delete the recipe
        restRecipeMockMvc.perform(delete("/api/recipes/{id}", recipe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Recipe> recipeList = recipeRepository.findAll();
        assertThat(recipeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Recipe in Elasticsearch
        verify(mockRecipeSearchRepository, times(1)).deleteById(recipe.getId());
    }

    @Test
    @Transactional
    public void searchRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);
        when(mockRecipeSearchRepository.search(queryStringQuery("id:" + recipe.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(recipe), PageRequest.of(0, 1), 1));
        // Search the recipe
        restRecipeMockMvc.perform(get("/api/_search/recipes?query=id:" + recipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipe.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].preparationTimeMinutes").value(hasItem(DEFAULT_PREPARATION_TIME_MINUTES)))
            .andExpect(jsonPath("$.[*].numberOfPortions").value(hasItem(DEFAULT_NUMBER_OF_PORTIONS.doubleValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].authorId").value(hasItem(DEFAULT_AUTHOR_ID.intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastEditDate").value(hasItem(DEFAULT_LAST_EDIT_DATE.toString())))
            .andExpect(jsonPath("$.[*].isVisible").value(hasItem(DEFAULT_IS_VISIBLE.booleanValue())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE)))
            .andExpect(jsonPath("$.[*].totalGramsWeight").value(hasItem(DEFAULT_TOTAL_GRAMS_WEIGHT.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recipe.class);
        Recipe recipe1 = new Recipe();
        recipe1.setId(1L);
        Recipe recipe2 = new Recipe();
        recipe2.setId(recipe1.getId());
        assertThat(recipe1).isEqualTo(recipe2);
        recipe2.setId(2L);
        assertThat(recipe1).isNotEqualTo(recipe2);
        recipe1.setId(null);
        assertThat(recipe1).isNotEqualTo(recipe2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecipeDTO.class);
        RecipeDTO recipeDTO1 = new RecipeDTO();
        recipeDTO1.setId(1L);
        RecipeDTO recipeDTO2 = new RecipeDTO();
        assertThat(recipeDTO1).isNotEqualTo(recipeDTO2);
        recipeDTO2.setId(recipeDTO1.getId());
        assertThat(recipeDTO1).isEqualTo(recipeDTO2);
        recipeDTO2.setId(2L);
        assertThat(recipeDTO1).isNotEqualTo(recipeDTO2);
        recipeDTO1.setId(null);
        assertThat(recipeDTO1).isNotEqualTo(recipeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(recipeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(recipeMapper.fromId(null)).isNull();
    }
}
