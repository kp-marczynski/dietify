package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.ProductsApp;
import pl.marczynski.dietify.products.domain.NutritionDefinitionTranslation;
import pl.marczynski.dietify.products.domain.NutritionDefinition;
import pl.marczynski.dietify.products.repository.NutritionDefinitionTranslationRepository;
import pl.marczynski.dietify.products.repository.search.NutritionDefinitionTranslationSearchRepository;
import pl.marczynski.dietify.products.service.NutritionDefinitionTranslationService;
import pl.marczynski.dietify.products.web.rest.errors.ExceptionTranslator;

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

import static pl.marczynski.dietify.products.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link NutritionDefinitionTranslationResource} REST controller.
 */
@SpringBootTest(classes = ProductsApp.class)
public class NutritionDefinitionTranslationResourceIT {

    private static final String DEFAULT_TRANSLATION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSLATION = "BBBBBBBBBB";

    private static final String DEFAULT_LANGUAGE = "AA";
    private static final String UPDATED_LANGUAGE = "BB";

    @Autowired
    private NutritionDefinitionTranslationRepository nutritionDefinitionTranslationRepository;

    @Autowired
    private NutritionDefinitionTranslationService nutritionDefinitionTranslationService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.products.repository.search test package.
     *
     * @see pl.marczynski.dietify.products.repository.search.NutritionDefinitionTranslationSearchRepositoryMockConfiguration
     */
    @Autowired
    private NutritionDefinitionTranslationSearchRepository mockNutritionDefinitionTranslationSearchRepository;

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

    private MockMvc restNutritionDefinitionTranslationMockMvc;

