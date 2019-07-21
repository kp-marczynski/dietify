package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.RecipeUnsuitableForDiet;
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.repository.RecipeUnsuitableForDietRepository;
import pl.marczynski.dietify.recipes.repository.search.RecipeUnsuitableForDietSearchRepository;
import pl.marczynski.dietify.recipes.service.RecipeUnsuitableForDietService;
import pl.marczynski.dietify.recipes.service.dto.RecipeUnsuitableForDietDTO;
import pl.marczynski.dietify.recipes.service.mapper.RecipeUnsuitableForDietMapper;
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
 * Integration tests for the {@Link RecipeUnsuitableForDietResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class RecipeUnsuitableForDietResourceIT {

    private static final Long DEFAULT_DIET_TYPE_ID = 1L;
    private static final Long UPDATED_DIET_TYPE_ID = 2L;

    @Autowired
    private RecipeUnsuitableForDietRepository recipeUnsuitableForDietRepository;

    @Autowired
    private RecipeUnsuitableForDietMapper recipeUnsuitableForDietMapper;

    @Autowired
    private RecipeUnsuitableForDietService recipeUnsuitableForDietService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.RecipeUnsuitableForDietSearchRepositoryMockConfiguration
     */
    @Autowired
    private RecipeUnsuitableForDietSearchRepository mockRecipeUnsuitableForDietSearchRepository;

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

    private MockMvc restRecipeUnsuitableForDietMockMvc;

    private RecipeUnsuitableForDiet recipeUnsuitableForDiet;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecipeUnsuitableForDietResource recipeUnsuitableForDietResource = new RecipeUnsuitableForDietResource(recipeUnsuitableForDietService);
        this.restRecipeUnsuitableForDietMockMvc = MockMvcBuilders.standaloneSetup(recipeUnsuitableForDietResource)
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
    public static RecipeUnsuitableForDiet createEntity(EntityManager em) {
        RecipeUnsuitableForDiet recipeUnsuitableForDiet = new RecipeUnsuitableForDiet();
        recipeUnsuitableForDiet.setDietTypeId(DEFAULT_DIET_TYPE_ID);
        // Add required entity
        Recipe recipe;
        if (TestUtil.findAll(em, Recipe.class).isEmpty()) {
            recipe = RecipeResourceIT.createEntity(em);
            em.persist(recipe);
            em.flush();
        } else {
            recipe = TestUtil.findAll(em, Recipe.class).get(0);
        }
        recipeUnsuitableForDiet.setRecipe(recipe);
        return recipeUnsuitableForDiet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecipeUnsuitableForDiet createUpdatedEntity(EntityManager em) {
        RecipeUnsuitableForDiet recipeUnsuitableForDiet = new RecipeUnsuitableForDiet();
        recipeUnsuitableForDiet.setDietTypeId(UPDATED_DIET_TYPE_ID);
        // Add required entity
        Recipe recipe;
        if (TestUtil.findAll(em, Recipe.class).isEmpty()) {
            recipe = RecipeResourceIT.createUpdatedEntity(em);
            em.persist(recipe);
            em.flush();
        } else {
            recipe = TestUtil.findAll(em, Recipe.class).get(0);
        }
        recipeUnsuitableForDiet.setRecipe(recipe);
        return recipeUnsuitableForDiet;
    }

    @BeforeEach
    public void initTest() {
        recipeUnsuitableForDiet = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecipeUnsuitableForDiet() throws Exception {
        int databaseSizeBeforeCreate = recipeUnsuitableForDietRepository.findAll().size();

        // Create the RecipeUnsuitableForDiet
        RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO = recipeUnsuitableForDietMapper.toDto(recipeUnsuitableForDiet);
        restRecipeUnsuitableForDietMockMvc.perform(post("/api/recipe-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeUnsuitableForDietDTO)))
            .andExpect(status().isCreated());

        // Validate the RecipeUnsuitableForDiet in the database
        List<RecipeUnsuitableForDiet> recipeUnsuitableForDietList = recipeUnsuitableForDietRepository.findAll();
        assertThat(recipeUnsuitableForDietList).hasSize(databaseSizeBeforeCreate + 1);
        RecipeUnsuitableForDiet testRecipeUnsuitableForDiet = recipeUnsuitableForDietList.get(recipeUnsuitableForDietList.size() - 1);
        assertThat(testRecipeUnsuitableForDiet.getDietTypeId()).isEqualTo(DEFAULT_DIET_TYPE_ID);

        // Validate the RecipeUnsuitableForDiet in Elasticsearch
        verify(mockRecipeUnsuitableForDietSearchRepository, times(1)).save(testRecipeUnsuitableForDiet);
    }

    @Test
    @Transactional
    public void createRecipeUnsuitableForDietWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipeUnsuitableForDietRepository.findAll().size();

        // Create the RecipeUnsuitableForDiet with an existing ID
        recipeUnsuitableForDiet.setId(1L);
        RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO = recipeUnsuitableForDietMapper.toDto(recipeUnsuitableForDiet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipeUnsuitableForDietMockMvc.perform(post("/api/recipe-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeUnsuitableForDietDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeUnsuitableForDiet in the database
        List<RecipeUnsuitableForDiet> recipeUnsuitableForDietList = recipeUnsuitableForDietRepository.findAll();
        assertThat(recipeUnsuitableForDietList).hasSize(databaseSizeBeforeCreate);

        // Validate the RecipeUnsuitableForDiet in Elasticsearch
        verify(mockRecipeUnsuitableForDietSearchRepository, times(0)).save(recipeUnsuitableForDiet);
    }


    @Test
    @Transactional
    public void checkDietTypeIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeUnsuitableForDietRepository.findAll().size();
        // set the field null
        recipeUnsuitableForDiet.setDietTypeId(null);

        // Create the RecipeUnsuitableForDiet, which fails.
        RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO = recipeUnsuitableForDietMapper.toDto(recipeUnsuitableForDiet);

        restRecipeUnsuitableForDietMockMvc.perform(post("/api/recipe-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeUnsuitableForDietDTO)))
            .andExpect(status().isBadRequest());

        List<RecipeUnsuitableForDiet> recipeUnsuitableForDietList = recipeUnsuitableForDietRepository.findAll();
        assertThat(recipeUnsuitableForDietList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecipeUnsuitableForDiets() throws Exception {
        // Initialize the database
        recipeUnsuitableForDietRepository.saveAndFlush(recipeUnsuitableForDiet);

        // Get all the recipeUnsuitableForDietList
        restRecipeUnsuitableForDietMockMvc.perform(get("/api/recipe-unsuitable-for-diets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeUnsuitableForDiet.getId().intValue())))
            .andExpect(jsonPath("$.[*].dietTypeId").value(hasItem(DEFAULT_DIET_TYPE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getRecipeUnsuitableForDiet() throws Exception {
        // Initialize the database
        recipeUnsuitableForDietRepository.saveAndFlush(recipeUnsuitableForDiet);

        // Get the recipeUnsuitableForDiet
        restRecipeUnsuitableForDietMockMvc.perform(get("/api/recipe-unsuitable-for-diets/{id}", recipeUnsuitableForDiet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recipeUnsuitableForDiet.getId().intValue()))
            .andExpect(jsonPath("$.dietTypeId").value(DEFAULT_DIET_TYPE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRecipeUnsuitableForDiet() throws Exception {
        // Get the recipeUnsuitableForDiet
        restRecipeUnsuitableForDietMockMvc.perform(get("/api/recipe-unsuitable-for-diets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipeUnsuitableForDiet() throws Exception {
        // Initialize the database
        recipeUnsuitableForDietRepository.saveAndFlush(recipeUnsuitableForDiet);

        int databaseSizeBeforeUpdate = recipeUnsuitableForDietRepository.findAll().size();

        // Update the recipeUnsuitableForDiet
        RecipeUnsuitableForDiet updatedRecipeUnsuitableForDiet = recipeUnsuitableForDietRepository.findById(recipeUnsuitableForDiet.getId()).get();
        // Disconnect from session so that the updates on updatedRecipeUnsuitableForDiet are not directly saved in db
        em.detach(updatedRecipeUnsuitableForDiet);
        updatedRecipeUnsuitableForDiet.setDietTypeId(UPDATED_DIET_TYPE_ID);
        RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO = recipeUnsuitableForDietMapper.toDto(updatedRecipeUnsuitableForDiet);

        restRecipeUnsuitableForDietMockMvc.perform(put("/api/recipe-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeUnsuitableForDietDTO)))
            .andExpect(status().isOk());

        // Validate the RecipeUnsuitableForDiet in the database
        List<RecipeUnsuitableForDiet> recipeUnsuitableForDietList = recipeUnsuitableForDietRepository.findAll();
        assertThat(recipeUnsuitableForDietList).hasSize(databaseSizeBeforeUpdate);
        RecipeUnsuitableForDiet testRecipeUnsuitableForDiet = recipeUnsuitableForDietList.get(recipeUnsuitableForDietList.size() - 1);
        assertThat(testRecipeUnsuitableForDiet.getDietTypeId()).isEqualTo(UPDATED_DIET_TYPE_ID);

        // Validate the RecipeUnsuitableForDiet in Elasticsearch
        verify(mockRecipeUnsuitableForDietSearchRepository, times(1)).save(testRecipeUnsuitableForDiet);
    }

    @Test
    @Transactional
    public void updateNonExistingRecipeUnsuitableForDiet() throws Exception {
        int databaseSizeBeforeUpdate = recipeUnsuitableForDietRepository.findAll().size();

        // Create the RecipeUnsuitableForDiet
        RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO = recipeUnsuitableForDietMapper.toDto(recipeUnsuitableForDiet);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecipeUnsuitableForDietMockMvc.perform(put("/api/recipe-unsuitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeUnsuitableForDietDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeUnsuitableForDiet in the database
        List<RecipeUnsuitableForDiet> recipeUnsuitableForDietList = recipeUnsuitableForDietRepository.findAll();
        assertThat(recipeUnsuitableForDietList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RecipeUnsuitableForDiet in Elasticsearch
        verify(mockRecipeUnsuitableForDietSearchRepository, times(0)).save(recipeUnsuitableForDiet);
    }

    @Test
    @Transactional
    public void deleteRecipeUnsuitableForDiet() throws Exception {
        // Initialize the database
        recipeUnsuitableForDietRepository.saveAndFlush(recipeUnsuitableForDiet);

        int databaseSizeBeforeDelete = recipeUnsuitableForDietRepository.findAll().size();

        // Delete the recipeUnsuitableForDiet
        restRecipeUnsuitableForDietMockMvc.perform(delete("/api/recipe-unsuitable-for-diets/{id}", recipeUnsuitableForDiet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RecipeUnsuitableForDiet> recipeUnsuitableForDietList = recipeUnsuitableForDietRepository.findAll();
        assertThat(recipeUnsuitableForDietList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RecipeUnsuitableForDiet in Elasticsearch
        verify(mockRecipeUnsuitableForDietSearchRepository, times(1)).deleteById(recipeUnsuitableForDiet.getId());
    }

    @Test
    @Transactional
    public void searchRecipeUnsuitableForDiet() throws Exception {
        // Initialize the database
        recipeUnsuitableForDietRepository.saveAndFlush(recipeUnsuitableForDiet);
        when(mockRecipeUnsuitableForDietSearchRepository.search(queryStringQuery("id:" + recipeUnsuitableForDiet.getId())))
            .thenReturn(Collections.singletonList(recipeUnsuitableForDiet));
        // Search the recipeUnsuitableForDiet
        restRecipeUnsuitableForDietMockMvc.perform(get("/api/_search/recipe-unsuitable-for-diets?query=id:" + recipeUnsuitableForDiet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeUnsuitableForDiet.getId().intValue())))
            .andExpect(jsonPath("$.[*].dietTypeId").value(hasItem(DEFAULT_DIET_TYPE_ID.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecipeUnsuitableForDiet.class);
        RecipeUnsuitableForDiet recipeUnsuitableForDiet1 = new RecipeUnsuitableForDiet();
        recipeUnsuitableForDiet1.setId(1L);
        RecipeUnsuitableForDiet recipeUnsuitableForDiet2 = new RecipeUnsuitableForDiet();
        recipeUnsuitableForDiet2.setId(recipeUnsuitableForDiet1.getId());
        assertThat(recipeUnsuitableForDiet1).isEqualTo(recipeUnsuitableForDiet2);
        recipeUnsuitableForDiet2.setId(2L);
        assertThat(recipeUnsuitableForDiet1).isNotEqualTo(recipeUnsuitableForDiet2);
        recipeUnsuitableForDiet1.setId(null);
        assertThat(recipeUnsuitableForDiet1).isNotEqualTo(recipeUnsuitableForDiet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecipeUnsuitableForDietDTO.class);
        RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO1 = new RecipeUnsuitableForDietDTO();
        recipeUnsuitableForDietDTO1.setId(1L);
        RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO2 = new RecipeUnsuitableForDietDTO();
        assertThat(recipeUnsuitableForDietDTO1).isNotEqualTo(recipeUnsuitableForDietDTO2);
        recipeUnsuitableForDietDTO2.setId(recipeUnsuitableForDietDTO1.getId());
        assertThat(recipeUnsuitableForDietDTO1).isEqualTo(recipeUnsuitableForDietDTO2);
        recipeUnsuitableForDietDTO2.setId(2L);
        assertThat(recipeUnsuitableForDietDTO1).isNotEqualTo(recipeUnsuitableForDietDTO2);
        recipeUnsuitableForDietDTO1.setId(null);
        assertThat(recipeUnsuitableForDietDTO1).isNotEqualTo(recipeUnsuitableForDietDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(recipeUnsuitableForDietMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(recipeUnsuitableForDietMapper.fromId(null)).isNull();
    }
}
