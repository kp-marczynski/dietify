package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.ProductsApp;
import pl.marczynski.dietify.products.domain.DietTypeTranslation;
import pl.marczynski.dietify.products.domain.DietType;
import pl.marczynski.dietify.products.repository.DietTypeTranslationRepository;
import pl.marczynski.dietify.products.repository.search.DietTypeTranslationSearchRepository;
import pl.marczynski.dietify.products.service.DietTypeTranslationService;
import pl.marczynski.dietify.products.service.dto.DietTypeTranslationDTO;
import pl.marczynski.dietify.products.service.mapper.DietTypeTranslationMapper;
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
 * Integration tests for the {@Link DietTypeTranslationResource} REST controller.
 */
@SpringBootTest(classes = ProductsApp.class)
public class DietTypeTranslationResourceIT {

    private static final String DEFAULT_TRANSLATION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSLATION = "BBBBBBBBBB";

    private static final String DEFAULT_LANGUAGE = "AA";
    private static final String UPDATED_LANGUAGE = "BB";

    @Autowired
    private DietTypeTranslationRepository dietTypeTranslationRepository;

    @Autowired
    private DietTypeTranslationMapper dietTypeTranslationMapper;

    @Autowired
    private DietTypeTranslationService dietTypeTranslationService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.products.repository.search test package.
     *
     * @see pl.marczynski.dietify.products.repository.search.DietTypeTranslationSearchRepositoryMockConfiguration
     */
    @Autowired
    private DietTypeTranslationSearchRepository mockDietTypeTranslationSearchRepository;

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

    private MockMvc restDietTypeTranslationMockMvc;

