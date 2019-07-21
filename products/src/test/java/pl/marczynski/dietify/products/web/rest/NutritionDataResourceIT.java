package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.ProductsApp;
import pl.marczynski.dietify.products.domain.NutritionData;
import pl.marczynski.dietify.products.domain.NutritionDefinition;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.repository.NutritionDataRepository;
import pl.marczynski.dietify.products.repository.search.NutritionDataSearchRepository;
import pl.marczynski.dietify.products.service.NutritionDataService;
import pl.marczynski.dietify.products.service.dto.NutritionDataDTO;
import pl.marczynski.dietify.products.service.mapper.NutritionDataMapper;
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
 * Integration tests for the {@Link NutritionDataResource} REST controller.
 */
@SpringBootTest(classes = ProductsApp.class)
public class NutritionDataResourceIT {

    private static final Double DEFAULT_NUTRITION_VALUE = 0D;
    private static final Double UPDATED_NUTRITION_VALUE = 1D;

    @Autowired
    private NutritionDataRepository nutritionDataRepository;

    @Autowired
    private NutritionDataMapper nutritionDataMapper;

    @Autowired
    private NutritionDataService nutritionDataService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.products.repository.search test package.
     *
     * @see pl.marczynski.dietify.products.repository.search.NutritionDataSearchRepositoryMockConfiguration
     */
    @Autowired
    private NutritionDataSearchRepository mockNutritionDataSearchRepository;

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

    private MockMvc restNutritionDataMockMvc;

