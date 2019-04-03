package pl.marczynski.dietify.core.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.recipes.domain.PreparationStep;
import pl.marczynski.dietify.recipes.domain.RecipeSection;
import pl.marczynski.dietify.recipes.repository.PreparationStepRepository;
import pl.marczynski.dietify.recipes.service.PreparationStepService;
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
import pl.marczynski.dietify.recipes.web.rest.PreparationStepResource;

import javax.persistence.EntityManager;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PreparationStepResource REST controller.
 *
 * @see PreparationStepResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class PreparationStepResourceIntTest {

    private static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    private static final Integer UPDATED_ORDINAL_NUMBER = 2;

    private static final String DEFAULT_STEP_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_STEP_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PreparationStepRepository preparationStepRepository;

    @Autowired
    private PreparationStepService preparationStepService;

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

    private MockMvc restPreparationStepMockMvc;

    private PreparationStep preparationStep;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PreparationStepResource preparationStepResource = new PreparationStepResource(preparationStepService);
        this.restPreparationStepMockMvc = MockMvcBuilders.standaloneSetup(preparationStepResource)
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
    public static PreparationStep createEntity(EntityManager em) {
        PreparationStep preparationStep = new PreparationStep()
            .ordinalNumber(DEFAULT_ORDINAL_NUMBER)
            .stepDescription(DEFAULT_STEP_DESCRIPTION);
        // Add required entity
        RecipeSection recipeSection = RecipeSectionResourceIntTest.createEntity(em);
        em.persist(recipeSection);
        em.flush();
        preparationStep.setRecipeSection(recipeSection);
        return preparationStep;
    }

    @Before
    public void initTest() {
        preparationStep = createEntity(em);
    }

    @Test
    @Transactional
    public void createPreparationStep() throws Exception {
        int databaseSizeBeforeCreate = preparationStepRepository.findAll().size();

        // Create the PreparationStep
        restPreparationStepMockMvc.perform(post("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preparationStep)))
            .andExpect(status().isCreated());

        // Validate the PreparationStep in the database
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeCreate + 1);
        PreparationStep testPreparationStep = preparationStepList.get(preparationStepList.size() - 1);
        assertThat(testPreparationStep.getOrdinalNumber()).isEqualTo(DEFAULT_ORDINAL_NUMBER);
        assertThat(testPreparationStep.getStepDescription()).isEqualTo(DEFAULT_STEP_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPreparationStepWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = preparationStepRepository.findAll().size();

        // Create the PreparationStep with an existing ID
        preparationStep.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPreparationStepMockMvc.perform(post("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preparationStep)))
            .andExpect(status().isBadRequest());

        // Validate the PreparationStep in the database
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkOrdinalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = preparationStepRepository.findAll().size();
        // set the field null
        preparationStep.setOrdinalNumber(null);

        // Create the PreparationStep, which fails.

        restPreparationStepMockMvc.perform(post("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preparationStep)))
            .andExpect(status().isBadRequest());

        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPreparationSteps() throws Exception {
        // Initialize the database
        preparationStepRepository.saveAndFlush(preparationStep);

        // Get all the preparationStepList
        restPreparationStepMockMvc.perform(get("/api/preparation-steps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(preparationStep.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)))
            .andExpect(jsonPath("$.[*].stepDescription").value(hasItem(DEFAULT_STEP_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getPreparationStep() throws Exception {
        // Initialize the database
        preparationStepRepository.saveAndFlush(preparationStep);

        // Get the preparationStep
        restPreparationStepMockMvc.perform(get("/api/preparation-steps/{id}", preparationStep.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(preparationStep.getId().intValue()))
            .andExpect(jsonPath("$.ordinalNumber").value(DEFAULT_ORDINAL_NUMBER))
            .andExpect(jsonPath("$.stepDescription").value(DEFAULT_STEP_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPreparationStep() throws Exception {
        // Get the preparationStep
        restPreparationStepMockMvc.perform(get("/api/preparation-steps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePreparationStep() throws Exception {
        // Initialize the database
        preparationStepService.save(preparationStep);

        int databaseSizeBeforeUpdate = preparationStepRepository.findAll().size();

        // Update the preparationStep
        PreparationStep updatedPreparationStep = preparationStepRepository.findById(preparationStep.getId()).get();
        // Disconnect from session so that the updates on updatedPreparationStep are not directly saved in db
        em.detach(updatedPreparationStep);
        updatedPreparationStep
            .ordinalNumber(UPDATED_ORDINAL_NUMBER)
            .stepDescription(UPDATED_STEP_DESCRIPTION);

        restPreparationStepMockMvc.perform(put("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPreparationStep)))
            .andExpect(status().isOk());

        // Validate the PreparationStep in the database
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeUpdate);
        PreparationStep testPreparationStep = preparationStepList.get(preparationStepList.size() - 1);
        assertThat(testPreparationStep.getOrdinalNumber()).isEqualTo(UPDATED_ORDINAL_NUMBER);
        assertThat(testPreparationStep.getStepDescription()).isEqualTo(UPDATED_STEP_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingPreparationStep() throws Exception {
        int databaseSizeBeforeUpdate = preparationStepRepository.findAll().size();

        // Create the PreparationStep

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPreparationStepMockMvc.perform(put("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preparationStep)))
            .andExpect(status().isBadRequest());

        // Validate the PreparationStep in the database
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePreparationStep() throws Exception {
        // Initialize the database
        preparationStepService.save(preparationStep);

        int databaseSizeBeforeDelete = preparationStepRepository.findAll().size();

        // Delete the preparationStep
        restPreparationStepMockMvc.perform(delete("/api/preparation-steps/{id}", preparationStep.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PreparationStep.class);
        PreparationStep preparationStep1 = new PreparationStep();
        preparationStep1.setId(1L);
        PreparationStep preparationStep2 = new PreparationStep();
        preparationStep2.setId(preparationStep1.getId());
        assertThat(preparationStep1).isEqualTo(preparationStep2);
        preparationStep2.setId(2L);
        assertThat(preparationStep1).isNotEqualTo(preparationStep2);
        preparationStep1.setId(null);
        assertThat(preparationStep1).isNotEqualTo(preparationStep2);
    }
}