    private DietTypeTranslation dietTypeTranslation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DietTypeTranslationResource dietTypeTranslationResource = new DietTypeTranslationResource(dietTypeTranslationService);
        this.restDietTypeTranslationMockMvc = MockMvcBuilders.standaloneSetup(dietTypeTranslationResource)
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
    public static DietTypeTranslation createEntity(EntityManager em) {
        DietTypeTranslation dietTypeTranslation = new DietTypeTranslation();
        dietTypeTranslation.setTranslation(DEFAULT_TRANSLATION);
        dietTypeTranslation.setLanguage(DEFAULT_LANGUAGE);
        // Add required entity
        DietType dietType;
        if (TestUtil.findAll(em, DietType.class).isEmpty()) {
            dietType = DietTypeResourceIT.createEntity(em);
            em.persist(dietType);
            em.flush();
        } else {
            dietType = TestUtil.findAll(em, DietType.class).get(0);
        }
        dietTypeTranslation.setDietType(dietType);
        return dietTypeTranslation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DietTypeTranslation createUpdatedEntity(EntityManager em) {
        DietTypeTranslation dietTypeTranslation = new DietTypeTranslation();
        dietTypeTranslation.setTranslation(UPDATED_TRANSLATION);
        dietTypeTranslation.setLanguage(UPDATED_LANGUAGE);
        // Add required entity
        DietType dietType;
        if (TestUtil.findAll(em, DietType.class).isEmpty()) {
            dietType = DietTypeResourceIT.createUpdatedEntity(em);
            em.persist(dietType);
            em.flush();
        } else {
            dietType = TestUtil.findAll(em, DietType.class).get(0);
        }
        dietTypeTranslation.setDietType(dietType);
        return dietTypeTranslation;
    }

    @BeforeEach
    public void initTest() {
        dietTypeTranslation = createEntity(em);
    }

    @Test
    @Transactional
    public void createDietTypeTranslation() throws Exception {
        int databaseSizeBeforeCreate = dietTypeTranslationRepository.findAll().size();

        // Create the DietTypeTranslation
        DietTypeTranslationDTO dietTypeTranslationDTO = dietTypeTranslationMapper.toDto(dietTypeTranslation);
        restDietTypeTranslationMockMvc.perform(post("/api/diet-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietTypeTranslationDTO)))
            .andExpect(status().isCreated());

        // Validate the DietTypeTranslation in the database
        List<DietTypeTranslation> dietTypeTranslationList = dietTypeTranslationRepository.findAll();
        assertThat(dietTypeTranslationList).hasSize(databaseSizeBeforeCreate + 1);
        DietTypeTranslation testDietTypeTranslation = dietTypeTranslationList.get(dietTypeTranslationList.size() - 1);
        assertThat(testDietTypeTranslation.getTranslation()).isEqualTo(DEFAULT_TRANSLATION);
        assertThat(testDietTypeTranslation.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);

        // Validate the DietTypeTranslation in Elasticsearch
        verify(mockDietTypeTranslationSearchRepository, times(1)).save(testDietTypeTranslation);
    }

    @Test
    @Transactional
    public void createDietTypeTranslationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dietTypeTranslationRepository.findAll().size();

        // Create the DietTypeTranslation with an existing ID
        dietTypeTranslation.setId(1L);
        DietTypeTranslationDTO dietTypeTranslationDTO = dietTypeTranslationMapper.toDto(dietTypeTranslation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDietTypeTranslationMockMvc.perform(post("/api/diet-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietTypeTranslationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DietTypeTranslation in the database
        List<DietTypeTranslation> dietTypeTranslationList = dietTypeTranslationRepository.findAll();
        assertThat(dietTypeTranslationList).hasSize(databaseSizeBeforeCreate);

        // Validate the DietTypeTranslation in Elasticsearch
        verify(mockDietTypeTranslationSearchRepository, times(0)).save(dietTypeTranslation);
    }


    @Test
    @Transactional
    public void checkTranslationIsRequired() throws Exception {
        int databaseSizeBeforeTest = dietTypeTranslationRepository.findAll().size();
        // set the field null
        dietTypeTranslation.setTranslation(null);

        // Create the DietTypeTranslation, which fails.
        DietTypeTranslationDTO dietTypeTranslationDTO = dietTypeTranslationMapper.toDto(dietTypeTranslation);

        restDietTypeTranslationMockMvc.perform(post("/api/diet-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietTypeTranslationDTO)))
            .andExpect(status().isBadRequest());

        List<DietTypeTranslation> dietTypeTranslationList = dietTypeTranslationRepository.findAll();
        assertThat(dietTypeTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = dietTypeTranslationRepository.findAll().size();
        // set the field null
        dietTypeTranslation.setLanguage(null);

        // Create the DietTypeTranslation, which fails.
        DietTypeTranslationDTO dietTypeTranslationDTO = dietTypeTranslationMapper.toDto(dietTypeTranslation);

        restDietTypeTranslationMockMvc.perform(post("/api/diet-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietTypeTranslationDTO)))
            .andExpect(status().isBadRequest());

        List<DietTypeTranslation> dietTypeTranslationList = dietTypeTranslationRepository.findAll();
        assertThat(dietTypeTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDietTypeTranslations() throws Exception {
        // Initialize the database
        dietTypeTranslationRepository.saveAndFlush(dietTypeTranslation);

        // Get all the dietTypeTranslationList
        restDietTypeTranslationMockMvc.perform(get("/api/diet-type-translations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dietTypeTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getDietTypeTranslation() throws Exception {
        // Initialize the database
        dietTypeTranslationRepository.saveAndFlush(dietTypeTranslation);

        // Get the dietTypeTranslation
        restDietTypeTranslationMockMvc.perform(get("/api/diet-type-translations/{id}", dietTypeTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dietTypeTranslation.getId().intValue()))
            .andExpect(jsonPath("$.translation").value(DEFAULT_TRANSLATION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDietTypeTranslation() throws Exception {
        // Get the dietTypeTranslation
        restDietTypeTranslationMockMvc.perform(get("/api/diet-type-translations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDietTypeTranslation() throws Exception {
        // Initialize the database
        dietTypeTranslationRepository.saveAndFlush(dietTypeTranslation);

        int databaseSizeBeforeUpdate = dietTypeTranslationRepository.findAll().size();

        // Update the dietTypeTranslation
        DietTypeTranslation updatedDietTypeTranslation = dietTypeTranslationRepository.findById(dietTypeTranslation.getId()).get();
        // Disconnect from session so that the updates on updatedDietTypeTranslation are not directly saved in db
        em.detach(updatedDietTypeTranslation);
        updatedDietTypeTranslation.setTranslation(UPDATED_TRANSLATION);
        updatedDietTypeTranslation.setLanguage(UPDATED_LANGUAGE);
        DietTypeTranslationDTO dietTypeTranslationDTO = dietTypeTranslationMapper.toDto(updatedDietTypeTranslation);

        restDietTypeTranslationMockMvc.perform(put("/api/diet-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietTypeTranslationDTO)))
            .andExpect(status().isOk());

        // Validate the DietTypeTranslation in the database
        List<DietTypeTranslation> dietTypeTranslationList = dietTypeTranslationRepository.findAll();
        assertThat(dietTypeTranslationList).hasSize(databaseSizeBeforeUpdate);
        DietTypeTranslation testDietTypeTranslation = dietTypeTranslationList.get(dietTypeTranslationList.size() - 1);
        assertThat(testDietTypeTranslation.getTranslation()).isEqualTo(UPDATED_TRANSLATION);
        assertThat(testDietTypeTranslation.getLanguage()).isEqualTo(UPDATED_LANGUAGE);

        // Validate the DietTypeTranslation in Elasticsearch
        verify(mockDietTypeTranslationSearchRepository, times(1)).save(testDietTypeTranslation);
    }

    @Test
    @Transactional
    public void updateNonExistingDietTypeTranslation() throws Exception {
        int databaseSizeBeforeUpdate = dietTypeTranslationRepository.findAll().size();

        // Create the DietTypeTranslation
        DietTypeTranslationDTO dietTypeTranslationDTO = dietTypeTranslationMapper.toDto(dietTypeTranslation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDietTypeTranslationMockMvc.perform(put("/api/diet-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietTypeTranslationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DietTypeTranslation in the database
        List<DietTypeTranslation> dietTypeTranslationList = dietTypeTranslationRepository.findAll();
        assertThat(dietTypeTranslationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DietTypeTranslation in Elasticsearch
        verify(mockDietTypeTranslationSearchRepository, times(0)).save(dietTypeTranslation);
    }

    @Test
    @Transactional
    public void deleteDietTypeTranslation() throws Exception {
        // Initialize the database
        dietTypeTranslationRepository.saveAndFlush(dietTypeTranslation);

        int databaseSizeBeforeDelete = dietTypeTranslationRepository.findAll().size();

        // Delete the dietTypeTranslation
        restDietTypeTranslationMockMvc.perform(delete("/api/diet-type-translations/{id}", dietTypeTranslation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DietTypeTranslation> dietTypeTranslationList = dietTypeTranslationRepository.findAll();
        assertThat(dietTypeTranslationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DietTypeTranslation in Elasticsearch
        verify(mockDietTypeTranslationSearchRepository, times(1)).deleteById(dietTypeTranslation.getId());
    }

    @Test
    @Transactional
    public void searchDietTypeTranslation() throws Exception {
        // Initialize the database
        dietTypeTranslationRepository.saveAndFlush(dietTypeTranslation);
        when(mockDietTypeTranslationSearchRepository.search(queryStringQuery("id:" + dietTypeTranslation.getId())))
            .thenReturn(Collections.singletonList(dietTypeTranslation));
        // Search the dietTypeTranslation
        restDietTypeTranslationMockMvc.perform(get("/api/_search/diet-type-translations?query=id:" + dietTypeTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dietTypeTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DietTypeTranslation.class);
        DietTypeTranslation dietTypeTranslation1 = new DietTypeTranslation();
        dietTypeTranslation1.setId(1L);
        DietTypeTranslation dietTypeTranslation2 = new DietTypeTranslation();
        dietTypeTranslation2.setId(dietTypeTranslation1.getId());
        assertThat(dietTypeTranslation1).isEqualTo(dietTypeTranslation2);
        dietTypeTranslation2.setId(2L);
        assertThat(dietTypeTranslation1).isNotEqualTo(dietTypeTranslation2);
        dietTypeTranslation1.setId(null);
        assertThat(dietTypeTranslation1).isNotEqualTo(dietTypeTranslation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DietTypeTranslationDTO.class);
        DietTypeTranslationDTO dietTypeTranslationDTO1 = new DietTypeTranslationDTO();
        dietTypeTranslationDTO1.setId(1L);
        DietTypeTranslationDTO dietTypeTranslationDTO2 = new DietTypeTranslationDTO();
        assertThat(dietTypeTranslationDTO1).isNotEqualTo(dietTypeTranslationDTO2);
        dietTypeTranslationDTO2.setId(dietTypeTranslationDTO1.getId());
        assertThat(dietTypeTranslationDTO1).isEqualTo(dietTypeTranslationDTO2);
        dietTypeTranslationDTO2.setId(2L);
        assertThat(dietTypeTranslationDTO1).isNotEqualTo(dietTypeTranslationDTO2);
        dietTypeTranslationDTO1.setId(null);
        assertThat(dietTypeTranslationDTO1).isNotEqualTo(dietTypeTranslationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(dietTypeTranslationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(dietTypeTranslationMapper.fromId(null)).isNull();
    }
}
