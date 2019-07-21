package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.ProductsApp;
import pl.marczynski.dietify.products.domain.ProductBasicNutritionData;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.repository.ProductBasicNutritionDataRepository;
import pl.marczynski.dietify.products.repository.search.ProductBasicNutritionDataSearchRepository;
import pl.marczynski.dietify.products.service.ProductBasicNutritionDataService;
import pl.marczynski.dietify.products.service.dto.ProductBasicNutritionDataDTO;
import pl.marczynski.dietify.products.service.mapper.ProductBasicNutritionDataMapper;
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
 * Integration tests for the {@Link ProductBasicNutritionDataResource} REST controller.
 */
@SpringBootTest(classes = ProductsApp.class)
public class ProductBasicNutritionDataResourceIT {

    private static final Integer DEFAULT_ENERGY = 0;
    private static final Integer UPDATED_ENERGY = 1;

    private static final Integer DEFAULT_PROTEIN = 0;
    private static final Integer UPDATED_PROTEIN = 1;

    private static final Integer DEFAULT_FAT = 0;
    private static final Integer UPDATED_FAT = 1;

    private static final Integer DEFAULT_CARBOHYDRATES = 0;
    private static final Integer UPDATED_CARBOHYDRATES = 1;

    @Autowired
    private ProductBasicNutritionDataRepository productBasicNutritionDataRepository;

    @Autowired
    private ProductBasicNutritionDataMapper productBasicNutritionDataMapper;

    @Autowired
    private ProductBasicNutritionDataService productBasicNutritionDataService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.products.repository.search test package.
     *
     * @see pl.marczynski.dietify.products.repository.search.ProductBasicNutritionDataSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductBasicNutritionDataSearchRepository mockProductBasicNutritionDataSearchRepository;

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

    private MockMvc restProductBasicNutritionDataMockMvc;

