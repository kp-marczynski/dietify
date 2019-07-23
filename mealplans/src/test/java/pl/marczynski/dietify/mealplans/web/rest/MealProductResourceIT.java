package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.MealplansApp;
import pl.marczynski.dietify.mealplans.domain.MealProduct;
import pl.marczynski.dietify.mealplans.domain.Meal;
import pl.marczynski.dietify.mealplans.repository.MealProductRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealProductSearchRepository;
import pl.marczynski.dietify.mealplans.service.MealProductService;
import pl.marczynski.dietify.mealplans.web.rest.errors.ExceptionTranslator;

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

import static pl.marczynski.dietify.mealplans.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link MealProductResource} REST controller.
 */
@SpringBootTest(classes = MealplansApp.class)
public class MealProductResourceIT {

    private static final Long DEFAULT_PRODUCT_ID = 1L;
    private static final Long UPDATED_PRODUCT_ID = 2L;

    private static final Long DEFAULT_HOUSEHOLD_MEASURE_ID = 1L;
    private static final Long UPDATED_HOUSEHOLD_MEASURE_ID = 2L;

    private static final Double DEFAULT_AMOUNT = 0D;
    private static final Double UPDATED_AMOUNT = 1D;

    @Autowired
    private MealProductRepository mealProductRepository;

    @Autowired
    private MealProductService mealProductService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.mealplans.repository.search test package.
     *
     * @see pl.marczynski.dietify.mealplans.repository.search.MealProductSearchRepositoryMockConfiguration
     */
    @Autowired
    private MealProductSearchRepository mockMealProductSearchRepository;

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

    private MockMvc restMealProductMockMvc;

