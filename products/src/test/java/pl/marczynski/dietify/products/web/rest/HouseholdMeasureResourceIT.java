package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.ProductsApp;
import pl.marczynski.dietify.products.domain.HouseholdMeasure;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.repository.HouseholdMeasureRepository;
import pl.marczynski.dietify.products.repository.search.HouseholdMeasureSearchRepository;
import pl.marczynski.dietify.products.service.HouseholdMeasureService;
import pl.marczynski.dietify.products.service.dto.HouseholdMeasureDTO;
import pl.marczynski.dietify.products.service.mapper.HouseholdMeasureMapper;
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
 * Integration tests for the {@Link HouseholdMeasureResource} REST controller.
 */
@SpringBootTest(classes = ProductsApp.class)
public class HouseholdMeasureResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_GRAMS_WEIGHT = 0D;
    private static final Double UPDATED_GRAMS_WEIGHT = 1D;

    private static final Boolean DEFAULT_IS_VISIBLE = false;
    private static final Boolean UPDATED_IS_VISIBLE = true;

    @Autowired
    private HouseholdMeasureRepository householdMeasureRepository;

    @Autowired
    private HouseholdMeasureMapper householdMeasureMapper;

    @Autowired
    private HouseholdMeasureService householdMeasureService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.products.repository.search test package.
     *
     * @see pl.marczynski.dietify.products.repository.search.HouseholdMeasureSearchRepositoryMockConfiguration
     */
    @Autowired
    private HouseholdMeasureSearchRepository mockHouseholdMeasureSearchRepository;

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

    private MockMvc restHouseholdMeasureMockMvc;

    private HouseholdMeasure householdMeasure;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HouseholdMeasureResource householdMeasureResource = new HouseholdMeasureResource(householdMeasureService);
        this.restHouseholdMeasureMockMvc = MockMvcBuilders.standaloneSetup(householdMeasureResource)
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
    public static HouseholdMeasure createEntity(EntityManager em) {
        HouseholdMeasure householdMeasure = new HouseholdMeasure();
        householdMeasure.setDescription(DEFAULT_DESCRIPTION);
        householdMeasure.setGramsWeight(DEFAULT_GRAMS_WEIGHT);
        householdMeasure.setIsVisible(DEFAULT_IS_VISIBLE);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        householdMeasure.setProduct(product);
        return householdMeasure;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HouseholdMeasure createUpdatedEntity(EntityManager em) {
        HouseholdMeasure householdMeasure = new HouseholdMeasure();
        householdMeasure.setDescription(UPDATED_DESCRIPTION);
        householdMeasure.setGramsWeight(UPDATED_GRAMS_WEIGHT);
        householdMeasure.setIsVisible(UPDATED_IS_VISIBLE);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createUpdatedEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        householdMeasure.setProduct(product);
        return householdMeasure;
    }

    @BeforeEach
    public void initTest() {
        householdMeasure = createEntity(em);
    }

    @Test
    @Transactional
    public void createHouseholdMeasure() throws Exception {
        int databaseSizeBeforeCreate = householdMeasureRepository.findAll().size();

        // Create the HouseholdMeasure
        HouseholdMeasureDTO householdMeasureDTO = householdMeasureMapper.toDto(householdMeasure);
        restHouseholdMeasureMockMvc.perform(post("/api/household-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMeasureDTO)))
            .andExpect(status().isCreated());

        // Validate the HouseholdMeasure in the database
        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
        assertThat(householdMeasureList).hasSize(databaseSizeBeforeCreate + 1);
        HouseholdMeasure testHouseholdMeasure = householdMeasureList.get(householdMeasureList.size() - 1);
        assertThat(testHouseholdMeasure.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testHouseholdMeasure.getGramsWeight()).isEqualTo(DEFAULT_GRAMS_WEIGHT);
        assertThat(testHouseholdMeasure.isIsVisible()).isEqualTo(DEFAULT_IS_VISIBLE);

        // Validate the HouseholdMeasure in Elasticsearch
        verify(mockHouseholdMeasureSearchRepository, times(1)).save(testHouseholdMeasure);
    }

    @Test
    @Transactional
    public void createHouseholdMeasureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = householdMeasureRepository.findAll().size();

        // Create the HouseholdMeasure with an existing ID
        householdMeasure.setId(1L);
        HouseholdMeasureDTO householdMeasureDTO = householdMeasureMapper.toDto(householdMeasure);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHouseholdMeasureMockMvc.perform(post("/api/household-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMeasureDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HouseholdMeasure in the database
        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
        assertThat(householdMeasureList).hasSize(databaseSizeBeforeCreate);

        // Validate the HouseholdMeasure in Elasticsearch
        verify(mockHouseholdMeasureSearchRepository, times(0)).save(householdMeasure);
    }


    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = householdMeasureRepository.findAll().size();
        // set the field null
        householdMeasure.setDescription(null);

        // Create the HouseholdMeasure, which fails.
        HouseholdMeasureDTO householdMeasureDTO = householdMeasureMapper.toDto(householdMeasure);

        restHouseholdMeasureMockMvc.perform(post("/api/household-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMeasureDTO)))
            .andExpect(status().isBadRequest());

        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
        assertThat(householdMeasureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGramsWeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = householdMeasureRepository.findAll().size();
        // set the field null
        householdMeasure.setGramsWeight(null);

        // Create the HouseholdMeasure, which fails.
        HouseholdMeasureDTO householdMeasureDTO = householdMeasureMapper.toDto(householdMeasure);

        restHouseholdMeasureMockMvc.perform(post("/api/household-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMeasureDTO)))
            .andExpect(status().isBadRequest());

        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
        assertThat(householdMeasureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsVisibleIsRequired() throws Exception {
        int databaseSizeBeforeTest = householdMeasureRepository.findAll().size();
        // set the field null
        householdMeasure.setIsVisible(null);

        // Create the HouseholdMeasure, which fails.
        HouseholdMeasureDTO householdMeasureDTO = householdMeasureMapper.toDto(householdMeasure);

        restHouseholdMeasureMockMvc.perform(post("/api/household-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMeasureDTO)))
            .andExpect(status().isBadRequest());

        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
        assertThat(householdMeasureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHouseholdMeasures() throws Exception {
        // Initialize the database
        householdMeasureRepository.saveAndFlush(householdMeasure);

        // Get all the householdMeasureList
        restHouseholdMeasureMockMvc.perform(get("/api/household-measures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(householdMeasure.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].gramsWeight").value(hasItem(DEFAULT_GRAMS_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].isVisible").value(hasItem(DEFAULT_IS_VISIBLE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getHouseholdMeasure() throws Exception {
        // Initialize the database
        householdMeasureRepository.saveAndFlush(householdMeasure);

        // Get the householdMeasure
        restHouseholdMeasureMockMvc.perform(get("/api/household-measures/{id}", householdMeasure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(householdMeasure.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.gramsWeight").value(DEFAULT_GRAMS_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.isVisible").value(DEFAULT_IS_VISIBLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHouseholdMeasure() throws Exception {
        // Get the householdMeasure
        restHouseholdMeasureMockMvc.perform(get("/api/household-measures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHouseholdMeasure() throws Exception {
        // Initialize the database
        householdMeasureRepository.saveAndFlush(householdMeasure);

        int databaseSizeBeforeUpdate = householdMeasureRepository.findAll().size();

        // Update the householdMeasure
        HouseholdMeasure updatedHouseholdMeasure = householdMeasureRepository.findById(householdMeasure.getId()).get();
        // Disconnect from session so that the updates on updatedHouseholdMeasure are not directly saved in db
        em.detach(updatedHouseholdMeasure);
        updatedHouseholdMeasure.setDescription(UPDATED_DESCRIPTION);
        updatedHouseholdMeasure.setGramsWeight(UPDATED_GRAMS_WEIGHT);
        updatedHouseholdMeasure.setIsVisible(UPDATED_IS_VISIBLE);
        HouseholdMeasureDTO householdMeasureDTO = householdMeasureMapper.toDto(updatedHouseholdMeasure);

        restHouseholdMeasureMockMvc.perform(put("/api/household-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMeasureDTO)))
            .andExpect(status().isOk());

        // Validate the HouseholdMeasure in the database
        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
        assertThat(householdMeasureList).hasSize(databaseSizeBeforeUpdate);
        HouseholdMeasure testHouseholdMeasure = householdMeasureList.get(householdMeasureList.size() - 1);
        assertThat(testHouseholdMeasure.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testHouseholdMeasure.getGramsWeight()).isEqualTo(UPDATED_GRAMS_WEIGHT);
        assertThat(testHouseholdMeasure.isIsVisible()).isEqualTo(UPDATED_IS_VISIBLE);

        // Validate the HouseholdMeasure in Elasticsearch
        verify(mockHouseholdMeasureSearchRepository, times(1)).save(testHouseholdMeasure);
    }

    @Test
    @Transactional
    public void updateNonExistingHouseholdMeasure() throws Exception {
        int databaseSizeBeforeUpdate = householdMeasureRepository.findAll().size();

        // Create the HouseholdMeasure
        HouseholdMeasureDTO householdMeasureDTO = householdMeasureMapper.toDto(householdMeasure);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHouseholdMeasureMockMvc.perform(put("/api/household-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMeasureDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HouseholdMeasure in the database
        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
        assertThat(householdMeasureList).hasSize(databaseSizeBeforeUpdate);

        // Validate the HouseholdMeasure in Elasticsearch
        verify(mockHouseholdMeasureSearchRepository, times(0)).save(householdMeasure);
    }

    @Test
    @Transactional
    public void deleteHouseholdMeasure() throws Exception {
        // Initialize the database
        householdMeasureRepository.saveAndFlush(householdMeasure);

        int databaseSizeBeforeDelete = householdMeasureRepository.findAll().size();

        // Delete the householdMeasure
        restHouseholdMeasureMockMvc.perform(delete("/api/household-measures/{id}", householdMeasure.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
        assertThat(householdMeasureList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the HouseholdMeasure in Elasticsearch
        verify(mockHouseholdMeasureSearchRepository, times(1)).deleteById(householdMeasure.getId());
    }

    @Test
    @Transactional
    public void searchHouseholdMeasure() throws Exception {
        // Initialize the database
        householdMeasureRepository.saveAndFlush(householdMeasure);
        when(mockHouseholdMeasureSearchRepository.search(queryStringQuery("id:" + householdMeasure.getId())))
            .thenReturn(Collections.singletonList(householdMeasure));
        // Search the householdMeasure
        restHouseholdMeasureMockMvc.perform(get("/api/_search/household-measures?query=id:" + householdMeasure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(householdMeasure.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].gramsWeight").value(hasItem(DEFAULT_GRAMS_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].isVisible").value(hasItem(DEFAULT_IS_VISIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HouseholdMeasure.class);
        HouseholdMeasure householdMeasure1 = new HouseholdMeasure();
        householdMeasure1.setId(1L);
        HouseholdMeasure householdMeasure2 = new HouseholdMeasure();
        householdMeasure2.setId(householdMeasure1.getId());
        assertThat(householdMeasure1).isEqualTo(householdMeasure2);
        householdMeasure2.setId(2L);
        assertThat(householdMeasure1).isNotEqualTo(householdMeasure2);
        householdMeasure1.setId(null);
        assertThat(householdMeasure1).isNotEqualTo(householdMeasure2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HouseholdMeasureDTO.class);
        HouseholdMeasureDTO householdMeasureDTO1 = new HouseholdMeasureDTO();
        householdMeasureDTO1.setId(1L);
        HouseholdMeasureDTO householdMeasureDTO2 = new HouseholdMeasureDTO();
        assertThat(householdMeasureDTO1).isNotEqualTo(householdMeasureDTO2);
        householdMeasureDTO2.setId(householdMeasureDTO1.getId());
        assertThat(householdMeasureDTO1).isEqualTo(householdMeasureDTO2);
        householdMeasureDTO2.setId(2L);
        assertThat(householdMeasureDTO1).isNotEqualTo(householdMeasureDTO2);
        householdMeasureDTO1.setId(null);
        assertThat(householdMeasureDTO1).isNotEqualTo(householdMeasureDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(householdMeasureMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(householdMeasureMapper.fromId(null)).isNull();
    }
}
