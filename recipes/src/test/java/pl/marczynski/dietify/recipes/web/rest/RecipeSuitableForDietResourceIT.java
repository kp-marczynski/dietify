package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.RecipeSuitableForDiet;
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.repository.RecipeSuitableForDietRepository;
import pl.marczynski.dietify.recipes.repository.search.RecipeSuitableForDietSearchRepository;
import pl.marczynski.dietify.recipes.service.RecipeSuitableForDietService;
import pl.marczynski.dietify.recipes.service.dto.RecipeSuitableForDietDTO;
import pl.marczynski.dietify.recipes.service.mapper.RecipeSuitableForDietMapper;
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
 * Integration tests for the {@Link RecipeSuitableForDietResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class RecipeSuitableForDietResourceIT {

    private static final Long DEFAULT_DIET_TYPE_ID = 1L;
    private static final Long UPDATED_DIET_TYPE_ID = 2L;

    @Autowired
    private RecipeSuitableForDietRepository recipeSuitableForDietRepository;

    @Autowired
    private RecipeSuitableForDietMapper recipeSuitableForDietMapper;

    @Autowired
    private RecipeSuitableForDietService recipeSuitableForDietService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.RecipeSuitableForDietSearchRepositoryMockConfiguration
     */
    @Autowired
    private RecipeSuitableForDietSearchRepository mockRecipeSuitableForDietSearchRepository;

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

    private MockMvc restRecipeSuitableForDietMockMvc;

    private RecipeSuitableForDiet recipeSuitableForDiet;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecipeSuitableForDietResource recipeSuitableForDietResource = new RecipeSuitableForDietResource(recipeSuitableForDietService);
        this.restRecipeSuitableForDietMockMvc = MockMvcBuilders.standaloneSetup(recipeSuitableForDietResource)
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
    public static RecipeSuitableForDiet createEntity(EntityManager em) {
        RecipeSuitableForDiet recipeSuitableForDiet = new RecipeSuitableForDiet();
        recipeSuitableForDiet.setDietTypeId(DEFAULT_DIET_TYPE_ID);
        // Add required entity
        Recipe recipe;
        if (TestUtil.findAll(em, Recipe.class).isEmpty()) {
            recipe = RecipeResourceIT.createEntity(em);
            em.persist(recipe);
            em.flush();
        } else {
            recipe = TestUtil.findAll(em, Recipe.class).get(0);
        }
        recipeSuitableForDiet.setRecipe(recipe);
        return recipeSuitableForDiet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecipeSuitableForDiet createUpdatedEntity(EntityManager em) {
        RecipeSuitableForDiet recipeSuitableForDiet = new RecipeSuitableForDiet();
        recipeSuitableForDiet.setDietTypeId(UPDATED_DIET_TYPE_ID);
        // Add required entity
        Recipe recipe;
        if (TestUtil.findAll(em, Recipe.class).isEmpty()) {
            recipe = RecipeResourceIT.createUpdatedEntity(em);
            em.persist(recipe);
            em.flush();
        } else {
            recipe = TestUtil.findAll(em, Recipe.class).get(0);
        }
        recipeSuitableForDiet.setRecipe(recipe);
        return recipeSuitableForDiet;
    }

    @BeforeEach
    public void initTest() {
        recipeSuitableForDiet = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecipeSuitableForDiet() throws Exception {
        int databaseSizeBeforeCreate = recipeSuitableForDietRepository.findAll().size();

        // Create the RecipeSuitableForDiet
        RecipeSuitableForDietDTO recipeSuitableForDietDTO = recipeSuitableForDietMapper.toDto(recipeSuitableForDiet);
        restRecipeSuitableForDietMockMvc.perform(post("/api/recipe-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeSuitableForDietDTO)))
            .andExpect(status().isCreated());

        // Validate the RecipeSuitableForDiet in the database
        List<RecipeSuitableForDiet> recipeSuitableForDietList = recipeSuitableForDietRepository.findAll();
        assertThat(recipeSuitableForDietList).hasSize(databaseSizeBeforeCreate + 1);
        RecipeSuitableForDiet testRecipeSuitableForDiet = recipeSuitableForDietList.get(recipeSuitableForDietList.size() - 1);
        assertThat(testRecipeSuitableForDiet.getDietTypeId()).isEqualTo(DEFAULT_DIET_TYPE_ID);

        // Validate the RecipeSuitableForDiet in Elasticsearch
        verify(mockRecipeSuitableForDietSearchRepository, times(1)).save(testRecipeSuitableForDiet);
    }

    @Test
    @Transactional
    public void createRecipeSuitableForDietWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipeSuitableForDietRepository.findAll().size();

        // Create the RecipeSuitableForDiet with an existing ID
        recipeSuitableForDiet.setId(1L);
        RecipeSuitableForDietDTO recipeSuitableForDietDTO = recipeSuitableForDietMapper.toDto(recipeSuitableForDiet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipeSuitableForDietMockMvc.perform(post("/api/recipe-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeSuitableForDietDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeSuitableForDiet in the database
        List<RecipeSuitableForDiet> recipeSuitableForDietList = recipeSuitableForDietRepository.findAll();
        assertThat(recipeSuitableForDietList).hasSize(databaseSizeBeforeCreate);

        // Validate the RecipeSuitableForDiet in Elasticsearch
        verify(mockRecipeSuitableForDietSearchRepository, times(0)).save(recipeSuitableForDiet);
    }


    @Test
    @Transactional
    public void checkDietTypeIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipeSuitableForDietRepository.findAll().size();
        // set the field null
        recipeSuitableForDiet.setDietTypeId(null);

        // Create the RecipeSuitableForDiet, which fails.
        RecipeSuitableForDietDTO recipeSuitableForDietDTO = recipeSuitableForDietMapper.toDto(recipeSuitableForDiet);

        restRecipeSuitableForDietMockMvc.perform(post("/api/recipe-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeSuitableForDietDTO)))
            .andExpect(status().isBadRequest());

        List<RecipeSuitableForDiet> recipeSuitableForDietList = recipeSuitableForDietRepository.findAll();
        assertThat(recipeSuitableForDietList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecipeSuitableForDiets() throws Exception {
        // Initialize the database
        recipeSuitableForDietRepository.saveAndFlush(recipeSuitableForDiet);

        // Get all the recipeSuitableForDietList
        restRecipeSuitableForDietMockMvc.perform(get("/api/recipe-suitable-for-diets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeSuitableForDiet.getId().intValue())))
            .andExpect(jsonPath("$.[*].dietTypeId").value(hasItem(DEFAULT_DIET_TYPE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getRecipeSuitableForDiet() throws Exception {
        // Initialize the database
        recipeSuitableForDietRepository.saveAndFlush(recipeSuitableForDiet);

        // Get the recipeSuitableForDiet
        restRecipeSuitableForDietMockMvc.perform(get("/api/recipe-suitable-for-diets/{id}", recipeSuitableForDiet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recipeSuitableForDiet.getId().intValue()))
            .andExpect(jsonPath("$.dietTypeId").value(DEFAULT_DIET_TYPE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRecipeSuitableForDiet() throws Exception {
        // Get the recipeSuitableForDiet
        restRecipeSuitableForDietMockMvc.perform(get("/api/recipe-suitable-for-diets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipeSuitableForDiet() throws Exception {
        // Initialize the database
        recipeSuitableForDietRepository.saveAndFlush(recipeSuitableForDiet);

        int databaseSizeBeforeUpdate = recipeSuitableForDietRepository.findAll().size();

        // Update the recipeSuitableForDiet
        RecipeSuitableForDiet updatedRecipeSuitableForDiet = recipeSuitableForDietRepository.findById(recipeSuitableForDiet.getId()).get();
        // Disconnect from session so that the updates on updatedRecipeSuitableForDiet are not directly saved in db
        em.detach(updatedRecipeSuitableForDiet);
        updatedRecipeSuitableForDiet.setDietTypeId(UPDATED_DIET_TYPE_ID);
        RecipeSuitableForDietDTO recipeSuitableForDietDTO = recipeSuitableForDietMapper.toDto(updatedRecipeSuitableForDiet);

        restRecipeSuitableForDietMockMvc.perform(put("/api/recipe-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeSuitableForDietDTO)))
            .andExpect(status().isOk());

        // Validate the RecipeSuitableForDiet in the database
        List<RecipeSuitableForDiet> recipeSuitableForDietList = recipeSuitableForDietRepository.findAll();
        assertThat(recipeSuitableForDietList).hasSize(databaseSizeBeforeUpdate);
        RecipeSuitableForDiet testRecipeSuitableForDiet = recipeSuitableForDietList.get(recipeSuitableForDietList.size() - 1);
        assertThat(testRecipeSuitableForDiet.getDietTypeId()).isEqualTo(UPDATED_DIET_TYPE_ID);

        // Validate the RecipeSuitableForDiet in Elasticsearch
        verify(mockRecipeSuitableForDietSearchRepository, times(1)).save(testRecipeSuitableForDiet);
    }

    @Test
    @Transactional
    public void updateNonExistingRecipeSuitableForDiet() throws Exception {
        int databaseSizeBeforeUpdate = recipeSuitableForDietRepository.findAll().size();

        // Create the RecipeSuitableForDiet
        RecipeSuitableForDietDTO recipeSuitableForDietDTO = recipeSuitableForDietMapper.toDto(recipeSuitableForDiet);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecipeSuitableForDietMockMvc.perform(put("/api/recipe-suitable-for-diets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeSuitableForDietDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeSuitableForDiet in the database
        List<RecipeSuitableForDiet> recipeSuitableForDietList = recipeSuitableForDietRepository.findAll();
        assertThat(recipeSuitableForDietList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RecipeSuitableForDiet in Elasticsearch
        verify(mockRecipeSuitableForDietSearchRepository, times(0)).save(recipeSuitableForDiet);
    }

    @Test
    @Transactional
    public void deleteRecipeSuitableForDiet() throws Exception {
        // Initialize the database
        recipeSuitableForDietRepository.saveAndFlush(recipeSuitableForDiet);

        int databaseSizeBeforeDelete = recipeSuitableForDietRepository.findAll().size();

        // Delete the recipeSuitableForDiet
        restRecipeSuitableForDietMockMvc.perform(delete("/api/recipe-suitable-for-diets/{id}", recipeSuitableForDiet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RecipeSuitableForDiet> recipeSuitableForDietList = recipeSuitableForDietRepository.findAll();
        assertThat(recipeSuitableForDietList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RecipeSuitableForDiet in Elasticsearch
        verify(mockRecipeSuitableForDietSearchRepository, times(1)).deleteById(recipeSuitableForDiet.getId());
    }

    @Test
    @Transactional
    public void searchRecipeSuitableForDiet() throws Exception {
        // Initialize the database
        recipeSuitableForDietRepository.saveAndFlush(recipeSuitableForDiet);
        when(mockRecipeSuitableForDietSearchRepository.search(queryStringQuery("id:" + recipeSuitableForDiet.getId())))
            .thenReturn(Collections.singletonList(recipeSuitableForDiet));
        // Search the recipeSuitableForDiet
        restRecipeSuitableForDietMockMvc.perform(get("/api/_search/recipe-suitable-for-diets?query=id:" + recipeSuitableForDiet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeSuitableForDiet.getId().intValue())))
            .andExpect(jsonPath("$.[*].dietTypeId").value(hasItem(DEFAULT_DIET_TYPE_ID.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecipeSuitableForDiet.class);
        RecipeSuitableForDiet recipeSuitableForDiet1 = new RecipeSuitableForDiet();
        recipeSuitableForDiet1.setId(1L);
        RecipeSuitableForDiet recipeSuitableForDiet2 = new RecipeSuitableForDiet();
        recipeSuitableForDiet2.setId(recipeSuitableForDiet1.getId());
        assertThat(recipeSuitableForDiet1).isEqualTo(recipeSuitableForDiet2);
        recipeSuitableForDiet2.setId(2L);
        assertThat(recipeSuitableForDiet1).isNotEqualTo(recipeSuitableForDiet2);
        recipeSuitableForDiet1.setId(null);
        assertThat(recipeSuitableForDiet1).isNotEqualTo(recipeSuitableForDiet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecipeSuitableForDietDTO.class);
        RecipeSuitableForDietDTO recipeSuitableForDietDTO1 = new RecipeSuitableForDietDTO();
        recipeSuitableForDietDTO1.setId(1L);
        RecipeSuitableForDietDTO recipeSuitableForDietDTO2 = new RecipeSuitableForDietDTO();
        assertThat(recipeSuitableForDietDTO1).isNotEqualTo(recipeSuitableForDietDTO2);
        recipeSuitableForDietDTO2.setId(recipeSuitableForDietDTO1.getId());
        assertThat(recipeSuitableForDietDTO1).isEqualTo(recipeSuitableForDietDTO2);
        recipeSuitableForDietDTO2.setId(2L);
        assertThat(recipeSuitableForDietDTO1).isNotEqualTo(recipeSuitableForDietDTO2);
        recipeSuitableForDietDTO1.setId(null);
        assertThat(recipeSuitableForDietDTO1).isNotEqualTo(recipeSuitableForDietDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(recipeSuitableForDietMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(recipeSuitableForDietMapper.fromId(null)).isNull();
    }
}
