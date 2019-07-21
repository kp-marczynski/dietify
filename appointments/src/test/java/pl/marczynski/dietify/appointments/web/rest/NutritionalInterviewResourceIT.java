package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.AppointmentsApp;
import pl.marczynski.dietify.appointments.domain.NutritionalInterview;
import pl.marczynski.dietify.appointments.domain.Appointment;
import pl.marczynski.dietify.appointments.repository.NutritionalInterviewRepository;
import pl.marczynski.dietify.appointments.service.NutritionalInterviewService;
import pl.marczynski.dietify.appointments.service.dto.NutritionalInterviewDTO;
import pl.marczynski.dietify.appointments.service.mapper.NutritionalInterviewMapper;
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
import org.springframework.util.Base64Utils;
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

import pl.marczynski.dietify.appointments.domain.enumeration.PhysicalActivity;
import pl.marczynski.dietify.appointments.domain.enumeration.JobType;
/**
 * Integration tests for the {@Link NutritionalInterviewResource} REST controller.
 */
@SpringBootTest(classes = AppointmentsApp.class)
public class NutritionalInterviewResourceIT {

    private static final LocalDate DEFAULT_COMPLETION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_COMPLETION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_TARGET_WEIGHT = 1;
    private static final Integer UPDATED_TARGET_WEIGHT = 2;

    private static final String DEFAULT_ADVICE_PURPOSE = "AAAAAAAAAA";
    private static final String UPDATED_ADVICE_PURPOSE = "BBBBBBBBBB";

    private static final PhysicalActivity DEFAULT_PHYSICAL_ACTIVITY = PhysicalActivity.EXTREMELY_INACTIVE;
    private static final PhysicalActivity UPDATED_PHYSICAL_ACTIVITY = PhysicalActivity.SEDENTARY;

    private static final String DEFAULT_DISEASES = "AAAAAAAAAA";
    private static final String UPDATED_DISEASES = "BBBBBBBBBB";

    private static final String DEFAULT_MEDICINES = "AAAAAAAAAA";
    private static final String UPDATED_MEDICINES = "BBBBBBBBBB";

    private static final JobType DEFAULT_JOB_TYPE = JobType.SITTING;
    private static final JobType UPDATED_JOB_TYPE = JobType.STANDING;

    private static final String DEFAULT_LIKED_PRODUCTS = "AAAAAAAAAA";
    private static final String UPDATED_LIKED_PRODUCTS = "BBBBBBBBBB";

    private static final String DEFAULT_DISLIKED_PRODUCTS = "AAAAAAAAAA";
    private static final String UPDATED_DISLIKED_PRODUCTS = "BBBBBBBBBB";

    private static final String DEFAULT_FOOD_ALLERGIES = "AAAAAAAAAA";
    private static final String UPDATED_FOOD_ALLERGIES = "BBBBBBBBBB";

    private static final String DEFAULT_FOOD_INTOLERANCES = "AAAAAAAAAA";
    private static final String UPDATED_FOOD_INTOLERANCES = "BBBBBBBBBB";

    @Autowired
    private NutritionalInterviewRepository nutritionalInterviewRepository;

    @Autowired
    private NutritionalInterviewMapper nutritionalInterviewMapper;

    @Autowired
    private NutritionalInterviewService nutritionalInterviewService;

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

    private MockMvc restNutritionalInterviewMockMvc;

