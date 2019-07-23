package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.AppointmentsApp;
import pl.marczynski.dietify.appointments.domain.AppointmentEvaluation;
import pl.marczynski.dietify.appointments.domain.Appointment;
import pl.marczynski.dietify.appointments.repository.AppointmentEvaluationRepository;
import pl.marczynski.dietify.appointments.service.AppointmentEvaluationService;
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
import java.util.List;

import static pl.marczynski.dietify.appointments.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
/**
 * Integration tests for the {@Link AppointmentEvaluationResource} REST controller.
 */
@SpringBootTest(classes = AppointmentsApp.class)
public class AppointmentEvaluationResourceIT {

    private static final SatisfactionRate DEFAULT_OVERALL_SATISFACTION = SatisfactionRate.VERY_DISSATISFIED;
    private static final SatisfactionRate UPDATED_OVERALL_SATISFACTION = SatisfactionRate.DISSATISFIED;

    private static final SatisfactionRate DEFAULT_DIETITIAN_SERVICE_SATISFACTION = SatisfactionRate.VERY_DISSATISFIED;
    private static final SatisfactionRate UPDATED_DIETITIAN_SERVICE_SATISFACTION = SatisfactionRate.DISSATISFIED;

    private static final SatisfactionRate DEFAULT_MEAL_PLAN_OVERALL_SATISFACTION = SatisfactionRate.VERY_DISSATISFIED;
    private static final SatisfactionRate UPDATED_MEAL_PLAN_OVERALL_SATISFACTION = SatisfactionRate.DISSATISFIED;

    private static final SatisfactionRate DEFAULT_MEAL_COST_SATISFACTION = SatisfactionRate.VERY_DISSATISFIED;
    private static final SatisfactionRate UPDATED_MEAL_COST_SATISFACTION = SatisfactionRate.DISSATISFIED;

    private static final SatisfactionRate DEFAULT_MEAL_PREPARATION_TIME_SATISFACTION = SatisfactionRate.VERY_DISSATISFIED;
    private static final SatisfactionRate UPDATED_MEAL_PREPARATION_TIME_SATISFACTION = SatisfactionRate.DISSATISFIED;

    private static final SatisfactionRate DEFAULT_MEAL_COMPLEXITY_LEVEL_SATISFACTION = SatisfactionRate.VERY_DISSATISFIED;
    private static final SatisfactionRate UPDATED_MEAL_COMPLEXITY_LEVEL_SATISFACTION = SatisfactionRate.DISSATISFIED;

    private static final SatisfactionRate DEFAULT_MEAL_TASTEFULNESS_SATISFACTION = SatisfactionRate.VERY_DISSATISFIED;
    private static final SatisfactionRate UPDATED_MEAL_TASTEFULNESS_SATISFACTION = SatisfactionRate.DISSATISFIED;

    private static final SatisfactionRate DEFAULT_DIETARY_RESULT_SATISFACTION = SatisfactionRate.VERY_DISSATISFIED;
    private static final SatisfactionRate UPDATED_DIETARY_RESULT_SATISFACTION = SatisfactionRate.DISSATISFIED;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private AppointmentEvaluationRepository appointmentEvaluationRepository;

    @Autowired
    private AppointmentEvaluationService appointmentEvaluationService;

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

    private MockMvc restAppointmentEvaluationMockMvc;