    private NutritionData nutritionData;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NutritionDataResource nutritionDataResource = new NutritionDataResource(nutritionDataService);
        this.restNutritionDataMockMvc = MockMvcBuilders.standaloneSetup(nutritionDataResource)
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
    public static NutritionData createEntity(EntityManager em) {
        NutritionData nutritionData = new NutritionData();
        nutritionData.setNutritionValue(DEFAULT_NUTRITION_VALUE);
        // Add required entity
        NutritionDefinition nutritionDefinition;
        if (TestUtil.findAll(em, NutritionDefinition.class).isEmpty()) {
            nutritionDefinition = NutritionDefinitionResourceIT.createEntity(em);
            em.persist(nutritionDefinition);
            em.flush();
        } else {
            nutritionDefinition = TestUtil.findAll(em, NutritionDefinition.class).get(0);
        }
        nutritionData.setNutritionDefinition(nutritionDefinition);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        nutritionData.setProduct(product);
        return nutritionData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NutritionData createUpdatedEntity(EntityManager em) {
        NutritionData nutritionData = new NutritionData();
        nutritionData.setNutritionValue(UPDATED_NUTRITION_VALUE);
        // Add required entity
        NutritionDefinition nutritionDefinition;
        if (TestUtil.findAll(em, NutritionDefinition.class).isEmpty()) {
            nutritionDefinition = NutritionDefinitionResourceIT.createUpdatedEntity(em);
            em.persist(nutritionDefinition);
            em.flush();
        } else {
            nutritionDefinition = TestUtil.findAll(em, NutritionDefinition.class).get(0);
        }
        nutritionData.setNutritionDefinition(nutritionDefinition);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createUpdatedEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        nutritionData.setProduct(product);
        return nutritionData;
    }

    @BeforeEach
    public void initTest() {
        nutritionData = createEntity(em);
    }

    @Test
    @Transactional
    public void createNutritionData() throws Exception {
        int databaseSizeBeforeCreate = nutritionDataRepository.findAll().size();

        // Create the NutritionData
        NutritionDataDTO nutritionDataDTO = nutritionDataMapper.toDto(nutritionData);
        restNutritionDataMockMvc.perform(post("/api/nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDataDTO)))
            .andExpect(status().isCreated());

        // Validate the NutritionData in the database
        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
        assertThat(nutritionDataList).hasSize(databaseSizeBeforeCreate + 1);
        NutritionData testNutritionData = nutritionDataList.get(nutritionDataList.size() - 1);
        assertThat(testNutritionData.getNutritionValue()).isEqualTo(DEFAULT_NUTRITION_VALUE);

        // Validate the NutritionData in Elasticsearch
        verify(mockNutritionDataSearchRepository, times(1)).save(testNutritionData);
    }

    @Test
    @Transactional
    public void createNutritionDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nutritionDataRepository.findAll().size();

        // Create the NutritionData with an existing ID
        nutritionData.setId(1L);
        NutritionDataDTO nutritionDataDTO = nutritionDataMapper.toDto(nutritionData);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNutritionDataMockMvc.perform(post("/api/nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDataDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionData in the database
        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
        assertThat(nutritionDataList).hasSize(databaseSizeBeforeCreate);

        // Validate the NutritionData in Elasticsearch
        verify(mockNutritionDataSearchRepository, times(0)).save(nutritionData);
    }


    @Test
    @Transactional
    public void checkNutritionValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDataRepository.findAll().size();
        // set the field null
        nutritionData.setNutritionValue(null);

        // Create the NutritionData, which fails.
        NutritionDataDTO nutritionDataDTO = nutritionDataMapper.toDto(nutritionData);

        restNutritionDataMockMvc.perform(post("/api/nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDataDTO)))
            .andExpect(status().isBadRequest());

        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
        assertThat(nutritionDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNutritionData() throws Exception {
        // Initialize the database
        nutritionDataRepository.saveAndFlush(nutritionData);

        // Get all the nutritionDataList
        restNutritionDataMockMvc.perform(get("/api/nutrition-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutritionData.getId().intValue())))
            .andExpect(jsonPath("$.[*].nutritionValue").value(hasItem(DEFAULT_NUTRITION_VALUE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getNutritionData() throws Exception {
        // Initialize the database
        nutritionDataRepository.saveAndFlush(nutritionData);

        // Get the nutritionData
        restNutritionDataMockMvc.perform(get("/api/nutrition-data/{id}", nutritionData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nutritionData.getId().intValue()))
            .andExpect(jsonPath("$.nutritionValue").value(DEFAULT_NUTRITION_VALUE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNutritionData() throws Exception {
        // Get the nutritionData
        restNutritionDataMockMvc.perform(get("/api/nutrition-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNutritionData() throws Exception {
        // Initialize the database
        nutritionDataRepository.saveAndFlush(nutritionData);

        int databaseSizeBeforeUpdate = nutritionDataRepository.findAll().size();

        // Update the nutritionData
        NutritionData updatedNutritionData = nutritionDataRepository.findById(nutritionData.getId()).get();
        // Disconnect from session so that the updates on updatedNutritionData are not directly saved in db
        em.detach(updatedNutritionData);
        updatedNutritionData.setNutritionValue(UPDATED_NUTRITION_VALUE);
        NutritionDataDTO nutritionDataDTO = nutritionDataMapper.toDto(updatedNutritionData);

        restNutritionDataMockMvc.perform(put("/api/nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDataDTO)))
            .andExpect(status().isOk());

        // Validate the NutritionData in the database
        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
        assertThat(nutritionDataList).hasSize(databaseSizeBeforeUpdate);
        NutritionData testNutritionData = nutritionDataList.get(nutritionDataList.size() - 1);
        assertThat(testNutritionData.getNutritionValue()).isEqualTo(UPDATED_NUTRITION_VALUE);

        // Validate the NutritionData in Elasticsearch
        verify(mockNutritionDataSearchRepository, times(1)).save(testNutritionData);
    }

    @Test
    @Transactional
    public void updateNonExistingNutritionData() throws Exception {
        int databaseSizeBeforeUpdate = nutritionDataRepository.findAll().size();

        // Create the NutritionData
        NutritionDataDTO nutritionDataDTO = nutritionDataMapper.toDto(nutritionData);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutritionDataMockMvc.perform(put("/api/nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDataDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionData in the database
        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
        assertThat(nutritionDataList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NutritionData in Elasticsearch
        verify(mockNutritionDataSearchRepository, times(0)).save(nutritionData);
    }

    @Test
    @Transactional
    public void deleteNutritionData() throws Exception {
        // Initialize the database
        nutritionDataRepository.saveAndFlush(nutritionData);

        int databaseSizeBeforeDelete = nutritionDataRepository.findAll().size();

        // Delete the nutritionData
        restNutritionDataMockMvc.perform(delete("/api/nutrition-data/{id}", nutritionData.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
        assertThat(nutritionDataList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NutritionData in Elasticsearch
        verify(mockNutritionDataSearchRepository, times(1)).deleteById(nutritionData.getId());
    }

    @Test
    @Transactional
    public void searchNutritionData() throws Exception {
        // Initialize the database
        nutritionDataRepository.saveAndFlush(nutritionData);
        when(mockNutritionDataSearchRepository.search(queryStringQuery("id:" + nutritionData.getId())))
            .thenReturn(Collections.singletonList(nutritionData));
        // Search the nutritionData
        restNutritionDataMockMvc.perform(get("/api/_search/nutrition-data?query=id:" + nutritionData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutritionData.getId().intValue())))
            .andExpect(jsonPath("$.[*].nutritionValue").value(hasItem(DEFAULT_NUTRITION_VALUE.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NutritionData.class);
        NutritionData nutritionData1 = new NutritionData();
        nutritionData1.setId(1L);
        NutritionData nutritionData2 = new NutritionData();
        nutritionData2.setId(nutritionData1.getId());
        assertThat(nutritionData1).isEqualTo(nutritionData2);
        nutritionData2.setId(2L);
        assertThat(nutritionData1).isNotEqualTo(nutritionData2);
        nutritionData1.setId(null);
        assertThat(nutritionData1).isNotEqualTo(nutritionData2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NutritionDataDTO.class);
        NutritionDataDTO nutritionDataDTO1 = new NutritionDataDTO();
        nutritionDataDTO1.setId(1L);
        NutritionDataDTO nutritionDataDTO2 = new NutritionDataDTO();
        assertThat(nutritionDataDTO1).isNotEqualTo(nutritionDataDTO2);
        nutritionDataDTO2.setId(nutritionDataDTO1.getId());
        assertThat(nutritionDataDTO1).isEqualTo(nutritionDataDTO2);
        nutritionDataDTO2.setId(2L);
        assertThat(nutritionDataDTO1).isNotEqualTo(nutritionDataDTO2);
        nutritionDataDTO1.setId(null);
        assertThat(nutritionDataDTO1).isNotEqualTo(nutritionDataDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(nutritionDataMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(nutritionDataMapper.fromId(null)).isNull();
    }
}
