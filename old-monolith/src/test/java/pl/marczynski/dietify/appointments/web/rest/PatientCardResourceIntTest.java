package pl.marczynski.dietify.appointments.web.rest;

import org.springframework.security.test.context.support.WithMockUser;
import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.appointments.domain.PatientCard;
import pl.marczynski.dietify.appointments.domain.Patient;
import pl.marczynski.dietify.appointments.domain.Dietetician;
import pl.marczynski.dietify.appointments.repository.PatientCardRepository;
import pl.marczynski.dietify.appointments.service.PatientCardService;
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

/**
 * Test class for the PatientCardResource REST controller.
 *
 * @see PatientCardResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
@WithMockUser(username = "user", authorities = {"ROLE_USER"}, password = "user")
public class PatientCardResourceIntTest {

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PatientCardRepository patientCardRepository;

    @Autowired
    private PatientCardService patientCardService;

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
    
    private MockMvc restPatientCardMockMvc;

    private PatientCard patientCard;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PatientCardResource patientCardResource = new PatientCardResource(patientCardService);
        this.restPatientCardMockMvc = MockMvcBuilders.standaloneSetup(patientCardResource)
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
    public static PatientCard createEntity(EntityManager em) {
        PatientCard patientCard = new PatientCard()
            .creationDate(DEFAULT_CREATION_DATE);
        // Add required entity
        Patient patient = PatientResourceIntTest.createEntity(em);
        em.persist(patient);
        em.flush();
        patientCard.setPatient(patient);
        // Add required entity
        Dietetician dietetician = DieteticianResourceIntTest.createEntity(em);
        em.persist(dietetician);
        em.flush();
        patientCard.setDietetician(dietetician);
        return patientCard;
    }

    @Before
    public void initTest() {
        patientCard = createEntity(em);
        patientCard.getDietetician().setUserId(userService.getCurrentUser().get().getId());
    }

    @Test
    @Transactional
    public void createPatientCard() throws Exception {
        int databaseSizeBeforeCreate = patientCardRepository.findAll().size();

        // Create the PatientCard
        restPatientCardMockMvc.perform(post("/api/patient-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientCard)))
            .andExpect(status().isCreated());

        // Validate the PatientCard in the database
        List<PatientCard> patientCardList = patientCardRepository.findAll();
        assertThat(patientCardList).hasSize(databaseSizeBeforeCreate + 1);
        PatientCard testPatientCard = patientCardList.get(patientCardList.size() - 1);
        assertThat(testPatientCard.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    public void createPatientCardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = patientCardRepository.findAll().size();

        // Create the PatientCard with an existing ID
        patientCard.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPatientCardMockMvc.perform(post("/api/patient-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientCard)))
            .andExpect(status().isBadRequest());

        // Validate the PatientCard in the database
        List<PatientCard> patientCardList = patientCardRepository.findAll();
        assertThat(patientCardList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = patientCardRepository.findAll().size();
        // set the field null
        patientCard.setCreationDate(null);

        // Create the PatientCard, which fails.

        restPatientCardMockMvc.perform(post("/api/patient-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientCard)))
            .andExpect(status().isBadRequest());

        List<PatientCard> patientCardList = patientCardRepository.findAll();
        assertThat(patientCardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPatientCards() throws Exception {
        // Initialize the database
        patientCardRepository.saveAndFlush(patientCard);

        // Get all the patientCardList
        restPatientCardMockMvc.perform(get("/api/patient-cards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(patientCard.getId().intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }

    @Test
    @Transactional
    public void getPatientCard() throws Exception {
        // Initialize the database
        patientCardRepository.saveAndFlush(patientCard);

        // Get the patientCard
        restPatientCardMockMvc.perform(get("/api/patient-cards/{id}", patientCard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(patientCard.getId().intValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPatientCard() throws Exception {
        // Get the patientCard
        restPatientCardMockMvc.perform(get("/api/patient-cards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePatientCard() throws Exception {
        // Initialize the database
        patientCardService.save(patientCard);

        int databaseSizeBeforeUpdate = patientCardRepository.findAll().size();

        // Update the patientCard
        PatientCard updatedPatientCard = patientCardRepository.findById(patientCard.getId()).get();
        // Disconnect from session so that the updates on updatedPatientCard are not directly saved in db
        em.detach(updatedPatientCard);
        updatedPatientCard
            .creationDate(UPDATED_CREATION_DATE);

        restPatientCardMockMvc.perform(put("/api/patient-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPatientCard)))
            .andExpect(status().isOk());

        // Validate the PatientCard in the database
        List<PatientCard> patientCardList = patientCardRepository.findAll();
        assertThat(patientCardList).hasSize(databaseSizeBeforeUpdate);
        PatientCard testPatientCard = patientCardList.get(patientCardList.size() - 1);
        assertThat(testPatientCard.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPatientCard() throws Exception {
        int databaseSizeBeforeUpdate = patientCardRepository.findAll().size();

        // Create the PatientCard

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPatientCardMockMvc.perform(put("/api/patient-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patientCard)))
            .andExpect(status().isBadRequest());

        // Validate the PatientCard in the database
        List<PatientCard> patientCardList = patientCardRepository.findAll();
        assertThat(patientCardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePatientCard() throws Exception {
        // Initialize the database
        patientCardService.save(patientCard);

        int databaseSizeBeforeDelete = patientCardRepository.findAll().size();

        // Delete the patientCard
        restPatientCardMockMvc.perform(delete("/api/patient-cards/{id}", patientCard.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PatientCard> patientCardList = patientCardRepository.findAll();
        assertThat(patientCardList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PatientCard.class);
        PatientCard patientCard1 = new PatientCard();
        patientCard1.setId(1L);
        PatientCard patientCard2 = new PatientCard();
        patientCard2.setId(patientCard1.getId());
        assertThat(patientCard1).isEqualTo(patientCard2);
        patientCard2.setId(2L);
        assertThat(patientCard1).isNotEqualTo(patientCard2);
        patientCard1.setId(null);
        assertThat(patientCard1).isNotEqualTo(patientCard2);
    }
}
