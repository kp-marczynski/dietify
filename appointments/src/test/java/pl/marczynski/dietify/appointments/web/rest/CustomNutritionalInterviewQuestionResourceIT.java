package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.AppointmentsApp;
import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestion;
import pl.marczynski.dietify.appointments.domain.NutritionalInterview;
import pl.marczynski.dietify.appointments.repository.CustomNutritionalInterviewQuestionRepository;
import pl.marczynski.dietify.appointments.service.CustomNutritionalInterviewQuestionService;
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

/**
 * Integration tests for the {@Link CustomNutritionalInterviewQuestionResource} REST controller.
 */
@SpringBootTest(classes = AppointmentsApp.class)
public class CustomNutritionalInterviewQuestionResourceIT {

    private static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    private static final Integer UPDATED_ORDINAL_NUMBER = 2;

    private static final String DEFAULT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION = "BBBBBBBBBB";

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER = "BBBBBBBBBB";

    @Autowired
    private CustomNutritionalInterviewQuestionRepository customNutritionalInterviewQuestionRepository;

    @Autowired
    private CustomNutritionalInterviewQuestionService customNutritionalInterviewQuestionService;

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

    private MockMvc restCustomNutritionalInterviewQuestionMockMvc;

    private CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomNutritionalInterviewQuestionResource customNutritionalInterviewQuestionResource = new CustomNutritionalInterviewQuestionResource(customNutritionalInterviewQuestionService);
        this.restCustomNutritionalInterviewQuestionMockMvc = MockMvcBuilders.standaloneSetup(customNutritionalInterviewQuestionResource)
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
    public static CustomNutritionalInterviewQuestion createEntity(EntityManager em) {
        CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion = new CustomNutritionalInterviewQuestion();
        customNutritionalInterviewQuestion.setOrdinalNumber(DEFAULT_ORDINAL_NUMBER);
        customNutritionalInterviewQuestion.setQuestion(DEFAULT_QUESTION);
        customNutritionalInterviewQuestion.setAnswer(DEFAULT_ANSWER);
        // Add required entity
        NutritionalInterview nutritionalInterview;
        if (TestUtil.findAll(em, NutritionalInterview.class).isEmpty()) {
            nutritionalInterview = NutritionalInterviewResourceIT.createEntity(em);
            em.persist(nutritionalInterview);
            em.flush();
        } else {
            nutritionalInterview = TestUtil.findAll(em, NutritionalInterview.class).get(0);
        }
        customNutritionalInterviewQuestion.setNutritionalInterview(nutritionalInterview);
        return customNutritionalInterviewQuestion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomNutritionalInterviewQuestion createUpdatedEntity(EntityManager em) {
        CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion = new CustomNutritionalInterviewQuestion();
        customNutritionalInterviewQuestion.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        customNutritionalInterviewQuestion.setQuestion(UPDATED_QUESTION);
        customNutritionalInterviewQuestion.setAnswer(UPDATED_ANSWER);
        // Add required entity
        NutritionalInterview nutritionalInterview;
        if (TestUtil.findAll(em, NutritionalInterview.class).isEmpty()) {
            nutritionalInterview = NutritionalInterviewResourceIT.createUpdatedEntity(em);
            em.persist(nutritionalInterview);
            em.flush();
        } else {
            nutritionalInterview = TestUtil.findAll(em, NutritionalInterview.class).get(0);
        }
        customNutritionalInterviewQuestion.setNutritionalInterview(nutritionalInterview);
        return customNutritionalInterviewQuestion;
    }

    @BeforeEach
    public void initTest() {
        customNutritionalInterviewQuestion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomNutritionalInterviewQuestion() throws Exception {
        int databaseSizeBeforeCreate = customNutritionalInterviewQuestionRepository.findAll().size();

        // Create the CustomNutritionalInterviewQuestion
        restCustomNutritionalInterviewQuestionMockMvc.perform(post("/api/custom-nutritional-interview-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customNutritionalInterviewQuestion)))
            .andExpect(status().isCreated());

        // Validate the CustomNutritionalInterviewQuestion in the database
        List<CustomNutritionalInterviewQuestion> customNutritionalInterviewQuestionList = customNutritionalInterviewQuestionRepository.findAll();
        assertThat(customNutritionalInterviewQuestionList).hasSize(databaseSizeBeforeCreate + 1);
        CustomNutritionalInterviewQuestion testCustomNutritionalInterviewQuestion = customNutritionalInterviewQuestionList.get(customNutritionalInterviewQuestionList.size() - 1);
        assertThat(testCustomNutritionalInterviewQuestion.getOrdinalNumber()).isEqualTo(DEFAULT_ORDINAL_NUMBER);
        assertThat(testCustomNutritionalInterviewQuestion.getQuestion()).isEqualTo(DEFAULT_QUESTION);
        assertThat(testCustomNutritionalInterviewQuestion.getAnswer()).isEqualTo(DEFAULT_ANSWER);
    }

    @Test
    @Transactional
    public void createCustomNutritionalInterviewQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customNutritionalInterviewQuestionRepository.findAll().size();

        // Create the CustomNutritionalInterviewQuestion with an existing ID
        customNutritionalInterviewQuestion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomNutritionalInterviewQuestionMockMvc.perform(post("/api/custom-nutritional-interview-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customNutritionalInterviewQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the CustomNutritionalInterviewQuestion in the database
        List<CustomNutritionalInterviewQuestion> customNutritionalInterviewQuestionList = customNutritionalInterviewQuestionRepository.findAll();
        assertThat(customNutritionalInterviewQuestionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCustomNutritionalInterviewQuestions() throws Exception {
        // Initialize the database
        customNutritionalInterviewQuestionRepository.saveAndFlush(customNutritionalInterviewQuestion);

        // Get all the customNutritionalInterviewQuestionList
        restCustomNutritionalInterviewQuestionMockMvc.perform(get("/api/custom-nutritional-interview-questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customNutritionalInterviewQuestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION.toString())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomNutritionalInterviewQuestion() throws Exception {
        // Initialize the database
        customNutritionalInterviewQuestionRepository.saveAndFlush(customNutritionalInterviewQuestion);

        // Get the customNutritionalInterviewQuestion
        restCustomNutritionalInterviewQuestionMockMvc.perform(get("/api/custom-nutritional-interview-questions/{id}", customNutritionalInterviewQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customNutritionalInterviewQuestion.getId().intValue()))
            .andExpect(jsonPath("$.ordinalNumber").value(DEFAULT_ORDINAL_NUMBER))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION.toString()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomNutritionalInterviewQuestion() throws Exception {
        // Get the customNutritionalInterviewQuestion
        restCustomNutritionalInterviewQuestionMockMvc.perform(get("/api/custom-nutritional-interview-questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomNutritionalInterviewQuestion() throws Exception {
        // Initialize the database
        customNutritionalInterviewQuestionService.save(customNutritionalInterviewQuestion);

        int databaseSizeBeforeUpdate = customNutritionalInterviewQuestionRepository.findAll().size();

        // Update the customNutritionalInterviewQuestion
        CustomNutritionalInterviewQuestion updatedCustomNutritionalInterviewQuestion = customNutritionalInterviewQuestionRepository.findById(customNutritionalInterviewQuestion.getId()).get();
        // Disconnect from session so that the updates on updatedCustomNutritionalInterviewQuestion are not directly saved in db
        em.detach(updatedCustomNutritionalInterviewQuestion);
        updatedCustomNutritionalInterviewQuestion.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        updatedCustomNutritionalInterviewQuestion.setQuestion(UPDATED_QUESTION);
        updatedCustomNutritionalInterviewQuestion.setAnswer(UPDATED_ANSWER);

        restCustomNutritionalInterviewQuestionMockMvc.perform(put("/api/custom-nutritional-interview-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomNutritionalInterviewQuestion)))
            .andExpect(status().isOk());

        // Validate the CustomNutritionalInterviewQuestion in the database
        List<CustomNutritionalInterviewQuestion> customNutritionalInterviewQuestionList = customNutritionalInterviewQuestionRepository.findAll();
        assertThat(customNutritionalInterviewQuestionList).hasSize(databaseSizeBeforeUpdate);
        CustomNutritionalInterviewQuestion testCustomNutritionalInterviewQuestion = customNutritionalInterviewQuestionList.get(customNutritionalInterviewQuestionList.size() - 1);
        assertThat(testCustomNutritionalInterviewQuestion.getOrdinalNumber()).isEqualTo(UPDATED_ORDINAL_NUMBER);
        assertThat(testCustomNutritionalInterviewQuestion.getQuestion()).isEqualTo(UPDATED_QUESTION);
        assertThat(testCustomNutritionalInterviewQuestion.getAnswer()).isEqualTo(UPDATED_ANSWER);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomNutritionalInterviewQuestion() throws Exception {
        int databaseSizeBeforeUpdate = customNutritionalInterviewQuestionRepository.findAll().size();

        // Create the CustomNutritionalInterviewQuestion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomNutritionalInterviewQuestionMockMvc.perform(put("/api/custom-nutritional-interview-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customNutritionalInterviewQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the CustomNutritionalInterviewQuestion in the database
        List<CustomNutritionalInterviewQuestion> customNutritionalInterviewQuestionList = customNutritionalInterviewQuestionRepository.findAll();
        assertThat(customNutritionalInterviewQuestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomNutritionalInterviewQuestion() throws Exception {
        // Initialize the database
        customNutritionalInterviewQuestionService.save(customNutritionalInterviewQuestion);

        int databaseSizeBeforeDelete = customNutritionalInterviewQuestionRepository.findAll().size();

        // Delete the customNutritionalInterviewQuestion
        restCustomNutritionalInterviewQuestionMockMvc.perform(delete("/api/custom-nutritional-interview-questions/{id}", customNutritionalInterviewQuestion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomNutritionalInterviewQuestion> customNutritionalInterviewQuestionList = customNutritionalInterviewQuestionRepository.findAll();
        assertThat(customNutritionalInterviewQuestionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomNutritionalInterviewQuestion.class);
        CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion1 = new CustomNutritionalInterviewQuestion();
        customNutritionalInterviewQuestion1.setId(1L);
        CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion2 = new CustomNutritionalInterviewQuestion();
        customNutritionalInterviewQuestion2.setId(customNutritionalInterviewQuestion1.getId());
        assertThat(customNutritionalInterviewQuestion1).isEqualTo(customNutritionalInterviewQuestion2);
        customNutritionalInterviewQuestion2.setId(2L);
        assertThat(customNutritionalInterviewQuestion1).isNotEqualTo(customNutritionalInterviewQuestion2);
        customNutritionalInterviewQuestion1.setId(null);
        assertThat(customNutritionalInterviewQuestion1).isNotEqualTo(customNutritionalInterviewQuestion2);
    }
}
