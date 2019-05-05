package pl.marczynski.dietify.mealplans.web.rest;

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
import pl.marczynski.dietify.core.DietifyApp;
import pl.marczynski.dietify.core.web.rest.TestUtil;
import pl.marczynski.dietify.core.web.rest.errors.ExceptionTranslator;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.domain.MealPlanCreator;
import pl.marczynski.dietify.mealplans.domain.MealProduct;
import pl.marczynski.dietify.mealplans.domain.MealProductCreator;
import pl.marczynski.dietify.mealplans.repository.MealProductRepository;
import pl.marczynski.dietify.mealplans.service.MealProductService;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static pl.marczynski.dietify.mealplans.domain.MealProductCreator.*;

/**
 * Test class for the MealProductResource REST controller.
 *
 * @see MealProductResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class MealProductResourceIntTest {

    @Autowired
    private MealProductRepository mealProductRepository;

    @Autowired
    private MealProductService mealProductService;

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

    @Before
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

    @Before
    public void initTest() {
        mealProduct = MealProductCreator.createEntity();
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

        int databaseSizeBeforeUpdate = mealProductRepository.findAll().size();

        // Update the mealProduct
        MealProduct updatedMealProduct = mealProductRepository.findById(mealProduct.getId()).get();
        // Disconnect from session so that the updates on updatedMealProduct are not directly saved in db
        em.detach(updatedMealProduct);
        updatedMealProduct
            .productId(UPDATED_PRODUCT_ID)
            .householdMeasureId(UPDATED_HOUSEHOLD_MEASURE_ID)
            .amount(UPDATED_AMOUNT);

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
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MealProduct> mealProductList = mealProductRepository.findAll();
        assertThat(mealProductList).hasSize(databaseSizeBeforeDelete - 1);
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
