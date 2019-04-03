package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.core.web.rest.TestUtil;
import pl.marczynski.dietify.recipes.domain.MealType;
import pl.marczynski.dietify.recipes.repository.MealTypeRepository;
import pl.marczynski.dietify.recipes.service.MealTypeService;
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
import pl.marczynski.dietify.recipes.web.rest.MealTypeResource;

import javax.persistence.EntityManager;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MealTypeResource REST controller.
 *
 * @see MealTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class MealTypeResourceIntTest {

    private static final String DEFAULT_NAME_POLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_POLISH = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_ENGLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_ENGLISH = "BBBBBBBBBB";

    @Autowired
    private MealTypeRepository mealTypeRepository;

    @Autowired
    private MealTypeService mealTypeService;

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

    private MockMvc restMealTypeMockMvc;

    private MealType mealType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealTypeResource mealTypeResource = new MealTypeResource(mealTypeService);
        this.restMealTypeMockMvc = MockMvcBuilders.standaloneSetup(mealTypeResource)
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
    public static MealType createEntity(EntityManager em) {
        MealType mealType = new MealType()
            .namePolish(DEFAULT_NAME_POLISH)
            .nameEnglish(DEFAULT_NAME_ENGLISH);
        return mealType;
    }

    @Before
    public void initTest() {
        mealType = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealType() throws Exception {
        int databaseSizeBeforeCreate = mealTypeRepository.findAll().size();

        // Create the MealType
        restMealTypeMockMvc.perform(post("/api/meal-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealType)))
            .andExpect(status().isCreated());

        // Validate the MealType in the database
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeCreate + 1);
        MealType testMealType = mealTypeList.get(mealTypeList.size() - 1);
        assertThat(testMealType.getNamePolish()).isEqualTo(DEFAULT_NAME_POLISH);
        assertThat(testMealType.getNameEnglish()).isEqualTo(DEFAULT_NAME_ENGLISH);
    }

    @Test
    @Transactional
    public void createMealTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealTypeRepository.findAll().size();

        // Create the MealType with an existing ID
        mealType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealTypeMockMvc.perform(post("/api/meal-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealType)))
            .andExpect(status().isBadRequest());

        // Validate the MealType in the database
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMealTypes() throws Exception {
        // Initialize the database
        mealTypeRepository.saveAndFlush(mealType);

        // Get all the mealTypeList
        restMealTypeMockMvc.perform(get("/api/meal-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealType.getId().intValue())))
            .andExpect(jsonPath("$.[*].namePolish").value(hasItem(DEFAULT_NAME_POLISH.toString())))
            .andExpect(jsonPath("$.[*].nameEnglish").value(hasItem(DEFAULT_NAME_ENGLISH.toString())));
    }
    
    @Test
    @Transactional
    public void getMealType() throws Exception {
        // Initialize the database
        mealTypeRepository.saveAndFlush(mealType);

        // Get the mealType
        restMealTypeMockMvc.perform(get("/api/meal-types/{id}", mealType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealType.getId().intValue()))
            .andExpect(jsonPath("$.namePolish").value(DEFAULT_NAME_POLISH.toString()))
            .andExpect(jsonPath("$.nameEnglish").value(DEFAULT_NAME_ENGLISH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMealType() throws Exception {
        // Get the mealType
        restMealTypeMockMvc.perform(get("/api/meal-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealType() throws Exception {
        // Initialize the database
        mealTypeService.save(mealType);

        int databaseSizeBeforeUpdate = mealTypeRepository.findAll().size();

        // Update the mealType
        MealType updatedMealType = mealTypeRepository.findById(mealType.getId()).get();
        // Disconnect from session so that the updates on updatedMealType are not directly saved in db
        em.detach(updatedMealType);
        updatedMealType
            .namePolish(UPDATED_NAME_POLISH)
            .nameEnglish(UPDATED_NAME_ENGLISH);

        restMealTypeMockMvc.perform(put("/api/meal-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealType)))
            .andExpect(status().isOk());

        // Validate the MealType in the database
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeUpdate);
        MealType testMealType = mealTypeList.get(mealTypeList.size() - 1);
        assertThat(testMealType.getNamePolish()).isEqualTo(UPDATED_NAME_POLISH);
        assertThat(testMealType.getNameEnglish()).isEqualTo(UPDATED_NAME_ENGLISH);
    }

    @Test
    @Transactional
    public void updateNonExistingMealType() throws Exception {
        int databaseSizeBeforeUpdate = mealTypeRepository.findAll().size();

        // Create the MealType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealTypeMockMvc.perform(put("/api/meal-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealType)))
            .andExpect(status().isBadRequest());

        // Validate the MealType in the database
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMealType() throws Exception {
        // Initialize the database
        mealTypeService.save(mealType);

        int databaseSizeBeforeDelete = mealTypeRepository.findAll().size();

        // Delete the mealType
        restMealTypeMockMvc.perform(delete("/api/meal-types/{id}", mealType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealType.class);
        MealType mealType1 = new MealType();
        mealType1.setId(1L);
        MealType mealType2 = new MealType();
        mealType2.setId(mealType1.getId());
        assertThat(mealType1).isEqualTo(mealType2);
        mealType2.setId(2L);
        assertThat(mealType1).isNotEqualTo(mealType2);
        mealType1.setId(null);
        assertThat(mealType1).isNotEqualTo(mealType2);
    }
}
