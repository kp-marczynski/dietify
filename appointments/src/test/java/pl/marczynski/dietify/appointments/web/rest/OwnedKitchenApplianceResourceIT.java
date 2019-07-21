package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.AppointmentsApp;
import pl.marczynski.dietify.appointments.domain.OwnedKitchenAppliance;
import pl.marczynski.dietify.appointments.domain.NutritionalInterview;
import pl.marczynski.dietify.appointments.repository.OwnedKitchenApplianceRepository;
import pl.marczynski.dietify.appointments.service.OwnedKitchenApplianceService;
import pl.marczynski.dietify.appointments.service.dto.OwnedKitchenApplianceDTO;
import pl.marczynski.dietify.appointments.service.mapper.OwnedKitchenApplianceMapper;
import pl.marczynski.dietify.appointments.web.rest.errors.ExceptionTranslator;

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
import java.util.List;

import static pl.marczynski.dietify.appointments.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link OwnedKitchenApplianceResource} REST controller.
 */
@SpringBootTest(classes = AppointmentsApp.class)
public class OwnedKitchenApplianceResourceIT {

    private static final Long DEFAULT_KITCHEN_APPLIANCE_ID = 1L;
    private static final Long UPDATED_KITCHEN_APPLIANCE_ID = 2L;

    @Autowired
    private OwnedKitchenApplianceRepository ownedKitchenApplianceRepository;

    @Autowired
    private OwnedKitchenApplianceMapper ownedKitchenApplianceMapper;

    @Autowired
    private OwnedKitchenApplianceService ownedKitchenApplianceService;

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

    private MockMvc restOwnedKitchenApplianceMockMvc;

