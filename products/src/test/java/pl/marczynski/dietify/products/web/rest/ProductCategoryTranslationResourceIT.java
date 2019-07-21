package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.ProductsApp;
import pl.marczynski.dietify.products.domain.ProductCategoryTranslation;
import pl.marczynski.dietify.products.domain.ProductCategory;
import pl.marczynski.dietify.products.repository.ProductCategoryTranslationRepository;
import pl.marczynski.dietify.products.repository.search.ProductCategoryTranslationSearchRepository;
import pl.marczynski.dietify.products.service.ProductCategoryTranslationService;
import pl.marczynski.dietify.products.service.dto.ProductCategoryTranslationDTO;
import pl.marczynski.dietify.products.service.mapper.ProductCategoryTranslationMapper;
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
 * Integration tests for the {@Link ProductCategoryTranslationResource} REST controller.
 */
@SpringBootTest(classes = ProductsApp.class)
public class ProductCategoryTranslationResourceIT {

    private static final String DEFAULT_TRANSLATION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSLATION = "BBBBBBBBBB";

    private static final String DEFAULT_LANGUAGE = "AA";
    private static final String UPDATED_LANGUAGE = "BB";

    @Autowired
    private ProductCategoryTranslationRepository productCategoryTranslationRepository;

    @Autowired
    private ProductCategoryTranslationMapper productCategoryTranslationMapper;

    @Autowired
    private ProductCategoryTranslationService productCategoryTranslationService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.products.repository.search test package.
     *
     * @see pl.marczynski.dietify.products.repository.search.ProductCategoryTranslationSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductCategoryTranslationSearchRepository mockProductCategoryTranslationSearchRepository;

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

    private MockMvc restProductCategoryTranslationMockMvc;

