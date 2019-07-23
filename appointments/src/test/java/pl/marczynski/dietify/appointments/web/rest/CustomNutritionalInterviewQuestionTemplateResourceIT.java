package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.AppointmentsApp;
import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestionTemplate;
import pl.marczynski.dietify.appointments.repository.CustomNutritionalInterviewQuestionTemplateRepository;
import pl.marczynski.dietify.appointments.service.CustomNutritionalInterviewQuestionTemplateService;
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
 * Integration tests for the {@Link CustomNutritionalInterviewQuestionTemplateResource} REST controller.
 */
@SpringBootTest(classes = AppointmentsApp.class)
public class CustomNutritionalInterviewQuestionTemplateResourceIT {

    private static final Long DEFAULT_OWNER_ID = 1L;
    private static final Long UPDATED_OWNER_ID = 2L;

    private static final String DEFAULT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION = "BBBBBBBBBB";

    private static final String DEFAULT_LANGUAGE = "AA";
    private static final String UPDATED_LANGUAGE = "BB";

    @Autowired
    private CustomNutritionalInterviewQuestionTemplateRepository customNutritionalInterviewQuestionTemplateRepository;

    @Autowired
    private CustomNutritionalInterviewQuestionTemplateService customNutritionalInterviewQuestionTemplateService;

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

    private MockMvc restCustomNutritionalInterviewQuestionTemplateMockMvc;