    private ProductBasicNutritionData productBasicNutritionData;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductBasicNutritionDataResource productBasicNutritionDataResource = new ProductBasicNutritionDataResource(productBasicNutritionDataService);
        this.restProductBasicNutritionDataMockMvc = MockMvcBuilders.standaloneSetup(productBasicNutritionDataResource)
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
    public static ProductBasicNutritionData createEntity(EntityManager em) {
        ProductBasicNutritionData productBasicNutritionData = new ProductBasicNutritionData();
        productBasicNutritionData.setEnergy(DEFAULT_ENERGY);
        productBasicNutritionData.setProtein(DEFAULT_PROTEIN);
        productBasicNutritionData.setFat(DEFAULT_FAT);
        productBasicNutritionData.setCarbohydrates(DEFAULT_CARBOHYDRATES);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        productBasicNutritionData.setProduct(product);
        return productBasicNutritionData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductBasicNutritionData createUpdatedEntity(EntityManager em) {
        ProductBasicNutritionData productBasicNutritionData = new ProductBasicNutritionData();
        productBasicNutritionData.setEnergy(UPDATED_ENERGY);
        productBasicNutritionData.setProtein(UPDATED_PROTEIN);
        productBasicNutritionData.setFat(UPDATED_FAT);
        productBasicNutritionData.setCarbohydrates(UPDATED_CARBOHYDRATES);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createUpdatedEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        productBasicNutritionData.setProduct(product);
        return productBasicNutritionData;
    }

    @BeforeEach
    public void initTest() {
        productBasicNutritionData = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductBasicNutritionData() throws Exception {
        int databaseSizeBeforeCreate = productBasicNutritionDataRepository.findAll().size();

        // Create the ProductBasicNutritionData
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO = productBasicNutritionDataMapper.toDto(productBasicNutritionData);
        restProductBasicNutritionDataMockMvc.perform(post("/api/product-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productBasicNutritionDataDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductBasicNutritionData in the database
        List<ProductBasicNutritionData> productBasicNutritionDataList = productBasicNutritionDataRepository.findAll();
        assertThat(productBasicNutritionDataList).hasSize(databaseSizeBeforeCreate + 1);
        ProductBasicNutritionData testProductBasicNutritionData = productBasicNutritionDataList.get(productBasicNutritionDataList.size() - 1);
        assertThat(testProductBasicNutritionData.getEnergy()).isEqualTo(DEFAULT_ENERGY);
        assertThat(testProductBasicNutritionData.getProtein()).isEqualTo(DEFAULT_PROTEIN);
        assertThat(testProductBasicNutritionData.getFat()).isEqualTo(DEFAULT_FAT);
        assertThat(testProductBasicNutritionData.getCarbohydrates()).isEqualTo(DEFAULT_CARBOHYDRATES);

        // Validate the ProductBasicNutritionData in Elasticsearch
        verify(mockProductBasicNutritionDataSearchRepository, times(1)).save(testProductBasicNutritionData);
    }

    @Test
    @Transactional
    public void createProductBasicNutritionDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productBasicNutritionDataRepository.findAll().size();

        // Create the ProductBasicNutritionData with an existing ID
        productBasicNutritionData.setId(1L);
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO = productBasicNutritionDataMapper.toDto(productBasicNutritionData);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductBasicNutritionDataMockMvc.perform(post("/api/product-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productBasicNutritionDataDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductBasicNutritionData in the database
        List<ProductBasicNutritionData> productBasicNutritionDataList = productBasicNutritionDataRepository.findAll();
        assertThat(productBasicNutritionDataList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductBasicNutritionData in Elasticsearch
        verify(mockProductBasicNutritionDataSearchRepository, times(0)).save(productBasicNutritionData);
    }


    @Test
    @Transactional
    public void checkEnergyIsRequired() throws Exception {
        int databaseSizeBeforeTest = productBasicNutritionDataRepository.findAll().size();
        // set the field null
        productBasicNutritionData.setEnergy(null);

        // Create the ProductBasicNutritionData, which fails.
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO = productBasicNutritionDataMapper.toDto(productBasicNutritionData);

        restProductBasicNutritionDataMockMvc.perform(post("/api/product-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productBasicNutritionDataDTO)))
            .andExpect(status().isBadRequest());

        List<ProductBasicNutritionData> productBasicNutritionDataList = productBasicNutritionDataRepository.findAll();
        assertThat(productBasicNutritionDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProteinIsRequired() throws Exception {
        int databaseSizeBeforeTest = productBasicNutritionDataRepository.findAll().size();
        // set the field null
        productBasicNutritionData.setProtein(null);

        // Create the ProductBasicNutritionData, which fails.
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO = productBasicNutritionDataMapper.toDto(productBasicNutritionData);

        restProductBasicNutritionDataMockMvc.perform(post("/api/product-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productBasicNutritionDataDTO)))
            .andExpect(status().isBadRequest());

        List<ProductBasicNutritionData> productBasicNutritionDataList = productBasicNutritionDataRepository.findAll();
        assertThat(productBasicNutritionDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFatIsRequired() throws Exception {
        int databaseSizeBeforeTest = productBasicNutritionDataRepository.findAll().size();
        // set the field null
        productBasicNutritionData.setFat(null);

        // Create the ProductBasicNutritionData, which fails.
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO = productBasicNutritionDataMapper.toDto(productBasicNutritionData);

        restProductBasicNutritionDataMockMvc.perform(post("/api/product-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productBasicNutritionDataDTO)))
            .andExpect(status().isBadRequest());

        List<ProductBasicNutritionData> productBasicNutritionDataList = productBasicNutritionDataRepository.findAll();
        assertThat(productBasicNutritionDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCarbohydratesIsRequired() throws Exception {
        int databaseSizeBeforeTest = productBasicNutritionDataRepository.findAll().size();
        // set the field null
        productBasicNutritionData.setCarbohydrates(null);

        // Create the ProductBasicNutritionData, which fails.
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO = productBasicNutritionDataMapper.toDto(productBasicNutritionData);

        restProductBasicNutritionDataMockMvc.perform(post("/api/product-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productBasicNutritionDataDTO)))
            .andExpect(status().isBadRequest());

        List<ProductBasicNutritionData> productBasicNutritionDataList = productBasicNutritionDataRepository.findAll();
        assertThat(productBasicNutritionDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductBasicNutritionData() throws Exception {
        // Initialize the database
        productBasicNutritionDataRepository.saveAndFlush(productBasicNutritionData);

        // Get all the productBasicNutritionDataList
        restProductBasicNutritionDataMockMvc.perform(get("/api/product-basic-nutrition-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productBasicNutritionData.getId().intValue())))
            .andExpect(jsonPath("$.[*].energy").value(hasItem(DEFAULT_ENERGY)))
            .andExpect(jsonPath("$.[*].protein").value(hasItem(DEFAULT_PROTEIN)))
            .andExpect(jsonPath("$.[*].fat").value(hasItem(DEFAULT_FAT)))
            .andExpect(jsonPath("$.[*].carbohydrates").value(hasItem(DEFAULT_CARBOHYDRATES)));
    }
    
    @Test
    @Transactional
    public void getProductBasicNutritionData() throws Exception {
        // Initialize the database
        productBasicNutritionDataRepository.saveAndFlush(productBasicNutritionData);

        // Get the productBasicNutritionData
        restProductBasicNutritionDataMockMvc.perform(get("/api/product-basic-nutrition-data/{id}", productBasicNutritionData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productBasicNutritionData.getId().intValue()))
            .andExpect(jsonPath("$.energy").value(DEFAULT_ENERGY))
            .andExpect(jsonPath("$.protein").value(DEFAULT_PROTEIN))
            .andExpect(jsonPath("$.fat").value(DEFAULT_FAT))
            .andExpect(jsonPath("$.carbohydrates").value(DEFAULT_CARBOHYDRATES));
    }

    @Test
    @Transactional
    public void getNonExistingProductBasicNutritionData() throws Exception {
        // Get the productBasicNutritionData
        restProductBasicNutritionDataMockMvc.perform(get("/api/product-basic-nutrition-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductBasicNutritionData() throws Exception {
        // Initialize the database
        productBasicNutritionDataRepository.saveAndFlush(productBasicNutritionData);

        int databaseSizeBeforeUpdate = productBasicNutritionDataRepository.findAll().size();

        // Update the productBasicNutritionData
        ProductBasicNutritionData updatedProductBasicNutritionData = productBasicNutritionDataRepository.findById(productBasicNutritionData.getId()).get();
        // Disconnect from session so that the updates on updatedProductBasicNutritionData are not directly saved in db
        em.detach(updatedProductBasicNutritionData);
        updatedProductBasicNutritionData.setEnergy(UPDATED_ENERGY);
        updatedProductBasicNutritionData.setProtein(UPDATED_PROTEIN);
        updatedProductBasicNutritionData.setFat(UPDATED_FAT);
        updatedProductBasicNutritionData.setCarbohydrates(UPDATED_CARBOHYDRATES);
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO = productBasicNutritionDataMapper.toDto(updatedProductBasicNutritionData);

        restProductBasicNutritionDataMockMvc.perform(put("/api/product-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productBasicNutritionDataDTO)))
            .andExpect(status().isOk());

        // Validate the ProductBasicNutritionData in the database
        List<ProductBasicNutritionData> productBasicNutritionDataList = productBasicNutritionDataRepository.findAll();
        assertThat(productBasicNutritionDataList).hasSize(databaseSizeBeforeUpdate);
        ProductBasicNutritionData testProductBasicNutritionData = productBasicNutritionDataList.get(productBasicNutritionDataList.size() - 1);
        assertThat(testProductBasicNutritionData.getEnergy()).isEqualTo(UPDATED_ENERGY);
        assertThat(testProductBasicNutritionData.getProtein()).isEqualTo(UPDATED_PROTEIN);
        assertThat(testProductBasicNutritionData.getFat()).isEqualTo(UPDATED_FAT);
        assertThat(testProductBasicNutritionData.getCarbohydrates()).isEqualTo(UPDATED_CARBOHYDRATES);

        // Validate the ProductBasicNutritionData in Elasticsearch
        verify(mockProductBasicNutritionDataSearchRepository, times(1)).save(testProductBasicNutritionData);
    }

    @Test
    @Transactional
    public void updateNonExistingProductBasicNutritionData() throws Exception {
        int databaseSizeBeforeUpdate = productBasicNutritionDataRepository.findAll().size();

        // Create the ProductBasicNutritionData
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO = productBasicNutritionDataMapper.toDto(productBasicNutritionData);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductBasicNutritionDataMockMvc.perform(put("/api/product-basic-nutrition-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productBasicNutritionDataDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductBasicNutritionData in the database
        List<ProductBasicNutritionData> productBasicNutritionDataList = productBasicNutritionDataRepository.findAll();
        assertThat(productBasicNutritionDataList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductBasicNutritionData in Elasticsearch
        verify(mockProductBasicNutritionDataSearchRepository, times(0)).save(productBasicNutritionData);
    }

    @Test
    @Transactional
    public void deleteProductBasicNutritionData() throws Exception {
        // Initialize the database
        productBasicNutritionDataRepository.saveAndFlush(productBasicNutritionData);

        int databaseSizeBeforeDelete = productBasicNutritionDataRepository.findAll().size();

        // Delete the productBasicNutritionData
        restProductBasicNutritionDataMockMvc.perform(delete("/api/product-basic-nutrition-data/{id}", productBasicNutritionData.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductBasicNutritionData> productBasicNutritionDataList = productBasicNutritionDataRepository.findAll();
        assertThat(productBasicNutritionDataList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductBasicNutritionData in Elasticsearch
        verify(mockProductBasicNutritionDataSearchRepository, times(1)).deleteById(productBasicNutritionData.getId());
    }

    @Test
    @Transactional
    public void searchProductBasicNutritionData() throws Exception {
        // Initialize the database
        productBasicNutritionDataRepository.saveAndFlush(productBasicNutritionData);
        when(mockProductBasicNutritionDataSearchRepository.search(queryStringQuery("id:" + productBasicNutritionData.getId())))
            .thenReturn(Collections.singletonList(productBasicNutritionData));
        // Search the productBasicNutritionData
        restProductBasicNutritionDataMockMvc.perform(get("/api/_search/product-basic-nutrition-data?query=id:" + productBasicNutritionData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productBasicNutritionData.getId().intValue())))
            .andExpect(jsonPath("$.[*].energy").value(hasItem(DEFAULT_ENERGY)))
            .andExpect(jsonPath("$.[*].protein").value(hasItem(DEFAULT_PROTEIN)))
            .andExpect(jsonPath("$.[*].fat").value(hasItem(DEFAULT_FAT)))
            .andExpect(jsonPath("$.[*].carbohydrates").value(hasItem(DEFAULT_CARBOHYDRATES)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductBasicNutritionData.class);
        ProductBasicNutritionData productBasicNutritionData1 = new ProductBasicNutritionData();
        productBasicNutritionData1.setId(1L);
        ProductBasicNutritionData productBasicNutritionData2 = new ProductBasicNutritionData();
        productBasicNutritionData2.setId(productBasicNutritionData1.getId());
        assertThat(productBasicNutritionData1).isEqualTo(productBasicNutritionData2);
        productBasicNutritionData2.setId(2L);
        assertThat(productBasicNutritionData1).isNotEqualTo(productBasicNutritionData2);
        productBasicNutritionData1.setId(null);
        assertThat(productBasicNutritionData1).isNotEqualTo(productBasicNutritionData2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductBasicNutritionDataDTO.class);
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO1 = new ProductBasicNutritionDataDTO();
        productBasicNutritionDataDTO1.setId(1L);
        ProductBasicNutritionDataDTO productBasicNutritionDataDTO2 = new ProductBasicNutritionDataDTO();
        assertThat(productBasicNutritionDataDTO1).isNotEqualTo(productBasicNutritionDataDTO2);
        productBasicNutritionDataDTO2.setId(productBasicNutritionDataDTO1.getId());
        assertThat(productBasicNutritionDataDTO1).isEqualTo(productBasicNutritionDataDTO2);
        productBasicNutritionDataDTO2.setId(2L);
        assertThat(productBasicNutritionDataDTO1).isNotEqualTo(productBasicNutritionDataDTO2);
        productBasicNutritionDataDTO1.setId(null);
        assertThat(productBasicNutritionDataDTO1).isNotEqualTo(productBasicNutritionDataDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productBasicNutritionDataMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productBasicNutritionDataMapper.fromId(null)).isNull();
    }
}
