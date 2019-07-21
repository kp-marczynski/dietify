package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.MealTypeTranslation;
import pl.marczynski.dietify.recipes.domain.MealType;
import pl.marczynski.dietify.recipes.repository.MealTypeTranslationRepository;
import pl.marczynski.dietify.recipes.repository.search.MealTypeTranslationSearchRepository;
import pl.marczynski.dietify.recipes.service.MealTypeTranslationService;
import pl.marczynski.dietify.recipes.service.dto.MealTypeTranslationDTO;
import pl.marczynski.dietify.recipes.service.mapper.MealTypeTranslationMapper;
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
 * Integration tests for the {@Link MealTypeTranslationResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class MealTypeTranslationResourceIT {

    private static final String DEFAULT_TRANSLATION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSLATION = "BBBBBBBBBB";

    private static final String DEFAULT_LANGUAGE = "AA";
    private static final String UPDATED_LANGUAGE = "BB";

    @Autowired
    private MealTypeTranslationRepository mealTypeTranslationRepository;

    @Autowired
    private MealTypeTranslationMapper mealTypeTranslationMapper;

    @Autowired
    private MealTypeTranslationService mealTypeTranslationService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.MealTypeTranslationSearchRepositoryMockConfiguration
     */
    @Autowired
    private MealTypeTranslationSearchRepository mockMealTypeTranslationSearchRepository;

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

    private MockMvc restMealTypeTranslationMockMvc;

    private MealTypeTranslation mealTypeTranslation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealTypeTranslationResource mealTypeTranslationResource = new MealTypeTranslationResource(mealTypeTranslationService);
        this.restMealTypeTranslationMockMvc = MockMvcBuilders.standaloneSetup(mealTypeTranslationResource)
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
    public static MealTypeTranslation createEntity(EntityManager em) {
        MealTypeTranslation mealTypeTranslation = new MealTypeTranslation();
        mealTypeTranslation.setTranslation(DEFAULT_TRANSLATION);
        mealTypeTranslation.setLanguage(DEFAULT_LANGUAGE);
        // Add required entity
        MealType mealType;
        if (TestUtil.findAll(em, MealType.class).isEmpty()) {
            mealType = MealTypeResourceIT.createEntity(em);
            em.persist(mealType);
            em.flush();
        } else {
            mealType = TestUtil.findAll(em, MealType.class).get(0);
        }
        mealTypeTranslation.setMealType(mealType);
        return mealTypeTranslation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealTypeTranslation createUpdatedEntity(EntityManager em) {
        MealTypeTranslation mealTypeTranslation = new MealTypeTranslation();
        mealTypeTranslation.setTranslation(UPDATED_TRANSLATION);
        mealTypeTranslation.setLanguage(UPDATED_LANGUAGE);
        // Add required entity
        MealType mealType;
        if (TestUtil.findAll(em, MealType.class).isEmpty()) {
            mealType = MealTypeResourceIT.createUpdatedEntity(em);
            em.persist(mealType);
            em.flush();
        } else {
            mealType = TestUtil.findAll(em, MealType.class).get(0);
        }
        mealTypeTranslation.setMealType(mealType);
        return mealTypeTranslation;
    }

    @BeforeEach
    public void initTest() {
        mealTypeTranslation = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealTypeTranslation() throws Exception {
        int databaseSizeBeforeCreate = mealTypeTranslationRepository.findAll().size();

        // Create the MealTypeTranslation
        MealTypeTranslationDTO mealTypeTranslationDTO = mealTypeTranslationMapper.toDto(mealTypeTranslation);
        restMealTypeTranslationMockMvc.perform(post("/api/meal-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeTranslationDTO)))
            .andExpect(status().isCreated());

        // Validate the MealTypeTranslation in the database
        List<MealTypeTranslation> mealTypeTranslationList = mealTypeTranslationRepository.findAll();
        assertThat(mealTypeTranslationList).hasSize(databaseSizeBeforeCreate + 1);
        MealTypeTranslation testMealTypeTranslation = mealTypeTranslationList.get(mealTypeTranslationList.size() - 1);
        assertThat(testMealTypeTranslation.getTranslation()).isEqualTo(DEFAULT_TRANSLATION);
        assertThat(testMealTypeTranslation.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);

        // Validate the MealTypeTranslation in Elasticsearch
        verify(mockMealTypeTranslationSearchRepository, times(1)).save(testMealTypeTranslation);
    }

    @Test
    @Transactional
    public void createMealTypeTranslationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealTypeTranslationRepository.findAll().size();

        // Create the MealTypeTranslation with an existing ID
        mealTypeTranslation.setId(1L);
        MealTypeTranslationDTO mealTypeTranslationDTO = mealTypeTranslationMapper.toDto(mealTypeTranslation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealTypeTranslationMockMvc.perform(post("/api/meal-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeTranslationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealTypeTranslation in the database
        List<MealTypeTranslation> mealTypeTranslationList = mealTypeTranslationRepository.findAll();
        assertThat(mealTypeTranslationList).hasSize(databaseSizeBeforeCreate);

        // Validate the MealTypeTranslation in Elasticsearch
        verify(mockMealTypeTranslationSearchRepository, times(0)).save(mealTypeTranslation);
    }


    @Test
    @Transactional
    public void checkTranslationIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealTypeTranslationRepository.findAll().size();
        // set the field null
        mealTypeTranslation.setTranslation(null);

        // Create the MealTypeTranslation, which fails.
        MealTypeTranslationDTO mealTypeTranslationDTO = mealTypeTranslationMapper.toDto(mealTypeTranslation);

        restMealTypeTranslationMockMvc.perform(post("/api/meal-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeTranslationDTO)))
            .andExpect(status().isBadRequest());

        List<MealTypeTranslation> mealTypeTranslationList = mealTypeTranslationRepository.findAll();
        assertThat(mealTypeTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealTypeTranslationRepository.findAll().size();
        // set the field null
        mealTypeTranslation.setLanguage(null);

        // Create the MealTypeTranslation, which fails.
        MealTypeTranslationDTO mealTypeTranslationDTO = mealTypeTranslationMapper.toDto(mealTypeTranslation);

        restMealTypeTranslationMockMvc.perform(post("/api/meal-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeTranslationDTO)))
            .andExpect(status().isBadRequest());

        List<MealTypeTranslation> mealTypeTranslationList = mealTypeTranslationRepository.findAll();
        assertThat(mealTypeTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMealTypeTranslations() throws Exception {
        // Initialize the database
        mealTypeTranslationRepository.saveAndFlush(mealTypeTranslation);

        // Get all the mealTypeTranslationList
        restMealTypeTranslationMockMvc.perform(get("/api/meal-type-translations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealTypeTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getMealTypeTranslation() throws Exception {
        // Initialize the database
        mealTypeTranslationRepository.saveAndFlush(mealTypeTranslation);

        // Get the mealTypeTranslation
        restMealTypeTranslationMockMvc.perform(get("/api/meal-type-translations/{id}", mealTypeTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealTypeTranslation.getId().intValue()))
            .andExpect(jsonPath("$.translation").value(DEFAULT_TRANSLATION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMealTypeTranslation() throws Exception {
        // Get the mealTypeTranslation
        restMealTypeTranslationMockMvc.perform(get("/api/meal-type-translations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealTypeTranslation() throws Exception {
        // Initialize the database
        mealTypeTranslationRepository.saveAndFlush(mealTypeTranslation);

        int databaseSizeBeforeUpdate = mealTypeTranslationRepository.findAll().size();

        // Update the mealTypeTranslation
        MealTypeTranslation updatedMealTypeTranslation = mealTypeTranslationRepository.findById(mealTypeTranslation.getId()).get();
        // Disconnect from session so that the updates on updatedMealTypeTranslation are not directly saved in db
        em.detach(updatedMealTypeTranslation);
        updatedMealTypeTranslation.setTranslation(UPDATED_TRANSLATION);
        updatedMealTypeTranslation.setLanguage(UPDATED_LANGUAGE);
        MealTypeTranslationDTO mealTypeTranslationDTO = mealTypeTranslationMapper.toDto(updatedMealTypeTranslation);

        restMealTypeTranslationMockMvc.perform(put("/api/meal-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeTranslationDTO)))
            .andExpect(status().isOk());

        // Validate the MealTypeTranslation in the database
        List<MealTypeTranslation> mealTypeTranslationList = mealTypeTranslationRepository.findAll();
        assertThat(mealTypeTranslationList).hasSize(databaseSizeBeforeUpdate);
        MealTypeTranslation testMealTypeTranslation = mealTypeTranslationList.get(mealTypeTranslationList.size() - 1);
        assertThat(testMealTypeTranslation.getTranslation()).isEqualTo(UPDATED_TRANSLATION);
        assertThat(testMealTypeTranslation.getLanguage()).isEqualTo(UPDATED_LANGUAGE);

        // Validate the MealTypeTranslation in Elasticsearch
        verify(mockMealTypeTranslationSearchRepository, times(1)).save(testMealTypeTranslation);
    }

    @Test
    @Transactional
    public void updateNonExistingMealTypeTranslation() throws Exception {
        int databaseSizeBeforeUpdate = mealTypeTranslationRepository.findAll().size();

        // Create the MealTypeTranslation
        MealTypeTranslationDTO mealTypeTranslationDTO = mealTypeTranslationMapper.toDto(mealTypeTranslation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealTypeTranslationMockMvc.perform(put("/api/meal-type-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeTranslationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealTypeTranslation in the database
        List<MealTypeTranslation> mealTypeTranslationList = mealTypeTranslationRepository.findAll();
        assertThat(mealTypeTranslationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MealTypeTranslation in Elasticsearch
        verify(mockMealTypeTranslationSearchRepository, times(0)).save(mealTypeTranslation);
    }

    @Test
    @Transactional
    public void deleteMealTypeTranslation() throws Exception {
        // Initialize the database
        mealTypeTranslationRepository.saveAndFlush(mealTypeTranslation);

        int databaseSizeBeforeDelete = mealTypeTranslationRepository.findAll().size();

        // Delete the mealTypeTranslation
        restMealTypeTranslationMockMvc.perform(delete("/api/meal-type-translations/{id}", mealTypeTranslation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MealTypeTranslation> mealTypeTranslationList = mealTypeTranslationRepository.findAll();
        assertThat(mealTypeTranslationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MealTypeTranslation in Elasticsearch
        verify(mockMealTypeTranslationSearchRepository, times(1)).deleteById(mealTypeTranslation.getId());
    }

    @Test
    @Transactional
    public void searchMealTypeTranslation() throws Exception {
        // Initialize the database
        mealTypeTranslationRepository.saveAndFlush(mealTypeTranslation);
        when(mockMealTypeTranslationSearchRepository.search(queryStringQuery("id:" + mealTypeTranslation.getId())))
            .thenReturn(Collections.singletonList(mealTypeTranslation));
        // Search the mealTypeTranslation
        restMealTypeTranslationMockMvc.perform(get("/api/_search/meal-type-translations?query=id:" + mealTypeTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealTypeTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealTypeTranslation.class);
        MealTypeTranslation mealTypeTranslation1 = new MealTypeTranslation();
        mealTypeTranslation1.setId(1L);
        MealTypeTranslation mealTypeTranslation2 = new MealTypeTranslation();
        mealTypeTranslation2.setId(mealTypeTranslation1.getId());
        assertThat(mealTypeTranslation1).isEqualTo(mealTypeTranslation2);
        mealTypeTranslation2.setId(2L);
        assertThat(mealTypeTranslation1).isNotEqualTo(mealTypeTranslation2);
        mealTypeTranslation1.setId(null);
        assertThat(mealTypeTranslation1).isNotEqualTo(mealTypeTranslation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealTypeTranslationDTO.class);
        MealTypeTranslationDTO mealTypeTranslationDTO1 = new MealTypeTranslationDTO();
        mealTypeTranslationDTO1.setId(1L);
        MealTypeTranslationDTO mealTypeTranslationDTO2 = new MealTypeTranslationDTO();
        assertThat(mealTypeTranslationDTO1).isNotEqualTo(mealTypeTranslationDTO2);
        mealTypeTranslationDTO2.setId(mealTypeTranslationDTO1.getId());
        assertThat(mealTypeTranslationDTO1).isEqualTo(mealTypeTranslationDTO2);
        mealTypeTranslationDTO2.setId(2L);
        assertThat(mealTypeTranslationDTO1).isNotEqualTo(mealTypeTranslationDTO2);
        mealTypeTranslationDTO1.setId(null);
        assertThat(mealTypeTranslationDTO1).isNotEqualTo(mealTypeTranslationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mealTypeTranslationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mealTypeTranslationMapper.fromId(null)).isNull();
    }
}
