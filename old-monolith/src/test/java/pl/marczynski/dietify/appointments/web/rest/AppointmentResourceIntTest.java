package pl.marczynski.dietify.appointments.web.rest;

import org.springframework.security.test.context.support.WithMockUser;
import pl.marczynski.dietify.appointments.domain.Dietetician;
import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.appointments.domain.Appointment;
import pl.marczynski.dietify.appointments.domain.PatientCard;
import pl.marczynski.dietify.appointments.repository.AppointmentRepository;
import pl.marczynski.dietify.appointments.service.AppointmentService;
import pl.marczynski.dietify.core.service.UserService;
import pl.marczynski.dietify.core.web.rest.TestUtil;
import pl.marczynski.dietify.core.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import pl.marczynski.dietify.appointments.domain.enumeration.AppointmentState;

/**
 * Test class for the AppointmentResource REST controller.
 *
 * @see AppointmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
@WithMockUser(username = "user", authorities = {"ROLE_USER"}, password = "user")
public class AppointmentResourceIntTest {

    private static final LocalDate DEFAULT_APPOINTMENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_APPOINTMENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final AppointmentState DEFAULT_APPOINTMENT_STATE = AppointmentState.PLANNED;
    private static final AppointmentState UPDATED_APPOINTMENT_STATE = AppointmentState.CANCELED;

    private static final Long DEFAULT_MEAL_PLAN_ID = 1L;
    private static final Long UPDATED_MEAL_PLAN_ID = 2L;

    private static final String DEFAULT_GENERAL_ADVICE = "AAAAAAAAAA";
    private static final String UPDATED_GENERAL_ADVICE = "BBBBBBBBBB";

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentService appointmentService;

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

    @Autowired
    private UserService userService;

    private MockMvc restAppointmentMockMvc;

    private Appointment appointment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AppointmentResource appointmentResource = new AppointmentResource(appointmentService);
        this.restAppointmentMockMvc = MockMvcBuilders.standaloneSetup(appointmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Appointment createEntity(EntityManager em) {
        Appointment appointment = new Appointment()
            .appointmentDate(DEFAULT_APPOINTMENT_DATE)
            .appointmentState(DEFAULT_APPOINTMENT_STATE)
            .mealPlanId(DEFAULT_MEAL_PLAN_ID)
            .generalAdvice(DEFAULT_GENERAL_ADVICE);
        // Add required entity
        PatientCard patientCard = PatientCardResourceIntTest.createEntity(em);
        em.persist(patientCard);
        em.flush();
        appointment.setPatientCard(patientCard);
        return appointment;
    }

    @Before
    public void initTest() {
        appointment = createEntity(em);
        appointment.getPatientCard().getDietetician().setUserId(userService.getCurrentUser().get().getId());
    }

    @Test
    @Transactional
    public void createAppointment() throws Exception {
        int databaseSizeBeforeCreate = appointmentRepository.findAll().size();

        // Create the Appointment
        restAppointmentMockMvc.perform(post("/api/appointments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointment)))
            .andExpect(status().isCreated());

        // Validate the Appointment in the database
        List<Appointment> appointmentList = appointmentRepository.findAll();
        assertThat(appointmentList).hasSize(databaseSizeBeforeCreate + 1);
        Appointment testAppointment = appointmentList.get(appointmentList.size() - 1);
        assertThat(testAppointment.getAppointmentDate()).isEqualTo(DEFAULT_APPOINTMENT_DATE);
        assertThat(testAppointment.getAppointmentState()).isEqualTo(DEFAULT_APPOINTMENT_STATE);
        assertThat(testAppointment.getMealPlanId()).isEqualTo(DEFAULT_MEAL_PLAN_ID);
        assertThat(testAppointment.getGeneralAdvice()).isEqualTo(DEFAULT_GENERAL_ADVICE);
    }

    @Test
    @Transactional
    public void createAppointmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appointmentRepository.findAll().size();

        // Create the Appointment with an existing ID
        appointment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppointmentMockMvc.perform(post("/api/appointments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointment)))
            .andExpect(status().isBadRequest());

        // Validate the Appointment in the database
        List<Appointment> appointmentList = appointmentRepository.findAll();
        assertThat(appointmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAppointmentDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = appointmentRepository.findAll().size();
        // set the field null
        appointment.setAppointmentDate(null);

        // Create the Appointment, which fails.

        restAppointmentMockMvc.perform(post("/api/appointments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointment)))
            .andExpect(status().isBadRequest());

        List<Appointment> appointmentList = appointmentRepository.findAll();
        assertThat(appointmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAppointments() throws Exception {
        // Initialize the database
        appointmentRepository.saveAndFlush(appointment);

        // Get all the appointmentList
        restAppointmentMockMvc.perform(get("/api/appointments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appointment.getId().intValue())))
            .andExpect(jsonPath("$.[*].appointmentDate").value(hasItem(DEFAULT_APPOINTMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].appointmentState").value(hasItem(DEFAULT_APPOINTMENT_STATE.toString())))
            .andExpect(jsonPath("$.[*].mealPlanId").value(hasItem(DEFAULT_MEAL_PLAN_ID.intValue())))
            .andExpect(jsonPath("$.[*].generalAdvice").value(hasItem(DEFAULT_GENERAL_ADVICE.toString())));
    }

    @Test
    @Transactional
    public void getAppointment() throws Exception {
        // Initialize the database
        appointmentRepository.saveAndFlush(appointment);

        // Get the appointment
        restAppointmentMockMvc.perform(get("/api/appointments/{id}", appointment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(appointment.getId().intValue()))
            .andExpect(jsonPath("$.appointmentDate").value(DEFAULT_APPOINTMENT_DATE.toString()))
            .andExpect(jsonPath("$.appointmentState").value(DEFAULT_APPOINTMENT_STATE.toString()))
            .andExpect(jsonPath("$.mealPlanId").value(DEFAULT_MEAL_PLAN_ID.intValue()))
            .andExpect(jsonPath("$.generalAdvice").value(DEFAULT_GENERAL_ADVICE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAppointment() throws Exception {
        // Get the appointment
        restAppointmentMockMvc.perform(get("/api/appointments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAppointment() throws Exception {
        // Initialize the database
        appointmentService.save(appointment);

        int databaseSizeBeforeUpdate = appointmentRepository.findAll().size();

        // Update the appointment
        Appointment updatedAppointment = appointmentRepository.findById(appointment.getId()).get();
        // Disconnect from session so that the updates on updatedAppointment are not directly saved in db
        em.detach(updatedAppointment);
        updatedAppointment
            .appointmentDate(UPDATED_APPOINTMENT_DATE)
            .appointmentState(UPDATED_APPOINTMENT_STATE)
            .mealPlanId(UPDATED_MEAL_PLAN_ID)
            .generalAdvice(UPDATED_GENERAL_ADVICE);

        restAppointmentMockMvc.perform(put("/api/appointments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAppointment)))
            .andExpect(status().isOk());

        // Validate the Appointment in the database
        List<Appointment> appointmentList = appointmentRepository.findAll();
        assertThat(appointmentList).hasSize(databaseSizeBeforeUpdate);
        Appointment testAppointment = appointmentList.get(appointmentList.size() - 1);
        assertThat(testAppointment.getAppointmentDate()).isEqualTo(UPDATED_APPOINTMENT_DATE);
        assertThat(testAppointment.getAppointmentState()).isEqualTo(UPDATED_APPOINTMENT_STATE);
        assertThat(testAppointment.getMealPlanId()).isEqualTo(UPDATED_MEAL_PLAN_ID);
        assertThat(testAppointment.getGeneralAdvice()).isEqualTo(UPDATED_GENERAL_ADVICE);
    }

    @Test
    @Transactional
    public void updateNonExistingAppointment() throws Exception {
        int databaseSizeBeforeUpdate = appointmentRepository.findAll().size();

        // Create the Appointment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppointmentMockMvc.perform(put("/api/appointments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointment)))
            .andExpect(status().isBadRequest());

        // Validate the Appointment in the database
        List<Appointment> appointmentList = appointmentRepository.findAll();
        assertThat(appointmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAppointment() throws Exception {
        // Initialize the database
        appointmentService.save(appointment);

        int databaseSizeBeforeDelete = appointmentRepository.findAll().size();

        // Delete the appointment
        restAppointmentMockMvc.perform(delete("/api/appointments/{id}", appointment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Appointment> appointmentList = appointmentRepository.findAll();
        assertThat(appointmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Appointment.class);
        Appointment appointment1 = new Appointment();
        appointment1.setId(1L);
        Appointment appointment2 = new Appointment();
        appointment2.setId(appointment1.getId());
        assertThat(appointment1).isEqualTo(appointment2);
        appointment2.setId(2L);
        assertThat(appointment1).isNotEqualTo(appointment2);
        appointment1.setId(null);
        assertThat(appointment1).isNotEqualTo(appointment2);
    }
}
