package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.AppointmentsApp;
import pl.marczynski.dietify.appointments.domain.BodyMeasurement;
import pl.marczynski.dietify.appointments.domain.Appointment;
import pl.marczynski.dietify.appointments.repository.BodyMeasurementRepository;
import pl.marczynski.dietify.appointments.service.BodyMeasurementService;
import pl.marczynski.dietify.appointments.service.dto.BodyMeasurementDTO;
import pl.marczynski.dietify.appointments.service.mapper.BodyMeasurementMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static pl.marczynski.dietify.appointments.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link BodyMeasurementResource} REST controller.
 */
@SpringBootTest(classes = AppointmentsApp.class)
public class BodyMeasurementResourceIT {

    private static final LocalDate DEFAULT_COMPLETION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_COMPLETION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_HEIGHT = 1;
    private static final Integer UPDATED_HEIGHT = 2;

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;

    private static final Double DEFAULT_WAIST = 1D;
    private static final Double UPDATED_WAIST = 2D;

    private static final Double DEFAULT_PERCENT_OF_FAT_TISSUE = 0D;
    private static final Double UPDATED_PERCENT_OF_FAT_TISSUE = 1D;

    private static final Double DEFAULT_PERCENT_OF_WATER = 0D;
    private static final Double UPDATED_PERCENT_OF_WATER = 1D;

    private static final Double DEFAULT_MUSCLE_MASS = 1D;
    private static final Double UPDATED_MUSCLE_MASS = 2D;

    private static final Double DEFAULT_PHYSICAL_MARK = 1D;
    private static final Double UPDATED_PHYSICAL_MARK = 2D;

    private static final Double DEFAULT_CALCIUM_IN_BONES = 1D;
    private static final Double UPDATED_CALCIUM_IN_BONES = 2D;

    private static final Integer DEFAULT_BASIC_METABOLISM = 1;
    private static final Integer UPDATED_BASIC_METABOLISM = 2;

    private static final Double DEFAULT_METABOLIC_AGE = 1D;
    private static final Double UPDATED_METABOLIC_AGE = 2D;

    private static final Double DEFAULT_VISCERAL_FAT_LEVEL = 1D;
    private static final Double UPDATED_VISCERAL_FAT_LEVEL = 2D;

    @Autowired
    private BodyMeasurementRepository bodyMeasurementRepository;

    @Autowired
    private BodyMeasurementMapper bodyMeasurementMapper;

    @Autowired
    private BodyMeasurementService bodyMeasurementService;

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

    private MockMvc restBodyMeasurementMockMvc;