    private AppointmentEvaluation appointmentEvaluation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AppointmentEvaluationResource appointmentEvaluationResource = new AppointmentEvaluationResource(appointmentEvaluationService);
        this.restAppointmentEvaluationMockMvc = MockMvcBuilders.standaloneSetup(appointmentEvaluationResource)
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
    public static AppointmentEvaluation createEntity(EntityManager em) {
        AppointmentEvaluation appointmentEvaluation = new AppointmentEvaluation();
        appointmentEvaluation.setOverallSatisfaction(DEFAULT_OVERALL_SATISFACTION);
        appointmentEvaluation.setDietitianServiceSatisfaction(DEFAULT_DIETITIAN_SERVICE_SATISFACTION);
        appointmentEvaluation.setMealPlanOverallSatisfaction(DEFAULT_MEAL_PLAN_OVERALL_SATISFACTION);
        appointmentEvaluation.setMealCostSatisfaction(DEFAULT_MEAL_COST_SATISFACTION);
        appointmentEvaluation.setMealPreparationTimeSatisfaction(DEFAULT_MEAL_PREPARATION_TIME_SATISFACTION);
        appointmentEvaluation.setMealComplexityLevelSatisfaction(DEFAULT_MEAL_COMPLEXITY_LEVEL_SATISFACTION);
        appointmentEvaluation.setMealTastefulnessSatisfaction(DEFAULT_MEAL_TASTEFULNESS_SATISFACTION);
        appointmentEvaluation.setDietaryResultSatisfaction(DEFAULT_DIETARY_RESULT_SATISFACTION);
        appointmentEvaluation.setComment(DEFAULT_COMMENT);
        // Add required entity
        Appointment appointment;
        if (TestUtil.findAll(em, Appointment.class).isEmpty()) {
            appointment = AppointmentResourceIT.createEntity(em);
            em.persist(appointment);
            em.flush();
        } else {
            appointment = TestUtil.findAll(em, Appointment.class).get(0);
        }
        appointmentEvaluation.setAppointment(appointment);
        return appointmentEvaluation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppointmentEvaluation createUpdatedEntity(EntityManager em) {
        AppointmentEvaluation appointmentEvaluation = new AppointmentEvaluation();
        appointmentEvaluation.setOverallSatisfaction(UPDATED_OVERALL_SATISFACTION);
        appointmentEvaluation.setDietitianServiceSatisfaction(UPDATED_DIETITIAN_SERVICE_SATISFACTION);
        appointmentEvaluation.setMealPlanOverallSatisfaction(UPDATED_MEAL_PLAN_OVERALL_SATISFACTION);
        appointmentEvaluation.setMealCostSatisfaction(UPDATED_MEAL_COST_SATISFACTION);
        appointmentEvaluation.setMealPreparationTimeSatisfaction(UPDATED_MEAL_PREPARATION_TIME_SATISFACTION);
        appointmentEvaluation.setMealComplexityLevelSatisfaction(UPDATED_MEAL_COMPLEXITY_LEVEL_SATISFACTION);
        appointmentEvaluation.setMealTastefulnessSatisfaction(UPDATED_MEAL_TASTEFULNESS_SATISFACTION);
        appointmentEvaluation.setDietaryResultSatisfaction(UPDATED_DIETARY_RESULT_SATISFACTION);
        appointmentEvaluation.setComment(UPDATED_COMMENT);
        // Add required entity
        Appointment appointment;
        if (TestUtil.findAll(em, Appointment.class).isEmpty()) {
            appointment = AppointmentResourceIT.createUpdatedEntity(em);
            em.persist(appointment);
            em.flush();
        } else {
            appointment = TestUtil.findAll(em, Appointment.class).get(0);
        }
        appointmentEvaluation.setAppointment(appointment);
        return appointmentEvaluation;
    }

    @BeforeEach
    public void initTest() {
        appointmentEvaluation = createEntity(em);
    }

    @Test
    @Transactional
    public void createAppointmentEvaluation() throws Exception {
        int databaseSizeBeforeCreate = appointmentEvaluationRepository.findAll().size();

        // Create the AppointmentEvaluation
        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isCreated());

        // Validate the AppointmentEvaluation in the database
        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeCreate + 1);
        AppointmentEvaluation testAppointmentEvaluation = appointmentEvaluationList.get(appointmentEvaluationList.size() - 1);
        assertThat(testAppointmentEvaluation.getOverallSatisfaction()).isEqualTo(DEFAULT_OVERALL_SATISFACTION);
        assertThat(testAppointmentEvaluation.getDietitianServiceSatisfaction()).isEqualTo(DEFAULT_DIETITIAN_SERVICE_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealPlanOverallSatisfaction()).isEqualTo(DEFAULT_MEAL_PLAN_OVERALL_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealCostSatisfaction()).isEqualTo(DEFAULT_MEAL_COST_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealPreparationTimeSatisfaction()).isEqualTo(DEFAULT_MEAL_PREPARATION_TIME_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealComplexityLevelSatisfaction()).isEqualTo(DEFAULT_MEAL_COMPLEXITY_LEVEL_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealTastefulnessSatisfaction()).isEqualTo(DEFAULT_MEAL_TASTEFULNESS_SATISFACTION);
        assertThat(testAppointmentEvaluation.getDietaryResultSatisfaction()).isEqualTo(DEFAULT_DIETARY_RESULT_SATISFACTION);
        assertThat(testAppointmentEvaluation.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createAppointmentEvaluationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appointmentEvaluationRepository.findAll().size();

        // Create the AppointmentEvaluation with an existing ID
        appointmentEvaluation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        // Validate the AppointmentEvaluation in the database
        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkOverallSatisfactionIsRequired() throws Exception {
        int databaseSizeBeforeTest = appointmentEvaluationRepository.findAll().size();
        // set the field null
        appointmentEvaluation.setOverallSatisfaction(null);

        // Create the AppointmentEvaluation, which fails.

        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDietitianServiceSatisfactionIsRequired() throws Exception {
        int databaseSizeBeforeTest = appointmentEvaluationRepository.findAll().size();
        // set the field null
        appointmentEvaluation.setDietitianServiceSatisfaction(null);

        // Create the AppointmentEvaluation, which fails.

        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMealPlanOverallSatisfactionIsRequired() throws Exception {
        int databaseSizeBeforeTest = appointmentEvaluationRepository.findAll().size();
        // set the field null
        appointmentEvaluation.setMealPlanOverallSatisfaction(null);

        // Create the AppointmentEvaluation, which fails.

        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMealCostSatisfactionIsRequired() throws Exception {
        int databaseSizeBeforeTest = appointmentEvaluationRepository.findAll().size();
        // set the field null
        appointmentEvaluation.setMealCostSatisfaction(null);

        // Create the AppointmentEvaluation, which fails.

        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMealPreparationTimeSatisfactionIsRequired() throws Exception {
        int databaseSizeBeforeTest = appointmentEvaluationRepository.findAll().size();
        // set the field null
        appointmentEvaluation.setMealPreparationTimeSatisfaction(null);

        // Create the AppointmentEvaluation, which fails.

        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMealComplexityLevelSatisfactionIsRequired() throws Exception {
        int databaseSizeBeforeTest = appointmentEvaluationRepository.findAll().size();
        // set the field null
        appointmentEvaluation.setMealComplexityLevelSatisfaction(null);

        // Create the AppointmentEvaluation, which fails.

        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMealTastefulnessSatisfactionIsRequired() throws Exception {
        int databaseSizeBeforeTest = appointmentEvaluationRepository.findAll().size();
        // set the field null
        appointmentEvaluation.setMealTastefulnessSatisfaction(null);

        // Create the AppointmentEvaluation, which fails.

        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDietaryResultSatisfactionIsRequired() throws Exception {
        int databaseSizeBeforeTest = appointmentEvaluationRepository.findAll().size();
        // set the field null
        appointmentEvaluation.setDietaryResultSatisfaction(null);

        // Create the AppointmentEvaluation, which fails.

        restAppointmentEvaluationMockMvc.perform(post("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAppointmentEvaluations() throws Exception {
        // Initialize the database
        appointmentEvaluationRepository.saveAndFlush(appointmentEvaluation);

        // Get all the appointmentEvaluationList
        restAppointmentEvaluationMockMvc.perform(get("/api/appointment-evaluations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appointmentEvaluation.getId().intValue())))
            .andExpect(jsonPath("$.[*].overallSatisfaction").value(hasItem(DEFAULT_OVERALL_SATISFACTION.toString())))
            .andExpect(jsonPath("$.[*].dietitianServiceSatisfaction").value(hasItem(DEFAULT_DIETITIAN_SERVICE_SATISFACTION.toString())))
            .andExpect(jsonPath("$.[*].mealPlanOverallSatisfaction").value(hasItem(DEFAULT_MEAL_PLAN_OVERALL_SATISFACTION.toString())))
            .andExpect(jsonPath("$.[*].mealCostSatisfaction").value(hasItem(DEFAULT_MEAL_COST_SATISFACTION.toString())))
            .andExpect(jsonPath("$.[*].mealPreparationTimeSatisfaction").value(hasItem(DEFAULT_MEAL_PREPARATION_TIME_SATISFACTION.toString())))
            .andExpect(jsonPath("$.[*].mealComplexityLevelSatisfaction").value(hasItem(DEFAULT_MEAL_COMPLEXITY_LEVEL_SATISFACTION.toString())))
            .andExpect(jsonPath("$.[*].mealTastefulnessSatisfaction").value(hasItem(DEFAULT_MEAL_TASTEFULNESS_SATISFACTION.toString())))
            .andExpect(jsonPath("$.[*].dietaryResultSatisfaction").value(hasItem(DEFAULT_DIETARY_RESULT_SATISFACTION.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }
    
    @Test
    @Transactional
    public void getAppointmentEvaluation() throws Exception {
        // Initialize the database
        appointmentEvaluationRepository.saveAndFlush(appointmentEvaluation);

        // Get the appointmentEvaluation
        restAppointmentEvaluationMockMvc.perform(get("/api/appointment-evaluations/{id}", appointmentEvaluation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(appointmentEvaluation.getId().intValue()))
            .andExpect(jsonPath("$.overallSatisfaction").value(DEFAULT_OVERALL_SATISFACTION.toString()))
            .andExpect(jsonPath("$.dietitianServiceSatisfaction").value(DEFAULT_DIETITIAN_SERVICE_SATISFACTION.toString()))
            .andExpect(jsonPath("$.mealPlanOverallSatisfaction").value(DEFAULT_MEAL_PLAN_OVERALL_SATISFACTION.toString()))
            .andExpect(jsonPath("$.mealCostSatisfaction").value(DEFAULT_MEAL_COST_SATISFACTION.toString()))
            .andExpect(jsonPath("$.mealPreparationTimeSatisfaction").value(DEFAULT_MEAL_PREPARATION_TIME_SATISFACTION.toString()))
            .andExpect(jsonPath("$.mealComplexityLevelSatisfaction").value(DEFAULT_MEAL_COMPLEXITY_LEVEL_SATISFACTION.toString()))
            .andExpect(jsonPath("$.mealTastefulnessSatisfaction").value(DEFAULT_MEAL_TASTEFULNESS_SATISFACTION.toString()))
            .andExpect(jsonPath("$.dietaryResultSatisfaction").value(DEFAULT_DIETARY_RESULT_SATISFACTION.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAppointmentEvaluation() throws Exception {
        // Get the appointmentEvaluation
        restAppointmentEvaluationMockMvc.perform(get("/api/appointment-evaluations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAppointmentEvaluation() throws Exception {
        // Initialize the database
        appointmentEvaluationService.save(appointmentEvaluation);

        int databaseSizeBeforeUpdate = appointmentEvaluationRepository.findAll().size();

        // Update the appointmentEvaluation
        AppointmentEvaluation updatedAppointmentEvaluation = appointmentEvaluationRepository.findById(appointmentEvaluation.getId()).get();
        // Disconnect from session so that the updates on updatedAppointmentEvaluation are not directly saved in db
        em.detach(updatedAppointmentEvaluation);
        updatedAppointmentEvaluation.setOverallSatisfaction(UPDATED_OVERALL_SATISFACTION);
        updatedAppointmentEvaluation.setDietitianServiceSatisfaction(UPDATED_DIETITIAN_SERVICE_SATISFACTION);
        updatedAppointmentEvaluation.setMealPlanOverallSatisfaction(UPDATED_MEAL_PLAN_OVERALL_SATISFACTION);
        updatedAppointmentEvaluation.setMealCostSatisfaction(UPDATED_MEAL_COST_SATISFACTION);
        updatedAppointmentEvaluation.setMealPreparationTimeSatisfaction(UPDATED_MEAL_PREPARATION_TIME_SATISFACTION);
        updatedAppointmentEvaluation.setMealComplexityLevelSatisfaction(UPDATED_MEAL_COMPLEXITY_LEVEL_SATISFACTION);
        updatedAppointmentEvaluation.setMealTastefulnessSatisfaction(UPDATED_MEAL_TASTEFULNESS_SATISFACTION);
        updatedAppointmentEvaluation.setDietaryResultSatisfaction(UPDATED_DIETARY_RESULT_SATISFACTION);
        updatedAppointmentEvaluation.setComment(UPDATED_COMMENT);

        restAppointmentEvaluationMockMvc.perform(put("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAppointmentEvaluation)))
            .andExpect(status().isOk());

        // Validate the AppointmentEvaluation in the database
        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeUpdate);
        AppointmentEvaluation testAppointmentEvaluation = appointmentEvaluationList.get(appointmentEvaluationList.size() - 1);
        assertThat(testAppointmentEvaluation.getOverallSatisfaction()).isEqualTo(UPDATED_OVERALL_SATISFACTION);
        assertThat(testAppointmentEvaluation.getDietitianServiceSatisfaction()).isEqualTo(UPDATED_DIETITIAN_SERVICE_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealPlanOverallSatisfaction()).isEqualTo(UPDATED_MEAL_PLAN_OVERALL_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealCostSatisfaction()).isEqualTo(UPDATED_MEAL_COST_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealPreparationTimeSatisfaction()).isEqualTo(UPDATED_MEAL_PREPARATION_TIME_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealComplexityLevelSatisfaction()).isEqualTo(UPDATED_MEAL_COMPLEXITY_LEVEL_SATISFACTION);
        assertThat(testAppointmentEvaluation.getMealTastefulnessSatisfaction()).isEqualTo(UPDATED_MEAL_TASTEFULNESS_SATISFACTION);
        assertThat(testAppointmentEvaluation.getDietaryResultSatisfaction()).isEqualTo(UPDATED_DIETARY_RESULT_SATISFACTION);
        assertThat(testAppointmentEvaluation.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingAppointmentEvaluation() throws Exception {
        int databaseSizeBeforeUpdate = appointmentEvaluationRepository.findAll().size();

        // Create the AppointmentEvaluation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppointmentEvaluationMockMvc.perform(put("/api/appointment-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentEvaluation)))
            .andExpect(status().isBadRequest());

        // Validate the AppointmentEvaluation in the database
        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAppointmentEvaluation() throws Exception {
        // Initialize the database
        appointmentEvaluationService.save(appointmentEvaluation);

        int databaseSizeBeforeDelete = appointmentEvaluationRepository.findAll().size();

        // Delete the appointmentEvaluation
        restAppointmentEvaluationMockMvc.perform(delete("/api/appointment-evaluations/{id}", appointmentEvaluation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AppointmentEvaluation> appointmentEvaluationList = appointmentEvaluationRepository.findAll();
        assertThat(appointmentEvaluationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppointmentEvaluation.class);
        AppointmentEvaluation appointmentEvaluation1 = new AppointmentEvaluation();
        appointmentEvaluation1.setId(1L);
        AppointmentEvaluation appointmentEvaluation2 = new AppointmentEvaluation();
        appointmentEvaluation2.setId(appointmentEvaluation1.getId());
        assertThat(appointmentEvaluation1).isEqualTo(appointmentEvaluation2);
        appointmentEvaluation2.setId(2L);
        assertThat(appointmentEvaluation1).isNotEqualTo(appointmentEvaluation2);
        appointmentEvaluation1.setId(null);
        assertThat(appointmentEvaluation1).isNotEqualTo(appointmentEvaluation2);
    }
}
