package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.AppointmentsApp;
import pl.marczynski.dietify.appointments.domain.AssignedMealPlan;
import pl.marczynski.dietify.appointments.domain.Appointment;
import pl.marczynski.dietify.appointments.repository.AssignedMealPlanRepository;
import pl.marczynski.dietify.appointments.service.AssignedMealPlanService;
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
 * Integration tests for the {@Link AssignedMealPlanResource} REST controller.
 */
@SpringBootTest(classes = AppointmentsApp.class)
public class AssignedMealPlanResourceIT {

    private static final Long DEFAULT_MEAL_PLAN_ID = 1L;
    private static final Long UPDATED_MEAL_PLAN_ID = 2L;

    @Autowired
    private AssignedMealPlanRepository assignedMealPlanRepository;

    @Autowired
    private AssignedMealPlanService assignedMealPlanService;

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

    private MockMvc restAssignedMealPlanMockMvc;

    private AssignedMealPlan assignedMealPlan;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssignedMealPlanResource assignedMealPlanResource = new AssignedMealPlanResource(assignedMealPlanService);
        this.restAssignedMealPlanMockMvc = MockMvcBuilders.standaloneSetup(assignedMealPlanResource)
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
    public static AssignedMealPlan createEntity(EntityManager em) {
        AssignedMealPlan assignedMealPlan = new AssignedMealPlan();
        assignedMealPlan.setMealPlanId(DEFAULT_MEAL_PLAN_ID);
        // Add required entity
        Appointment appointment;
        if (TestUtil.findAll(em, Appointment.class).isEmpty()) {
            appointment = AppointmentResourceIT.createEntity(em);
            em.persist(appointment);
            em.flush();
        } else {
            appointment = TestUtil.findAll(em, Appointment.class).get(0);
        }
        assignedMealPlan.setAppointment(appointment);
        return assignedMealPlan;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AssignedMealPlan createUpdatedEntity(EntityManager em) {
        AssignedMealPlan assignedMealPlan = new AssignedMealPlan();
        assignedMealPlan.setMealPlanId(UPDATED_MEAL_PLAN_ID);
        // Add required entity
        Appointment appointment;
        if (TestUtil.findAll(em, Appointment.class).isEmpty()) {
            appointment = AppointmentResourceIT.createUpdatedEntity(em);
            em.persist(appointment);
            em.flush();
        } else {
            appointment = TestUtil.findAll(em, Appointment.class).get(0);
        }
        assignedMealPlan.setAppointment(appointment);
        return assignedMealPlan;
    }

    @BeforeEach
    public void initTest() {
        assignedMealPlan = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssignedMealPlan() throws Exception {
        int databaseSizeBeforeCreate = assignedMealPlanRepository.findAll().size();

        // Create the AssignedMealPlan
        restAssignedMealPlanMockMvc.perform(post("/api/assigned-meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignedMealPlan)))
            .andExpect(status().isCreated());

        // Validate the AssignedMealPlan in the database
        List<AssignedMealPlan> assignedMealPlanList = assignedMealPlanRepository.findAll();
        assertThat(assignedMealPlanList).hasSize(databaseSizeBeforeCreate + 1);
        AssignedMealPlan testAssignedMealPlan = assignedMealPlanList.get(assignedMealPlanList.size() - 1);
        assertThat(testAssignedMealPlan.getMealPlanId()).isEqualTo(DEFAULT_MEAL_PLAN_ID);
    }

    @Test
    @Transactional
    public void createAssignedMealPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assignedMealPlanRepository.findAll().size();

        // Create the AssignedMealPlan with an existing ID
        assignedMealPlan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssignedMealPlanMockMvc.perform(post("/api/assigned-meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignedMealPlan)))
            .andExpect(status().isBadRequest());

        // Validate the AssignedMealPlan in the database
        List<AssignedMealPlan> assignedMealPlanList = assignedMealPlanRepository.findAll();
        assertThat(assignedMealPlanList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMealPlanIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = assignedMealPlanRepository.findAll().size();
        // set the field null
        assignedMealPlan.setMealPlanId(null);

        // Create the AssignedMealPlan, which fails.

        restAssignedMealPlanMockMvc.perform(post("/api/assigned-meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignedMealPlan)))
            .andExpect(status().isBadRequest());

        List<AssignedMealPlan> assignedMealPlanList = assignedMealPlanRepository.findAll();
        assertThat(assignedMealPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAssignedMealPlans() throws Exception {
        // Initialize the database
        assignedMealPlanRepository.saveAndFlush(assignedMealPlan);

        // Get all the assignedMealPlanList
        restAssignedMealPlanMockMvc.perform(get("/api/assigned-meal-plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assignedMealPlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].mealPlanId").value(hasItem(DEFAULT_MEAL_PLAN_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getAssignedMealPlan() throws Exception {
        // Initialize the database
        assignedMealPlanRepository.saveAndFlush(assignedMealPlan);

        // Get the assignedMealPlan
        restAssignedMealPlanMockMvc.perform(get("/api/assigned-meal-plans/{id}", assignedMealPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assignedMealPlan.getId().intValue()))
            .andExpect(jsonPath("$.mealPlanId").value(DEFAULT_MEAL_PLAN_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAssignedMealPlan() throws Exception {
        // Get the assignedMealPlan
        restAssignedMealPlanMockMvc.perform(get("/api/assigned-meal-plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssignedMealPlan() throws Exception {
        // Initialize the database
        assignedMealPlanService.save(assignedMealPlan);

        int databaseSizeBeforeUpdate = assignedMealPlanRepository.findAll().size();

        // Update the assignedMealPlan
        AssignedMealPlan updatedAssignedMealPlan = assignedMealPlanRepository.findById(assignedMealPlan.getId()).get();
        // Disconnect from session so that the updates on updatedAssignedMealPlan are not directly saved in db
        em.detach(updatedAssignedMealPlan);
        updatedAssignedMealPlan.setMealPlanId(UPDATED_MEAL_PLAN_ID);

        restAssignedMealPlanMockMvc.perform(put("/api/assigned-meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssignedMealPlan)))
            .andExpect(status().isOk());

        // Validate the AssignedMealPlan in the database
        List<AssignedMealPlan> assignedMealPlanList = assignedMealPlanRepository.findAll();
        assertThat(assignedMealPlanList).hasSize(databaseSizeBeforeUpdate);
        AssignedMealPlan testAssignedMealPlan = assignedMealPlanList.get(assignedMealPlanList.size() - 1);
        assertThat(testAssignedMealPlan.getMealPlanId()).isEqualTo(UPDATED_MEAL_PLAN_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingAssignedMealPlan() throws Exception {
        int databaseSizeBeforeUpdate = assignedMealPlanRepository.findAll().size();

        // Create the AssignedMealPlan

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssignedMealPlanMockMvc.perform(put("/api/assigned-meal-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignedMealPlan)))
            .andExpect(status().isBadRequest());

        // Validate the AssignedMealPlan in the database
        List<AssignedMealPlan> assignedMealPlanList = assignedMealPlanRepository.findAll();
        assertThat(assignedMealPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAssignedMealPlan() throws Exception {
        // Initialize the database
        assignedMealPlanService.save(assignedMealPlan);

        int databaseSizeBeforeDelete = assignedMealPlanRepository.findAll().size();

        // Delete the assignedMealPlan
        restAssignedMealPlanMockMvc.perform(delete("/api/assigned-meal-plans/{id}", assignedMealPlan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AssignedMealPlan> assignedMealPlanList = assignedMealPlanRepository.findAll();
        assertThat(assignedMealPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignedMealPlan.class);
        AssignedMealPlan assignedMealPlan1 = new AssignedMealPlan();
        assignedMealPlan1.setId(1L);
        AssignedMealPlan assignedMealPlan2 = new AssignedMealPlan();
        assignedMealPlan2.setId(assignedMealPlan1.getId());
        assertThat(assignedMealPlan1).isEqualTo(assignedMealPlan2);
        assignedMealPlan2.setId(2L);
        assertThat(assignedMealPlan1).isNotEqualTo(assignedMealPlan2);
        assignedMealPlan1.setId(null);
        assertThat(assignedMealPlan1).isNotEqualTo(assignedMealPlan2);
    }
}
