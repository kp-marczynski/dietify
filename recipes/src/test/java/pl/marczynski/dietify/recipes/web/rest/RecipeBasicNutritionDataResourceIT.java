package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData;
import pl.marczynski.dietify.recipes.repository.RecipeBasicNutritionDataRepository;
import pl.marczynski.dietify.recipes.repository.search.RecipeBasicNutritionDataSearchRepository;
import pl.marczynski.dietify.recipes.service.RecipeBasicNutritionDataService;
import pl.marczynski.dietify.recipes.web.rest.errors.ExceptionTranslator;

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

import static pl.marczynski.dietify.recipes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link RecipeBasicNutritionDataResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class RecipeBasicNutritionDataResourceIT {

    private static final Integer DEFAULT_ENERGY = 0;
    private static final Integer UPDATED_ENERGY = 1;

    private static final Integer DEFAULT_PROTEIN = 0;
    private static final Integer UPDATED_PROTEIN = 1;

    private static final Integer DEFAULT_FAT = 0;
    private static final Integer UPDATED_FAT = 1;

    private static final Integer DEFAULT_CARBOHYDRATES = 0;
    private static final Integer UPDATED_CARBOHYDRATES = 1;

    @Autowired
    private RecipeBasicNutritionDataRepository recipeBasicNutritionDataRepository;

    @Autowired
    private RecipeBasicNutritionDataService recipeBasicNutritionDataService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.RecipeBasicNutritionDataSearchRepositoryMockConfiguration
     */
    @Autowired
    private RecipeBasicNutritionDataSearchRepository mockRecipeBasicNutritionDataSearchRepository;

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

    private MockMvc restRecipeBasicNutritionDataMockMvc;

    private RecipeBasicNutritionData recipeBasicNutritionData;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecipeBasicNutritionDataResource recipeBasicNutritionDataResource = new RecipeBasicNutritionDataResource(recipeBasicNutritionDataService);
        this.restRecipeBasicNutritionDataMockMvc = MockMvcBuilders.standaloneSetup(recipeBasicNutritionDataResource)
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
    public static RecipeBasicNutritionData createEntity(EntityManager em) {
        RecipeBasicNutritionData recipeBasicNutritionData = new RecipeBasicNutritionData();
        recipeBasicNutritionData.setEnergy(DEFAULT_ENERGY);
        recipeBasicNutritionData.setProtein(DEFAULT_PROTEIN);
        recipeBasicNutritionData.setFat(DEFAULT_FAT);
        recipeBasicNutritionData.setCarbohydrates(DEFAULT_CARBOHYDRATES);
        return recipeBasicNutritionData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecipeBasicNutritionData createUpdatedEntity(EntityManager em) {
        RecipeBasicNutritionData recipeBasicNutritionData = new RecipeBasicNutritionData();
        recipeBasicNutritionData.setEnergy(UPDATED_ENERGY);
        recipeBasicNutritionData.setProtein(UPDATED_PROTEIN);
        recipeBasicNutritionData.setFat(UPDATED_FAT);
        recipeBasicNutritionData.setCarbohydrates(UPDATED_CARBOHYDRATES);
        return recipeBasicNutritionData;
    }

    @BeforeEach
    public void initTest() {
        recipeBasicNutritionData = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecipeBasicNutritionData() throws Exception {
        int databaseSizeBeforeCreate = recipeBasicNutritionDataRepository.findAll().size();

        // Create the RecipeBasicNutritionData
        restRecipeBasicNutritionDataMockMvc.perform(post("/api/recipe-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeBasicNutritionData)))
            .andExpect(status().isCreated());

        // Validate the RecipeBasicNutritionData in the database
        List<RecipeBasicNutritionData> recipeBasicNutritionDataList = recipeBasicNutritionDataRepository.findAll();
        assertThat(recipeBasicNutritionDataList).hasSize(databaseSizeBeforeCreate + 1);
        RecipeBasicNutritionData testRecipeBasicNutritionData = recipeBasicNutritionDataList.get(recipeBasicNutritionDataList.size() - 1);
        assertThat(testRecipeBasicNutritionData.getEnergy()).isEqualTo(DEFAULT_ENERGY);
        assertThat(testRecipeBasicNutritionData.getProtein()).isEqualTo(DEFAULT_PROTEIN);
        assertThat(testRecipeBasicNutritionData.getFat()).isEqualTo(DEFAULT_FAT);
        assertThat(testRecipeBasicNutritionData.getCarbohydrates()).isEqualTo(DEFAULT_CARBOHYDRATES);

        // Validate the RecipeBasicNutritionData in Elasticsearch
        verify(mockRecipeBasicNutritionDataSearchRepository, times(1)).save(testRecipeBasicNutritionData);
    }

    @Test
    @Transactional
    public void createRecipeBasicNutritionDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipeBasicNutritionDataRepository.findAll().size();

        // Create the RecipeBasicNutritionData with an existing ID
        recipeBasicNutritionData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipeBasicNutritionDataMockMvc.perform(post("/api/recipe-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeBasicNutritionData)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeBasicNutritionData in the database
        List<RecipeBasicNutritionData> recipeBasicNutritionDataList = recipeBasicNutritionDataRepository.findAll();
        assertThat(recipeBasicNutritionDataList).hasSize(databaseSizeBeforeCreate);

        // Validate the RecipeBasicNutritionData in Elasticsearch
        verify(mockRecipeBasicNutritionDataSearchRepository, times(0)).save(recipeBasicNutritionData);
    }


    @Test
    @Transactional
    public void checkEnergyIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeBasicNutritionDataRepository.findAll().size();
        // set the field null
        recipeBasicNutritionData.setEnergy(null);

        // Create the RecipeBasicNutritionData, which fails.

        restRecipeBasicNutritionDataMockMvc.perform(post("/api/recipe-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeBasicNutritionData)))
            .andExpect(status().isBadRequest());

        List<RecipeBasicNutritionData> recipeBasicNutritionDataList = recipeBasicNutritionDataRepository.findAll();
        assertThat(recipeBasicNutritionDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProteinIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeBasicNutritionDataRepository.findAll().size();
        // set the field null
        recipeBasicNutritionData.setProtein(null);

        // Create the RecipeBasicNutritionData, which fails.

        restRecipeBasicNutritionDataMockMvc.perform(post("/api/recipe-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeBasicNutritionData)))
            .andExpect(status().isBadRequest());

        List<RecipeBasicNutritionData> recipeBasicNutritionDataList = recipeBasicNutritionDataRepository.findAll();
        assertThat(recipeBasicNutritionDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFatIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeBasicNutritionDataRepository.findAll().size();
        // set the field null
        recipeBasicNutritionData.setFat(null);

        // Create the RecipeBasicNutritionData, which fails.

        restRecipeBasicNutritionDataMockMvc.perform(post("/api/recipe-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeBasicNutritionData)))
            .andExpect(status().isBadRequest());

        List<RecipeBasicNutritionData> recipeBasicNutritionDataList = recipeBasicNutritionDataRepository.findAll();
        assertThat(recipeBasicNutritionDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCarbohydratesIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeBasicNutritionDataRepository.findAll().size();
        // set the field null
        recipeBasicNutritionData.setCarbohydrates(null);

        // Create the RecipeBasicNutritionData, which fails.

        restRecipeBasicNutritionDataMockMvc.perform(post("/api/recipe-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeBasicNutritionData)))
            .andExpect(status().isBadRequest());

        List<RecipeBasicNutritionData> recipeBasicNutritionDataList = recipeBasicNutritionDataRepository.findAll();
        assertThat(recipeBasicNutritionDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecipeBasicNutritionData() throws Exception {
        // Initialize the database
        recipeBasicNutritionDataRepository.saveAndFlush(recipeBasicNutritionData);

        // Get all the recipeBasicNutritionDataList
        restRecipeBasicNutritionDataMockMvc.perform(get("/api/recipe-basic-nutrition-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeBasicNutritionData.getId().intValue())))
            .andExpect(jsonPath("$.[*].energy").value(hasItem(DEFAULT_ENERGY)))
            .andExpect(jsonPath("$.[*].protein").value(hasItem(DEFAULT_PROTEIN)))
            .andExpect(jsonPath("$.[*].fat").value(hasItem(DEFAULT_FAT)))
            .andExpect(jsonPath("$.[*].carbohydrates").value(hasItem(DEFAULT_CARBOHYDRATES)));
    }
    
    @Test
    @Transactional
    public void getRecipeBasicNutritionData() throws Exception {
        // Initialize the database
        recipeBasicNutritionDataRepository.saveAndFlush(recipeBasicNutritionData);

        // Get the recipeBasicNutritionData
        restRecipeBasicNutritionDataMockMvc.perform(get("/api/recipe-basic-nutrition-data/{id}", recipeBasicNutritionData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recipeBasicNutritionData.getId().intValue()))
            .andExpect(jsonPath("$.energy").value(DEFAULT_ENERGY))
            .andExpect(jsonPath("$.protein").value(DEFAULT_PROTEIN))
            .andExpect(jsonPath("$.fat").value(DEFAULT_FAT))
            .andExpect(jsonPath("$.carbohydrates").value(DEFAULT_CARBOHYDRATES));
    }

    @Test
    @Transactional
    public void getNonExistingRecipeBasicNutritionData() throws Exception {
        // Get the recipeBasicNutritionData
        restRecipeBasicNutritionDataMockMvc.perform(get("/api/recipe-basic-nutrition-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipeBasicNutritionData() throws Exception {
        // Initialize the database
        recipeBasicNutritionDataService.save(recipeBasicNutritionData);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockRecipeBasicNutritionDataSearchRepository);

        int databaseSizeBeforeUpdate = recipeBasicNutritionDataRepository.findAll().size();

        // Update the recipeBasicNutritionData
        RecipeBasicNutritionData updatedRecipeBasicNutritionData = recipeBasicNutritionDataRepository.findById(recipeBasicNutritionData.getId()).get();
        // Disconnect from session so that the updates on updatedRecipeBasicNutritionData are not directly saved in db
        em.detach(updatedRecipeBasicNutritionData);
        updatedRecipeBasicNutritionData.setEnergy(UPDATED_ENERGY);
        updatedRecipeBasicNutritionData.setProtein(UPDATED_PROTEIN);
        updatedRecipeBasicNutritionData.setFat(UPDATED_FAT);
        updatedRecipeBasicNutritionData.setCarbohydrates(UPDATED_CARBOHYDRATES);

        restRecipeBasicNutritionDataMockMvc.perform(put("/api/recipe-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecipeBasicNutritionData)))
            .andExpect(status().isOk());

        // Validate the RecipeBasicNutritionData in the database
        List<RecipeBasicNutritionData> recipeBasicNutritionDataList = recipeBasicNutritionDataRepository.findAll();
        assertThat(recipeBasicNutritionDataList).hasSize(databaseSizeBeforeUpdate);
        RecipeBasicNutritionData testRecipeBasicNutritionData = recipeBasicNutritionDataList.get(recipeBasicNutritionDataList.size() - 1);
        assertThat(testRecipeBasicNutritionData.getEnergy()).isEqualTo(UPDATED_ENERGY);
        assertThat(testRecipeBasicNutritionData.getProtein()).isEqualTo(UPDATED_PROTEIN);
        assertThat(testRecipeBasicNutritionData.getFat()).isEqualTo(UPDATED_FAT);
        assertThat(testRecipeBasicNutritionData.getCarbohydrates()).isEqualTo(UPDATED_CARBOHYDRATES);

        // Validate the RecipeBasicNutritionData in Elasticsearch
        verify(mockRecipeBasicNutritionDataSearchRepository, times(1)).save(testRecipeBasicNutritionData);
    }

    @Test
    @Transactional
    public void updateNonExistingRecipeBasicNutritionData() throws Exception {
        int databaseSizeBeforeUpdate = recipeBasicNutritionDataRepository.findAll().size();

        // Create the RecipeBasicNutritionData

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecipeBasicNutritionDataMockMvc.perform(put("/api/recipe-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeBasicNutritionData)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeBasicNutritionData in the database
        List<RecipeBasicNutritionData> recipeBasicNutritionDataList = recipeBasicNutritionDataRepository.findAll();
        assertThat(recipeBasicNutritionDataList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RecipeBasicNutritionData in Elasticsearch
        verify(mockRecipeBasicNutritionDataSearchRepository, times(0)).save(recipeBasicNutritionData);
    }

    @Test
    @Transactional
    public void deleteRecipeBasicNutritionData() throws Exception {
        // Initialize the database
        recipeBasicNutritionDataService.save(recipeBasicNutritionData);

        int databaseSizeBeforeDelete = recipeBasicNutritionDataRepository.findAll().size();

        // Delete the recipeBasicNutritionData
        restRecipeBasicNutritionDataMockMvc.perform(delete("/api/recipe-basic-nutrition-data/{id}", recipeBasicNutritionData.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RecipeBasicNutritionData> recipeBasicNutritionDataList = recipeBasicNutritionDataRepository.findAll();
        assertThat(recipeBasicNutritionDataList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RecipeBasicNutritionData in Elasticsearch
        verify(mockRecipeBasicNutritionDataSearchRepository, times(1)).deleteById(recipeBasicNutritionData.getId());
    }

    @Test
    @Transactional
    public void searchRecipeBasicNutritionData() throws Exception {
        // Initialize the database
        recipeBasicNutritionDataService.save(recipeBasicNutritionData);
        when(mockRecipeBasicNutritionDataSearchRepository.search(queryStringQuery("id:" + recipeBasicNutritionData.getId())))
            .thenReturn(Collections.singletonList(recipeBasicNutritionData));
        // Search the recipeBasicNutritionData
        restRecipeBasicNutritionDataMockMvc.perform(get("/api/_search/recipe-basic-nutrition-data?query=id:" + recipeBasicNutritionData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeBasicNutritionData.getId().intValue())))
            .andExpect(jsonPath("$.[*].energy").value(hasItem(DEFAULT_ENERGY)))
            .andExpect(jsonPath("$.[*].protein").value(hasItem(DEFAULT_PROTEIN)))
            .andExpect(jsonPath("$.[*].fat").value(hasItem(DEFAULT_FAT)))
            .andExpect(jsonPath("$.[*].carbohydrates").value(hasItem(DEFAULT_CARBOHYDRATES)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecipeBasicNutritionData.class);
        RecipeBasicNutritionData recipeBasicNutritionData1 = new RecipeBasicNutritionData();
        recipeBasicNutritionData1.setId(1L);
        RecipeBasicNutritionData recipeBasicNutritionData2 = new RecipeBasicNutritionData();
        recipeBasicNutritionData2.setId(recipeBasicNutritionData1.getId());
        assertThat(recipeBasicNutritionData1).isEqualTo(recipeBasicNutritionData2);
        recipeBasicNutritionData2.setId(2L);
        assertThat(recipeBasicNutritionData1).isNotEqualTo(recipeBasicNutritionData2);
        recipeBasicNutritionData1.setId(null);
        assertThat(recipeBasicNutritionData1).isNotEqualTo(recipeBasicNutritionData2);
    }
}
