package pl.marczynski.dietify.core.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.core.domain.DietType;
import pl.marczynski.dietify.core.repository.DietTypeRepository;
import pl.marczynski.dietify.core.service.DietTypeService;
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
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DietTypeResource REST controller.
 *
 * @see DietTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class DietTypeResourceIntTest {

    private static final String DEFAULT_NAME_POLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_POLISH = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_ENGLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_ENGLISH = "BBBBBBBBBB";

    @Autowired
    private DietTypeRepository dietTypeRepository;

    @Autowired
    private DietTypeService dietTypeService;

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

    private MockMvc restDietTypeMockMvc;

    private DietType dietType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DietTypeResource dietTypeResource = new DietTypeResource(dietTypeService);
        this.restDietTypeMockMvc = MockMvcBuilders.standaloneSetup(dietTypeResource)
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
    public static DietType createEntity(EntityManager em) {
        DietType dietType = new DietType()
            .namePolish(DEFAULT_NAME_POLISH)
            .nameEnglish(DEFAULT_NAME_ENGLISH);
        return dietType;
    }

    @Before
    public void initTest() {
        dietType = createEntity(em);
    }

    @Test
    @Transactional
    public void createDietType() throws Exception {
        int databaseSizeBeforeCreate = dietTypeRepository.findAll().size();

        // Create the DietType
        restDietTypeMockMvc.perform(post("/api/diet-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietType)))
            .andExpect(status().isCreated());

        // Validate the DietType in the database
        List<DietType> dietTypeList = dietTypeRepository.findAll();
        assertThat(dietTypeList).hasSize(databaseSizeBeforeCreate + 1);
        DietType testDietType = dietTypeList.get(dietTypeList.size() - 1);
        assertThat(testDietType.getNamePolish()).isEqualTo(DEFAULT_NAME_POLISH);
        assertThat(testDietType.getNameEnglish()).isEqualTo(DEFAULT_NAME_ENGLISH);
    }

    @Test
    @Transactional
    public void createDietTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dietTypeRepository.findAll().size();

        // Create the DietType with an existing ID
        dietType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDietTypeMockMvc.perform(post("/api/diet-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietType)))
            .andExpect(status().isBadRequest());

        // Validate the DietType in the database
        List<DietType> dietTypeList = dietTypeRepository.findAll();
        assertThat(dietTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNamePolishIsRequired() throws Exception {
        int databaseSizeBeforeTest = dietTypeRepository.findAll().size();
        // set the field null
        dietType.setNamePolish(null);

        // Create the DietType, which fails.

        restDietTypeMockMvc.perform(post("/api/diet-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietType)))
            .andExpect(status().isBadRequest());

        List<DietType> dietTypeList = dietTypeRepository.findAll();
        assertThat(dietTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameEnglishIsRequired() throws Exception {
        int databaseSizeBeforeTest = dietTypeRepository.findAll().size();
        // set the field null
        dietType.setNameEnglish(null);

        // Create the DietType, which fails.

        restDietTypeMockMvc.perform(post("/api/diet-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietType)))
            .andExpect(status().isBadRequest());

        List<DietType> dietTypeList = dietTypeRepository.findAll();
        assertThat(dietTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDietTypes() throws Exception {
        // Initialize the database
        dietTypeRepository.saveAndFlush(dietType);

        // Get all the dietTypeList
        restDietTypeMockMvc.perform(get("/api/diet-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dietType.getId().intValue())))
            .andExpect(jsonPath("$.[*].namePolish").value(hasItem(DEFAULT_NAME_POLISH.toString())))
            .andExpect(jsonPath("$.[*].nameEnglish").value(hasItem(DEFAULT_NAME_ENGLISH.toString())));
    }
    
    @Test
    @Transactional
    public void getDietType() throws Exception {
        // Initialize the database
        dietTypeRepository.saveAndFlush(dietType);

        // Get the dietType
        restDietTypeMockMvc.perform(get("/api/diet-types/{id}", dietType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dietType.getId().intValue()))
            .andExpect(jsonPath("$.namePolish").value(DEFAULT_NAME_POLISH.toString()))
            .andExpect(jsonPath("$.nameEnglish").value(DEFAULT_NAME_ENGLISH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDietType() throws Exception {
        // Get the dietType
        restDietTypeMockMvc.perform(get("/api/diet-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDietType() throws Exception {
        // Initialize the database
        dietTypeService.save(dietType);

        int databaseSizeBeforeUpdate = dietTypeRepository.findAll().size();

        // Update the dietType
        DietType updatedDietType = dietTypeRepository.findById(dietType.getId()).get();
        // Disconnect from session so that the updates on updatedDietType are not directly saved in db
        em.detach(updatedDietType);
        updatedDietType
            .namePolish(UPDATED_NAME_POLISH)
            .nameEnglish(UPDATED_NAME_ENGLISH);

        restDietTypeMockMvc.perform(put("/api/diet-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDietType)))
            .andExpect(status().isOk());

        // Validate the DietType in the database
        List<DietType> dietTypeList = dietTypeRepository.findAll();
        assertThat(dietTypeList).hasSize(databaseSizeBeforeUpdate);
        DietType testDietType = dietTypeList.get(dietTypeList.size() - 1);
        assertThat(testDietType.getNamePolish()).isEqualTo(UPDATED_NAME_POLISH);
        assertThat(testDietType.getNameEnglish()).isEqualTo(UPDATED_NAME_ENGLISH);
    }

    @Test
    @Transactional
    public void updateNonExistingDietType() throws Exception {
        int databaseSizeBeforeUpdate = dietTypeRepository.findAll().size();

        // Create the DietType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDietTypeMockMvc.perform(put("/api/diet-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietType)))
            .andExpect(status().isBadRequest());

        // Validate the DietType in the database
        List<DietType> dietTypeList = dietTypeRepository.findAll();
        assertThat(dietTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDietType() throws Exception {
        // Initialize the database
        dietTypeService.save(dietType);

        int databaseSizeBeforeDelete = dietTypeRepository.findAll().size();

        // Delete the dietType
        restDietTypeMockMvc.perform(delete("/api/diet-types/{id}", dietType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DietType> dietTypeList = dietTypeRepository.findAll();
        assertThat(dietTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DietType.class);
        DietType dietType1 = new DietType();
        dietType1.setId(1L);
        DietType dietType2 = new DietType();
        dietType2.setId(dietType1.getId());
        assertThat(dietType1).isEqualTo(dietType2);
        dietType2.setId(2L);
        assertThat(dietType1).isNotEqualTo(dietType2);
        dietType1.setId(null);
        assertThat(dietType1).isNotEqualTo(dietType2);
    }
}