    private NutritionDefinitionTranslation nutritionDefinitionTranslation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NutritionDefinitionTranslationResource nutritionDefinitionTranslationResource = new NutritionDefinitionTranslationResource(nutritionDefinitionTranslationService);
        this.restNutritionDefinitionTranslationMockMvc = MockMvcBuilders.standaloneSetup(nutritionDefinitionTranslationResource)
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
    public static NutritionDefinitionTranslation createEntity(EntityManager em) {
        NutritionDefinitionTranslation nutritionDefinitionTranslation = new NutritionDefinitionTranslation();
        nutritionDefinitionTranslation.setTranslation(DEFAULT_TRANSLATION);
        nutritionDefinitionTranslation.setLanguage(DEFAULT_LANGUAGE);
        // Add required entity
        NutritionDefinition nutritionDefinition;
        if (TestUtil.findAll(em, NutritionDefinition.class).isEmpty()) {
            nutritionDefinition = NutritionDefinitionResourceIT.createEntity(em);
            em.persist(nutritionDefinition);
            em.flush();
        } else {
            nutritionDefinition = TestUtil.findAll(em, NutritionDefinition.class).get(0);
        }
        nutritionDefinitionTranslation.setNutritionDefinition(nutritionDefinition);
        return nutritionDefinitionTranslation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NutritionDefinitionTranslation createUpdatedEntity(EntityManager em) {
        NutritionDefinitionTranslation nutritionDefinitionTranslation = new NutritionDefinitionTranslation();
        nutritionDefinitionTranslation.setTranslation(UPDATED_TRANSLATION);
        nutritionDefinitionTranslation.setLanguage(UPDATED_LANGUAGE);
        // Add required entity
        NutritionDefinition nutritionDefinition;
        if (TestUtil.findAll(em, NutritionDefinition.class).isEmpty()) {
            nutritionDefinition = NutritionDefinitionResourceIT.createUpdatedEntity(em);
            em.persist(nutritionDefinition);
            em.flush();
        } else {
            nutritionDefinition = TestUtil.findAll(em, NutritionDefinition.class).get(0);
        }
        nutritionDefinitionTranslation.setNutritionDefinition(nutritionDefinition);
        return nutritionDefinitionTranslation;
    }

    @BeforeEach
    public void initTest() {
        nutritionDefinitionTranslation = createEntity(em);
    }

    @Test
    @Transactional
    public void createNutritionDefinitionTranslation() throws Exception {
        int databaseSizeBeforeCreate = nutritionDefinitionTranslationRepository.findAll().size();

        // Create the NutritionDefinitionTranslation
        restNutritionDefinitionTranslationMockMvc.perform(post("/api/nutrition-definition-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinitionTranslation)))
            .andExpect(status().isCreated());

        // Validate the NutritionDefinitionTranslation in the database
        List<NutritionDefinitionTranslation> nutritionDefinitionTranslationList = nutritionDefinitionTranslationRepository.findAll();
        assertThat(nutritionDefinitionTranslationList).hasSize(databaseSizeBeforeCreate + 1);
        NutritionDefinitionTranslation testNutritionDefinitionTranslation = nutritionDefinitionTranslationList.get(nutritionDefinitionTranslationList.size() - 1);
        assertThat(testNutritionDefinitionTranslation.getTranslation()).isEqualTo(DEFAULT_TRANSLATION);
        assertThat(testNutritionDefinitionTranslation.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);

        // Validate the NutritionDefinitionTranslation in Elasticsearch
        verify(mockNutritionDefinitionTranslationSearchRepository, times(1)).save(testNutritionDefinitionTranslation);
    }

    @Test
    @Transactional
    public void createNutritionDefinitionTranslationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nutritionDefinitionTranslationRepository.findAll().size();

        // Create the NutritionDefinitionTranslation with an existing ID
        nutritionDefinitionTranslation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNutritionDefinitionTranslationMockMvc.perform(post("/api/nutrition-definition-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinitionTranslation)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionDefinitionTranslation in the database
        List<NutritionDefinitionTranslation> nutritionDefinitionTranslationList = nutritionDefinitionTranslationRepository.findAll();
        assertThat(nutritionDefinitionTranslationList).hasSize(databaseSizeBeforeCreate);

        // Validate the NutritionDefinitionTranslation in Elasticsearch
        verify(mockNutritionDefinitionTranslationSearchRepository, times(0)).save(nutritionDefinitionTranslation);
    }


    @Test
    @Transactional
    public void checkTranslationIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionTranslationRepository.findAll().size();
        // set the field null
        nutritionDefinitionTranslation.setTranslation(null);

        // Create the NutritionDefinitionTranslation, which fails.

        restNutritionDefinitionTranslationMockMvc.perform(post("/api/nutrition-definition-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinitionTranslation)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinitionTranslation> nutritionDefinitionTranslationList = nutritionDefinitionTranslationRepository.findAll();
        assertThat(nutritionDefinitionTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionTranslationRepository.findAll().size();
        // set the field null
        nutritionDefinitionTranslation.setLanguage(null);

        // Create the NutritionDefinitionTranslation, which fails.

        restNutritionDefinitionTranslationMockMvc.perform(post("/api/nutrition-definition-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinitionTranslation)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinitionTranslation> nutritionDefinitionTranslationList = nutritionDefinitionTranslationRepository.findAll();
        assertThat(nutritionDefinitionTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNutritionDefinitionTranslations() throws Exception {
        // Initialize the database
        nutritionDefinitionTranslationRepository.saveAndFlush(nutritionDefinitionTranslation);

        // Get all the nutritionDefinitionTranslationList
        restNutritionDefinitionTranslationMockMvc.perform(get("/api/nutrition-definition-translations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutritionDefinitionTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getNutritionDefinitionTranslation() throws Exception {
        // Initialize the database
        nutritionDefinitionTranslationRepository.saveAndFlush(nutritionDefinitionTranslation);

        // Get the nutritionDefinitionTranslation
        restNutritionDefinitionTranslationMockMvc.perform(get("/api/nutrition-definition-translations/{id}", nutritionDefinitionTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nutritionDefinitionTranslation.getId().intValue()))
            .andExpect(jsonPath("$.translation").value(DEFAULT_TRANSLATION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNutritionDefinitionTranslation() throws Exception {
        // Get the nutritionDefinitionTranslation
        restNutritionDefinitionTranslationMockMvc.perform(get("/api/nutrition-definition-translations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNutritionDefinitionTranslation() throws Exception {
        // Initialize the database
        nutritionDefinitionTranslationService.save(nutritionDefinitionTranslation);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockNutritionDefinitionTranslationSearchRepository);

        int databaseSizeBeforeUpdate = nutritionDefinitionTranslationRepository.findAll().size();

        // Update the nutritionDefinitionTranslation
        NutritionDefinitionTranslation updatedNutritionDefinitionTranslation = nutritionDefinitionTranslationRepository.findById(nutritionDefinitionTranslation.getId()).get();
        // Disconnect from session so that the updates on updatedNutritionDefinitionTranslation are not directly saved in db
        em.detach(updatedNutritionDefinitionTranslation);
        updatedNutritionDefinitionTranslation.setTranslation(UPDATED_TRANSLATION);
        updatedNutritionDefinitionTranslation.setLanguage(UPDATED_LANGUAGE);

        restNutritionDefinitionTranslationMockMvc.perform(put("/api/nutrition-definition-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNutritionDefinitionTranslation)))
            .andExpect(status().isOk());

        // Validate the NutritionDefinitionTranslation in the database
        List<NutritionDefinitionTranslation> nutritionDefinitionTranslationList = nutritionDefinitionTranslationRepository.findAll();
        assertThat(nutritionDefinitionTranslationList).hasSize(databaseSizeBeforeUpdate);
        NutritionDefinitionTranslation testNutritionDefinitionTranslation = nutritionDefinitionTranslationList.get(nutritionDefinitionTranslationList.size() - 1);
        assertThat(testNutritionDefinitionTranslation.getTranslation()).isEqualTo(UPDATED_TRANSLATION);
        assertThat(testNutritionDefinitionTranslation.getLanguage()).isEqualTo(UPDATED_LANGUAGE);

        // Validate the NutritionDefinitionTranslation in Elasticsearch
        verify(mockNutritionDefinitionTranslationSearchRepository, times(1)).save(testNutritionDefinitionTranslation);
    }

    @Test
    @Transactional
    public void updateNonExistingNutritionDefinitionTranslation() throws Exception {
        int databaseSizeBeforeUpdate = nutritionDefinitionTranslationRepository.findAll().size();

        // Create the NutritionDefinitionTranslation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutritionDefinitionTranslationMockMvc.perform(put("/api/nutrition-definition-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinitionTranslation)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionDefinitionTranslation in the database
        List<NutritionDefinitionTranslation> nutritionDefinitionTranslationList = nutritionDefinitionTranslationRepository.findAll();
        assertThat(nutritionDefinitionTranslationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NutritionDefinitionTranslation in Elasticsearch
        verify(mockNutritionDefinitionTranslationSearchRepository, times(0)).save(nutritionDefinitionTranslation);
    }

    @Test
    @Transactional
    public void deleteNutritionDefinitionTranslation() throws Exception {
        // Initialize the database
        nutritionDefinitionTranslationService.save(nutritionDefinitionTranslation);

        int databaseSizeBeforeDelete = nutritionDefinitionTranslationRepository.findAll().size();

        // Delete the nutritionDefinitionTranslation
        restNutritionDefinitionTranslationMockMvc.perform(delete("/api/nutrition-definition-translations/{id}", nutritionDefinitionTranslation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NutritionDefinitionTranslation> nutritionDefinitionTranslationList = nutritionDefinitionTranslationRepository.findAll();
        assertThat(nutritionDefinitionTranslationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NutritionDefinitionTranslation in Elasticsearch
        verify(mockNutritionDefinitionTranslationSearchRepository, times(1)).deleteById(nutritionDefinitionTranslation.getId());
    }

    @Test
    @Transactional
    public void searchNutritionDefinitionTranslation() throws Exception {
        // Initialize the database
        nutritionDefinitionTranslationService.save(nutritionDefinitionTranslation);
        when(mockNutritionDefinitionTranslationSearchRepository.search(queryStringQuery("id:" + nutritionDefinitionTranslation.getId())))
            .thenReturn(Collections.singletonList(nutritionDefinitionTranslation));
        // Search the nutritionDefinitionTranslation
        restNutritionDefinitionTranslationMockMvc.perform(get("/api/_search/nutrition-definition-translations?query=id:" + nutritionDefinitionTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutritionDefinitionTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NutritionDefinitionTranslation.class);
        NutritionDefinitionTranslation nutritionDefinitionTranslation1 = new NutritionDefinitionTranslation();
        nutritionDefinitionTranslation1.setId(1L);
        NutritionDefinitionTranslation nutritionDefinitionTranslation2 = new NutritionDefinitionTranslation();
        nutritionDefinitionTranslation2.setId(nutritionDefinitionTranslation1.getId());
        assertThat(nutritionDefinitionTranslation1).isEqualTo(nutritionDefinitionTranslation2);
        nutritionDefinitionTranslation2.setId(2L);
        assertThat(nutritionDefinitionTranslation1).isNotEqualTo(nutritionDefinitionTranslation2);
        nutritionDefinitionTranslation1.setId(null);
        assertThat(nutritionDefinitionTranslation1).isNotEqualTo(nutritionDefinitionTranslation2);
    }
}
