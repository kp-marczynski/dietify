package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.KitchenAppliance;
import pl.marczynski.dietify.recipes.repository.KitchenApplianceRepository;
import pl.marczynski.dietify.recipes.repository.search.KitchenApplianceSearchRepository;
import pl.marczynski.dietify.recipes.service.KitchenApplianceService;
import pl.marczynski.dietify.recipes.service.dto.KitchenApplianceDTO;
import pl.marczynski.dietify.recipes.service.mapper.KitchenApplianceMapper;
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
 * Integration tests for the {@Link KitchenApplianceResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class KitchenApplianceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private KitchenApplianceRepository kitchenApplianceRepository;

    @Autowired
    private KitchenApplianceMapper kitchenApplianceMapper;

    @Autowired
    private KitchenApplianceService kitchenApplianceService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.KitchenApplianceSearchRepositoryMockConfiguration
     */
    @Autowired
    private KitchenApplianceSearchRepository mockKitchenApplianceSearchRepository;

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

    private MockMvc restKitchenApplianceMockMvc;

    private KitchenAppliance kitchenAppliance;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KitchenApplianceResource kitchenApplianceResource = new KitchenApplianceResource(kitchenApplianceService);
        this.restKitchenApplianceMockMvc = MockMvcBuilders.standaloneSetup(kitchenApplianceResource)
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
    public static KitchenAppliance createEntity(EntityManager em) {
        KitchenAppliance kitchenAppliance = new KitchenAppliance();
        kitchenAppliance.setName(DEFAULT_NAME);
        return kitchenAppliance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KitchenAppliance createUpdatedEntity(EntityManager em) {
        KitchenAppliance kitchenAppliance = new KitchenAppliance();
        kitchenAppliance.setName(UPDATED_NAME);
        return kitchenAppliance;
    }

    @BeforeEach
    public void initTest() {
        kitchenAppliance = createEntity(em);
    }

    @Test
    @Transactional
    public void createKitchenAppliance() throws Exception {
        int databaseSizeBeforeCreate = kitchenApplianceRepository.findAll().size();

        // Create the KitchenAppliance
        KitchenApplianceDTO kitchenApplianceDTO = kitchenApplianceMapper.toDto(kitchenAppliance);
        restKitchenApplianceMockMvc.perform(post("/api/kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceDTO)))
            .andExpect(status().isCreated());

        // Validate the KitchenAppliance in the database
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeCreate + 1);
        KitchenAppliance testKitchenAppliance = kitchenApplianceList.get(kitchenApplianceList.size() - 1);
        assertThat(testKitchenAppliance.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the KitchenAppliance in Elasticsearch
        verify(mockKitchenApplianceSearchRepository, times(1)).save(testKitchenAppliance);
    }

    @Test
    @Transactional
    public void createKitchenApplianceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kitchenApplianceRepository.findAll().size();

        // Create the KitchenAppliance with an existing ID
        kitchenAppliance.setId(1L);
        KitchenApplianceDTO kitchenApplianceDTO = kitchenApplianceMapper.toDto(kitchenAppliance);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKitchenApplianceMockMvc.perform(post("/api/kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the KitchenAppliance in the database
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeCreate);

        // Validate the KitchenAppliance in Elasticsearch
        verify(mockKitchenApplianceSearchRepository, times(0)).save(kitchenAppliance);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = kitchenApplianceRepository.findAll().size();
        // set the field null
        kitchenAppliance.setName(null);

        // Create the KitchenAppliance, which fails.
        KitchenApplianceDTO kitchenApplianceDTO = kitchenApplianceMapper.toDto(kitchenAppliance);

        restKitchenApplianceMockMvc.perform(post("/api/kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceDTO)))
            .andExpect(status().isBadRequest());

        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllKitchenAppliances() throws Exception {
        // Initialize the database
        kitchenApplianceRepository.saveAndFlush(kitchenAppliance);

        // Get all the kitchenApplianceList
        restKitchenApplianceMockMvc.perform(get("/api/kitchen-appliances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kitchenAppliance.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getKitchenAppliance() throws Exception {
        // Initialize the database
        kitchenApplianceRepository.saveAndFlush(kitchenAppliance);

        // Get the kitchenAppliance
        restKitchenApplianceMockMvc.perform(get("/api/kitchen-appliances/{id}", kitchenAppliance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kitchenAppliance.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKitchenAppliance() throws Exception {
        // Get the kitchenAppliance
        restKitchenApplianceMockMvc.perform(get("/api/kitchen-appliances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKitchenAppliance() throws Exception {
        // Initialize the database
        kitchenApplianceRepository.saveAndFlush(kitchenAppliance);

        int databaseSizeBeforeUpdate = kitchenApplianceRepository.findAll().size();

        // Update the kitchenAppliance
        KitchenAppliance updatedKitchenAppliance = kitchenApplianceRepository.findById(kitchenAppliance.getId()).get();
        // Disconnect from session so that the updates on updatedKitchenAppliance are not directly saved in db
        em.detach(updatedKitchenAppliance);
        updatedKitchenAppliance.setName(UPDATED_NAME);
        KitchenApplianceDTO kitchenApplianceDTO = kitchenApplianceMapper.toDto(updatedKitchenAppliance);

        restKitchenApplianceMockMvc.perform(put("/api/kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceDTO)))
            .andExpect(status().isOk());

        // Validate the KitchenAppliance in the database
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeUpdate);
        KitchenAppliance testKitchenAppliance = kitchenApplianceList.get(kitchenApplianceList.size() - 1);
        assertThat(testKitchenAppliance.getName()).isEqualTo(UPDATED_NAME);

        // Validate the KitchenAppliance in Elasticsearch
        verify(mockKitchenApplianceSearchRepository, times(1)).save(testKitchenAppliance);
    }

    @Test
    @Transactional
    public void updateNonExistingKitchenAppliance() throws Exception {
        int databaseSizeBeforeUpdate = kitchenApplianceRepository.findAll().size();

        // Create the KitchenAppliance
        KitchenApplianceDTO kitchenApplianceDTO = kitchenApplianceMapper.toDto(kitchenAppliance);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKitchenApplianceMockMvc.perform(put("/api/kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenApplianceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the KitchenAppliance in the database
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the KitchenAppliance in Elasticsearch
        verify(mockKitchenApplianceSearchRepository, times(0)).save(kitchenAppliance);
    }

    @Test
    @Transactional
    public void deleteKitchenAppliance() throws Exception {
        // Initialize the database
        kitchenApplianceRepository.saveAndFlush(kitchenAppliance);

        int databaseSizeBeforeDelete = kitchenApplianceRepository.findAll().size();

        // Delete the kitchenAppliance
        restKitchenApplianceMockMvc.perform(delete("/api/kitchen-appliances/{id}", kitchenAppliance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the KitchenAppliance in Elasticsearch
        verify(mockKitchenApplianceSearchRepository, times(1)).deleteById(kitchenAppliance.getId());
    }

    @Test
    @Transactional
    public void searchKitchenAppliance() throws Exception {
        // Initialize the database
        kitchenApplianceRepository.saveAndFlush(kitchenAppliance);
        when(mockKitchenApplianceSearchRepository.search(queryStringQuery("id:" + kitchenAppliance.getId())))
            .thenReturn(Collections.singletonList(kitchenAppliance));
        // Search the kitchenAppliance
        restKitchenApplianceMockMvc.perform(get("/api/_search/kitchen-appliances?query=id:" + kitchenAppliance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kitchenAppliance.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KitchenAppliance.class);
        KitchenAppliance kitchenAppliance1 = new KitchenAppliance();
        kitchenAppliance1.setId(1L);
        KitchenAppliance kitchenAppliance2 = new KitchenAppliance();
        kitchenAppliance2.setId(kitchenAppliance1.getId());
        assertThat(kitchenAppliance1).isEqualTo(kitchenAppliance2);
        kitchenAppliance2.setId(2L);
        assertThat(kitchenAppliance1).isNotEqualTo(kitchenAppliance2);
        kitchenAppliance1.setId(null);
        assertThat(kitchenAppliance1).isNotEqualTo(kitchenAppliance2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(KitchenApplianceDTO.class);
        KitchenApplianceDTO kitchenApplianceDTO1 = new KitchenApplianceDTO();
        kitchenApplianceDTO1.setId(1L);
        KitchenApplianceDTO kitchenApplianceDTO2 = new KitchenApplianceDTO();
        assertThat(kitchenApplianceDTO1).isNotEqualTo(kitchenApplianceDTO2);
        kitchenApplianceDTO2.setId(kitchenApplianceDTO1.getId());
        assertThat(kitchenApplianceDTO1).isEqualTo(kitchenApplianceDTO2);
        kitchenApplianceDTO2.setId(2L);
        assertThat(kitchenApplianceDTO1).isNotEqualTo(kitchenApplianceDTO2);
        kitchenApplianceDTO1.setId(null);
        assertThat(kitchenApplianceDTO1).isNotEqualTo(kitchenApplianceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(kitchenApplianceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(kitchenApplianceMapper.fromId(null)).isNull();
    }
}
