package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.ProductPortion;
import pl.marczynski.dietify.recipes.domain.RecipeSection;
import pl.marczynski.dietify.recipes.repository.ProductPortionRepository;
import pl.marczynski.dietify.recipes.repository.search.ProductPortionSearchRepository;
import pl.marczynski.dietify.recipes.service.ProductPortionService;
import pl.marczynski.dietify.recipes.service.dto.ProductPortionDTO;
import pl.marczynski.dietify.recipes.service.mapper.ProductPortionMapper;
import pl.marczynski.dietify.recipes.web.rest.errors.ExceptionTranslator;

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

import static pl.marczynski.dietify.recipes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ProductPortionResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class ProductPortionResourceIT {

    private static final Double DEFAULT_AMOUNT = 0D;
    private static final Double UPDATED_AMOUNT = 1D;

    private static final Long DEFAULT_PRODUCT_ID = 1L;
    private static final Long UPDATED_PRODUCT_ID = 2L;

    private static final Long DEFAULT_HOUSEHOLD_MEASURE_ID = 1L;
    private static final Long UPDATED_HOUSEHOLD_MEASURE_ID = 2L;

    @Autowired
    private ProductPortionRepository productPortionRepository;

    @Autowired
    private ProductPortionMapper productPortionMapper;

    @Autowired
    private ProductPortionService productPortionService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.ProductPortionSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductPortionSearchRepository mockProductPortionSearchRepository;

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

    @BeforeEach
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
        ProductPortion productPortion = new ProductPortion();
        productPortion.setAmount(DEFAULT_AMOUNT);
        productPortion.setProductId(DEFAULT_PRODUCT_ID);
        productPortion.setHouseholdMeasureId(DEFAULT_HOUSEHOLD_MEASURE_ID);
        // Add required entity
        RecipeSection recipeSection;
        if (TestUtil.findAll(em, RecipeSection.class).isEmpty()) {
            recipeSection = RecipeSectionResourceIT.createEntity(em);
            em.persist(recipeSection);
            em.flush();
        } else {
            recipeSection = TestUtil.findAll(em, RecipeSection.class).get(0);
        }
        productPortion.setRecipeSection(recipeSection);
        return productPortion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductPortion createUpdatedEntity(EntityManager em) {
        ProductPortion productPortion = new ProductPortion();
        productPortion.setAmount(UPDATED_AMOUNT);
        productPortion.setProductId(UPDATED_PRODUCT_ID);
        productPortion.setHouseholdMeasureId(UPDATED_HOUSEHOLD_MEASURE_ID);
        // Add required entity
        RecipeSection recipeSection;
        if (TestUtil.findAll(em, RecipeSection.class).isEmpty()) {
            recipeSection = RecipeSectionResourceIT.createUpdatedEntity(em);
            em.persist(recipeSection);
            em.flush();
        } else {
            recipeSection = TestUtil.findAll(em, RecipeSection.class).get(0);
        }
        productPortion.setRecipeSection(recipeSection);
        return productPortion;
    }

    @BeforeEach
    public void initTest() {
        productPortion = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductPortion() throws Exception {
        int databaseSizeBeforeCreate = productPortionRepository.findAll().size();

        // Create the ProductPortion
        ProductPortionDTO productPortionDTO = productPortionMapper.toDto(productPortion);
        restProductPortionMockMvc.perform(post("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortionDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductPortion in the database
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeCreate + 1);
        ProductPortion testProductPortion = productPortionList.get(productPortionList.size() - 1);
        assertThat(testProductPortion.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testProductPortion.getProductId()).isEqualTo(DEFAULT_PRODUCT_ID);
        assertThat(testProductPortion.getHouseholdMeasureId()).isEqualTo(DEFAULT_HOUSEHOLD_MEASURE_ID);

        // Validate the ProductPortion in Elasticsearch
        verify(mockProductPortionSearchRepository, times(1)).save(testProductPortion);
    }

    @Test
    @Transactional
    public void createProductPortionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productPortionRepository.findAll().size();

        // Create the ProductPortion with an existing ID
        productPortion.setId(1L);
        ProductPortionDTO productPortionDTO = productPortionMapper.toDto(productPortion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductPortionMockMvc.perform(post("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductPortion in the database
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductPortion in Elasticsearch
        verify(mockProductPortionSearchRepository, times(0)).save(productPortion);
    }


    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = productPortionRepository.findAll().size();
        // set the field null
        productPortion.setAmount(null);

        // Create the ProductPortion, which fails.
        ProductPortionDTO productPortionDTO = productPortionMapper.toDto(productPortion);

        restProductPortionMockMvc.perform(post("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortionDTO)))
            .andExpect(status().isBadRequest());

        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProductIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = productPortionRepository.findAll().size();
        // set the field null
        productPortion.setProductId(null);

        // Create the ProductPortion, which fails.
        ProductPortionDTO productPortionDTO = productPortionMapper.toDto(productPortion);

        restProductPortionMockMvc.perform(post("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortionDTO)))
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
        productPortionRepository.saveAndFlush(productPortion);

        int databaseSizeBeforeUpdate = productPortionRepository.findAll().size();

        // Update the productPortion
        ProductPortion updatedProductPortion = productPortionRepository.findById(productPortion.getId()).get();
        // Disconnect from session so that the updates on updatedProductPortion are not directly saved in db
        em.detach(updatedProductPortion);
        updatedProductPortion.setAmount(UPDATED_AMOUNT);
        updatedProductPortion.setProductId(UPDATED_PRODUCT_ID);
        updatedProductPortion.setHouseholdMeasureId(UPDATED_HOUSEHOLD_MEASURE_ID);
        ProductPortionDTO productPortionDTO = productPortionMapper.toDto(updatedProductPortion);

        restProductPortionMockMvc.perform(put("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortionDTO)))
            .andExpect(status().isOk());

        // Validate the ProductPortion in the database
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeUpdate);
        ProductPortion testProductPortion = productPortionList.get(productPortionList.size() - 1);
        assertThat(testProductPortion.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testProductPortion.getProductId()).isEqualTo(UPDATED_PRODUCT_ID);
        assertThat(testProductPortion.getHouseholdMeasureId()).isEqualTo(UPDATED_HOUSEHOLD_MEASURE_ID);

        // Validate the ProductPortion in Elasticsearch
        verify(mockProductPortionSearchRepository, times(1)).save(testProductPortion);
    }

    @Test
    @Transactional
    public void updateNonExistingProductPortion() throws Exception {
        int databaseSizeBeforeUpdate = productPortionRepository.findAll().size();

        // Create the ProductPortion
        ProductPortionDTO productPortionDTO = productPortionMapper.toDto(productPortion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductPortionMockMvc.perform(put("/api/product-portions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productPortionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductPortion in the database
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductPortion in Elasticsearch
        verify(mockProductPortionSearchRepository, times(0)).save(productPortion);
    }

    @Test
    @Transactional
    public void deleteProductPortion() throws Exception {
        // Initialize the database
        productPortionRepository.saveAndFlush(productPortion);

        int databaseSizeBeforeDelete = productPortionRepository.findAll().size();

        // Delete the productPortion
        restProductPortionMockMvc.perform(delete("/api/product-portions/{id}", productPortion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductPortion> productPortionList = productPortionRepository.findAll();
        assertThat(productPortionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductPortion in Elasticsearch
        verify(mockProductPortionSearchRepository, times(1)).deleteById(productPortion.getId());
    }

    @Test
    @Transactional
    public void searchProductPortion() throws Exception {
        // Initialize the database
        productPortionRepository.saveAndFlush(productPortion);
        when(mockProductPortionSearchRepository.search(queryStringQuery("id:" + productPortion.getId())))
            .thenReturn(Collections.singletonList(productPortion));
        // Search the productPortion
        restProductPortionMockMvc.perform(get("/api/_search/product-portions?query=id:" + productPortion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productPortion.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].productId").value(hasItem(DEFAULT_PRODUCT_ID.intValue())))
            .andExpect(jsonPath("$.[*].householdMeasureId").value(hasItem(DEFAULT_HOUSEHOLD_MEASURE_ID.intValue())));
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

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductPortionDTO.class);
        ProductPortionDTO productPortionDTO1 = new ProductPortionDTO();
        productPortionDTO1.setId(1L);
        ProductPortionDTO productPortionDTO2 = new ProductPortionDTO();
        assertThat(productPortionDTO1).isNotEqualTo(productPortionDTO2);
        productPortionDTO2.setId(productPortionDTO1.getId());
        assertThat(productPortionDTO1).isEqualTo(productPortionDTO2);
        productPortionDTO2.setId(2L);
        assertThat(productPortionDTO1).isNotEqualTo(productPortionDTO2);
        productPortionDTO1.setId(null);
        assertThat(productPortionDTO1).isNotEqualTo(productPortionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productPortionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productPortionMapper.fromId(null)).isNull();
    }
}
