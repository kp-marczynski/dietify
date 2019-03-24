package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.core.web.rest.TestUtil;
import pl.marczynski.dietify.products.domain.ProductSubcategory;
import pl.marczynski.dietify.products.domain.ProductCategory;
import pl.marczynski.dietify.products.repository.ProductSubcategoryRepository;
import pl.marczynski.dietify.products.service.ProductSubcategoryService;
import pl.marczynski.dietify.core.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProductSubcategoryResource REST controller.
 *
 * @see ProductSubcategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class ProductSubcategoryResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ProductSubcategoryRepository productSubcategoryRepository;

    @Autowired
    private ProductSubcategoryService productSubcategoryService;

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

    private MockMvc restProductSubcategoryMockMvc;

    private ProductSubcategory productSubcategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductSubcategoryResource productSubcategoryResource = new ProductSubcategoryResource(productSubcategoryService);
        this.restProductSubcategoryMockMvc = MockMvcBuilders.standaloneSetup(productSubcategoryResource)
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
    public static ProductSubcategory createEntity(EntityManager em) {
        ProductSubcategory productSubcategory = new ProductSubcategory()
            .description(DEFAULT_DESCRIPTION);
        // Add required entity
        ProductCategory productCategory = ProductCategoryResourceIntTest.createEntity(em);
        em.persist(productCategory);
        em.flush();
        productSubcategory.setCategory(productCategory);
        return productSubcategory;
    }

    @Before
    public void initTest() {
        productSubcategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductSubcategory() throws Exception {
        int databaseSizeBeforeCreate = productSubcategoryRepository.findAll().size();

        // Create the ProductSubcategory
        restProductSubcategoryMockMvc.perform(post("/api/product-subcategories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSubcategory)))
            .andExpect(status().isCreated());

        // Validate the ProductSubcategory in the database
        List<ProductSubcategory> productSubcategoryList = productSubcategoryRepository.findAll();
        assertThat(productSubcategoryList).hasSize(databaseSizeBeforeCreate + 1);
        ProductSubcategory testProductSubcategory = productSubcategoryList.get(productSubcategoryList.size() - 1);
        assertThat(testProductSubcategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createProductSubcategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productSubcategoryRepository.findAll().size();

        // Create the ProductSubcategory with an existing ID
        productSubcategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductSubcategoryMockMvc.perform(post("/api/product-subcategories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSubcategory)))
            .andExpect(status().isBadRequest());

        // Validate the ProductSubcategory in the database
        List<ProductSubcategory> productSubcategoryList = productSubcategoryRepository.findAll();
        assertThat(productSubcategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = productSubcategoryRepository.findAll().size();
        // set the field null
        productSubcategory.setDescription(null);

        // Create the ProductSubcategory, which fails.

        restProductSubcategoryMockMvc.perform(post("/api/product-subcategories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSubcategory)))
            .andExpect(status().isBadRequest());

        List<ProductSubcategory> productSubcategoryList = productSubcategoryRepository.findAll();
        assertThat(productSubcategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductSubcategories() throws Exception {
        // Initialize the database
        productSubcategoryRepository.saveAndFlush(productSubcategory);

        // Get all the productSubcategoryList
        restProductSubcategoryMockMvc.perform(get("/api/product-subcategories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productSubcategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getProductSubcategory() throws Exception {
        // Initialize the database
        productSubcategoryRepository.saveAndFlush(productSubcategory);

        // Get the productSubcategory
        restProductSubcategoryMockMvc.perform(get("/api/product-subcategories/{id}", productSubcategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productSubcategory.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProductSubcategory() throws Exception {
        // Get the productSubcategory
        restProductSubcategoryMockMvc.perform(get("/api/product-subcategories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductSubcategory() throws Exception {
        // Initialize the database
        productSubcategoryService.save(productSubcategory);

        int databaseSizeBeforeUpdate = productSubcategoryRepository.findAll().size();

        // Update the productSubcategory
        ProductSubcategory updatedProductSubcategory = productSubcategoryRepository.findById(productSubcategory.getId()).get();
        // Disconnect from session so that the updates on updatedProductSubcategory are not directly saved in db
        em.detach(updatedProductSubcategory);
        updatedProductSubcategory
            .description(UPDATED_DESCRIPTION);

        restProductSubcategoryMockMvc.perform(put("/api/product-subcategories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductSubcategory)))
            .andExpect(status().isOk());

        // Validate the ProductSubcategory in the database
        List<ProductSubcategory> productSubcategoryList = productSubcategoryRepository.findAll();
        assertThat(productSubcategoryList).hasSize(databaseSizeBeforeUpdate);
        ProductSubcategory testProductSubcategory = productSubcategoryList.get(productSubcategoryList.size() - 1);
        assertThat(testProductSubcategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingProductSubcategory() throws Exception {
        int databaseSizeBeforeUpdate = productSubcategoryRepository.findAll().size();

        // Create the ProductSubcategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductSubcategoryMockMvc.perform(put("/api/product-subcategories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSubcategory)))
            .andExpect(status().isBadRequest());

        // Validate the ProductSubcategory in the database
        List<ProductSubcategory> productSubcategoryList = productSubcategoryRepository.findAll();
        assertThat(productSubcategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductSubcategory() throws Exception {
        // Initialize the database
        productSubcategoryService.save(productSubcategory);

        int databaseSizeBeforeDelete = productSubcategoryRepository.findAll().size();

        // Delete the productSubcategory
        restProductSubcategoryMockMvc.perform(delete("/api/product-subcategories/{id}", productSubcategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductSubcategory> productSubcategoryList = productSubcategoryRepository.findAll();
        assertThat(productSubcategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductSubcategory.class);
        ProductSubcategory productSubcategory1 = new ProductSubcategory();
        productSubcategory1.setId(1L);
        ProductSubcategory productSubcategory2 = new ProductSubcategory();
        productSubcategory2.setId(productSubcategory1.getId());
        assertThat(productSubcategory1).isEqualTo(productSubcategory2);
        productSubcategory2.setId(2L);
        assertThat(productSubcategory1).isNotEqualTo(productSubcategory2);
        productSubcategory1.setId(null);
        assertThat(productSubcategory1).isNotEqualTo(productSubcategory2);
    }
}
