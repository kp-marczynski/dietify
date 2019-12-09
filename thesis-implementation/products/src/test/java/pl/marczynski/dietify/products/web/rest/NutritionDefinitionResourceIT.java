package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.ProductsApp;
import pl.marczynski.dietify.products.domain.NutritionDefinition;
import pl.marczynski.dietify.products.repository.NutritionDefinitionRepository;
import pl.marczynski.dietify.products.repository.search.NutritionDefinitionSearchRepository;
import pl.marczynski.dietify.products.service.NutritionDefinitionService;
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
 * Integration tests for the {@Link NutritionDefinitionResource} REST controller.
 */
@SpringBootTest(classes = ProductsApp.class)
public class NutritionDefinitionResourceIT {

    private static final String DEFAULT_TAG = "AAAAAAAAAA";
    private static final String UPDATED_TAG = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_UNITS = "AAAAAAAAAA";
    private static final String UPDATED_UNITS = "BBBBBBBBBB";

    private static final Integer DEFAULT_DECIMAL_PLACES = 0;
    private static final Integer UPDATED_DECIMAL_PLACES = 1;

    @Autowired
    private NutritionDefinitionRepository nutritionDefinitionRepository;

    @Autowired
    private NutritionDefinitionService nutritionDefinitionService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.products.repository.search test package.
     *
     * @see pl.marczynski.dietify.products.repository.search.NutritionDefinitionSearchRepositoryMockConfiguration
     */
    @Autowired
    private NutritionDefinitionSearchRepository mockNutritionDefinitionSearchRepository;

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

    private MockMvc restNutritionDefinitionMockMvc;

    private NutritionDefinition nutritionDefinition;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NutritionDefinitionResource nutritionDefinitionResource = new NutritionDefinitionResource(nutritionDefinitionService);
        this.restNutritionDefinitionMockMvc = MockMvcBuilders.standaloneSetup(nutritionDefinitionResource)
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
    public static NutritionDefinition createEntity(EntityManager em) {
        NutritionDefinition nutritionDefinition = new NutritionDefinition();
        nutritionDefinition.setTag(DEFAULT_TAG);
        nutritionDefinition.setDescription(DEFAULT_DESCRIPTION);
        nutritionDefinition.setUnits(DEFAULT_UNITS);
        nutritionDefinition.setDecimalPlaces(DEFAULT_DECIMAL_PLACES);
        return nutritionDefinition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NutritionDefinition createUpdatedEntity(EntityManager em) {
        NutritionDefinition nutritionDefinition = new NutritionDefinition();
        nutritionDefinition.setTag(UPDATED_TAG);
        nutritionDefinition.setDescription(UPDATED_DESCRIPTION);
        nutritionDefinition.setUnits(UPDATED_UNITS);
        nutritionDefinition.setDecimalPlaces(UPDATED_DECIMAL_PLACES);
        return nutritionDefinition;
    }

    @BeforeEach
    public void initTest() {
        nutritionDefinition = createEntity(em);
    }

    @Test
    @Transactional
    public void createNutritionDefinition() throws Exception {
        int databaseSizeBeforeCreate = nutritionDefinitionRepository.findAll().size();

        // Create the NutritionDefinition
        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isCreated());

        // Validate the NutritionDefinition in the database
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeCreate + 1);
        NutritionDefinition testNutritionDefinition = nutritionDefinitionList.get(nutritionDefinitionList.size() - 1);
        assertThat(testNutritionDefinition.getTag()).isEqualTo(DEFAULT_TAG);
        assertThat(testNutritionDefinition.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testNutritionDefinition.getUnits()).isEqualTo(DEFAULT_UNITS);
        assertThat(testNutritionDefinition.getDecimalPlaces()).isEqualTo(DEFAULT_DECIMAL_PLACES);

