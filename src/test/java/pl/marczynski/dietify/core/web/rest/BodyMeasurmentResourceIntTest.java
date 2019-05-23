package pl.marczynski.dietify.core.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.core.domain.BodyMeasurment;
import pl.marczynski.dietify.core.repository.BodyMeasurmentRepository;
import pl.marczynski.dietify.core.service.BodyMeasurmentService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BodyMeasurmentResource REST controller.
 *
 * @see BodyMeasurmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class BodyMeasurmentResourceIntTest {

    private static final LocalDate DEFAULT_COMPLETION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_COMPLETION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_HEIGHT = 1;
    private static final Integer UPDATED_HEIGHT = 2;

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;

    private static final Double DEFAULT_WAIST = 1D;
    private static final Double UPDATED_WAIST = 2D;

    private static final Double DEFAULT_PERCENT_OF_FAT_TISSUE = 0D;
    private static final Double UPDATED_PERCENT_OF_FAT_TISSUE = 1D;

    private static final Double DEFAULT_PERCENT_OF_WATER = 0D;
    private static final Double UPDATED_PERCENT_OF_WATER = 1D;

    private static final Double DEFAULT_MUSCLE_MASS = 1D;
    private static final Double UPDATED_MUSCLE_MASS = 2D;

    private static final Double DEFAULT_PHYSICAL_MARK = 1D;
    private static final Double UPDATED_PHYSICAL_MARK = 2D;

    private static final Double DEFAULT_CALCIUM_IN_BONES = 1D;
    private static final Double UPDATED_CALCIUM_IN_BONES = 2D;

    private static final Integer DEFAULT_BASIC_METABOLISM = 1;
    private static final Integer UPDATED_BASIC_METABOLISM = 2;

    private static final Double DEFAULT_METABOLIC_AGE = 1D;
    private static final Double UPDATED_METABOLIC_AGE = 2D;

    private static final Double DEFAULT_VISCERAL_FAT_LEVEL = 1D;
    private static final Double UPDATED_VISCERAL_FAT_LEVEL = 2D;

    @Autowired
    private BodyMeasurmentRepository bodyMeasurmentRepository;

    @Autowired
    private BodyMeasurmentService bodyMeasurmentService;

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

    private MockMvc restBodyMeasurmentMockMvc;

    private BodyMeasurment bodyMeasurment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BodyMeasurmentResource bodyMeasurmentResource = new BodyMeasurmentResource(bodyMeasurmentService);
        this.restBodyMeasurmentMockMvc = MockMvcBuilders.standaloneSetup(bodyMeasurmentResource)
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
    public static BodyMeasurment createEntity(EntityManager em) {
        BodyMeasurment bodyMeasurment = new BodyMeasurment()
            .completionDate(DEFAULT_COMPLETION_DATE)
            .height(DEFAULT_HEIGHT)
            .weight(DEFAULT_WEIGHT)
            .waist(DEFAULT_WAIST)
            .percentOfFatTissue(DEFAULT_PERCENT_OF_FAT_TISSUE)
            .percentOfWater(DEFAULT_PERCENT_OF_WATER)
            .muscleMass(DEFAULT_MUSCLE_MASS)
            .physicalMark(DEFAULT_PHYSICAL_MARK)
            .calciumInBones(DEFAULT_CALCIUM_IN_BONES)
            .basicMetabolism(DEFAULT_BASIC_METABOLISM)
            .metabolicAge(DEFAULT_METABOLIC_AGE)
            .visceralFatLevel(DEFAULT_VISCERAL_FAT_LEVEL);
        return bodyMeasurment;
    }

    @Before
    public void initTest() {
        bodyMeasurment = createEntity(em);
    }

    @Test
    @Transactional
    public void createBodyMeasurment() throws Exception {
        int databaseSizeBeforeCreate = bodyMeasurmentRepository.findAll().size();

        // Create the BodyMeasurment
        restBodyMeasurmentMockMvc.perform(post("/api/body-measurments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurment)))
            .andExpect(status().isCreated());

        // Validate the BodyMeasurment in the database
        List<BodyMeasurment> bodyMeasurmentList = bodyMeasurmentRepository.findAll();
        assertThat(bodyMeasurmentList).hasSize(databaseSizeBeforeCreate + 1);
        BodyMeasurment testBodyMeasurment = bodyMeasurmentList.get(bodyMeasurmentList.size() - 1);
        assertThat(testBodyMeasurment.getCompletionDate()).isEqualTo(DEFAULT_COMPLETION_DATE);
        assertThat(testBodyMeasurment.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testBodyMeasurment.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testBodyMeasurment.getWaist()).isEqualTo(DEFAULT_WAIST);
        assertThat(testBodyMeasurment.getPercentOfFatTissue()).isEqualTo(DEFAULT_PERCENT_OF_FAT_TISSUE);
        assertThat(testBodyMeasurment.getPercentOfWater()).isEqualTo(DEFAULT_PERCENT_OF_WATER);
        assertThat(testBodyMeasurment.getMuscleMass()).isEqualTo(DEFAULT_MUSCLE_MASS);
        assertThat(testBodyMeasurment.getPhysicalMark()).isEqualTo(DEFAULT_PHYSICAL_MARK);
        assertThat(testBodyMeasurment.getCalciumInBones()).isEqualTo(DEFAULT_CALCIUM_IN_BONES);
        assertThat(testBodyMeasurment.getBasicMetabolism()).isEqualTo(DEFAULT_BASIC_METABOLISM);
        assertThat(testBodyMeasurment.getMetabolicAge()).isEqualTo(DEFAULT_METABOLIC_AGE);
        assertThat(testBodyMeasurment.getVisceralFatLevel()).isEqualTo(DEFAULT_VISCERAL_FAT_LEVEL);
    }

    @Test
    @Transactional
    public void createBodyMeasurmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bodyMeasurmentRepository.findAll().size();

        // Create the BodyMeasurment with an existing ID
        bodyMeasurment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBodyMeasurmentMockMvc.perform(post("/api/body-measurments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurment)))
            .andExpect(status().isBadRequest());

        // Validate the BodyMeasurment in the database
        List<BodyMeasurment> bodyMeasurmentList = bodyMeasurmentRepository.findAll();
        assertThat(bodyMeasurmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCompletionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = bodyMeasurmentRepository.findAll().size();
        // set the field null
        bodyMeasurment.setCompletionDate(null);

        // Create the BodyMeasurment, which fails.

        restBodyMeasurmentMockMvc.perform(post("/api/body-measurments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurment)))
            .andExpect(status().isBadRequest());

        List<BodyMeasurment> bodyMeasurmentList = bodyMeasurmentRepository.findAll();
        assertThat(bodyMeasurmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = bodyMeasurmentRepository.findAll().size();
        // set the field null
        bodyMeasurment.setHeight(null);

        // Create the BodyMeasurment, which fails.

        restBodyMeasurmentMockMvc.perform(post("/api/body-measurments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurment)))
            .andExpect(status().isBadRequest());

        List<BodyMeasurment> bodyMeasurmentList = bodyMeasurmentRepository.findAll();
        assertThat(bodyMeasurmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = bodyMeasurmentRepository.findAll().size();
        // set the field null
        bodyMeasurment.setWeight(null);

        // Create the BodyMeasurment, which fails.

        restBodyMeasurmentMockMvc.perform(post("/api/body-measurments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurment)))
            .andExpect(status().isBadRequest());

        List<BodyMeasurment> bodyMeasurmentList = bodyMeasurmentRepository.findAll();
        assertThat(bodyMeasurmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWaistIsRequired() throws Exception {
        int databaseSizeBeforeTest = bodyMeasurmentRepository.findAll().size();
        // set the field null
        bodyMeasurment.setWaist(null);

        // Create the BodyMeasurment, which fails.

        restBodyMeasurmentMockMvc.perform(post("/api/body-measurments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurment)))
            .andExpect(status().isBadRequest());

        List<BodyMeasurment> bodyMeasurmentList = bodyMeasurmentRepository.findAll();
        assertThat(bodyMeasurmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBodyMeasurments() throws Exception {
        // Initialize the database
        bodyMeasurmentRepository.saveAndFlush(bodyMeasurment);

        // Get all the bodyMeasurmentList
        restBodyMeasurmentMockMvc.perform(get("/api/body-measurments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bodyMeasurment.getId().intValue())))
            .andExpect(jsonPath("$.[*].completionDate").value(hasItem(DEFAULT_COMPLETION_DATE.toString())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)))
            .andExpect(jsonPath("$.[*].waist").value(hasItem(DEFAULT_WAIST.doubleValue())))
            .andExpect(jsonPath("$.[*].percentOfFatTissue").value(hasItem(DEFAULT_PERCENT_OF_FAT_TISSUE.doubleValue())))
            .andExpect(jsonPath("$.[*].percentOfWater").value(hasItem(DEFAULT_PERCENT_OF_WATER.doubleValue())))
            .andExpect(jsonPath("$.[*].muscleMass").value(hasItem(DEFAULT_MUSCLE_MASS.doubleValue())))
            .andExpect(jsonPath("$.[*].physicalMark").value(hasItem(DEFAULT_PHYSICAL_MARK.doubleValue())))
            .andExpect(jsonPath("$.[*].calciumInBones").value(hasItem(DEFAULT_CALCIUM_IN_BONES.doubleValue())))
            .andExpect(jsonPath("$.[*].basicMetabolism").value(hasItem(DEFAULT_BASIC_METABOLISM)))
            .andExpect(jsonPath("$.[*].metabolicAge").value(hasItem(DEFAULT_METABOLIC_AGE.doubleValue())))
            .andExpect(jsonPath("$.[*].visceralFatLevel").value(hasItem(DEFAULT_VISCERAL_FAT_LEVEL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getBodyMeasurment() throws Exception {
        // Initialize the database
        bodyMeasurmentRepository.saveAndFlush(bodyMeasurment);

        // Get the bodyMeasurment
        restBodyMeasurmentMockMvc.perform(get("/api/body-measurments/{id}", bodyMeasurment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bodyMeasurment.getId().intValue()))
            .andExpect(jsonPath("$.completionDate").value(DEFAULT_COMPLETION_DATE.toString()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT))
            .andExpect(jsonPath("$.waist").value(DEFAULT_WAIST.doubleValue()))
            .andExpect(jsonPath("$.percentOfFatTissue").value(DEFAULT_PERCENT_OF_FAT_TISSUE.doubleValue()))
            .andExpect(jsonPath("$.percentOfWater").value(DEFAULT_PERCENT_OF_WATER.doubleValue()))
            .andExpect(jsonPath("$.muscleMass").value(DEFAULT_MUSCLE_MASS.doubleValue()))
            .andExpect(jsonPath("$.physicalMark").value(DEFAULT_PHYSICAL_MARK.doubleValue()))
            .andExpect(jsonPath("$.calciumInBones").value(DEFAULT_CALCIUM_IN_BONES.doubleValue()))
            .andExpect(jsonPath("$.basicMetabolism").value(DEFAULT_BASIC_METABOLISM))
            .andExpect(jsonPath("$.metabolicAge").value(DEFAULT_METABOLIC_AGE.doubleValue()))
            .andExpect(jsonPath("$.visceralFatLevel").value(DEFAULT_VISCERAL_FAT_LEVEL.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBodyMeasurment() throws Exception {
        // Get the bodyMeasurment
        restBodyMeasurmentMockMvc.perform(get("/api/body-measurments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBodyMeasurment() throws Exception {
        // Initialize the database
        bodyMeasurmentService.save(bodyMeasurment);

        int databaseSizeBeforeUpdate = bodyMeasurmentRepository.findAll().size();

        // Update the bodyMeasurment
        BodyMeasurment updatedBodyMeasurment = bodyMeasurmentRepository.findById(bodyMeasurment.getId()).get();
        // Disconnect from session so that the updates on updatedBodyMeasurment are not directly saved in db
        em.detach(updatedBodyMeasurment);
        updatedBodyMeasurment
            .completionDate(UPDATED_COMPLETION_DATE)
            .height(UPDATED_HEIGHT)
            .weight(UPDATED_WEIGHT)
            .waist(UPDATED_WAIST)
            .percentOfFatTissue(UPDATED_PERCENT_OF_FAT_TISSUE)
            .percentOfWater(UPDATED_PERCENT_OF_WATER)
            .muscleMass(UPDATED_MUSCLE_MASS)
            .physicalMark(UPDATED_PHYSICAL_MARK)
            .calciumInBones(UPDATED_CALCIUM_IN_BONES)
            .basicMetabolism(UPDATED_BASIC_METABOLISM)
            .metabolicAge(UPDATED_METABOLIC_AGE)
            .visceralFatLevel(UPDATED_VISCERAL_FAT_LEVEL);

        restBodyMeasurmentMockMvc.perform(put("/api/body-measurments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBodyMeasurment)))
            .andExpect(status().isOk());

        // Validate the BodyMeasurment in the database
        List<BodyMeasurment> bodyMeasurmentList = bodyMeasurmentRepository.findAll();
        assertThat(bodyMeasurmentList).hasSize(databaseSizeBeforeUpdate);
        BodyMeasurment testBodyMeasurment = bodyMeasurmentList.get(bodyMeasurmentList.size() - 1);
        assertThat(testBodyMeasurment.getCompletionDate()).isEqualTo(UPDATED_COMPLETION_DATE);
        assertThat(testBodyMeasurment.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testBodyMeasurment.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testBodyMeasurment.getWaist()).isEqualTo(UPDATED_WAIST);
        assertThat(testBodyMeasurment.getPercentOfFatTissue()).isEqualTo(UPDATED_PERCENT_OF_FAT_TISSUE);
        assertThat(testBodyMeasurment.getPercentOfWater()).isEqualTo(UPDATED_PERCENT_OF_WATER);
        assertThat(testBodyMeasurment.getMuscleMass()).isEqualTo(UPDATED_MUSCLE_MASS);
        assertThat(testBodyMeasurment.getPhysicalMark()).isEqualTo(UPDATED_PHYSICAL_MARK);
        assertThat(testBodyMeasurment.getCalciumInBones()).isEqualTo(UPDATED_CALCIUM_IN_BONES);
        assertThat(testBodyMeasurment.getBasicMetabolism()).isEqualTo(UPDATED_BASIC_METABOLISM);
        assertThat(testBodyMeasurment.getMetabolicAge()).isEqualTo(UPDATED_METABOLIC_AGE);
        assertThat(testBodyMeasurment.getVisceralFatLevel()).isEqualTo(UPDATED_VISCERAL_FAT_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingBodyMeasurment() throws Exception {
        int databaseSizeBeforeUpdate = bodyMeasurmentRepository.findAll().size();

        // Create the BodyMeasurment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBodyMeasurmentMockMvc.perform(put("/api/body-measurments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyMeasurment)))
            .andExpect(status().isBadRequest());

        // Validate the BodyMeasurment in the database
        List<BodyMeasurment> bodyMeasurmentList = bodyMeasurmentRepository.findAll();
        assertThat(bodyMeasurmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBodyMeasurment() throws Exception {
        // Initialize the database
        bodyMeasurmentService.save(bodyMeasurment);

        int databaseSizeBeforeDelete = bodyMeasurmentRepository.findAll().size();

        // Delete the bodyMeasurment
        restBodyMeasurmentMockMvc.perform(delete("/api/body-measurments/{id}", bodyMeasurment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BodyMeasurment> bodyMeasurmentList = bodyMeasurmentRepository.findAll();
        assertThat(bodyMeasurmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BodyMeasurment.class);
        BodyMeasurment bodyMeasurment1 = new BodyMeasurment();
        bodyMeasurment1.setId(1L);
        BodyMeasurment bodyMeasurment2 = new BodyMeasurment();
        bodyMeasurment2.setId(bodyMeasurment1.getId());
        assertThat(bodyMeasurment1).isEqualTo(bodyMeasurment2);
        bodyMeasurment2.setId(2L);
        assertThat(bodyMeasurment1).isNotEqualTo(bodyMeasurment2);
        bodyMeasurment1.setId(null);
        assertThat(bodyMeasurment1).isNotEqualTo(bodyMeasurment2);
    }
}
