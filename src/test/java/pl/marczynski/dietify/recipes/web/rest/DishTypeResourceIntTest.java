package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.core.web.rest.TestUtil;
import pl.marczynski.dietify.recipes.domain.DishType;
import pl.marczynski.dietify.recipes.repository.DishTypeRepository;
import pl.marczynski.dietify.recipes.service.DishTypeService;
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
import pl.marczynski.dietify.recipes.web.rest.DishTypeResource;

import javax.persistence.EntityManager;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DishTypeResource REST controller.
 *
 * @see DishTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class DishTypeResourceIntTest {

    private static final String DEFAULT_DESCRIPTION_POLISH = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_POLISH = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_ENGLISH = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_ENGLISH = "BBBBBBBBBB";

    @Autowired
    private DishTypeRepository dishTypeRepository;

    @Autowired
    private DishTypeService dishTypeService;

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

    private MockMvc restDishTypeMockMvc;

    private DishType dishType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DishTypeResource dishTypeResource = new DishTypeResource(dishTypeService);
        this.restDishTypeMockMvc = MockMvcBuilders.standaloneSetup(dishTypeResource)
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
    public static DishType createEntity(EntityManager em) {
        DishType dishType = new DishType()
            .descriptionPolish(DEFAULT_DESCRIPTION_POLISH)
            .descriptionEnglish(DEFAULT_DESCRIPTION_ENGLISH);
        return dishType;
    }

    @Before
    public void initTest() {
        dishType = createEntity(em);
    }

    @Test
    @Transactional
    public void createDishType() throws Exception {
        int databaseSizeBeforeCreate = dishTypeRepository.findAll().size();

        // Create the DishType
        restDishTypeMockMvc.perform(post("/api/dish-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishType)))
            .andExpect(status().isCreated());

        // Validate the DishType in the database
        List<DishType> dishTypeList = dishTypeRepository.findAll();
        assertThat(dishTypeList).hasSize(databaseSizeBeforeCreate + 1);
        DishType testDishType = dishTypeList.get(dishTypeList.size() - 1);
        assertThat(testDishType.getDescriptionPolish()).isEqualTo(DEFAULT_DESCRIPTION_POLISH);
        assertThat(testDishType.getDescriptionEnglish()).isEqualTo(DEFAULT_DESCRIPTION_ENGLISH);
    }

    @Test
    @Transactional
    public void createDishTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dishTypeRepository.findAll().size();

        // Create the DishType with an existing ID
        dishType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDishTypeMockMvc.perform(post("/api/dish-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishType)))
            .andExpect(status().isBadRequest());

        // Validate the DishType in the database
        List<DishType> dishTypeList = dishTypeRepository.findAll();
        assertThat(dishTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDishTypes() throws Exception {
        // Initialize the database
        dishTypeRepository.saveAndFlush(dishType);

        // Get all the dishTypeList
        restDishTypeMockMvc.perform(get("/api/dish-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dishType.getId().intValue())))
            .andExpect(jsonPath("$.[*].descriptionPolish").value(hasItem(DEFAULT_DESCRIPTION_POLISH.toString())))
            .andExpect(jsonPath("$.[*].descriptionEnglish").value(hasItem(DEFAULT_DESCRIPTION_ENGLISH.toString())));
    }
    
    @Test
    @Transactional
    public void getDishType() throws Exception {
        // Initialize the database
        dishTypeRepository.saveAndFlush(dishType);

        // Get the dishType
        restDishTypeMockMvc.perform(get("/api/dish-types/{id}", dishType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dishType.getId().intValue()))
            .andExpect(jsonPath("$.descriptionPolish").value(DEFAULT_DESCRIPTION_POLISH.toString()))
            .andExpect(jsonPath("$.descriptionEnglish").value(DEFAULT_DESCRIPTION_ENGLISH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDishType() throws Exception {
        // Get the dishType
        restDishTypeMockMvc.perform(get("/api/dish-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDishType() throws Exception {
        // Initialize the database
        dishTypeService.save(dishType);

        int databaseSizeBeforeUpdate = dishTypeRepository.findAll().size();

        // Update the dishType
        DishType updatedDishType = dishTypeRepository.findById(dishType.getId()).get();
        // Disconnect from session so that the updates on updatedDishType are not directly saved in db
        em.detach(updatedDishType);
        updatedDishType
            .descriptionPolish(UPDATED_DESCRIPTION_POLISH)
            .descriptionEnglish(UPDATED_DESCRIPTION_ENGLISH);

        restDishTypeMockMvc.perform(put("/api/dish-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDishType)))
            .andExpect(status().isOk());

        // Validate the DishType in the database
        List<DishType> dishTypeList = dishTypeRepository.findAll();
        assertThat(dishTypeList).hasSize(databaseSizeBeforeUpdate);
        DishType testDishType = dishTypeList.get(dishTypeList.size() - 1);
        assertThat(testDishType.getDescriptionPolish()).isEqualTo(UPDATED_DESCRIPTION_POLISH);
        assertThat(testDishType.getDescriptionEnglish()).isEqualTo(UPDATED_DESCRIPTION_ENGLISH);
    }

    @Test
    @Transactional
    public void updateNonExistingDishType() throws Exception {
        int databaseSizeBeforeUpdate = dishTypeRepository.findAll().size();

        // Create the DishType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDishTypeMockMvc.perform(put("/api/dish-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishType)))
            .andExpect(status().isBadRequest());

        // Validate the DishType in the database
        List<DishType> dishTypeList = dishTypeRepository.findAll();
        assertThat(dishTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDishType() throws Exception {
        // Initialize the database
        dishTypeService.save(dishType);

        int databaseSizeBeforeDelete = dishTypeRepository.findAll().size();

        // Delete the dishType
        restDishTypeMockMvc.perform(delete("/api/dish-types/{id}", dishType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DishType> dishTypeList = dishTypeRepository.findAll();
        assertThat(dishTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DishType.class);
        DishType dishType1 = new DishType();
        dishType1.setId(1L);
        DishType dishType2 = new DishType();
        dishType2.setId(dishType1.getId());
        assertThat(dishType1).isEqualTo(dishType2);
        dishType2.setId(2L);
        assertThat(dishType1).isNotEqualTo(dishType2);
        dishType1.setId(null);
        assertThat(dishType1).isNotEqualTo(dishType2);
    }
}