    private NutritionalInterview nutritionalInterview;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NutritionalInterviewResource nutritionalInterviewResource = new NutritionalInterviewResource(nutritionalInterviewService);
        this.restNutritionalInterviewMockMvc = MockMvcBuilders.standaloneSetup(nutritionalInterviewResource)
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
    public static NutritionalInterview createEntity(EntityManager em) {
        NutritionalInterview nutritionalInterview = new NutritionalInterview();
        nutritionalInterview.setCompletionDate(DEFAULT_COMPLETION_DATE);
        nutritionalInterview.setTargetWeight(DEFAULT_TARGET_WEIGHT);
        nutritionalInterview.setAdvicePurpose(DEFAULT_ADVICE_PURPOSE);
        nutritionalInterview.setPhysicalActivity(DEFAULT_PHYSICAL_ACTIVITY);
        nutritionalInterview.setDiseases(DEFAULT_DISEASES);
        nutritionalInterview.setMedicines(DEFAULT_MEDICINES);
        nutritionalInterview.setJobType(DEFAULT_JOB_TYPE);
        nutritionalInterview.setLikedProducts(DEFAULT_LIKED_PRODUCTS);
        nutritionalInterview.setDislikedProducts(DEFAULT_DISLIKED_PRODUCTS);
        nutritionalInterview.setFoodAllergies(DEFAULT_FOOD_ALLERGIES);
        nutritionalInterview.setFoodIntolerances(DEFAULT_FOOD_INTOLERANCES);
        // Add required entity
        Appointment appointment;
        if (TestUtil.findAll(em, Appointment.class).isEmpty()) {
            appointment = AppointmentResourceIT.createEntity(em);
            em.persist(appointment);
            em.flush();
        } else {
            appointment = TestUtil.findAll(em, Appointment.class).get(0);
        }
        nutritionalInterview.setAppointment(appointment);
        return nutritionalInterview;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NutritionalInterview createUpdatedEntity(EntityManager em) {
        NutritionalInterview nutritionalInterview = new NutritionalInterview();
        nutritionalInterview.setCompletionDate(UPDATED_COMPLETION_DATE);
        nutritionalInterview.setTargetWeight(UPDATED_TARGET_WEIGHT);
        nutritionalInterview.setAdvicePurpose(UPDATED_ADVICE_PURPOSE);
        nutritionalInterview.setPhysicalActivity(UPDATED_PHYSICAL_ACTIVITY);
        nutritionalInterview.setDiseases(UPDATED_DISEASES);
        nutritionalInterview.setMedicines(UPDATED_MEDICINES);
        nutritionalInterview.setJobType(UPDATED_JOB_TYPE);
        nutritionalInterview.setLikedProducts(UPDATED_LIKED_PRODUCTS);
        nutritionalInterview.setDislikedProducts(UPDATED_DISLIKED_PRODUCTS);
        nutritionalInterview.setFoodAllergies(UPDATED_FOOD_ALLERGIES);
        nutritionalInterview.setFoodIntolerances(UPDATED_FOOD_INTOLERANCES);
        // Add required entity
        Appointment appointment;
        if (TestUtil.findAll(em, Appointment.class).isEmpty()) {
            appointment = AppointmentResourceIT.createUpdatedEntity(em);
            em.persist(appointment);
            em.flush();
        } else {
            appointment = TestUtil.findAll(em, Appointment.class).get(0);
        }
        nutritionalInterview.setAppointment(appointment);
        return nutritionalInterview;
    }

    @BeforeEach
    public void initTest() {
        nutritionalInterview = createEntity(em);
    }

    @Test
    @Transactional
    public void createNutritionalInterview() throws Exception {
        int databaseSizeBeforeCreate = nutritionalInterviewRepository.findAll().size();

        // Create the NutritionalInterview
        NutritionalInterviewDTO nutritionalInterviewDTO = nutritionalInterviewMapper.toDto(nutritionalInterview);
        restNutritionalInterviewMockMvc.perform(post("/api/nutritional-interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionalInterviewDTO)))
            .andExpect(status().isCreated());

        // Validate the NutritionalInterview in the database
        List<NutritionalInterview> nutritionalInterviewList = nutritionalInterviewRepository.findAll();
        assertThat(nutritionalInterviewList).hasSize(databaseSizeBeforeCreate + 1);
        NutritionalInterview testNutritionalInterview = nutritionalInterviewList.get(nutritionalInterviewList.size() - 1);
        assertThat(testNutritionalInterview.getCompletionDate()).isEqualTo(DEFAULT_COMPLETION_DATE);
        assertThat(testNutritionalInterview.getTargetWeight()).isEqualTo(DEFAULT_TARGET_WEIGHT);
        assertThat(testNutritionalInterview.getAdvicePurpose()).isEqualTo(DEFAULT_ADVICE_PURPOSE);
        assertThat(testNutritionalInterview.getPhysicalActivity()).isEqualTo(DEFAULT_PHYSICAL_ACTIVITY);
        assertThat(testNutritionalInterview.getDiseases()).isEqualTo(DEFAULT_DISEASES);
        assertThat(testNutritionalInterview.getMedicines()).isEqualTo(DEFAULT_MEDICINES);
        assertThat(testNutritionalInterview.getJobType()).isEqualTo(DEFAULT_JOB_TYPE);
        assertThat(testNutritionalInterview.getLikedProducts()).isEqualTo(DEFAULT_LIKED_PRODUCTS);
        assertThat(testNutritionalInterview.getDislikedProducts()).isEqualTo(DEFAULT_DISLIKED_PRODUCTS);
        assertThat(testNutritionalInterview.getFoodAllergies()).isEqualTo(DEFAULT_FOOD_ALLERGIES);
        assertThat(testNutritionalInterview.getFoodIntolerances()).isEqualTo(DEFAULT_FOOD_INTOLERANCES);
    }

    @Test
    @Transactional
    public void createNutritionalInterviewWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nutritionalInterviewRepository.findAll().size();

        // Create the NutritionalInterview with an existing ID
        nutritionalInterview.setId(1L);
        NutritionalInterviewDTO nutritionalInterviewDTO = nutritionalInterviewMapper.toDto(nutritionalInterview);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNutritionalInterviewMockMvc.perform(post("/api/nutritional-interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionalInterviewDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionalInterview in the database
        List<NutritionalInterview> nutritionalInterviewList = nutritionalInterviewRepository.findAll();
        assertThat(nutritionalInterviewList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCompletionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionalInterviewRepository.findAll().size();
        // set the field null
        nutritionalInterview.setCompletionDate(null);

        // Create the NutritionalInterview, which fails.
        NutritionalInterviewDTO nutritionalInterviewDTO = nutritionalInterviewMapper.toDto(nutritionalInterview);

        restNutritionalInterviewMockMvc.perform(post("/api/nutritional-interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionalInterviewDTO)))
            .andExpect(status().isBadRequest());

        List<NutritionalInterview> nutritionalInterviewList = nutritionalInterviewRepository.findAll();
        assertThat(nutritionalInterviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTargetWeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionalInterviewRepository.findAll().size();
        // set the field null
        nutritionalInterview.setTargetWeight(null);

        // Create the NutritionalInterview, which fails.
        NutritionalInterviewDTO nutritionalInterviewDTO = nutritionalInterviewMapper.toDto(nutritionalInterview);

        restNutritionalInterviewMockMvc.perform(post("/api/nutritional-interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionalInterviewDTO)))
            .andExpect(status().isBadRequest());

        List<NutritionalInterview> nutritionalInterviewList = nutritionalInterviewRepository.findAll();
        assertThat(nutritionalInterviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhysicalActivityIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionalInterviewRepository.findAll().size();
        // set the field null
        nutritionalInterview.setPhysicalActivity(null);

        // Create the NutritionalInterview, which fails.
        NutritionalInterviewDTO nutritionalInterviewDTO = nutritionalInterviewMapper.toDto(nutritionalInterview);

        restNutritionalInterviewMockMvc.perform(post("/api/nutritional-interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionalInterviewDTO)))
            .andExpect(status().isBadRequest());

        List<NutritionalInterview> nutritionalInterviewList = nutritionalInterviewRepository.findAll();
        assertThat(nutritionalInterviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNutritionalInterviews() throws Exception {
        // Initialize the database
        nutritionalInterviewRepository.saveAndFlush(nutritionalInterview);

        // Get all the nutritionalInterviewList
        restNutritionalInterviewMockMvc.perform(get("/api/nutritional-interviews?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutritionalInterview.getId().intValue())))
            .andExpect(jsonPath("$.[*].completionDate").value(hasItem(DEFAULT_COMPLETION_DATE.toString())))
            .andExpect(jsonPath("$.[*].targetWeight").value(hasItem(DEFAULT_TARGET_WEIGHT)))
            .andExpect(jsonPath("$.[*].advicePurpose").value(hasItem(DEFAULT_ADVICE_PURPOSE.toString())))
            .andExpect(jsonPath("$.[*].physicalActivity").value(hasItem(DEFAULT_PHYSICAL_ACTIVITY.toString())))
            .andExpect(jsonPath("$.[*].diseases").value(hasItem(DEFAULT_DISEASES.toString())))
            .andExpect(jsonPath("$.[*].medicines").value(hasItem(DEFAULT_MEDICINES.toString())))
            .andExpect(jsonPath("$.[*].jobType").value(hasItem(DEFAULT_JOB_TYPE.toString())))
            .andExpect(jsonPath("$.[*].likedProducts").value(hasItem(DEFAULT_LIKED_PRODUCTS.toString())))
            .andExpect(jsonPath("$.[*].dislikedProducts").value(hasItem(DEFAULT_DISLIKED_PRODUCTS.toString())))
            .andExpect(jsonPath("$.[*].foodAllergies").value(hasItem(DEFAULT_FOOD_ALLERGIES.toString())))
            .andExpect(jsonPath("$.[*].foodIntolerances").value(hasItem(DEFAULT_FOOD_INTOLERANCES.toString())));
    }
    
    @Test
    @Transactional
    public void getNutritionalInterview() throws Exception {
        // Initialize the database
        nutritionalInterviewRepository.saveAndFlush(nutritionalInterview);

        // Get the nutritionalInterview
        restNutritionalInterviewMockMvc.perform(get("/api/nutritional-interviews/{id}", nutritionalInterview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nutritionalInterview.getId().intValue()))
            .andExpect(jsonPath("$.completionDate").value(DEFAULT_COMPLETION_DATE.toString()))
            .andExpect(jsonPath("$.targetWeight").value(DEFAULT_TARGET_WEIGHT))
            .andExpect(jsonPath("$.advicePurpose").value(DEFAULT_ADVICE_PURPOSE.toString()))
            .andExpect(jsonPath("$.physicalActivity").value(DEFAULT_PHYSICAL_ACTIVITY.toString()))
            .andExpect(jsonPath("$.diseases").value(DEFAULT_DISEASES.toString()))
            .andExpect(jsonPath("$.medicines").value(DEFAULT_MEDICINES.toString()))
            .andExpect(jsonPath("$.jobType").value(DEFAULT_JOB_TYPE.toString()))
            .andExpect(jsonPath("$.likedProducts").value(DEFAULT_LIKED_PRODUCTS.toString()))
            .andExpect(jsonPath("$.dislikedProducts").value(DEFAULT_DISLIKED_PRODUCTS.toString()))
            .andExpect(jsonPath("$.foodAllergies").value(DEFAULT_FOOD_ALLERGIES.toString()))
            .andExpect(jsonPath("$.foodIntolerances").value(DEFAULT_FOOD_INTOLERANCES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNutritionalInterview() throws Exception {
        // Get the nutritionalInterview
        restNutritionalInterviewMockMvc.perform(get("/api/nutritional-interviews/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNutritionalInterview() throws Exception {
        // Initialize the database
        nutritionalInterviewRepository.saveAndFlush(nutritionalInterview);

        int databaseSizeBeforeUpdate = nutritionalInterviewRepository.findAll().size();

        // Update the nutritionalInterview
        NutritionalInterview updatedNutritionalInterview = nutritionalInterviewRepository.findById(nutritionalInterview.getId()).get();
        // Disconnect from session so that the updates on updatedNutritionalInterview are not directly saved in db
        em.detach(updatedNutritionalInterview);
        updatedNutritionalInterview.setCompletionDate(UPDATED_COMPLETION_DATE);
        updatedNutritionalInterview.setTargetWeight(UPDATED_TARGET_WEIGHT);
        updatedNutritionalInterview.setAdvicePurpose(UPDATED_ADVICE_PURPOSE);
        updatedNutritionalInterview.setPhysicalActivity(UPDATED_PHYSICAL_ACTIVITY);
        updatedNutritionalInterview.setDiseases(UPDATED_DISEASES);
        updatedNutritionalInterview.setMedicines(UPDATED_MEDICINES);
        updatedNutritionalInterview.setJobType(UPDATED_JOB_TYPE);
        updatedNutritionalInterview.setLikedProducts(UPDATED_LIKED_PRODUCTS);
        updatedNutritionalInterview.setDislikedProducts(UPDATED_DISLIKED_PRODUCTS);
        updatedNutritionalInterview.setFoodAllergies(UPDATED_FOOD_ALLERGIES);
        updatedNutritionalInterview.setFoodIntolerances(UPDATED_FOOD_INTOLERANCES);
        NutritionalInterviewDTO nutritionalInterviewDTO = nutritionalInterviewMapper.toDto(updatedNutritionalInterview);

        restNutritionalInterviewMockMvc.perform(put("/api/nutritional-interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionalInterviewDTO)))
            .andExpect(status().isOk());

        // Validate the NutritionalInterview in the database
        List<NutritionalInterview> nutritionalInterviewList = nutritionalInterviewRepository.findAll();
        assertThat(nutritionalInterviewList).hasSize(databaseSizeBeforeUpdate);
        NutritionalInterview testNutritionalInterview = nutritionalInterviewList.get(nutritionalInterviewList.size() - 1);
        assertThat(testNutritionalInterview.getCompletionDate()).isEqualTo(UPDATED_COMPLETION_DATE);
        assertThat(testNutritionalInterview.getTargetWeight()).isEqualTo(UPDATED_TARGET_WEIGHT);
        assertThat(testNutritionalInterview.getAdvicePurpose()).isEqualTo(UPDATED_ADVICE_PURPOSE);
        assertThat(testNutritionalInterview.getPhysicalActivity()).isEqualTo(UPDATED_PHYSICAL_ACTIVITY);
        assertThat(testNutritionalInterview.getDiseases()).isEqualTo(UPDATED_DISEASES);
        assertThat(testNutritionalInterview.getMedicines()).isEqualTo(UPDATED_MEDICINES);
        assertThat(testNutritionalInterview.getJobType()).isEqualTo(UPDATED_JOB_TYPE);
        assertThat(testNutritionalInterview.getLikedProducts()).isEqualTo(UPDATED_LIKED_PRODUCTS);
        assertThat(testNutritionalInterview.getDislikedProducts()).isEqualTo(UPDATED_DISLIKED_PRODUCTS);
        assertThat(testNutritionalInterview.getFoodAllergies()).isEqualTo(UPDATED_FOOD_ALLERGIES);
        assertThat(testNutritionalInterview.getFoodIntolerances()).isEqualTo(UPDATED_FOOD_INTOLERANCES);
    }

    @Test
    @Transactional
    public void updateNonExistingNutritionalInterview() throws Exception {
        int databaseSizeBeforeUpdate = nutritionalInterviewRepository.findAll().size();

        // Create the NutritionalInterview
        NutritionalInterviewDTO nutritionalInterviewDTO = nutritionalInterviewMapper.toDto(nutritionalInterview);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutritionalInterviewMockMvc.perform(put("/api/nutritional-interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionalInterviewDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionalInterview in the database
        List<NutritionalInterview> nutritionalInterviewList = nutritionalInterviewRepository.findAll();
        assertThat(nutritionalInterviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNutritionalInterview() throws Exception {
        // Initialize the database
        nutritionalInterviewRepository.saveAndFlush(nutritionalInterview);

        int databaseSizeBeforeDelete = nutritionalInterviewRepository.findAll().size();

        // Delete the nutritionalInterview
        restNutritionalInterviewMockMvc.perform(delete("/api/nutritional-interviews/{id}", nutritionalInterview.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NutritionalInterview> nutritionalInterviewList = nutritionalInterviewRepository.findAll();
        assertThat(nutritionalInterviewList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NutritionalInterview.class);
        NutritionalInterview nutritionalInterview1 = new NutritionalInterview();
        nutritionalInterview1.setId(1L);
        NutritionalInterview nutritionalInterview2 = new NutritionalInterview();
        nutritionalInterview2.setId(nutritionalInterview1.getId());
        assertThat(nutritionalInterview1).isEqualTo(nutritionalInterview2);
        nutritionalInterview2.setId(2L);
        assertThat(nutritionalInterview1).isNotEqualTo(nutritionalInterview2);
        nutritionalInterview1.setId(null);
        assertThat(nutritionalInterview1).isNotEqualTo(nutritionalInterview2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NutritionalInterviewDTO.class);
        NutritionalInterviewDTO nutritionalInterviewDTO1 = new NutritionalInterviewDTO();
        nutritionalInterviewDTO1.setId(1L);
        NutritionalInterviewDTO nutritionalInterviewDTO2 = new NutritionalInterviewDTO();
        assertThat(nutritionalInterviewDTO1).isNotEqualTo(nutritionalInterviewDTO2);
        nutritionalInterviewDTO2.setId(nutritionalInterviewDTO1.getId());
        assertThat(nutritionalInterviewDTO1).isEqualTo(nutritionalInterviewDTO2);
        nutritionalInterviewDTO2.setId(2L);
        assertThat(nutritionalInterviewDTO1).isNotEqualTo(nutritionalInterviewDTO2);
        nutritionalInterviewDTO1.setId(null);
        assertThat(nutritionalInterviewDTO1).isNotEqualTo(nutritionalInterviewDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(nutritionalInterviewMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(nutritionalInterviewMapper.fromId(null)).isNull();
    }
}
