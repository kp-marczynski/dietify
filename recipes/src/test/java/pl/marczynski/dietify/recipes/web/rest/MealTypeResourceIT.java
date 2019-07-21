package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.RecipesApp;
import pl.marczynski.dietify.recipes.domain.MealType;
import pl.marczynski.dietify.recipes.repository.MealTypeRepository;
import pl.marczynski.dietify.recipes.repository.search.MealTypeSearchRepository;
import pl.marczynski.dietify.recipes.service.MealTypeService;
import pl.marczynski.dietify.recipes.service.dto.MealTypeDTO;
import pl.marczynski.dietify.recipes.service.mapper.MealTypeMapper;
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
 * Integration tests for the {@Link MealTypeResource} REST controller.
 */
@SpringBootTest(classes = RecipesApp.class)
public class MealTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private MealTypeRepository mealTypeRepository;

    @Autowired
    private MealTypeMapper mealTypeMapper;

    @Autowired
    private MealTypeService mealTypeService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.recipes.repository.search test package.
     *
     * @see pl.marczynski.dietify.recipes.repository.search.MealTypeSearchRepositoryMockConfiguration
     */
    @Autowired
    private MealTypeSearchRepository mockMealTypeSearchRepository;

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

    @BeforeEach
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
        MealType mealType = new MealType();
        mealType.setName(DEFAULT_NAME);
        return mealType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealType createUpdatedEntity(EntityManager em) {
        MealType mealType = new MealType();
        mealType.setName(UPDATED_NAME);
        return mealType;
    }

    @BeforeEach
    public void initTest() {
        mealType = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealType() throws Exception {
        int databaseSizeBeforeCreate = mealTypeRepository.findAll().size();

        // Create the MealType
        MealTypeDTO mealTypeDTO = mealTypeMapper.toDto(mealType);
        restMealTypeMockMvc.perform(post("/api/meal-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the MealType in the database
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeCreate + 1);
        MealType testMealType = mealTypeList.get(mealTypeList.size() - 1);
        assertThat(testMealType.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the MealType in Elasticsearch
        verify(mockMealTypeSearchRepository, times(1)).save(testMealType);
    }

    @Test
    @Transactional
    public void createMealTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealTypeRepository.findAll().size();

        // Create the MealType with an existing ID
        mealType.setId(1L);
        MealTypeDTO mealTypeDTO = mealTypeMapper.toDto(mealType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealTypeMockMvc.perform(post("/api/meal-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealType in the database
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeCreate);

        // Validate the MealType in Elasticsearch
        verify(mockMealTypeSearchRepository, times(0)).save(mealType);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = mealTypeRepository.findAll().size();
        // set the field null
        mealType.setName(null);

        // Create the MealType, which fails.
        MealTypeDTO mealTypeDTO = mealTypeMapper.toDto(mealType);

        restMealTypeMockMvc.perform(post("/api/meal-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeDTO)))
            .andExpect(status().isBadRequest());

        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeTest);
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
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
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
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
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
        mealTypeRepository.saveAndFlush(mealType);

        int databaseSizeBeforeUpdate = mealTypeRepository.findAll().size();

        // Update the mealType
        MealType updatedMealType = mealTypeRepository.findById(mealType.getId()).get();
        // Disconnect from session so that the updates on updatedMealType are not directly saved in db
        em.detach(updatedMealType);
        updatedMealType.setName(UPDATED_NAME);
        MealTypeDTO mealTypeDTO = mealTypeMapper.toDto(updatedMealType);

        restMealTypeMockMvc.perform(put("/api/meal-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeDTO)))
            .andExpect(status().isOk());

        // Validate the MealType in the database
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeUpdate);
        MealType testMealType = mealTypeList.get(mealTypeList.size() - 1);
        assertThat(testMealType.getName()).isEqualTo(UPDATED_NAME);

        // Validate the MealType in Elasticsearch
        verify(mockMealTypeSearchRepository, times(1)).save(testMealType);
    }

    @Test
    @Transactional
    public void updateNonExistingMealType() throws Exception {
        int databaseSizeBeforeUpdate = mealTypeRepository.findAll().size();

        // Create the MealType
        MealTypeDTO mealTypeDTO = mealTypeMapper.toDto(mealType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealTypeMockMvc.perform(put("/api/meal-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MealType in the database
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MealType in Elasticsearch
        verify(mockMealTypeSearchRepository, times(0)).save(mealType);
    }

    @Test
    @Transactional
    public void deleteMealType() throws Exception {
        // Initialize the database
        mealTypeRepository.saveAndFlush(mealType);

        int databaseSizeBeforeDelete = mealTypeRepository.findAll().size();

        // Delete the mealType
        restMealTypeMockMvc.perform(delete("/api/meal-types/{id}", mealType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MealType> mealTypeList = mealTypeRepository.findAll();
        assertThat(mealTypeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MealType in Elasticsearch
        verify(mockMealTypeSearchRepository, times(1)).deleteById(mealType.getId());
    }

    @Test
    @Transactional
    public void searchMealType() throws Exception {
        // Initialize the database
        mealTypeRepository.saveAndFlush(mealType);
        when(mockMealTypeSearchRepository.search(queryStringQuery("id:" + mealType.getId())))
            .thenReturn(Collections.singletonList(mealType));
        // Search the mealType
        restMealTypeMockMvc.perform(get("/api/_search/meal-types?query=id:" + mealType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
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

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealTypeDTO.class);
        MealTypeDTO mealTypeDTO1 = new MealTypeDTO();
        mealTypeDTO1.setId(1L);
        MealTypeDTO mealTypeDTO2 = new MealTypeDTO();
        assertThat(mealTypeDTO1).isNotEqualTo(mealTypeDTO2);
        mealTypeDTO2.setId(mealTypeDTO1.getId());
        assertThat(mealTypeDTO1).isEqualTo(mealTypeDTO2);
        mealTypeDTO2.setId(2L);
        assertThat(mealTypeDTO1).isNotEqualTo(mealTypeDTO2);
        mealTypeDTO1.setId(null);
        assertThat(mealTypeDTO1).isNotEqualTo(mealTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mealTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mealTypeMapper.fromId(null)).isNull();
    }
}
