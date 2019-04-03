package pl.marczynski.dietify.core.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.recipes.domain.ProductPortion;
import pl.marczynski.dietify.recipes.domain.RecipeSection;
import pl.marczynski.dietify.recipes.repository.ProductPortionRepository;
import pl.marczynski.dietify.recipes.service.ProductPortionService;
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
import pl.marczynski.dietify.recipes.web.rest.ProductPortionResource;

import javax.persistence.EntityManager;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProductPortionResource REST controller.
 *
 * @see ProductPortionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class ProductPortionResourceIntTest {

    private static final Double DEFAULT_AMOUNT = 0D;
    private static final Double UPDATED_AMOUNT = 1D;

    private static final Long DEFAULT_PRODUCT_ID = 1L;
    private static final Long UPDATED_PRODUCT_ID = 2L;

    private static final Long DEFAULT_HOUSEHOLD_MEASURE_ID = 1L;
    private static final Long UPDATED_HOUSEHOLD_MEASURE_ID = 2L;

    @Autowired
    private ProductPortionRepository productPortionRepository;

    @Autowired
    private ProductPortionService productPortionService;

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

    private MockMvc restProductPortionMockMvc;

    private ProductPortion productPortion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductPortionResource productPortionResource = new ProductPortionResource(productPortionService);
        this.restProductPortionMockMvc = MockMvcBuilders.standaloneSetup(productPortionResource)
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
    public static ProductPortion createEntity(EntityManager em) {
        ProductPortion productPortion = new ProductPortion()
            .amount(DEFAULT_AMOUNT)
            .productId(DEFAULT_PRODUCT_ID)
            .householdMeasureId(DEFAULT_HOUSEHOLD_MEASURE_ID);
        // Add required entity
        RecipeSection recipeSection = RecipeSectionResourceIntTest.createEntity(em);
        em.persist(recipeSection);
        em.flush();
        productPortion.setRecipeSection(recipeSection);
        return productPortion;
    }

    @Before
    public void initTest() {
        productPortion = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductPortion() throws Exception {
        int databaseSizeBeforeCreate = productPortionRepository.findAll().size();

        // Create the ProductPortion
        restProductPortionMockMvc.perform(post("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortion)))
            .andExpect(status().isCreated());

        // Validate the ProductPortion in the database
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeCreate + 1);
        ProductPortion testProductPortion = productPortionList.get(productPortionList.size() - 1);
        assertThat(testProductPortion.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testProductPortion.getProductId()).isEqualTo(DEFAULT_PRODUCT_ID);
        assertThat(testProductPortion.getHouseholdMeasureId()).isEqualTo(DEFAULT_HOUSEHOLD_MEASURE_ID);
    }

    @Test
    @Transactional
    public void createProductPortionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productPortionRepository.findAll().size();

        // Create the ProductPortion with an existing ID
        productPortion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductPortionMockMvc.perform(post("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortion)))
            .andExpect(status().isBadRequest());

        // Validate the ProductPortion in the database
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = productPortionRepository.findAll().size();
        // set the field null
        productPortion.setAmount(null);

        // Create the ProductPortion, which fails.

        restProductPortionMockMvc.perform(post("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortion)))
            .andExpect(status().isBadRequest());

        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductPortions() throws Exception {
        // Initialize the database
        productPortionRepository.saveAndFlush(productPortion);

        // Get all the productPortionList
        restProductPortionMockMvc.perform(get("/api/product-portions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productPortion.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].productId").value(hasItem(DEFAULT_PRODUCT_ID.intValue())))
            .andExpect(jsonPath("$.[*].householdMeasureId").value(hasItem(DEFAULT_HOUSEHOLD_MEASURE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getProductPortion() throws Exception {
        // Initialize the database
        productPortionRepository.saveAndFlush(productPortion);

        // Get the productPortion
        restProductPortionMockMvc.perform(get("/api/product-portions/{id}", productPortion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productPortion.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.productId").value(DEFAULT_PRODUCT_ID.intValue()))
            .andExpect(jsonPath("$.householdMeasureId").value(DEFAULT_HOUSEHOLD_MEASURE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProductPortion() throws Exception {
        // Get the productPortion
        restProductPortionMockMvc.perform(get("/api/product-portions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductPortion() throws Exception {
        // Initialize the database
        productPortionService.save(productPortion);

        int databaseSizeBeforeUpdate = productPortionRepository.findAll().size();

        // Update the productPortion
        ProductPortion updatedProductPortion = productPortionRepository.findById(productPortion.getId()).get();
        // Disconnect from session so that the updates on updatedProductPortion are not directly saved in db
        em.detach(updatedProductPortion);
        updatedProductPortion
            .amount(UPDATED_AMOUNT)
            .productId(UPDATED_PRODUCT_ID)
            .householdMeasureId(UPDATED_HOUSEHOLD_MEASURE_ID);

        restProductPortionMockMvc.perform(put("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductPortion)))
            .andExpect(status().isOk());

        // Validate the ProductPortion in the database
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeUpdate);
        ProductPortion testProductPortion = productPortionList.get(productPortionList.size() - 1);
        assertThat(testProductPortion.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testProductPortion.getProductId()).isEqualTo(UPDATED_PRODUCT_ID);
        assertThat(testProductPortion.getHouseholdMeasureId()).isEqualTo(UPDATED_HOUSEHOLD_MEASURE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingProductPortion() throws Exception {
        int databaseSizeBeforeUpdate = productPortionRepository.findAll().size();

        // Create the ProductPortion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductPortionMockMvc.perform(put("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortion)))
            .andExpect(status().isBadRequest());

        // Validate the ProductPortion in the database
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductPortion() throws Exception {
        // Initialize the database
        productPortionService.save(productPortion);

        int databaseSizeBeforeDelete = productPortionRepository.findAll().size();

        // Delete the productPortion
        restProductPortionMockMvc.perform(delete("/api/product-portions/{id}", productPortion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductPortion.class);
        ProductPortion productPortion1 = new ProductPortion();
        productPortion1.setId(1L);
        ProductPortion productPortion2 = new ProductPortion();
        productPortion2.setId(productPortion1.getId());
        assertThat(productPortion1).isEqualTo(productPortion2);
        productPortion2.setId(2L);
        assertThat(productPortion1).isNotEqualTo(productPortion2);
        productPortion1.setId(null);
        assertThat(productPortion1).isNotEqualTo(productPortion2);
    }
}
