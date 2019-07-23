package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.DishType;
import pl.marczynski.dietify.recipes.repository.DishTypeRepository;
import pl.marczynski.dietify.recipes.repository.search.DishTypeSearchRepository;
import pl.marczynski.dietify.recipes.service.DishTypeService;
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
 * Integration tests for the {@Link DishTypeResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class DishTypeResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DishTypeRepository dishTypeRepository;

    @Autowired
    private DishTypeService dishTypeService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.DishTypeSearchRepositoryMockConfiguration
     */
    @Autowired
    private DishTypeSearchRepository mockDishTypeSearchRepository;

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

    @BeforeEach
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
        DishType dishType = new DishType();
        dishType.setDescription(DEFAULT_DESCRIPTION);
        return dishType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DishType createUpdatedEntity(EntityManager em) {
        DishType dishType = new DishType();
        dishType.setDescription(UPDATED_DESCRIPTION);
        return dishType;
    }

    @BeforeEach
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
        assertThat(testDishType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the DishType in Elasticsearch
        verify(mockDishTypeSearchRepository, times(1)).save(testDishType);
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

        // Validate the DishType in Elasticsearch
        verify(mockDishTypeSearchRepository, times(0)).save(dishType);
    }


    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = dishTypeRepository.findAll().size();
        // set the field null
        dishType.setDescription(null);

        // Create the DishType, which fails.

        restDishTypeMockMvc.perform(post("/api/dish-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishType)))
            .andExpect(status().isBadRequest());

        List<DishType> dishTypeList = dishTypeRepository.findAll();
        assertThat(dishTypeList).hasSize(databaseSizeBeforeTest);
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
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
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
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
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
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockDishTypeSearchRepository);

        int databaseSizeBeforeUpdate = dishTypeRepository.findAll().size();

        // Update the dishType
        DishType updatedDishType = dishTypeRepository.findById(dishType.getId()).get();
        // Disconnect from session so that the updates on updatedDishType are not directly saved in db
        em.detach(updatedDishType);
        updatedDishType.setDescription(UPDATED_DESCRIPTION);

        restDishTypeMockMvc.perform(put("/api/dish-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDishType)))
            .andExpect(status().isOk());

        // Validate the DishType in the database
        List<DishType> dishTypeList = dishTypeRepository.findAll();
        assertThat(dishTypeList).hasSize(databaseSizeBeforeUpdate);
        DishType testDishType = dishTypeList.get(dishTypeList.size() - 1);
        assertThat(testDishType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the DishType in Elasticsearch
        verify(mockDishTypeSearchRepository, times(1)).save(testDishType);
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

        // Validate the DishType in Elasticsearch
        verify(mockDishTypeSearchRepository, times(0)).save(dishType);
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
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DishType> dishTypeList = dishTypeRepository.findAll();
        assertThat(dishTypeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DishType in Elasticsearch
        verify(mockDishTypeSearchRepository, times(1)).deleteById(dishType.getId());
    }

    @Test
    @Transactional
    public void searchDishType() throws Exception {
        // Initialize the database
        dishTypeService.save(dishType);
        when(mockDishTypeSearchRepository.search(queryStringQuery("id:" + dishType.getId())))
            .thenReturn(Collections.singletonList(dishType));
        // Search the dishType
        restDishTypeMockMvc.perform(get("/api/_search/dish-types?query=id:" + dishType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dishType.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
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