    private ProductCategoryTranslation productCategoryTranslation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductCategoryTranslationResource productCategoryTranslationResource = new ProductCategoryTranslationResource(productCategoryTranslationService);
        this.restProductCategoryTranslationMockMvc = MockMvcBuilders.standaloneSetup(productCategoryTranslationResource)
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
    public static ProductCategoryTranslation createEntity(EntityManager em) {
        ProductCategoryTranslation productCategoryTranslation = new ProductCategoryTranslation();
        productCategoryTranslation.setTranslation(DEFAULT_TRANSLATION);
        productCategoryTranslation.setLanguage(DEFAULT_LANGUAGE);
        // Add required entity
        ProductCategory productCategory;
        if (TestUtil.findAll(em, ProductCategory.class).isEmpty()) {
            productCategory = ProductCategoryResourceIT.createEntity(em);
            em.persist(productCategory);
            em.flush();
        } else {
            productCategory = TestUtil.findAll(em, ProductCategory.class).get(0);
        }
        productCategoryTranslation.setProductCategory(productCategory);
        return productCategoryTranslation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductCategoryTranslation createUpdatedEntity(EntityManager em) {
        ProductCategoryTranslation productCategoryTranslation = new ProductCategoryTranslation();
        productCategoryTranslation.setTranslation(UPDATED_TRANSLATION);
        productCategoryTranslation.setLanguage(UPDATED_LANGUAGE);
        // Add required entity
        ProductCategory productCategory;
        if (TestUtil.findAll(em, ProductCategory.class).isEmpty()) {
            productCategory = ProductCategoryResourceIT.createUpdatedEntity(em);
            em.persist(productCategory);
            em.flush();
        } else {
            productCategory = TestUtil.findAll(em, ProductCategory.class).get(0);
        }
        productCategoryTranslation.setProductCategory(productCategory);
        return productCategoryTranslation;
    }

    @BeforeEach
    public void initTest() {
        productCategoryTranslation = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductCategoryTranslation() throws Exception {
        int databaseSizeBeforeCreate = productCategoryTranslationRepository.findAll().size();

        // Create the ProductCategoryTranslation
        ProductCategoryTranslationDTO productCategoryTranslationDTO = productCategoryTranslationMapper.toDto(productCategoryTranslation);
        restProductCategoryTranslationMockMvc.perform(post("/api/product-category-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCategoryTranslationDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductCategoryTranslation in the database
        List<ProductCategoryTranslation> productCategoryTranslationList = productCategoryTranslationRepository.findAll();
        assertThat(productCategoryTranslationList).hasSize(databaseSizeBeforeCreate + 1);
        ProductCategoryTranslation testProductCategoryTranslation = productCategoryTranslationList.get(productCategoryTranslationList.size() - 1);
        assertThat(testProductCategoryTranslation.getTranslation()).isEqualTo(DEFAULT_TRANSLATION);
        assertThat(testProductCategoryTranslation.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);

        // Validate the ProductCategoryTranslation in Elasticsearch
        verify(mockProductCategoryTranslationSearchRepository, times(1)).save(testProductCategoryTranslation);
    }

    @Test
    @Transactional
    public void createProductCategoryTranslationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productCategoryTranslationRepository.findAll().size();

        // Create the ProductCategoryTranslation with an existing ID
        productCategoryTranslation.setId(1L);
        ProductCategoryTranslationDTO productCategoryTranslationDTO = productCategoryTranslationMapper.toDto(productCategoryTranslation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductCategoryTranslationMockMvc.perform(post("/api/product-category-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCategoryTranslationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductCategoryTranslation in the database
        List<ProductCategoryTranslation> productCategoryTranslationList = productCategoryTranslationRepository.findAll();
        assertThat(productCategoryTranslationList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductCategoryTranslation in Elasticsearch
        verify(mockProductCategoryTranslationSearchRepository, times(0)).save(productCategoryTranslation);
    }


    @Test
    @Transactional
    public void checkTranslationIsRequired() throws Exception {
        int databaseSizeBeforeTest = productCategoryTranslationRepository.findAll().size();
        // set the field null
        productCategoryTranslation.setTranslation(null);

        // Create the ProductCategoryTranslation, which fails.
        ProductCategoryTranslationDTO productCategoryTranslationDTO = productCategoryTranslationMapper.toDto(productCategoryTranslation);

        restProductCategoryTranslationMockMvc.perform(post("/api/product-category-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCategoryTranslationDTO)))
            .andExpect(status().isBadRequest());

        List<ProductCategoryTranslation> productCategoryTranslationList = productCategoryTranslationRepository.findAll();
        assertThat(productCategoryTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = productCategoryTranslationRepository.findAll().size();
        // set the field null
        productCategoryTranslation.setLanguage(null);

        // Create the ProductCategoryTranslation, which fails.
        ProductCategoryTranslationDTO productCategoryTranslationDTO = productCategoryTranslationMapper.toDto(productCategoryTranslation);

        restProductCategoryTranslationMockMvc.perform(post("/api/product-category-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCategoryTranslationDTO)))
            .andExpect(status().isBadRequest());

        List<ProductCategoryTranslation> productCategoryTranslationList = productCategoryTranslationRepository.findAll();
        assertThat(productCategoryTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductCategoryTranslations() throws Exception {
        // Initialize the database
        productCategoryTranslationRepository.saveAndFlush(productCategoryTranslation);

        // Get all the productCategoryTranslationList
        restProductCategoryTranslationMockMvc.perform(get("/api/product-category-translations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productCategoryTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getProductCategoryTranslation() throws Exception {
        // Initialize the database
        productCategoryTranslationRepository.saveAndFlush(productCategoryTranslation);

        // Get the productCategoryTranslation
        restProductCategoryTranslationMockMvc.perform(get("/api/product-category-translations/{id}", productCategoryTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productCategoryTranslation.getId().intValue()))
            .andExpect(jsonPath("$.translation").value(DEFAULT_TRANSLATION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProductCategoryTranslation() throws Exception {
        // Get the productCategoryTranslation
        restProductCategoryTranslationMockMvc.perform(get("/api/product-category-translations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductCategoryTranslation() throws Exception {
        // Initialize the database
        productCategoryTranslationRepository.saveAndFlush(productCategoryTranslation);

        int databaseSizeBeforeUpdate = productCategoryTranslationRepository.findAll().size();

        // Update the productCategoryTranslation
        ProductCategoryTranslation updatedProductCategoryTranslation = productCategoryTranslationRepository.findById(productCategoryTranslation.getId()).get();
        // Disconnect from session so that the updates on updatedProductCategoryTranslation are not directly saved in db
        em.detach(updatedProductCategoryTranslation);
        updatedProductCategoryTranslation.setTranslation(UPDATED_TRANSLATION);
        updatedProductCategoryTranslation.setLanguage(UPDATED_LANGUAGE);
        ProductCategoryTranslationDTO productCategoryTranslationDTO = productCategoryTranslationMapper.toDto(updatedProductCategoryTranslation);

        restProductCategoryTranslationMockMvc.perform(put("/api/product-category-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCategoryTranslationDTO)))
            .andExpect(status().isOk());

        // Validate the ProductCategoryTranslation in the database
        List<ProductCategoryTranslation> productCategoryTranslationList = productCategoryTranslationRepository.findAll();
        assertThat(productCategoryTranslationList).hasSize(databaseSizeBeforeUpdate);
        ProductCategoryTranslation testProductCategoryTranslation = productCategoryTranslationList.get(productCategoryTranslationList.size() - 1);
        assertThat(testProductCategoryTranslation.getTranslation()).isEqualTo(UPDATED_TRANSLATION);
        assertThat(testProductCategoryTranslation.getLanguage()).isEqualTo(UPDATED_LANGUAGE);

        // Validate the ProductCategoryTranslation in Elasticsearch
        verify(mockProductCategoryTranslationSearchRepository, times(1)).save(testProductCategoryTranslation);
    }

    @Test
    @Transactional
    public void updateNonExistingProductCategoryTranslation() throws Exception {
        int databaseSizeBeforeUpdate = productCategoryTranslationRepository.findAll().size();

        // Create the ProductCategoryTranslation
        ProductCategoryTranslationDTO productCategoryTranslationDTO = productCategoryTranslationMapper.toDto(productCategoryTranslation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductCategoryTranslationMockMvc.perform(put("/api/product-category-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCategoryTranslationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductCategoryTranslation in the database
        List<ProductCategoryTranslation> productCategoryTranslationList = productCategoryTranslationRepository.findAll();
        assertThat(productCategoryTranslationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductCategoryTranslation in Elasticsearch
        verify(mockProductCategoryTranslationSearchRepository, times(0)).save(productCategoryTranslation);
    }

    @Test
    @Transactional
    public void deleteProductCategoryTranslation() throws Exception {
        // Initialize the database
        productCategoryTranslationRepository.saveAndFlush(productCategoryTranslation);

        int databaseSizeBeforeDelete = productCategoryTranslationRepository.findAll().size();

        // Delete the productCategoryTranslation
        restProductCategoryTranslationMockMvc.perform(delete("/api/product-category-translations/{id}", productCategoryTranslation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductCategoryTranslation> productCategoryTranslationList = productCategoryTranslationRepository.findAll();
        assertThat(productCategoryTranslationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductCategoryTranslation in Elasticsearch
        verify(mockProductCategoryTranslationSearchRepository, times(1)).deleteById(productCategoryTranslation.getId());
    }

    @Test
    @Transactional
    public void searchProductCategoryTranslation() throws Exception {
        // Initialize the database
        productCategoryTranslationRepository.saveAndFlush(productCategoryTranslation);
        when(mockProductCategoryTranslationSearchRepository.search(queryStringQuery("id:" + productCategoryTranslation.getId())))
            .thenReturn(Collections.singletonList(productCategoryTranslation));
        // Search the productCategoryTranslation
        restProductCategoryTranslationMockMvc.perform(get("/api/_search/product-category-translations?query=id:" + productCategoryTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productCategoryTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductCategoryTranslation.class);
        ProductCategoryTranslation productCategoryTranslation1 = new ProductCategoryTranslation();
        productCategoryTranslation1.setId(1L);
        ProductCategoryTranslation productCategoryTranslation2 = new ProductCategoryTranslation();
        productCategoryTranslation2.setId(productCategoryTranslation1.getId());
        assertThat(productCategoryTranslation1).isEqualTo(productCategoryTranslation2);
        productCategoryTranslation2.setId(2L);
        assertThat(productCategoryTranslation1).isNotEqualTo(productCategoryTranslation2);
        productCategoryTranslation1.setId(null);
        assertThat(productCategoryTranslation1).isNotEqualTo(productCategoryTranslation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductCategoryTranslationDTO.class);
        ProductCategoryTranslationDTO productCategoryTranslationDTO1 = new ProductCategoryTranslationDTO();
        productCategoryTranslationDTO1.setId(1L);
        ProductCategoryTranslationDTO productCategoryTranslationDTO2 = new ProductCategoryTranslationDTO();
        assertThat(productCategoryTranslationDTO1).isNotEqualTo(productCategoryTranslationDTO2);
        productCategoryTranslationDTO2.setId(productCategoryTranslationDTO1.getId());
        assertThat(productCategoryTranslationDTO1).isEqualTo(productCategoryTranslationDTO2);
        productCategoryTranslationDTO2.setId(2L);
        assertThat(productCategoryTranslationDTO1).isNotEqualTo(productCategoryTranslationDTO2);
        productCategoryTranslationDTO1.setId(null);
        assertThat(productCategoryTranslationDTO1).isNotEqualTo(productCategoryTranslationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productCategoryTranslationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productCategoryTranslationMapper.fromId(null)).isNull();
    }
}
