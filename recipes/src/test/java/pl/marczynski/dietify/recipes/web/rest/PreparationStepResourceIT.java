package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.PreparationStep;
import pl.marczynski.dietify.recipes.domain.RecipeSection;
import pl.marczynski.dietify.recipes.repository.PreparationStepRepository;
import pl.marczynski.dietify.recipes.repository.search.PreparationStepSearchRepository;
import pl.marczynski.dietify.recipes.service.PreparationStepService;
import pl.marczynski.dietify.recipes.service.dto.PreparationStepDTO;
import pl.marczynski.dietify.recipes.service.mapper.PreparationStepMapper;
import pl.marczynski.dietify.recipes.web.rest.errors.ExceptionTranslator;

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
import java.util.Collections;
import java.util.List;

import static pl.marczynski.dietify.recipes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PreparationStepResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class PreparationStepResourceIT {

    private static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    private static final Integer UPDATED_ORDINAL_NUMBER = 2;

    private static final String DEFAULT_STEP_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_STEP_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PreparationStepRepository preparationStepRepository;

    @Autowired
    private PreparationStepMapper preparationStepMapper;

    @Autowired
    private PreparationStepService preparationStepService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.PreparationStepSearchRepositoryMockConfiguration
     */
    @Autowired
    private PreparationStepSearchRepository mockPreparationStepSearchRepository;

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

    @BeforeEach
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
        PreparationStep preparationStep = new PreparationStep();
        preparationStep.setOrdinalNumber(DEFAULT_ORDINAL_NUMBER);
        preparationStep.setStepDescription(DEFAULT_STEP_DESCRIPTION);
        // Add required entity
        RecipeSection recipeSection;
        if (TestUtil.findAll(em, RecipeSection.class).isEmpty()) {
            recipeSection = RecipeSectionResourceIT.createEntity(em);
            em.persist(recipeSection);
            em.flush();
        } else {
            recipeSection = TestUtil.findAll(em, RecipeSection.class).get(0);
        }
        preparationStep.setRecipeSection(recipeSection);
        return preparationStep;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PreparationStep createUpdatedEntity(EntityManager em) {
        PreparationStep preparationStep = new PreparationStep();
        preparationStep.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        preparationStep.setStepDescription(UPDATED_STEP_DESCRIPTION);
        // Add required entity
        RecipeSection recipeSection;
        if (TestUtil.findAll(em, RecipeSection.class).isEmpty()) {
            recipeSection = RecipeSectionResourceIT.createUpdatedEntity(em);
            em.persist(recipeSection);
            em.flush();
        } else {
            recipeSection = TestUtil.findAll(em, RecipeSection.class).get(0);
        }
        preparationStep.setRecipeSection(recipeSection);
        return preparationStep;
    }

    @BeforeEach
    public void initTest() {
        preparationStep = createEntity(em);
    }

    @Test
    @Transactional
    public void createPreparationStep() throws Exception {
        int databaseSizeBeforeCreate = preparationStepRepository.findAll().size();

        // Create the PreparationStep
        PreparationStepDTO preparationStepDTO = preparationStepMapper.toDto(preparationStep);
        restPreparationStepMockMvc.perform(post("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preparationStepDTO)))
            .andExpect(status().isCreated());

        // Validate the PreparationStep in the database
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeCreate + 1);
        PreparationStep testPreparationStep = preparationStepList.get(preparationStepList.size() - 1);
        assertThat(testPreparationStep.getOrdinalNumber()).isEqualTo(DEFAULT_ORDINAL_NUMBER);
        assertThat(testPreparationStep.getStepDescription()).isEqualTo(DEFAULT_STEP_DESCRIPTION);

        // Validate the PreparationStep in Elasticsearch
        verify(mockPreparationStepSearchRepository, times(1)).save(testPreparationStep);
    }

    @Test
    @Transactional
    public void createPreparationStepWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = preparationStepRepository.findAll().size();

        // Create the PreparationStep with an existing ID
        preparationStep.setId(1L);
        PreparationStepDTO preparationStepDTO = preparationStepMapper.toDto(preparationStep);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPreparationStepMockMvc.perform(post("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preparationStepDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PreparationStep in the database
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeCreate);

        // Validate the PreparationStep in Elasticsearch
        verify(mockPreparationStepSearchRepository, times(0)).save(preparationStep);
    }


    @Test
    @Transactional
    public void checkOrdinalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = preparationStepRepository.findAll().size();
        // set the field null
        preparationStep.setOrdinalNumber(null);

        // Create the PreparationStep, which fails.
        PreparationStepDTO preparationStepDTO = preparationStepMapper.toDto(preparationStep);

        restPreparationStepMockMvc.perform(post("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preparationStepDTO)))
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
        preparationStepRepository.saveAndFlush(preparationStep);

        int databaseSizeBeforeUpdate = preparationStepRepository.findAll().size();

        // Update the preparationStep
        PreparationStep updatedPreparationStep = preparationStepRepository.findById(preparationStep.getId()).get();
        // Disconnect from session so that the updates on updatedPreparationStep are not directly saved in db
        em.detach(updatedPreparationStep);
        updatedPreparationStep.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        updatedPreparationStep.setStepDescription(UPDATED_STEP_DESCRIPTION);
        PreparationStepDTO preparationStepDTO = preparationStepMapper.toDto(updatedPreparationStep);

        restPreparationStepMockMvc.perform(put("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preparationStepDTO)))
            .andExpect(status().isOk());

        // Validate the PreparationStep in the database
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeUpdate);
        PreparationStep testPreparationStep = preparationStepList.get(preparationStepList.size() - 1);
        assertThat(testPreparationStep.getOrdinalNumber()).isEqualTo(UPDATED_ORDINAL_NUMBER);
        assertThat(testPreparationStep.getStepDescription()).isEqualTo(UPDATED_STEP_DESCRIPTION);

        // Validate the PreparationStep in Elasticsearch
        verify(mockPreparationStepSearchRepository, times(1)).save(testPreparationStep);
    }

    @Test
    @Transactional
    public void updateNonExistingPreparationStep() throws Exception {
        int databaseSizeBeforeUpdate = preparationStepRepository.findAll().size();

        // Create the PreparationStep
        PreparationStepDTO preparationStepDTO = preparationStepMapper.toDto(preparationStep);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPreparationStepMockMvc.perform(put("/api/preparation-steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preparationStepDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PreparationStep in the database
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeUpdate);

        // Validate the PreparationStep in Elasticsearch
        verify(mockPreparationStepSearchRepository, times(0)).save(preparationStep);
    }

    @Test
    @Transactional
    public void deletePreparationStep() throws Exception {
        // Initialize the database
        preparationStepRepository.saveAndFlush(preparationStep);

        int databaseSizeBeforeDelete = preparationStepRepository.findAll().size();

        // Delete the preparationStep
        restPreparationStepMockMvc.perform(delete("/api/preparation-steps/{id}", preparationStep.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PreparationStep> preparationStepList = preparationStepRepository.findAll();
        assertThat(preparationStepList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the PreparationStep in Elasticsearch
        verify(mockPreparationStepSearchRepository, times(1)).deleteById(preparationStep.getId());
    }

    @Test
    @Transactional
    public void searchPreparationStep() throws Exception {
        // Initialize the database
        preparationStepRepository.saveAndFlush(preparationStep);
        when(mockPreparationStepSearchRepository.search(queryStringQuery("id:" + preparationStep.getId())))
            .thenReturn(Collections.singletonList(preparationStep));
        // Search the preparationStep
        restPreparationStepMockMvc.perform(get("/api/_search/preparation-steps?query=id:" + preparationStep.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(preparationStep.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)))
            .andExpect(jsonPath("$.[*].stepDescription").value(hasItem(DEFAULT_STEP_DESCRIPTION.toString())));
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

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PreparationStepDTO.class);
        PreparationStepDTO preparationStepDTO1 = new PreparationStepDTO();
        preparationStepDTO1.setId(1L);
        PreparationStepDTO preparationStepDTO2 = new PreparationStepDTO();
        assertThat(preparationStepDTO1).isNotEqualTo(preparationStepDTO2);
        preparationStepDTO2.setId(preparationStepDTO1.getId());
        assertThat(preparationStepDTO1).isEqualTo(preparationStepDTO2);
        preparationStepDTO2.setId(2L);
        assertThat(preparationStepDTO1).isNotEqualTo(preparationStepDTO2);
        preparationStepDTO1.setId(null);
        assertThat(preparationStepDTO1).isNotEqualTo(preparationStepDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(preparationStepMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(preparationStepMapper.fromId(null)).isNull();
    }
}
