package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.DishTypeTranslation;
import pl.marczynski.dietify.recipes.domain.DishType;
import pl.marczynski.dietify.recipes.repository.DishTypeTranslationRepository;
import pl.marczynski.dietify.recipes.repository.search.DishTypeTranslationSearchRepository;
import pl.marczynski.dietify.recipes.service.DishTypeTranslationService;
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
 * Integration tests for the {@Link DishTypeTranslationResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class DishTypeTranslationResourceIT {

    private static final String DEFAULT_TRANSLATION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSLATION = "BBBBBBBBBB";

    private static final String DEFAULT_LANGUAGE = "AA";
    private static final String UPDATED_LANGUAGE = "BB";

    @Autowired
    private DishTypeTranslationRepository dishTypeTranslationRepository;

    @Autowired
    private DishTypeTranslationService dishTypeTranslationService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.DishTypeTranslationSearchRepositoryMockConfiguration
     */
    @Autowired
    private DishTypeTranslationSearchRepository mockDishTypeTranslationSearchRepository;

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

    private MockMvc restDishTypeTranslationMockMvc;

    private DishTypeTranslation dishTypeTranslation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DishTypeTranslationResource dishTypeTranslationResource = new DishTypeTranslationResource(dishTypeTranslationService);
        this.restDishTypeTranslationMockMvc = MockMvcBuilders.standaloneSetup(dishTypeTranslationResource)
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
    public static DishTypeTranslation createEntity(EntityManager em) {
        DishTypeTranslation dishTypeTranslation = new DishTypeTranslation();
        dishTypeTranslation.setTranslation(DEFAULT_TRANSLATION);
        dishTypeTranslation.setLanguage(DEFAULT_LANGUAGE);
        // Add required entity
        DishType dishType;
        if (TestUtil.findAll(em, DishType.class).isEmpty()) {
            dishType = DishTypeResourceIT.createEntity(em);
            em.persist(dishType);
            em.flush();
        } else {
            dishType = TestUtil.findAll(em, DishType.class).get(0);
        }
        dishTypeTranslation.setDishType(dishType);
        return dishTypeTranslation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DishTypeTranslation createUpdatedEntity(EntityManager em) {
        DishTypeTranslation dishTypeTranslation = new DishTypeTranslation();
        dishTypeTranslation.setTranslation(UPDATED_TRANSLATION);
        dishTypeTranslation.setLanguage(UPDATED_LANGUAGE);
        // Add required entity
        DishType dishType;
        if (TestUtil.findAll(em, DishType.class).isEmpty()) {
            dishType = DishTypeResourceIT.createUpdatedEntity(em);
            em.persist(dishType);
            em.flush();
        } else {
            dishType = TestUtil.findAll(em, DishType.class).get(0);
        }
        dishTypeTranslation.setDishType(dishType);
        return dishTypeTranslation;
    }

    @BeforeEach
    public void initTest() {
        dishTypeTranslation = createEntity(em);
    }

    @Test
    @Transactional
    public void createDishTypeTranslation() throws Exception {
        int databaseSizeBeforeCreate = dishTypeTranslationRepository.findAll().size();

        // Create the DishTypeTranslation
        restDishTypeTranslationMockMvc.perform(post("/api/dish-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishTypeTranslation)))
            .andExpect(status().isCreated());

        // Validate the DishTypeTranslation in the database
        List<DishTypeTranslation> dishTypeTranslationList = dishTypeTranslationRepository.findAll();
        assertThat(dishTypeTranslationList).hasSize(databaseSizeBeforeCreate + 1);
        DishTypeTranslation testDishTypeTranslation = dishTypeTranslationList.get(dishTypeTranslationList.size() - 1);
        assertThat(testDishTypeTranslation.getTranslation()).isEqualTo(DEFAULT_TRANSLATION);
        assertThat(testDishTypeTranslation.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);

        // Validate the DishTypeTranslation in Elasticsearch
        verify(mockDishTypeTranslationSearchRepository, times(1)).save(testDishTypeTranslation);
    }

    @Test
    @Transactional
    public void createDishTypeTranslationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dishTypeTranslationRepository.findAll().size();

        // Create the DishTypeTranslation with an existing ID
        dishTypeTranslation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDishTypeTranslationMockMvc.perform(post("/api/dish-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishTypeTranslation)))
            .andExpect(status().isBadRequest());

        // Validate the DishTypeTranslation in the database
        List<DishTypeTranslation> dishTypeTranslationList = dishTypeTranslationRepository.findAll();
        assertThat(dishTypeTranslationList).hasSize(databaseSizeBeforeCreate);

        // Validate the DishTypeTranslation in Elasticsearch
        verify(mockDishTypeTranslationSearchRepository, times(0)).save(dishTypeTranslation);
    }


    @Test
    @Transactional
    public void checkTranslationIsRequired() throws Exception {
        int databaseSizeBeforeTest = dishTypeTranslationRepository.findAll().size();
        // set the field null
        dishTypeTranslation.setTranslation(null);

        // Create the DishTypeTranslation, which fails.

        restDishTypeTranslationMockMvc.perform(post("/api/dish-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishTypeTranslation)))
            .andExpect(status().isBadRequest());

        List<DishTypeTranslation> dishTypeTranslationList = dishTypeTranslationRepository.findAll();
        assertThat(dishTypeTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = dishTypeTranslationRepository.findAll().size();
        // set the field null
        dishTypeTranslation.setLanguage(null);

        // Create the DishTypeTranslation, which fails.

        restDishTypeTranslationMockMvc.perform(post("/api/dish-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishTypeTranslation)))
            .andExpect(status().isBadRequest());

        List<DishTypeTranslation> dishTypeTranslationList = dishTypeTranslationRepository.findAll();
        assertThat(dishTypeTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDishTypeTranslations() throws Exception {
        // Initialize the database
        dishTypeTranslationRepository.saveAndFlush(dishTypeTranslation);

        // Get all the dishTypeTranslationList
        restDishTypeTranslationMockMvc.perform(get("/api/dish-type-translations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dishTypeTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getDishTypeTranslation() throws Exception {
        // Initialize the database
        dishTypeTranslationRepository.saveAndFlush(dishTypeTranslation);

        // Get the dishTypeTranslation
        restDishTypeTranslationMockMvc.perform(get("/api/dish-type-translations/{id}", dishTypeTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dishTypeTranslation.getId().intValue()))
            .andExpect(jsonPath("$.translation").value(DEFAULT_TRANSLATION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDishTypeTranslation() throws Exception {
        // Get the dishTypeTranslation
        restDishTypeTranslationMockMvc.perform(get("/api/dish-type-translations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDishTypeTranslation() throws Exception {
        // Initialize the database
        dishTypeTranslationService.save(dishTypeTranslation);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockDishTypeTranslationSearchRepository);

        int databaseSizeBeforeUpdate = dishTypeTranslationRepository.findAll().size();

        // Update the dishTypeTranslation
        DishTypeTranslation updatedDishTypeTranslation = dishTypeTranslationRepository.findById(dishTypeTranslation.getId()).get();
        // Disconnect from session so that the updates on updatedDishTypeTranslation are not directly saved in db
        em.detach(updatedDishTypeTranslation);
        updatedDishTypeTranslation.setTranslation(UPDATED_TRANSLATION);
        updatedDishTypeTranslation.setLanguage(UPDATED_LANGUAGE);

        restDishTypeTranslationMockMvc.perform(put("/api/dish-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDishTypeTranslation)))
            .andExpect(status().isOk());

        // Validate the DishTypeTranslation in the database
        List<DishTypeTranslation> dishTypeTranslationList = dishTypeTranslationRepository.findAll();
        assertThat(dishTypeTranslationList).hasSize(databaseSizeBeforeUpdate);
        DishTypeTranslation testDishTypeTranslation = dishTypeTranslationList.get(dishTypeTranslationList.size() - 1);
        assertThat(testDishTypeTranslation.getTranslation()).isEqualTo(UPDATED_TRANSLATION);
        assertThat(testDishTypeTranslation.getLanguage()).isEqualTo(UPDATED_LANGUAGE);

        // Validate the DishTypeTranslation in Elasticsearch
        verify(mockDishTypeTranslationSearchRepository, times(1)).save(testDishTypeTranslation);
    }

    @Test
    @Transactional
    public void updateNonExistingDishTypeTranslation() throws Exception {
        int databaseSizeBeforeUpdate = dishTypeTranslationRepository.findAll().size();

        // Create the DishTypeTranslation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDishTypeTranslationMockMvc.perform(put("/api/dish-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishTypeTranslation)))
            .andExpect(status().isBadRequest());

        // Validate the DishTypeTranslation in the database
        List<DishTypeTranslation> dishTypeTranslationList = dishTypeTranslationRepository.findAll();
        assertThat(dishTypeTranslationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DishTypeTranslation in Elasticsearch
        verify(mockDishTypeTranslationSearchRepository, times(0)).save(dishTypeTranslation);
    }

    @Test
    @Transactional
    public void deleteDishTypeTranslation() throws Exception {
        // Initialize the database
        dishTypeTranslationService.save(dishTypeTranslation);

        int databaseSizeBeforeDelete = dishTypeTranslationRepository.findAll().size();

        // Delete the dishTypeTranslation
        restDishTypeTranslationMockMvc.perform(delete("/api/dish-type-translations/{id}", dishTypeTranslation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DishTypeTranslation> dishTypeTranslationList = dishTypeTranslationRepository.findAll();
        assertThat(dishTypeTranslationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DishTypeTranslation in Elasticsearch
        verify(mockDishTypeTranslationSearchRepository, times(1)).deleteById(dishTypeTranslation.getId());
    }

    @Test
    @Transactional
    public void searchDishTypeTranslation() throws Exception {
        // Initialize the database
        dishTypeTranslationService.save(dishTypeTranslation);
        when(mockDishTypeTranslationSearchRepository.search(queryStringQuery("id:" + dishTypeTranslation.getId())))
            .thenReturn(Collections.singletonList(dishTypeTranslation));
        // Search the dishTypeTranslation
        restDishTypeTranslationMockMvc.perform(get("/api/_search/dish-type-translations?query=id:" + dishTypeTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dishTypeTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DishTypeTranslation.class);
        DishTypeTranslation dishTypeTranslation1 = new DishTypeTranslation();
        dishTypeTranslation1.setId(1L);
        DishTypeTranslation dishTypeTranslation2 = new DishTypeTranslation();
        dishTypeTranslation2.setId(dishTypeTranslation1.getId());
        assertThat(dishTypeTranslation1).isEqualTo(dishTypeTranslation2);
        dishTypeTranslation2.setId(2L);
        assertThat(dishTypeTranslation1).isNotEqualTo(dishTypeTranslation2);
        dishTypeTranslation1.setId(null);
        assertThat(dishTypeTranslation1).isNotEqualTo(dishTypeTranslation2);
    }
}