        // Validate the NutritionDefinition in Elasticsearch
        verify(mockNutritionDefinitionSearchRepository, times(1)).save(testNutritionDefinition);
    }

    @Test
    @Transactional
    public void createNutritionDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nutritionDefinitionRepository.findAll().size();

        // Create the NutritionDefinition with an existing ID
        nutritionDefinition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionDefinition in the database
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeCreate);

        // Validate the NutritionDefinition in Elasticsearch
        verify(mockNutritionDefinitionSearchRepository, times(0)).save(nutritionDefinition);
    }


    @Test
    @Transactional
    public void checkTagIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionRepository.findAll().size();
        // set the field null
        nutritionDefinition.setTag(null);

        // Create the NutritionDefinition, which fails.

        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionRepository.findAll().size();
        // set the field null
        nutritionDefinition.setDescription(null);

        // Create the NutritionDefinition, which fails.

        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUnitsIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionRepository.findAll().size();
        // set the field null
        nutritionDefinition.setUnits(null);

        // Create the NutritionDefinition, which fails.

        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDecimalPlacesIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionRepository.findAll().size();
        // set the field null
        nutritionDefinition.setDecimalPlaces(null);

        // Create the NutritionDefinition, which fails.

        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNutritionDefinitions() throws Exception {
        // Initialize the database
        nutritionDefinitionRepository.saveAndFlush(nutritionDefinition);

        // Get all the nutritionDefinitionList
        restNutritionDefinitionMockMvc.perform(get("/api/nutrition-definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutritionDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].units").value(hasItem(DEFAULT_UNITS.toString())))
            .andExpect(jsonPath("$.[*].decimalPlaces").value(hasItem(DEFAULT_DECIMAL_PLACES)));
    }
    
    @Test
    @Transactional
    public void getNutritionDefinition() throws Exception {
        // Initialize the database
        nutritionDefinitionRepository.saveAndFlush(nutritionDefinition);

        // Get the nutritionDefinition
        restNutritionDefinitionMockMvc.perform(get("/api/nutrition-definitions/{id}", nutritionDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nutritionDefinition.getId().intValue()))
            .andExpect(jsonPath("$.tag").value(DEFAULT_TAG.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.units").value(DEFAULT_UNITS.toString()))
            .andExpect(jsonPath("$.decimalPlaces").value(DEFAULT_DECIMAL_PLACES));
    }

    @Test
    @Transactional
    public void getNonExistingNutritionDefinition() throws Exception {
        // Get the nutritionDefinition
        restNutritionDefinitionMockMvc.perform(get("/api/nutrition-definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNutritionDefinition() throws Exception {
        // Initialize the database
        nutritionDefinitionService.save(nutritionDefinition);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockNutritionDefinitionSearchRepository);

        int databaseSizeBeforeUpdate = nutritionDefinitionRepository.findAll().size();

        // Update the nutritionDefinition
        NutritionDefinition updatedNutritionDefinition = nutritionDefinitionRepository.findById(nutritionDefinition.getId()).get();
        // Disconnect from session so that the updates on updatedNutritionDefinition are not directly saved in db
        em.detach(updatedNutritionDefinition);
        updatedNutritionDefinition.setTag(UPDATED_TAG);
        updatedNutritionDefinition.setDescription(UPDATED_DESCRIPTION);
        updatedNutritionDefinition.setUnits(UPDATED_UNITS);
        updatedNutritionDefinition.setDecimalPlaces(UPDATED_DECIMAL_PLACES);

        restNutritionDefinitionMockMvc.perform(put("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNutritionDefinition)))
            .andExpect(status().isOk());

        // Validate the NutritionDefinition in the database
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeUpdate);
        NutritionDefinition testNutritionDefinition = nutritionDefinitionList.get(nutritionDefinitionList.size() - 1);
        assertThat(testNutritionDefinition.getTag()).isEqualTo(UPDATED_TAG);
        assertThat(testNutritionDefinition.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNutritionDefinition.getUnits()).isEqualTo(UPDATED_UNITS);
        assertThat(testNutritionDefinition.getDecimalPlaces()).isEqualTo(UPDATED_DECIMAL_PLACES);

        // Validate the NutritionDefinition in Elasticsearch
        verify(mockNutritionDefinitionSearchRepository, times(1)).save(testNutritionDefinition);
    }

    @Test
    @Transactional
    public void updateNonExistingNutritionDefinition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionDefinitionRepository.findAll().size();

        // Create the NutritionDefinition

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutritionDefinitionMockMvc.perform(put("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionDefinition in the database
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NutritionDefinition in Elasticsearch
        verify(mockNutritionDefinitionSearchRepository, times(0)).save(nutritionDefinition);
    }

    @Test
    @Transactional
    public void deleteNutritionDefinition() throws Exception {
        // Initialize the database
        nutritionDefinitionService.save(nutritionDefinition);

        int databaseSizeBeforeDelete = nutritionDefinitionRepository.findAll().size();

        // Delete the nutritionDefinition
        restNutritionDefinitionMockMvc.perform(delete("/api/nutrition-definitions/{id}", nutritionDefinition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NutritionDefinition in Elasticsearch
        verify(mockNutritionDefinitionSearchRepository, times(1)).deleteById(nutritionDefinition.getId());
    }

    @Test
    @Transactional
    public void searchNutritionDefinition() throws Exception {
        // Initialize the database
        nutritionDefinitionService.save(nutritionDefinition);
        when(mockNutritionDefinitionSearchRepository.search(queryStringQuery("id:" + nutritionDefinition.getId())))
            .thenReturn(Collections.singletonList(nutritionDefinition));
        // Search the nutritionDefinition
        restNutritionDefinitionMockMvc.perform(get("/api/_search/nutrition-definitions?query=id:" + nutritionDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutritionDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].units").value(hasItem(DEFAULT_UNITS)))
            .andExpect(jsonPath("$.[*].decimalPlaces").value(hasItem(DEFAULT_DECIMAL_PLACES)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NutritionDefinition.class);
        NutritionDefinition nutritionDefinition1 = new NutritionDefinition();
        nutritionDefinition1.setId(1L);
        NutritionDefinition nutritionDefinition2 = new NutritionDefinition();
        nutritionDefinition2.setId(nutritionDefinition1.getId());
        assertThat(nutritionDefinition1).isEqualTo(nutritionDefinition2);
        nutritionDefinition2.setId(2L);
        assertThat(nutritionDefinition1).isNotEqualTo(nutritionDefinition2);
        nutritionDefinition1.setId(null);
        assertThat(nutritionDefinition1).isNotEqualTo(nutritionDefinition2);
    }
}
