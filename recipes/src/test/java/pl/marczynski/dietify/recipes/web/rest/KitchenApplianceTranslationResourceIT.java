package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.KitchenApplianceTranslation;
import pl.marczynski.dietify.recipes.domain.KitchenAppliance;
import pl.marczynski.dietify.recipes.repository.KitchenApplianceTranslationRepository;
import pl.marczynski.dietify.recipes.repository.search.KitchenApplianceTranslationSearchRepository;
import pl.marczynski.dietify.recipes.service.KitchenApplianceTranslationService;
import pl.marczynski.dietify.recipes.service.dto.KitchenApplianceTranslationDTO;
import pl.marczynski.dietify.recipes.service.mapper.KitchenApplianceTranslationMapper;
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
 * Integration tests for the {@Link KitchenApplianceTranslationResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class KitchenApplianceTranslationResourceIT {

    private static final String DEFAULT_TRANSLATION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSLATION = "BBBBBBBBBB";

    private static final String DEFAULT_LANGUAGE = "AA";
    private static final String UPDATED_LANGUAGE = "BB";

    @Autowired
    private KitchenApplianceTranslationRepository kitchenApplianceTranslationRepository;

    @Autowired
    private KitchenApplianceTranslationMapper kitchenApplianceTranslationMapper;

    @Autowired
    private KitchenApplianceTranslationService kitchenApplianceTranslationService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.KitchenApplianceTranslationSearchRepositoryMockConfiguration
     */
    @Autowired
    private KitchenApplianceTranslationSearchRepository mockKitchenApplianceTranslationSearchRepository;

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

    private MockMvc restKitchenApplianceTranslationMockMvc;

    private KitchenApplianceTranslation kitchenApplianceTranslation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KitchenApplianceTranslationResource kitchenApplianceTranslationResource = new KitchenApplianceTranslationResource(kitchenApplianceTranslationService);
        this.restKitchenApplianceTranslationMockMvc = MockMvcBuilders.standaloneSetup(kitchenApplianceTranslationResource)
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
    public static KitchenApplianceTranslation createEntity(EntityManager em) {
        KitchenApplianceTranslation kitchenApplianceTranslation = new KitchenApplianceTranslation();
        kitchenApplianceTranslation.setTranslation(DEFAULT_TRANSLATION);
        kitchenApplianceTranslation.setLanguage(DEFAULT_LANGUAGE);
        // Add required entity
        KitchenAppliance kitchenAppliance;
        if (TestUtil.findAll(em, KitchenAppliance.class).isEmpty()) {
            kitchenAppliance = KitchenApplianceResourceIT.createEntity(em);
            em.persist(kitchenAppliance);
            em.flush();
        } else {
            kitchenAppliance = TestUtil.findAll(em, KitchenAppliance.class).get(0);
        }
        kitchenApplianceTranslation.setKitchenAppliance(kitchenAppliance);
        return kitchenApplianceTranslation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KitchenApplianceTranslation createUpdatedEntity(EntityManager em) {
        KitchenApplianceTranslation kitchenApplianceTranslation = new KitchenApplianceTranslation();
        kitchenApplianceTranslation.setTranslation(UPDATED_TRANSLATION);
        kitchenApplianceTranslation.setLanguage(UPDATED_LANGUAGE);
        // Add required entity
        KitchenAppliance kitchenAppliance;
        if (TestUtil.findAll(em, KitchenAppliance.class).isEmpty()) {
            kitchenAppliance = KitchenApplianceResourceIT.createUpdatedEntity(em);
            em.persist(kitchenAppliance);
            em.flush();
        } else {
            kitchenAppliance = TestUtil.findAll(em, KitchenAppliance.class).get(0);
        }
        kitchenApplianceTranslation.setKitchenAppliance(kitchenAppliance);
        return kitchenApplianceTranslation;
    }

    @BeforeEach
    public void initTest() {
        kitchenApplianceTranslation = createEntity(em);
    }

    @Test
    @Transactional
    public void createKitchenApplianceTranslation() throws Exception {
        int databaseSizeBeforeCreate = kitchenApplianceTranslationRepository.findAll().size();

        // Create the KitchenApplianceTranslation
        KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO = kitchenApplianceTranslationMapper.toDto(kitchenApplianceTranslation);
        restKitchenApplianceTranslationMockMvc.perform(post("/api/kitchen-appliance-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceTranslationDTO)))
            .andExpect(status().isCreated());

        // Validate the KitchenApplianceTranslation in the database
        List<KitchenApplianceTranslation> kitchenApplianceTranslationList = kitchenApplianceTranslationRepository.findAll();
        assertThat(kitchenApplianceTranslationList).hasSize(databaseSizeBeforeCreate + 1);
        KitchenApplianceTranslation testKitchenApplianceTranslation = kitchenApplianceTranslationList.get(kitchenApplianceTranslationList.size() - 1);
        assertThat(testKitchenApplianceTranslation.getTranslation()).isEqualTo(DEFAULT_TRANSLATION);
        assertThat(testKitchenApplianceTranslation.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);

        // Validate the KitchenApplianceTranslation in Elasticsearch
        verify(mockKitchenApplianceTranslationSearchRepository, times(1)).save(testKitchenApplianceTranslation);
    }

    @Test
    @Transactional
    public void createKitchenApplianceTranslationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kitchenApplianceTranslationRepository.findAll().size();

        // Create the KitchenApplianceTranslation with an existing ID
        kitchenApplianceTranslation.setId(1L);
        KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO = kitchenApplianceTranslationMapper.toDto(kitchenApplianceTranslation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKitchenApplianceTranslationMockMvc.perform(post("/api/kitchen-appliance-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceTranslationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the KitchenApplianceTranslation in the database
        List<KitchenApplianceTranslation> kitchenApplianceTranslationList = kitchenApplianceTranslationRepository.findAll();
        assertThat(kitchenApplianceTranslationList).hasSize(databaseSizeBeforeCreate);

        // Validate the KitchenApplianceTranslation in Elasticsearch
        verify(mockKitchenApplianceTranslationSearchRepository, times(0)).save(kitchenApplianceTranslation);
    }


    @Test
    @Transactional
    public void checkTranslationIsRequired() throws Exception {
        int databaseSizeBeforeTest = kitchenApplianceTranslationRepository.findAll().size();
        // set the field null
        kitchenApplianceTranslation.setTranslation(null);

        // Create the KitchenApplianceTranslation, which fails.
        KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO = kitchenApplianceTranslationMapper.toDto(kitchenApplianceTranslation);

        restKitchenApplianceTranslationMockMvc.perform(post("/api/kitchen-appliance-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceTranslationDTO)))
            .andExpect(status().isBadRequest());

        List<KitchenApplianceTranslation> kitchenApplianceTranslationList = kitchenApplianceTranslationRepository.findAll();
        assertThat(kitchenApplianceTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = kitchenApplianceTranslationRepository.findAll().size();
        // set the field null
        kitchenApplianceTranslation.setLanguage(null);

        // Create the KitchenApplianceTranslation, which fails.
        KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO = kitchenApplianceTranslationMapper.toDto(kitchenApplianceTranslation);

        restKitchenApplianceTranslationMockMvc.perform(post("/api/kitchen-appliance-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceTranslationDTO)))
            .andExpect(status().isBadRequest());

        List<KitchenApplianceTranslation> kitchenApplianceTranslationList = kitchenApplianceTranslationRepository.findAll();
        assertThat(kitchenApplianceTranslationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllKitchenApplianceTranslations() throws Exception {
        // Initialize the database
        kitchenApplianceTranslationRepository.saveAndFlush(kitchenApplianceTranslation);

        // Get all the kitchenApplianceTranslationList
        restKitchenApplianceTranslationMockMvc.perform(get("/api/kitchen-appliance-translations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kitchenApplianceTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getKitchenApplianceTranslation() throws Exception {
        // Initialize the database
        kitchenApplianceTranslationRepository.saveAndFlush(kitchenApplianceTranslation);

        // Get the kitchenApplianceTranslation
        restKitchenApplianceTranslationMockMvc.perform(get("/api/kitchen-appliance-translations/{id}", kitchenApplianceTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kitchenApplianceTranslation.getId().intValue()))
            .andExpect(jsonPath("$.translation").value(DEFAULT_TRANSLATION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKitchenApplianceTranslation() throws Exception {
        // Get the kitchenApplianceTranslation
        restKitchenApplianceTranslationMockMvc.perform(get("/api/kitchen-appliance-translations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKitchenApplianceTranslation() throws Exception {
        // Initialize the database
        kitchenApplianceTranslationRepository.saveAndFlush(kitchenApplianceTranslation);

        int databaseSizeBeforeUpdate = kitchenApplianceTranslationRepository.findAll().size();

        // Update the kitchenApplianceTranslation
        KitchenApplianceTranslation updatedKitchenApplianceTranslation = kitchenApplianceTranslationRepository.findById(kitchenApplianceTranslation.getId()).get();
        // Disconnect from session so that the updates on updatedKitchenApplianceTranslation are not directly saved in db
        em.detach(updatedKitchenApplianceTranslation);
        updatedKitchenApplianceTranslation.setTranslation(UPDATED_TRANSLATION);
        updatedKitchenApplianceTranslation.setLanguage(UPDATED_LANGUAGE);
        KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO = kitchenApplianceTranslationMapper.toDto(updatedKitchenApplianceTranslation);

        restKitchenApplianceTranslationMockMvc.perform(put("/api/kitchen-appliance-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceTranslationDTO)))
            .andExpect(status().isOk());

        // Validate the KitchenApplianceTranslation in the database
        List<KitchenApplianceTranslation> kitchenApplianceTranslationList = kitchenApplianceTranslationRepository.findAll();
        assertThat(kitchenApplianceTranslationList).hasSize(databaseSizeBeforeUpdate);
        KitchenApplianceTranslation testKitchenApplianceTranslation = kitchenApplianceTranslationList.get(kitchenApplianceTranslationList.size() - 1);
        assertThat(testKitchenApplianceTranslation.getTranslation()).isEqualTo(UPDATED_TRANSLATION);
        assertThat(testKitchenApplianceTranslation.getLanguage()).isEqualTo(UPDATED_LANGUAGE);

        // Validate the KitchenApplianceTranslation in Elasticsearch
        verify(mockKitchenApplianceTranslationSearchRepository, times(1)).save(testKitchenApplianceTranslation);
    }

    @Test
    @Transactional
    public void updateNonExistingKitchenApplianceTranslation() throws Exception {
        int databaseSizeBeforeUpdate = kitchenApplianceTranslationRepository.findAll().size();

        // Create the KitchenApplianceTranslation
        KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO = kitchenApplianceTranslationMapper.toDto(kitchenApplianceTranslation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKitchenApplianceTranslationMockMvc.perform(put("/api/kitchen-appliance-translations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceTranslationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the KitchenApplianceTranslation in the database
        List<KitchenApplianceTranslation> kitchenApplianceTranslationList = kitchenApplianceTranslationRepository.findAll();
        assertThat(kitchenApplianceTranslationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the KitchenApplianceTranslation in Elasticsearch
        verify(mockKitchenApplianceTranslationSearchRepository, times(0)).save(kitchenApplianceTranslation);
    }

    @Test
    @Transactional
    public void deleteKitchenApplianceTranslation() throws Exception {
        // Initialize the database
        kitchenApplianceTranslationRepository.saveAndFlush(kitchenApplianceTranslation);

        int databaseSizeBeforeDelete = kitchenApplianceTranslationRepository.findAll().size();

        // Delete the kitchenApplianceTranslation
        restKitchenApplianceTranslationMockMvc.perform(delete("/api/kitchen-appliance-translations/{id}", kitchenApplianceTranslation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KitchenApplianceTranslation> kitchenApplianceTranslationList = kitchenApplianceTranslationRepository.findAll();
        assertThat(kitchenApplianceTranslationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the KitchenApplianceTranslation in Elasticsearch
        verify(mockKitchenApplianceTranslationSearchRepository, times(1)).deleteById(kitchenApplianceTranslation.getId());
    }

    @Test
    @Transactional
    public void searchKitchenApplianceTranslation() throws Exception {
        // Initialize the database
        kitchenApplianceTranslationRepository.saveAndFlush(kitchenApplianceTranslation);
        when(mockKitchenApplianceTranslationSearchRepository.search(queryStringQuery("id:" + kitchenApplianceTranslation.getId())))
            .thenReturn(Collections.singletonList(kitchenApplianceTranslation));
        // Search the kitchenApplianceTranslation
        restKitchenApplianceTranslationMockMvc.perform(get("/api/_search/kitchen-appliance-translations?query=id:" + kitchenApplianceTranslation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kitchenApplianceTranslation.getId().intValue())))
            .andExpect(jsonPath("$.[*].translation").value(hasItem(DEFAULT_TRANSLATION)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KitchenApplianceTranslation.class);
        KitchenApplianceTranslation kitchenApplianceTranslation1 = new KitchenApplianceTranslation();
        kitchenApplianceTranslation1.setId(1L);
        KitchenApplianceTranslation kitchenApplianceTranslation2 = new KitchenApplianceTranslation();
        kitchenApplianceTranslation2.setId(kitchenApplianceTranslation1.getId());
        assertThat(kitchenApplianceTranslation1).isEqualTo(kitchenApplianceTranslation2);
        kitchenApplianceTranslation2.setId(2L);
        assertThat(kitchenApplianceTranslation1).isNotEqualTo(kitchenApplianceTranslation2);
        kitchenApplianceTranslation1.setId(null);
        assertThat(kitchenApplianceTranslation1).isNotEqualTo(kitchenApplianceTranslation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(KitchenApplianceTranslationDTO.class);
        KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO1 = new KitchenApplianceTranslationDTO();
        kitchenApplianceTranslationDTO1.setId(1L);
        KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO2 = new KitchenApplianceTranslationDTO();
        assertThat(kitchenApplianceTranslationDTO1).isNotEqualTo(kitchenApplianceTranslationDTO2);
        kitchenApplianceTranslationDTO2.setId(kitchenApplianceTranslationDTO1.getId());
        assertThat(kitchenApplianceTranslationDTO1).isEqualTo(kitchenApplianceTranslationDTO2);
        kitchenApplianceTranslationDTO2.setId(2L);
        assertThat(kitchenApplianceTranslationDTO1).isNotEqualTo(kitchenApplianceTranslationDTO2);
        kitchenApplianceTranslationDTO1.setId(null);
        assertThat(kitchenApplianceTranslationDTO1).isNotEqualTo(kitchenApplianceTranslationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(kitchenApplianceTranslationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(kitchenApplianceTranslationMapper.fromId(null)).isNull();
    }
}