    private CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomNutritionalInterviewQuestionTemplateResource customNutritionalInterviewQuestionTemplateResource = new CustomNutritionalInterviewQuestionTemplateResource(customNutritionalInterviewQuestionTemplateService);
        this.restCustomNutritionalInterviewQuestionTemplateMockMvc = MockMvcBuilders.standaloneSetup(customNutritionalInterviewQuestionTemplateResource)
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
    public static CustomNutritionalInterviewQuestionTemplate createEntity(EntityManager em) {
        CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate = new CustomNutritionalInterviewQuestionTemplate();
        customNutritionalInterviewQuestionTemplate.setOwnerId(DEFAULT_OWNER_ID);
        customNutritionalInterviewQuestionTemplate.setQuestion(DEFAULT_QUESTION);
        customNutritionalInterviewQuestionTemplate.setLanguage(DEFAULT_LANGUAGE);
        return customNutritionalInterviewQuestionTemplate;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomNutritionalInterviewQuestionTemplate createUpdatedEntity(EntityManager em) {
        CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate = new CustomNutritionalInterviewQuestionTemplate();
        customNutritionalInterviewQuestionTemplate.setOwnerId(UPDATED_OWNER_ID);
        customNutritionalInterviewQuestionTemplate.setQuestion(UPDATED_QUESTION);
        customNutritionalInterviewQuestionTemplate.setLanguage(UPDATED_LANGUAGE);
        return customNutritionalInterviewQuestionTemplate;
    }

    @BeforeEach
    public void initTest() {
        customNutritionalInterviewQuestionTemplate = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomNutritionalInterviewQuestionTemplate() throws Exception {
        int databaseSizeBeforeCreate = customNutritionalInterviewQuestionTemplateRepository.findAll().size();

        // Create the CustomNutritionalInterviewQuestionTemplate
        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(post("/api/custom-nutritional-interview-question-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customNutritionalInterviewQuestionTemplate)))
            .andExpect(status().isCreated());

        // Validate the CustomNutritionalInterviewQuestionTemplate in the database
        List<CustomNutritionalInterviewQuestionTemplate> customNutritionalInterviewQuestionTemplateList = customNutritionalInterviewQuestionTemplateRepository.findAll();
        assertThat(customNutritionalInterviewQuestionTemplateList).hasSize(databaseSizeBeforeCreate + 1);
        CustomNutritionalInterviewQuestionTemplate testCustomNutritionalInterviewQuestionTemplate = customNutritionalInterviewQuestionTemplateList.get(customNutritionalInterviewQuestionTemplateList.size() - 1);
        assertThat(testCustomNutritionalInterviewQuestionTemplate.getOwnerId()).isEqualTo(DEFAULT_OWNER_ID);
        assertThat(testCustomNutritionalInterviewQuestionTemplate.getQuestion()).isEqualTo(DEFAULT_QUESTION);
        assertThat(testCustomNutritionalInterviewQuestionTemplate.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createCustomNutritionalInterviewQuestionTemplateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customNutritionalInterviewQuestionTemplateRepository.findAll().size();

        // Create the CustomNutritionalInterviewQuestionTemplate with an existing ID
        customNutritionalInterviewQuestionTemplate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(post("/api/custom-nutritional-interview-question-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customNutritionalInterviewQuestionTemplate)))
            .andExpect(status().isBadRequest());

        // Validate the CustomNutritionalInterviewQuestionTemplate in the database
        List<CustomNutritionalInterviewQuestionTemplate> customNutritionalInterviewQuestionTemplateList = customNutritionalInterviewQuestionTemplateRepository.findAll();
        assertThat(customNutritionalInterviewQuestionTemplateList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkOwnerIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = customNutritionalInterviewQuestionTemplateRepository.findAll().size();
        // set the field null
        customNutritionalInterviewQuestionTemplate.setOwnerId(null);

        // Create the CustomNutritionalInterviewQuestionTemplate, which fails.

        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(post("/api/custom-nutritional-interview-question-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customNutritionalInterviewQuestionTemplate)))
            .andExpect(status().isBadRequest());

        List<CustomNutritionalInterviewQuestionTemplate> customNutritionalInterviewQuestionTemplateList = customNutritionalInterviewQuestionTemplateRepository.findAll();
        assertThat(customNutritionalInterviewQuestionTemplateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = customNutritionalInterviewQuestionTemplateRepository.findAll().size();
        // set the field null
        customNutritionalInterviewQuestionTemplate.setLanguage(null);

        // Create the CustomNutritionalInterviewQuestionTemplate, which fails.

        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(post("/api/custom-nutritional-interview-question-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customNutritionalInterviewQuestionTemplate)))
            .andExpect(status().isBadRequest());

        List<CustomNutritionalInterviewQuestionTemplate> customNutritionalInterviewQuestionTemplateList = customNutritionalInterviewQuestionTemplateRepository.findAll();
        assertThat(customNutritionalInterviewQuestionTemplateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomNutritionalInterviewQuestionTemplates() throws Exception {
        // Initialize the database
        customNutritionalInterviewQuestionTemplateRepository.saveAndFlush(customNutritionalInterviewQuestionTemplate);

        // Get all the customNutritionalInterviewQuestionTemplateList
        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(get("/api/custom-nutritional-interview-question-templates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customNutritionalInterviewQuestionTemplate.getId().intValue())))
            .andExpect(jsonPath("$.[*].ownerId").value(hasItem(DEFAULT_OWNER_ID.intValue())))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomNutritionalInterviewQuestionTemplate() throws Exception {
        // Initialize the database
        customNutritionalInterviewQuestionTemplateRepository.saveAndFlush(customNutritionalInterviewQuestionTemplate);

        // Get the customNutritionalInterviewQuestionTemplate
        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(get("/api/custom-nutritional-interview-question-templates/{id}", customNutritionalInterviewQuestionTemplate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customNutritionalInterviewQuestionTemplate.getId().intValue()))
            .andExpect(jsonPath("$.ownerId").value(DEFAULT_OWNER_ID.intValue()))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomNutritionalInterviewQuestionTemplate() throws Exception {
        // Get the customNutritionalInterviewQuestionTemplate
        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(get("/api/custom-nutritional-interview-question-templates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomNutritionalInterviewQuestionTemplate() throws Exception {
        // Initialize the database
        customNutritionalInterviewQuestionTemplateService.save(customNutritionalInterviewQuestionTemplate);

        int databaseSizeBeforeUpdate = customNutritionalInterviewQuestionTemplateRepository.findAll().size();

        // Update the customNutritionalInterviewQuestionTemplate
        CustomNutritionalInterviewQuestionTemplate updatedCustomNutritionalInterviewQuestionTemplate = customNutritionalInterviewQuestionTemplateRepository.findById(customNutritionalInterviewQuestionTemplate.getId()).get();
        // Disconnect from session so that the updates on updatedCustomNutritionalInterviewQuestionTemplate are not directly saved in db
        em.detach(updatedCustomNutritionalInterviewQuestionTemplate);
        updatedCustomNutritionalInterviewQuestionTemplate.setOwnerId(UPDATED_OWNER_ID);
        updatedCustomNutritionalInterviewQuestionTemplate.setQuestion(UPDATED_QUESTION);
        updatedCustomNutritionalInterviewQuestionTemplate.setLanguage(UPDATED_LANGUAGE);

        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(put("/api/custom-nutritional-interview-question-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomNutritionalInterviewQuestionTemplate)))
            .andExpect(status().isOk());

        // Validate the CustomNutritionalInterviewQuestionTemplate in the database
        List<CustomNutritionalInterviewQuestionTemplate> customNutritionalInterviewQuestionTemplateList = customNutritionalInterviewQuestionTemplateRepository.findAll();
        assertThat(customNutritionalInterviewQuestionTemplateList).hasSize(databaseSizeBeforeUpdate);
        CustomNutritionalInterviewQuestionTemplate testCustomNutritionalInterviewQuestionTemplate = customNutritionalInterviewQuestionTemplateList.get(customNutritionalInterviewQuestionTemplateList.size() - 1);
        assertThat(testCustomNutritionalInterviewQuestionTemplate.getOwnerId()).isEqualTo(UPDATED_OWNER_ID);
        assertThat(testCustomNutritionalInterviewQuestionTemplate.getQuestion()).isEqualTo(UPDATED_QUESTION);
        assertThat(testCustomNutritionalInterviewQuestionTemplate.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomNutritionalInterviewQuestionTemplate() throws Exception {
        int databaseSizeBeforeUpdate = customNutritionalInterviewQuestionTemplateRepository.findAll().size();

        // Create the CustomNutritionalInterviewQuestionTemplate

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(put("/api/custom-nutritional-interview-question-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customNutritionalInterviewQuestionTemplate)))
            .andExpect(status().isBadRequest());

        // Validate the CustomNutritionalInterviewQuestionTemplate in the database
        List<CustomNutritionalInterviewQuestionTemplate> customNutritionalInterviewQuestionTemplateList = customNutritionalInterviewQuestionTemplateRepository.findAll();
        assertThat(customNutritionalInterviewQuestionTemplateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomNutritionalInterviewQuestionTemplate() throws Exception {
        // Initialize the database
        customNutritionalInterviewQuestionTemplateService.save(customNutritionalInterviewQuestionTemplate);

        int databaseSizeBeforeDelete = customNutritionalInterviewQuestionTemplateRepository.findAll().size();

        // Delete the customNutritionalInterviewQuestionTemplate
        restCustomNutritionalInterviewQuestionTemplateMockMvc.perform(delete("/api/custom-nutritional-interview-question-templates/{id}", customNutritionalInterviewQuestionTemplate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomNutritionalInterviewQuestionTemplate> customNutritionalInterviewQuestionTemplateList = customNutritionalInterviewQuestionTemplateRepository.findAll();
        assertThat(customNutritionalInterviewQuestionTemplateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomNutritionalInterviewQuestionTemplate.class);
        CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate1 = new CustomNutritionalInterviewQuestionTemplate();
        customNutritionalInterviewQuestionTemplate1.setId(1L);
        CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate2 = new CustomNutritionalInterviewQuestionTemplate();
        customNutritionalInterviewQuestionTemplate2.setId(customNutritionalInterviewQuestionTemplate1.getId());
        assertThat(customNutritionalInterviewQuestionTemplate1).isEqualTo(customNutritionalInterviewQuestionTemplate2);
        customNutritionalInterviewQuestionTemplate2.setId(2L);
        assertThat(customNutritionalInterviewQuestionTemplate1).isNotEqualTo(customNutritionalInterviewQuestionTemplate2);
        customNutritionalInterviewQuestionTemplate1.setId(null);
        assertThat(customNutritionalInterviewQuestionTemplate1).isNotEqualTo(customNutritionalInterviewQuestionTemplate2);
    }
}
