package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.ProductsApp;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.domain.ProductBasicNutritionData;
import pl.marczynski.dietify.products.domain.ProductSubcategory;
import pl.marczynski.dietify.products.repository.ProductRepository;
import pl.marczynski.dietify.products.repository.search.ProductSearchRepository;
import pl.marczynski.dietify.products.service.ProductService;
import pl.marczynski.dietify.products.web.rest.errors.ExceptionTranslator;

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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
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
 * Integration tests for the {@Link ProductResource} REST controller.
 */
@SpringBootTest(classes = ProductsApp.class)
public class ProductResourceIT {

    private static final String DEFAULT_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE = "BBBBBBBBBB";

    private static final Long DEFAULT_AUTHOR_ID = 1L;
    private static final Long UPDATED_AUTHOR_ID = 2L;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_FINAL = false;
    private static final Boolean UPDATED_IS_FINAL = true;

    private static final Boolean DEFAULT_IS_VERIFIED = false;
    private static final Boolean UPDATED_IS_VERIFIED = true;

    private static final String DEFAULT_LANGUAGE = "AA";
    private static final String UPDATED_LANGUAGE = "BB";

    @Autowired
    private ProductRepository productRepository;

    @Mock
    private ProductRepository productRepositoryMock;

    @Mock
    private ProductService productServiceMock;

    @Autowired
    private ProductService productService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.products.repository.search test package.
     *
     * @see pl.marczynski.dietify.products.repository.search.ProductSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductSearchRepository mockProductSearchRepository;

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

    private MockMvc restProductMockMvc;