    private MealProduct mealProduct;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealProductResource mealProductResource = new MealProductResource(mealProductService);
        this.restMealProductMockMvc = MockMvcBuilders.standaloneSetup(mealProductResource)
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
    public static MealProduct createEntity(EntityManager em) {
        MealProduct mealProduct = new MealProduct();
        mealProduct.setProductId(DEFAULT_PRODUCT_ID);
        mealProduct.setHouseholdMeasureId(DEFAULT_HOUSEHOLD_MEASURE_ID);
        mealProduct.setAmount(DEFAULT_AMOUNT);
        // Add required entity
        Meal meal;
        if (TestUtil.findAll(em, Meal.class).isEmpty()) {
            meal = MealResourceIT.createEntity(em);
            em.persist(meal);
            em.flush();
        } else {
            meal = TestUtil.findAll(em, Meal.class).get(0);
        }
        mealProduct.setMeal(meal);
        return mealProduct;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealProduct createUpdatedEntity(EntityManager em) {
        MealProduct mealProduct = new MealProduct();
        mealProduct.setProductId(UPDATED_PRODUCT_ID);
        mealProduct.setHouseholdMeasureId(UPDATED_HOUSEHOLD_MEASURE_ID);
        mealProduct.setAmount(UPDATED_AMOUNT);
        // Add required entity
        Meal meal;
        if (TestUtil.findAll(em, Meal.class).isEmpty()) {
            meal = MealResourceIT.createUpdatedEntity(em);
            em.persist(meal);
            em.flush();
        } else {
            meal = TestUtil.findAll(em, Meal.class).get(0);
        }
        mealProduct.setMeal(meal);
        return mealProduct;
    }

    @BeforeEach
    public void initTest() {
        mealProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealProduct() throws Exception {
        int databaseSizeBeforeCreate = mealProductRepository.findAll().size();

        // Create the MealProduct
        restMealProductMockMvc.perform(post("/api/meal-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealProduct)))
            .andExpect(status().isCreated());

        // Validate the MealProduct in the database
        List<MealProduct> mealProductList = mealProductRepository.findAll();
        assertThat(mealProductList).hasSize(databaseSizeBeforeCreate + 1);
        MealProduct testMealProduct = mealProductList.get(mealProductList.size() - 1);
        assertThat(testMealProduct.getProductId()).isEqualTo(DEFAULT_PRODUCT_ID);
        assertThat(testMealProduct.getHouseholdMeasureId()).isEqualTo(DEFAULT_HOUSEHOLD_MEASURE_ID);
        assertThat(testMealProduct.getAmount()).isEqualTo(DEFAULT_AMOUNT);

        // Validate the MealProduct in Elasticsearch
        verify(mockMealProductSearchRepository, times(1)).save(testMealProduct);
    }

    @Test
    @Transactional
    public void createMealProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealProductRepository.findAll().size();

        // Create the MealProduct with an existing ID
        mealProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealProductMockMvc.perform(post("/api/meal-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealProduct)))
            .andExpect(status().isBadRequest());

        // Validate the MealProduct in the database
        List<MealProduct> mealProductList = mealProductRepository.findAll();
        assertThat(mealProductList).hasSize(databaseSizeBeforeCreate);

        // Validate the MealProduct in Elasticsearch
        verify(mockMealProductSearchRepository, times(0)).save(mealProduct);
    }


    @Test
    @Transactional
    public void checkProductIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealProductRepository.findAll().size();
        // set the field null
        mealProduct.setProductId(null);

        // Create the MealProduct, which fails.

        restMealProductMockMvc.perform(post("/api/meal-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealProduct)))
            .andExpect(status().isBadRequest());

        List<MealProduct> mealProductList = mealProductRepository.findAll();
        assertThat(mealProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealProductRepository.findAll().size();
        // set the field null
        mealProduct.setAmount(null);

        // Create the MealProduct, which fails.

        restMealProductMockMvc.perform(post("/api/meal-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealProduct)))
            .andExpect(status().isBadRequest());

        List<MealProduct> mealProductList = mealProductRepository.findAll();
        assertThat(mealProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealProducts() throws Exception {
        // Initialize the database
        mealProductRepository.saveAndFlush(mealProduct);

        // Get all the mealProductList
        restMealProductMockMvc.perform(get("/api/meal-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].productId").value(hasItem(DEFAULT_PRODUCT_ID.intValue())))
            .andExpect(jsonPath("$.[*].householdMeasureId").value(hasItem(DEFAULT_HOUSEHOLD_MEASURE_ID.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getMealProduct() throws Exception {
        // Initialize the database
        mealProductRepository.saveAndFlush(mealProduct);

        // Get the mealProduct
        restMealProductMockMvc.perform(get("/api/meal-products/{id}", mealProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealProduct.getId().intValue()))
            .andExpect(jsonPath("$.productId").value(DEFAULT_PRODUCT_ID.intValue()))
            .andExpect(jsonPath("$.householdMeasureId").value(DEFAULT_HOUSEHOLD_MEASURE_ID.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMealProduct() throws Exception {
        // Get the mealProduct
        restMealProductMockMvc.perform(get("/api/meal-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealProduct() throws Exception {
        // Initialize the database
        mealProductService.save(mealProduct);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockMealProductSearchRepository);

        int databaseSizeBeforeUpdate = mealProductRepository.findAll().size();

        // Update the mealProduct
        MealProduct updatedMealProduct = mealProductRepository.findById(mealProduct.getId()).get();
        // Disconnect from session so that the updates on updatedMealProduct are not directly saved in db
        em.detach(updatedMealProduct);
        updatedMealProduct.setProductId(UPDATED_PRODUCT_ID);
        updatedMealProduct.setHouseholdMeasureId(UPDATED_HOUSEHOLD_MEASURE_ID);
        updatedMealProduct.setAmount(UPDATED_AMOUNT);

        restMealProductMockMvc.perform(put("/api/meal-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealProduct)))
            .andExpect(status().isOk());

        // Validate the MealProduct in the database
        List<MealProduct> mealProductList = mealProductRepository.findAll();
        assertThat(mealProductList).hasSize(databaseSizeBeforeUpdate);
        MealProduct testMealProduct = mealProductList.get(mealProductList.size() - 1);
        assertThat(testMealProduct.getProductId()).isEqualTo(UPDATED_PRODUCT_ID);
        assertThat(testMealProduct.getHouseholdMeasureId()).isEqualTo(UPDATED_HOUSEHOLD_MEASURE_ID);
        assertThat(testMealProduct.getAmount()).isEqualTo(UPDATED_AMOUNT);

        // Validate the MealProduct in Elasticsearch
        verify(mockMealProductSearchRepository, times(1)).save(testMealProduct);
    }

    @Test
    @Transactional
    public void updateNonExistingMealProduct() throws Exception {
        int databaseSizeBeforeUpdate = mealProductRepository.findAll().size();

        // Create the MealProduct

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealProductMockMvc.perform(put("/api/meal-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealProduct)))
            .andExpect(status().isBadRequest());

        // Validate the MealProduct in the database
        List<MealProduct> mealProductList = mealProductRepository.findAll();
        assertThat(mealProductList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MealProduct in Elasticsearch
        verify(mockMealProductSearchRepository, times(0)).save(mealProduct);
    }

    @Test
    @Transactional
    public void deleteMealProduct() throws Exception {
        // Initialize the database
        mealProductService.save(mealProduct);

        int databaseSizeBeforeDelete = mealProductRepository.findAll().size();

        // Delete the mealProduct
        restMealProductMockMvc.perform(delete("/api/meal-products/{id}", mealProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MealProduct> mealProductList = mealProductRepository.findAll();
        assertThat(mealProductList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MealProduct in Elasticsearch
        verify(mockMealProductSearchRepository, times(1)).deleteById(mealProduct.getId());
    }

    @Test
    @Transactional
    public void searchMealProduct() throws Exception {
        // Initialize the database
        mealProductService.save(mealProduct);
        when(mockMealProductSearchRepository.search(queryStringQuery("id:" + mealProduct.getId())))
            .thenReturn(Collections.singletonList(mealProduct));
        // Search the mealProduct
        restMealProductMockMvc.perform(get("/api/_search/meal-products?query=id:" + mealProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].productId").value(hasItem(DEFAULT_PRODUCT_ID.intValue())))
            .andExpect(jsonPath("$.[*].householdMeasureId").value(hasItem(DEFAULT_HOUSEHOLD_MEASURE_ID.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealProduct.class);
        MealProduct mealProduct1 = new MealProduct();
        mealProduct1.setId(1L);
        MealProduct mealProduct2 = new MealProduct();
        mealProduct2.setId(mealProduct1.getId());
        assertThat(mealProduct1).isEqualTo(mealProduct2);
        mealProduct2.setId(2L);
        assertThat(mealProduct1).isNotEqualTo(mealProduct2);
        mealProduct1.setId(null);
        assertThat(mealProduct1).isNotEqualTo(mealProduct2);
    }
}