    private BodyMeasurement bodyMeasurement;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BodyMeasurementResource bodyMeasurementResource = new BodyMeasurementResource(bodyMeasurementService);
        this.restBodyMeasurementMockMvc = MockMvcBuilders.standaloneSetup(bodyMeasurementResource)
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
    public static BodyMeasurement createEntity(EntityManager em) {
        BodyMeasurement bodyMeasurement = new BodyMeasurement();
        bodyMeasurement.setCompletionDate(DEFAULT_COMPLETION_DATE);
        bodyMeasurement.setHeight(DEFAULT_HEIGHT);
        bodyMeasurement.setWeight(DEFAULT_WEIGHT);
        bodyMeasurement.setWaist(DEFAULT_WAIST);
        bodyMeasurement.setPercentOfFatTissue(DEFAULT_PERCENT_OF_FAT_TISSUE);
        bodyMeasurement.setPercentOfWater(DEFAULT_PERCENT_OF_WATER);
        bodyMeasurement.setMuscleMass(DEFAULT_MUSCLE_MASS);
        bodyMeasurement.setPhysicalMark(DEFAULT_PHYSICAL_MARK);
        bodyMeasurement.setCalciumInBones(DEFAULT_CALCIUM_IN_BONES);
        bodyMeasurement.setBasicMetabolism(DEFAULT_BASIC_METABOLISM);
        bodyMeasurement.setMetabolicAge(DEFAULT_METABOLIC_AGE);
        bodyMeasurement.setVisceralFatLevel(DEFAULT_VISCERAL_FAT_LEVEL);
        // Add required entity
        Appointment appointment;
        if (TestUtil.findAll(em, Appointment.class).isEmpty()) {
            appointment = AppointmentResourceIT.createEntity(em);
            em.persist(appointment);
            em.flush();
        } else {
            appointment = TestUtil.findAll(em, Appointment.class).get(0);
        }
        bodyMeasurement.setAppointment(appointment);
        return bodyMeasurement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BodyMeasurement createUpdatedEntity(EntityManager em) {
        BodyMeasurement bodyMeasurement = new BodyMeasurement();
        bodyMeasurement.setCompletionDate(UPDATED_COMPLETION_DATE);
        bodyMeasurement.setHeight(UPDATED_HEIGHT);
        bodyMeasurement.setWeight(UPDATED_WEIGHT);
        bodyMeasurement.setWaist(UPDATED_WAIST);
        bodyMeasurement.setPercentOfFatTissue(UPDATED_PERCENT_OF_FAT_TISSUE);
        bodyMeasurement.setPercentOfWater(UPDATED_PERCENT_OF_WATER);
        bodyMeasurement.setMuscleMass(UPDATED_MUSCLE_MASS);
        bodyMeasurement.setPhysicalMark(UPDATED_PHYSICAL_MARK);
        bodyMeasurement.setCalciumInBones(UPDATED_CALCIUM_IN_BONES);
        bodyMeasurement.setBasicMetabolism(UPDATED_BASIC_METABOLISM);
        bodyMeasurement.setMetabolicAge(UPDATED_METABOLIC_AGE);
        bodyMeasurement.setVisceralFatLevel(UPDATED_VISCERAL_FAT_LEVEL);
        // Add required entity
        Appointment appointment;
        if (TestUtil.findAll(em, Appointment.class).isEmpty()) {
            appointment = AppointmentResourceIT.createUpdatedEntity(em);
            em.persist(appointment);
            em.flush();
        } else {
            appointment = TestUtil.findAll(em, Appointment.class).get(0);
        }
        bodyMeasurement.setAppointment(appointment);
        return bodyMeasurement;
    }

    @BeforeEach
    public void initTest() {
        bodyMeasurement = createEntity(em);
    }

    @Test
    @Transactional
    public void createBodyMeasurement() throws Exception {
        int databaseSizeBeforeCreate = bodyMeasurementRepository.findAll().size();

        // Create the BodyMeasurement
        BodyMeasurementDTO bodyMeasurementDTO = bodyMeasurementMapper.toDto(bodyMeasurement);
        restBodyMeasurementMockMvc.perform(post("/api/body-measurements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurementDTO)))
            .andExpect(status().isCreated());

        // Validate the BodyMeasurement in the database
        List<BodyMeasurement> bodyMeasurementList = bodyMeasurementRepository.findAll();
        assertThat(bodyMeasurementList).hasSize(databaseSizeBeforeCreate + 1);
        BodyMeasurement testBodyMeasurement = bodyMeasurementList.get(bodyMeasurementList.size() - 1);
        assertThat(testBodyMeasurement.getCompletionDate()).isEqualTo(DEFAULT_COMPLETION_DATE);
        assertThat(testBodyMeasurement.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testBodyMeasurement.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testBodyMeasurement.getWaist()).isEqualTo(DEFAULT_WAIST);
        assertThat(testBodyMeasurement.getPercentOfFatTissue()).isEqualTo(DEFAULT_PERCENT_OF_FAT_TISSUE);
        assertThat(testBodyMeasurement.getPercentOfWater()).isEqualTo(DEFAULT_PERCENT_OF_WATER);
        assertThat(testBodyMeasurement.getMuscleMass()).isEqualTo(DEFAULT_MUSCLE_MASS);
        assertThat(testBodyMeasurement.getPhysicalMark()).isEqualTo(DEFAULT_PHYSICAL_MARK);
        assertThat(testBodyMeasurement.getCalciumInBones()).isEqualTo(DEFAULT_CALCIUM_IN_BONES);
        assertThat(testBodyMeasurement.getBasicMetabolism()).isEqualTo(DEFAULT_BASIC_METABOLISM);
        assertThat(testBodyMeasurement.getMetabolicAge()).isEqualTo(DEFAULT_METABOLIC_AGE);
        assertThat(testBodyMeasurement.getVisceralFatLevel()).isEqualTo(DEFAULT_VISCERAL_FAT_LEVEL);
    }

    @Test
    @Transactional
    public void createBodyMeasurementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bodyMeasurementRepository.findAll().size();

        // Create the BodyMeasurement with an existing ID
        bodyMeasurement.setId(1L);
        BodyMeasurementDTO bodyMeasurementDTO = bodyMeasurementMapper.toDto(bodyMeasurement);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBodyMeasurementMockMvc.perform(post("/api/body-measurements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurementDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BodyMeasurement in the database
        List<BodyMeasurement> bodyMeasurementList = bodyMeasurementRepository.findAll();
        assertThat(bodyMeasurementList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCompletionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = bodyMeasurementRepository.findAll().size();
        // set the field null
        bodyMeasurement.setCompletionDate(null);

        // Create the BodyMeasurement, which fails.
        BodyMeasurementDTO bodyMeasurementDTO = bodyMeasurementMapper.toDto(bodyMeasurement);

        restBodyMeasurementMockMvc.perform(post("/api/body-measurements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurementDTO)))
            .andExpect(status().isBadRequest());

        List<BodyMeasurement> bodyMeasurementList = bodyMeasurementRepository.findAll();
        assertThat(bodyMeasurementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = bodyMeasurementRepository.findAll().size();
        // set the field null
        bodyMeasurement.setHeight(null);

        // Create the BodyMeasurement, which fails.
        BodyMeasurementDTO bodyMeasurementDTO = bodyMeasurementMapper.toDto(bodyMeasurement);

        restBodyMeasurementMockMvc.perform(post("/api/body-measurements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurementDTO)))
            .andExpect(status().isBadRequest());

        List<BodyMeasurement> bodyMeasurementList = bodyMeasurementRepository.findAll();
        assertThat(bodyMeasurementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = bodyMeasurementRepository.findAll().size();
        // set the field null
        bodyMeasurement.setWeight(null);

        // Create the BodyMeasurement, which fails.
        BodyMeasurementDTO bodyMeasurementDTO = bodyMeasurementMapper.toDto(bodyMeasurement);

        restBodyMeasurementMockMvc.perform(post("/api/body-measurements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurementDTO)))
            .andExpect(status().isBadRequest());

        List<BodyMeasurement> bodyMeasurementList = bodyMeasurementRepository.findAll();
        assertThat(bodyMeasurementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWaistIsRequired() throws Exception {
        int databaseSizeBeforeTest = bodyMeasurementRepository.findAll().size();
        // set the field null
        bodyMeasurement.setWaist(null);

        // Create the BodyMeasurement, which fails.
        BodyMeasurementDTO bodyMeasurementDTO = bodyMeasurementMapper.toDto(bodyMeasurement);

        restBodyMeasurementMockMvc.perform(post("/api/body-measurements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurementDTO)))
            .andExpect(status().isBadRequest());

        List<BodyMeasurement> bodyMeasurementList = bodyMeasurementRepository.findAll();
        assertThat(bodyMeasurementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBodyMeasurements() throws Exception {
        // Initialize the database
        bodyMeasurementRepository.saveAndFlush(bodyMeasurement);

        // Get all the bodyMeasurementList
        restBodyMeasurementMockMvc.perform(get("/api/body-measurements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bodyMeasurement.getId().intValue())))
            .andExpect(jsonPath("$.[*].completionDate").value(hasItem(DEFAULT_COMPLETION_DATE.toString())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)))
            .andExpect(jsonPath("$.[*].waist").value(hasItem(DEFAULT_WAIST.doubleValue())))
            .andExpect(jsonPath("$.[*].percentOfFatTissue").value(hasItem(DEFAULT_PERCENT_OF_FAT_TISSUE.doubleValue())))
            .andExpect(jsonPath("$.[*].percentOfWater").value(hasItem(DEFAULT_PERCENT_OF_WATER.doubleValue())))
            .andExpect(jsonPath("$.[*].muscleMass").value(hasItem(DEFAULT_MUSCLE_MASS.doubleValue())))
            .andExpect(jsonPath("$.[*].physicalMark").value(hasItem(DEFAULT_PHYSICAL_MARK.doubleValue())))
            .andExpect(jsonPath("$.[*].calciumInBones").value(hasItem(DEFAULT_CALCIUM_IN_BONES.doubleValue())))
            .andExpect(jsonPath("$.[*].basicMetabolism").value(hasItem(DEFAULT_BASIC_METABOLISM)))
            .andExpect(jsonPath("$.[*].metabolicAge").value(hasItem(DEFAULT_METABOLIC_AGE.doubleValue())))
            .andExpect(jsonPath("$.[*].visceralFatLevel").value(hasItem(DEFAULT_VISCERAL_FAT_LEVEL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getBodyMeasurement() throws Exception {
        // Initialize the database
        bodyMeasurementRepository.saveAndFlush(bodyMeasurement);

        // Get the bodyMeasurement
        restBodyMeasurementMockMvc.perform(get("/api/body-measurements/{id}", bodyMeasurement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bodyMeasurement.getId().intValue()))
            .andExpect(jsonPath("$.completionDate").value(DEFAULT_COMPLETION_DATE.toString()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT))
            .andExpect(jsonPath("$.waist").value(DEFAULT_WAIST.doubleValue()))
            .andExpect(jsonPath("$.percentOfFatTissue").value(DEFAULT_PERCENT_OF_FAT_TISSUE.doubleValue()))
            .andExpect(jsonPath("$.percentOfWater").value(DEFAULT_PERCENT_OF_WATER.doubleValue()))
            .andExpect(jsonPath("$.muscleMass").value(DEFAULT_MUSCLE_MASS.doubleValue()))
            .andExpect(jsonPath("$.physicalMark").value(DEFAULT_PHYSICAL_MARK.doubleValue()))
            .andExpect(jsonPath("$.calciumInBones").value(DEFAULT_CALCIUM_IN_BONES.doubleValue()))
            .andExpect(jsonPath("$.basicMetabolism").value(DEFAULT_BASIC_METABOLISM))
            .andExpect(jsonPath("$.metabolicAge").value(DEFAULT_METABOLIC_AGE.doubleValue()))
            .andExpect(jsonPath("$.visceralFatLevel").value(DEFAULT_VISCERAL_FAT_LEVEL.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBodyMeasurement() throws Exception {
        // Get the bodyMeasurement
        restBodyMeasurementMockMvc.perform(get("/api/body-measurements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBodyMeasurement() throws Exception {
        // Initialize the database
        bodyMeasurementRepository.saveAndFlush(bodyMeasurement);

        int databaseSizeBeforeUpdate = bodyMeasurementRepository.findAll().size();

        // Update the bodyMeasurement
        BodyMeasurement updatedBodyMeasurement = bodyMeasurementRepository.findById(bodyMeasurement.getId()).get();
        // Disconnect from session so that the updates on updatedBodyMeasurement are not directly saved in db
        em.detach(updatedBodyMeasurement);
        updatedBodyMeasurement.setCompletionDate(UPDATED_COMPLETION_DATE);
        updatedBodyMeasurement.setHeight(UPDATED_HEIGHT);
        updatedBodyMeasurement.setWeight(UPDATED_WEIGHT);
        updatedBodyMeasurement.setWaist(UPDATED_WAIST);
        updatedBodyMeasurement.setPercentOfFatTissue(UPDATED_PERCENT_OF_FAT_TISSUE);
        updatedBodyMeasurement.setPercentOfWater(UPDATED_PERCENT_OF_WATER);
        updatedBodyMeasurement.setMuscleMass(UPDATED_MUSCLE_MASS);
        updatedBodyMeasurement.setPhysicalMark(UPDATED_PHYSICAL_MARK);
        updatedBodyMeasurement.setCalciumInBones(UPDATED_CALCIUM_IN_BONES);
        updatedBodyMeasurement.setBasicMetabolism(UPDATED_BASIC_METABOLISM);
        updatedBodyMeasurement.setMetabolicAge(UPDATED_METABOLIC_AGE);
        updatedBodyMeasurement.setVisceralFatLevel(UPDATED_VISCERAL_FAT_LEVEL);
        BodyMeasurementDTO bodyMeasurementDTO = bodyMeasurementMapper.toDto(updatedBodyMeasurement);

        restBodyMeasurementMockMvc.perform(put("/api/body-measurements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurementDTO)))
            .andExpect(status().isOk());

        // Validate the BodyMeasurement in the database
        List<BodyMeasurement> bodyMeasurementList = bodyMeasurementRepository.findAll();
        assertThat(bodyMeasurementList).hasSize(databaseSizeBeforeUpdate);
        BodyMeasurement testBodyMeasurement = bodyMeasurementList.get(bodyMeasurementList.size() - 1);
        assertThat(testBodyMeasurement.getCompletionDate()).isEqualTo(UPDATED_COMPLETION_DATE);
        assertThat(testBodyMeasurement.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testBodyMeasurement.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testBodyMeasurement.getWaist()).isEqualTo(UPDATED_WAIST);
        assertThat(testBodyMeasurement.getPercentOfFatTissue()).isEqualTo(UPDATED_PERCENT_OF_FAT_TISSUE);
        assertThat(testBodyMeasurement.getPercentOfWater()).isEqualTo(UPDATED_PERCENT_OF_WATER);
        assertThat(testBodyMeasurement.getMuscleMass()).isEqualTo(UPDATED_MUSCLE_MASS);
        assertThat(testBodyMeasurement.getPhysicalMark()).isEqualTo(UPDATED_PHYSICAL_MARK);
        assertThat(testBodyMeasurement.getCalciumInBones()).isEqualTo(UPDATED_CALCIUM_IN_BONES);
        assertThat(testBodyMeasurement.getBasicMetabolism()).isEqualTo(UPDATED_BASIC_METABOLISM);
        assertThat(testBodyMeasurement.getMetabolicAge()).isEqualTo(UPDATED_METABOLIC_AGE);
        assertThat(testBodyMeasurement.getVisceralFatLevel()).isEqualTo(UPDATED_VISCERAL_FAT_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingBodyMeasurement() throws Exception {
        int databaseSizeBeforeUpdate = bodyMeasurementRepository.findAll().size();

        // Create the BodyMeasurement
        BodyMeasurementDTO bodyMeasurementDTO = bodyMeasurementMapper.toDto(bodyMeasurement);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBodyMeasurementMockMvc.perform(put("/api/body-measurements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurementDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BodyMeasurement in the database
        List<BodyMeasurement> bodyMeasurementList = bodyMeasurementRepository.findAll();
        assertThat(bodyMeasurementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBodyMeasurement() throws Exception {
        // Initialize the database
        bodyMeasurementRepository.saveAndFlush(bodyMeasurement);

        int databaseSizeBeforeDelete = bodyMeasurementRepository.findAll().size();

        // Delete the bodyMeasurement
        restBodyMeasurementMockMvc.perform(delete("/api/body-measurements/{id}", bodyMeasurement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BodyMeasurement> bodyMeasurementList = bodyMeasurementRepository.findAll();
        assertThat(bodyMeasurementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BodyMeasurement.class);
        BodyMeasurement bodyMeasurement1 = new BodyMeasurement();
        bodyMeasurement1.setId(1L);
        BodyMeasurement bodyMeasurement2 = new BodyMeasurement();
        bodyMeasurement2.setId(bodyMeasurement1.getId());
        assertThat(bodyMeasurement1).isEqualTo(bodyMeasurement2);
        bodyMeasurement2.setId(2L);
        assertThat(bodyMeasurement1).isNotEqualTo(bodyMeasurement2);
        bodyMeasurement1.setId(null);
        assertThat(bodyMeasurement1).isNotEqualTo(bodyMeasurement2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BodyMeasurementDTO.class);
        BodyMeasurementDTO bodyMeasurementDTO1 = new BodyMeasurementDTO();
        bodyMeasurementDTO1.setId(1L);
        BodyMeasurementDTO bodyMeasurementDTO2 = new BodyMeasurementDTO();
        assertThat(bodyMeasurementDTO1).isNotEqualTo(bodyMeasurementDTO2);
        bodyMeasurementDTO2.setId(bodyMeasurementDTO1.getId());
        assertThat(bodyMeasurementDTO1).isEqualTo(bodyMeasurementDTO2);
        bodyMeasurementDTO2.setId(2L);
        assertThat(bodyMeasurementDTO1).isNotEqualTo(bodyMeasurementDTO2);
        bodyMeasurementDTO1.setId(null);
        assertThat(bodyMeasurementDTO1).isNotEqualTo(bodyMeasurementDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bodyMeasurementMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bodyMeasurementMapper.fromId(null)).isNull();
    }
}