    private Product product;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductResource productResource = new ProductResource(productService);
        this.restProductMockMvc = MockMvcBuilders.standaloneSetup(productResource)
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
    public static Product createEntity(EntityManager em) {
        Product product = new Product();
        product.setSource(DEFAULT_SOURCE);
        product.setAuthorId(DEFAULT_AUTHOR_ID);
        product.setDescription(DEFAULT_DESCRIPTION);
        product.setIsFinal(DEFAULT_IS_FINAL);
        product.setIsVerified(DEFAULT_IS_VERIFIED);
        product.setLanguage(DEFAULT_LANGUAGE);
        // Add required entity
        ProductBasicNutritionData productBasicNutritionData  = ProductBasicNutritionDataResourceIT.createEntity(em);
        product.setBasicNutritionData(productBasicNutritionData);
        // Add required entity
        ProductSubcategory productSubcategory;
        if (TestUtil.findAll(em, ProductSubcategory.class).isEmpty()) {
            productSubcategory = ProductSubcategoryResourceIT.createEntity(em);
            em.persist(productSubcategory);
            em.flush();
        } else {
            productSubcategory = TestUtil.findAll(em, ProductSubcategory.class).get(0);
        }
        product.setSubcategory(productSubcategory);
        return product;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Product createUpdatedEntity(EntityManager em) {
        Product product = new Product();
        product.setSource(UPDATED_SOURCE);
        product.setAuthorId(UPDATED_AUTHOR_ID);
        product.setDescription(UPDATED_DESCRIPTION);
        product.setIsFinal(UPDATED_IS_FINAL);
        product.setIsVerified(UPDATED_IS_VERIFIED);
        product.setLanguage(UPDATED_LANGUAGE);
        // Add required entity
        ProductBasicNutritionData productBasicNutritionData;
        if (TestUtil.findAll(em, ProductBasicNutritionData.class).isEmpty()) {
            productBasicNutritionData = ProductBasicNutritionDataResourceIT.createUpdatedEntity(em);
            em.persist(productBasicNutritionData);
            em.flush();
        } else {
            productBasicNutritionData = TestUtil.findAll(em, ProductBasicNutritionData.class).get(0);
        }
        product.setBasicNutritionData(productBasicNutritionData);
        // Add required entity
        ProductSubcategory productSubcategory;
        if (TestUtil.findAll(em, ProductSubcategory.class).isEmpty()) {
            productSubcategory = ProductSubcategoryResourceIT.createUpdatedEntity(em);
            em.persist(productSubcategory);
            em.flush();
        } else {
            productSubcategory = TestUtil.findAll(em, ProductSubcategory.class).get(0);
        }
        product.setSubcategory(productSubcategory);
        return product;
    }

    @BeforeEach
    public void initTest() {
        product = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduct() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // Create the Product
        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isCreated());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate + 1);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getSource()).isEqualTo(DEFAULT_SOURCE);
        assertThat(testProduct.getAuthorId()).isEqualTo(DEFAULT_AUTHOR_ID);
        assertThat(testProduct.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testProduct.isIsFinal()).isEqualTo(DEFAULT_IS_FINAL);
        assertThat(testProduct.isIsVerified()).isEqualTo(DEFAULT_IS_VERIFIED);
        assertThat(testProduct.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);

        // Validate the Product in Elasticsearch
        verify(mockProductSearchRepository, times(1)).save(testProduct);
    }

    @Test
    @Transactional
    public void createProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // Create the Product with an existing ID
        product.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate);

        // Validate the Product in Elasticsearch
        verify(mockProductSearchRepository, times(0)).save(product);
    }


    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setDescription(null);

        // Create the Product, which fails.

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsFinalIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setIsFinal(null);

        // Create the Product, which fails.

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsVerifiedIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setIsVerified(null);

        // Create the Product, which fails.

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setLanguage(null);

        // Create the Product, which fails.

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProducts() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        // Get all the productList
        restProductMockMvc.perform(get("/api/products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(product.getId().intValue())))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].authorId").value(hasItem(DEFAULT_AUTHOR_ID.intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].isFinal").value(hasItem(DEFAULT_IS_FINAL.booleanValue())))
            .andExpect(jsonPath("$.[*].isVerified").value(hasItem(DEFAULT_IS_VERIFIED.booleanValue())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }

    @SuppressWarnings({"unchecked"})
    public void getAllProductsWithEagerRelationshipsIsEnabled() throws Exception {
        ProductResource productResource = new ProductResource(productServiceMock);
        when(productServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restProductMockMvc = MockMvcBuilders.standaloneSetup(productResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProductMockMvc.perform(get("/api/products?eagerload=true"))
        .andExpect(status().isOk());

        verify(productServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllProductsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ProductResource productResource = new ProductResource(productServiceMock);
            when(productServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restProductMockMvc = MockMvcBuilders.standaloneSetup(productResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProductMockMvc.perform(get("/api/products?eagerload=true"))
        .andExpect(status().isOk());

            verify(productServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        // Get the product
        restProductMockMvc.perform(get("/api/products/{id}", product.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(product.getId().intValue()))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE.toString()))
            .andExpect(jsonPath("$.authorId").value(DEFAULT_AUTHOR_ID.intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.isFinal").value(DEFAULT_IS_FINAL.booleanValue()))
            .andExpect(jsonPath("$.isVerified").value(DEFAULT_IS_VERIFIED.booleanValue()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProduct() throws Exception {
        // Get the product
        restProductMockMvc.perform(get("/api/products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProduct() throws Exception {
        // Initialize the database
        productService.save(product);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockProductSearchRepository);

        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Update the product
        Product updatedProduct = productRepository.findById(product.getId()).get();
        // Disconnect from session so that the updates on updatedProduct are not directly saved in db
        em.detach(updatedProduct);
        updatedProduct.setSource(UPDATED_SOURCE);
        updatedProduct.setAuthorId(UPDATED_AUTHOR_ID);
        updatedProduct.setDescription(UPDATED_DESCRIPTION);
        updatedProduct.setIsFinal(UPDATED_IS_FINAL);
        updatedProduct.setIsVerified(UPDATED_IS_VERIFIED);
        updatedProduct.setLanguage(UPDATED_LANGUAGE);

        restProductMockMvc.perform(put("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProduct)))
            .andExpect(status().isOk());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getSource()).isEqualTo(UPDATED_SOURCE);
        assertThat(testProduct.getAuthorId()).isEqualTo(UPDATED_AUTHOR_ID);
        assertThat(testProduct.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testProduct.isIsFinal()).isEqualTo(UPDATED_IS_FINAL);
        assertThat(testProduct.isIsVerified()).isEqualTo(UPDATED_IS_VERIFIED);
        assertThat(testProduct.getLanguage()).isEqualTo(UPDATED_LANGUAGE);

        // Validate the Product in Elasticsearch
        verify(mockProductSearchRepository, times(1)).save(testProduct);
    }

    @Test
    @Transactional
    public void updateNonExistingProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Create the Product

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductMockMvc.perform(put("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Product in Elasticsearch
        verify(mockProductSearchRepository, times(0)).save(product);
    }

    @Test
    @Transactional
    public void deleteProduct() throws Exception {
        // Initialize the database
        productService.save(product);

        int databaseSizeBeforeDelete = productRepository.findAll().size();

        // Delete the product
        restProductMockMvc.perform(delete("/api/products/{id}", product.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Product in Elasticsearch
        verify(mockProductSearchRepository, times(1)).deleteById(product.getId());
    }

    @Test
    @Transactional
    public void searchProduct() throws Exception {
        // Initialize the database
        productService.save(product);
        when(mockProductSearchRepository.search(queryStringQuery("id:" + product.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(product), PageRequest.of(0, 1), 1));
        // Search the product
        restProductMockMvc.perform(get("/api/_search/products?query=id:" + product.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(product.getId().intValue())))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE)))
            .andExpect(jsonPath("$.[*].authorId").value(hasItem(DEFAULT_AUTHOR_ID.intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].isFinal").value(hasItem(DEFAULT_IS_FINAL.booleanValue())))
            .andExpect(jsonPath("$.[*].isVerified").value(hasItem(DEFAULT_IS_VERIFIED.booleanValue())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product.class);
        Product product1 = new Product();
        product1.setId(1L);
        Product product2 = new Product();
        product2.setId(product1.getId());
        assertThat(product1).isEqualTo(product2);
        product2.setId(2L);
        assertThat(product1).isNotEqualTo(product2);
        product1.setId(null);
        assertThat(product1).isNotEqualTo(product2);
    }
}
