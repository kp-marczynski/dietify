package pl.marczynski.dietify.products.web.rest;

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
import pl.marczynski.dietify.core.DietifyApp;
import pl.marczynski.dietify.core.web.rest.TestUtil;
import pl.marczynski.dietify.core.web.rest.errors.ExceptionTranslator;
import pl.marczynski.dietify.products.domain.NutritionDefinition;
import pl.marczynski.dietify.products.domain.NutritionDefinitionCreator;
import pl.marczynski.dietify.products.repository.NutritionDefinitionRepository;
import pl.marczynski.dietify.products.service.NutritionDefinitionService;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static pl.marczynski.dietify.products.domain.NutritionDefinitionCreator.*;

/**
 * Test class for the NutritionDefinitionResource REST controller.
 *
 * @see NutritionDefinitionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class NutritionDefinitionResourceIntTest {

    @Autowired
    private NutritionDefinitionRepository nutritionDefinitionRepository;

    @Autowired
    private NutritionDefinitionService nutritionDefinitionService;

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

    private MockMvc restNutritionDefinitionMockMvc;

    private NutritionDefinition nutritionDefinition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NutritionDefinitionResource nutritionDefinitionResource = new NutritionDefinitionResource(nutritionDefinitionService);
        this.restNutritionDefinitionMockMvc = MockMvcBuilders.standaloneSetup(nutritionDefinitionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }


    @Before
    public void initTest() {
        nutritionDefinition = NutritionDefinitionCreator.createEntity();
    }

    @Test
    @Transactional
    public void createNutritionDefinition() throws Exception {
        int databaseSizeBeforeCreate = nutritionDefinitionRepository.findAll().size();

        // Create the NutritionDefinition
        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isCreated());

        // Validate the NutritionDefinition in the database
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeCreate + 1);
        NutritionDefinition testNutritionDefinition = nutritionDefinitionList.get(nutritionDefinitionList.size() - 1);
        assertThat(testNutritionDefinition.getTagname()).isEqualTo(DEFAULT_TAGNAME);
        assertThat(testNutritionDefinition.getDescriptionPolish()).isEqualTo(DEFAULT_DESCRIPTION_POLISH);
        assertThat(testNutritionDefinition.getDescriptionEnglish()).isEqualTo(DEFAULT_DESCRIPTION_ENGLISH);
        assertThat(testNutritionDefinition.getUnits()).isEqualTo(DEFAULT_UNITS);
        assertThat(testNutritionDefinition.getDecimalPlaces()).isEqualTo(DEFAULT_DECIMAL_PLACES);
    }

    @Test
    @Transactional
    public void createNutritionDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nutritionDefinitionRepository.findAll().size();

        // Create the NutritionDefinition with an existing ID
        nutritionDefinition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionDefinition in the database
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTagnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionRepository.findAll().size();
        // set the field null
        nutritionDefinition.setTagname(null);

        // Create the NutritionDefinition, which fails.

        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionPolishIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionRepository.findAll().size();
        // set the field null
        nutritionDefinition.setDescriptionPolish(null);

        // Create the NutritionDefinition, which fails.

        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionEnglishIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionRepository.findAll().size();
        // set the field null
        nutritionDefinition.setDescriptionEnglish(null);

        // Create the NutritionDefinition, which fails.

        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUnitsIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionRepository.findAll().size();
        // set the field null
        nutritionDefinition.setUnits(null);

        // Create the NutritionDefinition, which fails.

        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDecimalPlacesIsRequired() throws Exception {
        int databaseSizeBeforeTest = nutritionDefinitionRepository.findAll().size();
        // set the field null
        nutritionDefinition.setDecimalPlaces(null);

        // Create the NutritionDefinition, which fails.

        restNutritionDefinitionMockMvc.perform(post("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNutritionDefinitions() throws Exception {
        // Initialize the database
        nutritionDefinitionRepository.saveAndFlush(nutritionDefinition);

        // Get all the nutritionDefinitionList
        restNutritionDefinitionMockMvc.perform(get("/api/nutrition-definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutritionDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].tagname").value(hasItem(DEFAULT_TAGNAME.toString())))
            .andExpect(jsonPath("$.[*].descriptionPolish").value(hasItem(DEFAULT_DESCRIPTION_POLISH.toString())))
            .andExpect(jsonPath("$.[*].descriptionEnglish").value(hasItem(DEFAULT_DESCRIPTION_ENGLISH.toString())))
            .andExpect(jsonPath("$.[*].units").value(hasItem(DEFAULT_UNITS.toString())))
            .andExpect(jsonPath("$.[*].decimalPlaces").value(hasItem(DEFAULT_DECIMAL_PLACES)));
    }

    @Test
    @Transactional
    public void getNutritionDefinition() throws Exception {
        // Initialize the database
        nutritionDefinitionRepository.saveAndFlush(nutritionDefinition);

        // Get the nutritionDefinition
        restNutritionDefinitionMockMvc.perform(get("/api/nutrition-definitions/{id}", nutritionDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nutritionDefinition.getId().intValue()))
            .andExpect(jsonPath("$.tagname").value(DEFAULT_TAGNAME.toString()))
            .andExpect(jsonPath("$.descriptionPolish").value(DEFAULT_DESCRIPTION_POLISH.toString()))
            .andExpect(jsonPath("$.descriptionEnglish").value(DEFAULT_DESCRIPTION_ENGLISH.toString()))
            .andExpect(jsonPath("$.units").value(DEFAULT_UNITS.toString()))
            .andExpect(jsonPath("$.decimalPlaces").value(DEFAULT_DECIMAL_PLACES));
    }

    @Test
    @Transactional
    public void getNonExistingNutritionDefinition() throws Exception {
        // Get the nutritionDefinition
        restNutritionDefinitionMockMvc.perform(get("/api/nutrition-definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNutritionDefinition() throws Exception {
        // Initialize the database
        nutritionDefinitionService.save(nutritionDefinition);

        int databaseSizeBeforeUpdate = nutritionDefinitionRepository.findAll().size();

        // Update the nutritionDefinition
        NutritionDefinition updatedNutritionDefinition = nutritionDefinitionRepository.findById(nutritionDefinition.getId()).get();
        // Disconnect from session so that the updates on updatedNutritionDefinition are not directly saved in db
        em.detach(updatedNutritionDefinition);
        updatedNutritionDefinition
            .tagname(UPDATED_TAGNAME)
            .descriptionPolish(UPDATED_DESCRIPTION_POLISH)
            .descriptionEnglish(UPDATED_DESCRIPTION_ENGLISH)
            .units(UPDATED_UNITS)
            .decimalPlaces(UPDATED_DECIMAL_PLACES);

        restNutritionDefinitionMockMvc.perform(put("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNutritionDefinition)))
            .andExpect(status().isOk());

        // Validate the NutritionDefinition in the database
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeUpdate);
        NutritionDefinition testNutritionDefinition = nutritionDefinitionList.get(nutritionDefinitionList.size() - 1);
        assertThat(testNutritionDefinition.getTagname()).isEqualTo(UPDATED_TAGNAME);
        assertThat(testNutritionDefinition.getDescriptionPolish()).isEqualTo(UPDATED_DESCRIPTION_POLISH);
        assertThat(testNutritionDefinition.getDescriptionEnglish()).isEqualTo(UPDATED_DESCRIPTION_ENGLISH);
        assertThat(testNutritionDefinition.getUnits()).isEqualTo(UPDATED_UNITS);
        assertThat(testNutritionDefinition.getDecimalPlaces()).isEqualTo(UPDATED_DECIMAL_PLACES);
    }

    @Test
    @Transactional
    public void updateNonExistingNutritionDefinition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionDefinitionRepository.findAll().size();

        // Create the NutritionDefinition

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutritionDefinitionMockMvc.perform(put("/api/nutrition-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nutritionDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the NutritionDefinition in the database
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNutritionDefinition() throws Exception {
        // Initialize the database
        nutritionDefinitionService.save(nutritionDefinition);

        int databaseSizeBeforeDelete = nutritionDefinitionRepository.findAll().size();

        // Delete the nutritionDefinition
        restNutritionDefinitionMockMvc.perform(delete("/api/nutrition-definitions/{id}", nutritionDefinition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NutritionDefinition> nutritionDefinitionList = nutritionDefinitionRepository.findAll();
        assertThat(nutritionDefinitionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NutritionDefinition.class);
        NutritionDefinition nutritionDefinition1 = new NutritionDefinition();
        nutritionDefinition1.setId(1L);
        NutritionDefinition nutritionDefinition2 = new NutritionDefinition();
        nutritionDefinition2.setId(nutritionDefinition1.getId());
        assertThat(nutritionDefinition1).isEqualTo(nutritionDefinition2);
        nutritionDefinition2.setId(2L);
        assertThat(nutritionDefinition1).isNotEqualTo(nutritionDefinition2);
        nutritionDefinition1.setId(null);
        assertThat(nutritionDefinition1).isNotEqualTo(nutritionDefinition2);
    }
}