    private OwnedKitchenAppliance ownedKitchenAppliance;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OwnedKitchenApplianceResource ownedKitchenApplianceResource = new OwnedKitchenApplianceResource(ownedKitchenApplianceService);
        this.restOwnedKitchenApplianceMockMvc = MockMvcBuilders.standaloneSetup(ownedKitchenApplianceResource)
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
    public static OwnedKitchenAppliance createEntity(EntityManager em) {
        OwnedKitchenAppliance ownedKitchenAppliance = new OwnedKitchenAppliance();
        ownedKitchenAppliance.setKitchenApplianceId(DEFAULT_KITCHEN_APPLIANCE_ID);
        // Add required entity
        NutritionalInterview nutritionalInterview;
        if (TestUtil.findAll(em, NutritionalInterview.class).isEmpty()) {
            nutritionalInterview = NutritionalInterviewResourceIT.createEntity(em);
            em.persist(nutritionalInterview);
            em.flush();
        } else {
            nutritionalInterview = TestUtil.findAll(em, NutritionalInterview.class).get(0);
        }
        ownedKitchenAppliance.setNutritionalInterview(nutritionalInterview);
        return ownedKitchenAppliance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OwnedKitchenAppliance createUpdatedEntity(EntityManager em) {
        OwnedKitchenAppliance ownedKitchenAppliance = new OwnedKitchenAppliance();
        ownedKitchenAppliance.setKitchenApplianceId(UPDATED_KITCHEN_APPLIANCE_ID);
        // Add required entity
        NutritionalInterview nutritionalInterview;
        if (TestUtil.findAll(em, NutritionalInterview.class).isEmpty()) {
            nutritionalInterview = NutritionalInterviewResourceIT.createUpdatedEntity(em);
            em.persist(nutritionalInterview);
            em.flush();
        } else {
            nutritionalInterview = TestUtil.findAll(em, NutritionalInterview.class).get(0);
        }
        ownedKitchenAppliance.setNutritionalInterview(nutritionalInterview);
        return ownedKitchenAppliance;
    }

    @BeforeEach
    public void initTest() {
        ownedKitchenAppliance = createEntity(em);
    }

    @Test
    @Transactional
    public void createOwnedKitchenAppliance() throws Exception {
        int databaseSizeBeforeCreate = ownedKitchenApplianceRepository.findAll().size();

        // Create the OwnedKitchenAppliance
        OwnedKitchenApplianceDTO ownedKitchenApplianceDTO = ownedKitchenApplianceMapper.toDto(ownedKitchenAppliance);
        restOwnedKitchenApplianceMockMvc.perform(post("/api/owned-kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ownedKitchenApplianceDTO)))
            .andExpect(status().isCreated());

        // Validate the OwnedKitchenAppliance in the database
        List<OwnedKitchenAppliance> ownedKitchenApplianceList = ownedKitchenApplianceRepository.findAll();
        assertThat(ownedKitchenApplianceList).hasSize(databaseSizeBeforeCreate + 1);
        OwnedKitchenAppliance testOwnedKitchenAppliance = ownedKitchenApplianceList.get(ownedKitchenApplianceList.size() - 1);
        assertThat(testOwnedKitchenAppliance.getKitchenApplianceId()).isEqualTo(DEFAULT_KITCHEN_APPLIANCE_ID);
    }

    @Test
    @Transactional
    public void createOwnedKitchenApplianceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ownedKitchenApplianceRepository.findAll().size();

        // Create the OwnedKitchenAppliance with an existing ID
        ownedKitchenAppliance.setId(1L);
        OwnedKitchenApplianceDTO ownedKitchenApplianceDTO = ownedKitchenApplianceMapper.toDto(ownedKitchenAppliance);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOwnedKitchenApplianceMockMvc.perform(post("/api/owned-kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ownedKitchenApplianceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OwnedKitchenAppliance in the database
        List<OwnedKitchenAppliance> ownedKitchenApplianceList = ownedKitchenApplianceRepository.findAll();
        assertThat(ownedKitchenApplianceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkKitchenApplianceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = ownedKitchenApplianceRepository.findAll().size();
        // set the field null
        ownedKitchenAppliance.setKitchenApplianceId(null);

        // Create the OwnedKitchenAppliance, which fails.
        OwnedKitchenApplianceDTO ownedKitchenApplianceDTO = ownedKitchenApplianceMapper.toDto(ownedKitchenAppliance);

        restOwnedKitchenApplianceMockMvc.perform(post("/api/owned-kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ownedKitchenApplianceDTO)))
            .andExpect(status().isBadRequest());

        List<OwnedKitchenAppliance> ownedKitchenApplianceList = ownedKitchenApplianceRepository.findAll();
        assertThat(ownedKitchenApplianceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOwnedKitchenAppliances() throws Exception {
        // Initialize the database
        ownedKitchenApplianceRepository.saveAndFlush(ownedKitchenAppliance);

        // Get all the ownedKitchenApplianceList
        restOwnedKitchenApplianceMockMvc.perform(get("/api/owned-kitchen-appliances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ownedKitchenAppliance.getId().intValue())))
            .andExpect(jsonPath("$.[*].kitchenApplianceId").value(hasItem(DEFAULT_KITCHEN_APPLIANCE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getOwnedKitchenAppliance() throws Exception {
        // Initialize the database
        ownedKitchenApplianceRepository.saveAndFlush(ownedKitchenAppliance);

        // Get the ownedKitchenAppliance
        restOwnedKitchenApplianceMockMvc.perform(get("/api/owned-kitchen-appliances/{id}", ownedKitchenAppliance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ownedKitchenAppliance.getId().intValue()))
            .andExpect(jsonPath("$.kitchenApplianceId").value(DEFAULT_KITCHEN_APPLIANCE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOwnedKitchenAppliance() throws Exception {
        // Get the ownedKitchenAppliance
        restOwnedKitchenApplianceMockMvc.perform(get("/api/owned-kitchen-appliances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOwnedKitchenAppliance() throws Exception {
        // Initialize the database
        ownedKitchenApplianceRepository.saveAndFlush(ownedKitchenAppliance);

        int databaseSizeBeforeUpdate = ownedKitchenApplianceRepository.findAll().size();

        // Update the ownedKitchenAppliance
        OwnedKitchenAppliance updatedOwnedKitchenAppliance = ownedKitchenApplianceRepository.findById(ownedKitchenAppliance.getId()).get();
        // Disconnect from session so that the updates on updatedOwnedKitchenAppliance are not directly saved in db
        em.detach(updatedOwnedKitchenAppliance);
        updatedOwnedKitchenAppliance.setKitchenApplianceId(UPDATED_KITCHEN_APPLIANCE_ID);
        OwnedKitchenApplianceDTO ownedKitchenApplianceDTO = ownedKitchenApplianceMapper.toDto(updatedOwnedKitchenAppliance);

        restOwnedKitchenApplianceMockMvc.perform(put("/api/owned-kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ownedKitchenApplianceDTO)))
            .andExpect(status().isOk());

        // Validate the OwnedKitchenAppliance in the database
        List<OwnedKitchenAppliance> ownedKitchenApplianceList = ownedKitchenApplianceRepository.findAll();
        assertThat(ownedKitchenApplianceList).hasSize(databaseSizeBeforeUpdate);
        OwnedKitchenAppliance testOwnedKitchenAppliance = ownedKitchenApplianceList.get(ownedKitchenApplianceList.size() - 1);
        assertThat(testOwnedKitchenAppliance.getKitchenApplianceId()).isEqualTo(UPDATED_KITCHEN_APPLIANCE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingOwnedKitchenAppliance() throws Exception {
        int databaseSizeBeforeUpdate = ownedKitchenApplianceRepository.findAll().size();

        // Create the OwnedKitchenAppliance
        OwnedKitchenApplianceDTO ownedKitchenApplianceDTO = ownedKitchenApplianceMapper.toDto(ownedKitchenAppliance);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOwnedKitchenApplianceMockMvc.perform(put("/api/owned-kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ownedKitchenApplianceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OwnedKitchenAppliance in the database
        List<OwnedKitchenAppliance> ownedKitchenApplianceList = ownedKitchenApplianceRepository.findAll();
        assertThat(ownedKitchenApplianceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOwnedKitchenAppliance() throws Exception {
        // Initialize the database
        ownedKitchenApplianceRepository.saveAndFlush(ownedKitchenAppliance);

        int databaseSizeBeforeDelete = ownedKitchenApplianceRepository.findAll().size();

        // Delete the ownedKitchenAppliance
        restOwnedKitchenApplianceMockMvc.perform(delete("/api/owned-kitchen-appliances/{id}", ownedKitchenAppliance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OwnedKitchenAppliance> ownedKitchenApplianceList = ownedKitchenApplianceRepository.findAll();
        assertThat(ownedKitchenApplianceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OwnedKitchenAppliance.class);
        OwnedKitchenAppliance ownedKitchenAppliance1 = new OwnedKitchenAppliance();
        ownedKitchenAppliance1.setId(1L);
        OwnedKitchenAppliance ownedKitchenAppliance2 = new OwnedKitchenAppliance();
        ownedKitchenAppliance2.setId(ownedKitchenAppliance1.getId());
        assertThat(ownedKitchenAppliance1).isEqualTo(ownedKitchenAppliance2);
        ownedKitchenAppliance2.setId(2L);
        assertThat(ownedKitchenAppliance1).isNotEqualTo(ownedKitchenAppliance2);
        ownedKitchenAppliance1.setId(null);
        assertThat(ownedKitchenAppliance1).isNotEqualTo(ownedKitchenAppliance2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OwnedKitchenApplianceDTO.class);
        OwnedKitchenApplianceDTO ownedKitchenApplianceDTO1 = new OwnedKitchenApplianceDTO();
        ownedKitchenApplianceDTO1.setId(1L);
        OwnedKitchenApplianceDTO ownedKitchenApplianceDTO2 = new OwnedKitchenApplianceDTO();
        assertThat(ownedKitchenApplianceDTO1).isNotEqualTo(ownedKitchenApplianceDTO2);
        ownedKitchenApplianceDTO2.setId(ownedKitchenApplianceDTO1.getId());
        assertThat(ownedKitchenApplianceDTO1).isEqualTo(ownedKitchenApplianceDTO2);
        ownedKitchenApplianceDTO2.setId(2L);
        assertThat(ownedKitchenApplianceDTO1).isNotEqualTo(ownedKitchenApplianceDTO2);
        ownedKitchenApplianceDTO1.setId(null);
        assertThat(ownedKitchenApplianceDTO1).isNotEqualTo(ownedKitchenApplianceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(ownedKitchenApplianceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(ownedKitchenApplianceMapper.fromId(null)).isNull();
    }
}
