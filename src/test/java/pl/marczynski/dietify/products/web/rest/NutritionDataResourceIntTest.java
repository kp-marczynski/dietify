package pl.marczynski.dietify.products.web.rest;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import pl.marczynski.dietify.core.DietifyApp;

/**
 * Test class for the NutritionDataResource REST controller.
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class NutritionDataResourceIntTest {
//
//    private static final Double DEFAULT_NUTRITION_VALUE = 0D;
//    private static final Double UPDATED_NUTRITION_VALUE = 1D;
//
//    @Autowired
//    private NutritionDataRepository nutritionDataRepository;
//
//    @Autowired
//    private NutritionDataService nutritionDataService;
//
//    @Autowired
//    private MappingJackson2HttpMessageConverter jacksonMessageConverter;
//
//    @Autowired
//    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;
//
//    @Autowired
//    private ExceptionTranslator exceptionTranslator;
//
//    @Autowired
//    private EntityManager em;
//
//    @Autowired
//    private Validator validator;
//
//    private MockMvc restNutritionDataMockMvc;
//
//    private NutritionData nutritionData;
//
//    @Before
//    public void setup() {
//        MockitoAnnotations.initMocks(this);
//        final NutritionDataResource nutritionDataResource = new NutritionDataResource(nutritionDataService);
//        this.restNutritionDataMockMvc = MockMvcBuilders.standaloneSetup(nutritionDataResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter)
//            .setValidator(validator).build();
//    }
//
//    /**
//     * Create an entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static NutritionData createEntity(EntityManager em) {
//        NutritionData nutritionData = new NutritionData()
//            .nutritionValue(DEFAULT_NUTRITION_VALUE);
//        // Add required entity
//        NutritionDefinition nutritionDefinition = NutritionDefinitionResourceIntTest.createEntity(em);
//        em.persist(nutritionDefinition);
//        em.flush();
//        nutritionData.setNutritionDefinition(nutritionDefinition);
//        // Add required entity
//        Product product = ProductResourceIntTest.createEntity(em);
//        em.persist(product);
//        em.flush();
//        return nutritionData;
//    }
//
//    @Before
//    public void initTest() {
//        nutritionData = createEntity(em);
//    }
//
//    @Test
//    @Transactional
//    public void createNutritionData() throws Exception {
//        int databaseSizeBeforeCreate = nutritionDataRepository.findAll().size();
//
//        // Create the NutritionData
//        restNutritionDataMockMvc.perform(post("/api/nutrition-data")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(nutritionData)))
//            .andExpect(status().isCreated());
//
//        // Validate the NutritionData in the database
//        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
//        assertThat(nutritionDataList).hasSize(databaseSizeBeforeCreate + 1);
//        NutritionData testNutritionData = nutritionDataList.get(nutritionDataList.size() - 1);
//        assertThat(testNutritionData.getNutritionValue()).isEqualTo(DEFAULT_NUTRITION_VALUE);
//    }
//
//    @Test
//    @Transactional
//    public void createNutritionDataWithExistingId() throws Exception {
//        int databaseSizeBeforeCreate = nutritionDataRepository.findAll().size();
//
//        // Create the NutritionData with an existing ID
//        nutritionData.setId(1L);
//
//        // An entity with an existing ID cannot be created, so this API call must fail
//        restNutritionDataMockMvc.perform(post("/api/nutrition-data")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(nutritionData)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the NutritionData in the database
//        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
//        assertThat(nutritionDataList).hasSize(databaseSizeBeforeCreate);
//    }
//
//    @Test
//    @Transactional
//    public void checkNutritionValueIsRequired() throws Exception {
//        int databaseSizeBeforeTest = nutritionDataRepository.findAll().size();
//        // set the field null
//        nutritionData.setNutritionValue(null);
//
//        // Create the NutritionData, which fails.
//
//        restNutritionDataMockMvc.perform(post("/api/nutrition-data")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(nutritionData)))
//            .andExpect(status().isBadRequest());
//
//        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
//        assertThat(nutritionDataList).hasSize(databaseSizeBeforeTest);
//    }
//
////    @Test
////    @Transactional
////    public void getAllNutritionData() throws Exception {
////        // Initialize the database
////        nutritionDataRepository.saveAndFlush(nutritionData);
////
////        // Get all the nutritionDataList
////        restNutritionDataMockMvc.perform(get("/api/nutrition-data?sort=id,desc"))
////            .andExpect(status().isOk())
////            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
////            .andExpect(jsonPath("$.[*].id").value(hasItem(nutritionData.getId().intValue())))
////            .andExpect(jsonPath("$.[*].nutritionValue").value(hasItem(DEFAULT_NUTRITION_VALUE.doubleValue())));
////    }
//
//    @Test
//    @Transactional
//    public void getNutritionData() throws Exception {
//        // Initialize the database
//        nutritionDataRepository.saveAndFlush(nutritionData);
//
//        // Get the nutritionData
//        restNutritionDataMockMvc.perform(get("/api/nutrition-data/{id}", nutritionData.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.id").value(nutritionData.getId().intValue()))
//            .andExpect(jsonPath("$.nutritionValue").value(DEFAULT_NUTRITION_VALUE.doubleValue()));
//    }
//
//    @Test
//    @Transactional
//    public void getNonExistingNutritionData() throws Exception {
//        // Get the nutritionData
//        restNutritionDataMockMvc.perform(get("/api/nutrition-data/{id}", Long.MAX_VALUE))
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    @Transactional
//    public void updateNutritionData() throws Exception {
//        // Initialize the database
//        nutritionDataService.save(nutritionData);
//
//        int databaseSizeBeforeUpdate = nutritionDataRepository.findAll().size();
//
//        // Update the nutritionData
//        NutritionData updatedNutritionData = nutritionDataRepository.findById(nutritionData.getId()).get();
//        // Disconnect from session so that the updates on updatedNutritionData are not directly saved in db
//        em.detach(updatedNutritionData);
//        updatedNutritionData
//            .nutritionValue(UPDATED_NUTRITION_VALUE);
//
//        restNutritionDataMockMvc.perform(put("/api/nutrition-data")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(updatedNutritionData)))
//            .andExpect(status().isOk());
//
//        // Validate the NutritionData in the database
//        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
//        assertThat(nutritionDataList).hasSize(databaseSizeBeforeUpdate);
//        NutritionData testNutritionData = nutritionDataList.get(nutritionDataList.size() - 1);
//        assertThat(testNutritionData.getNutritionValue()).isEqualTo(UPDATED_NUTRITION_VALUE);
//    }
//
//    @Test
//    @Transactional
//    public void updateNonExistingNutritionData() throws Exception {
//        int databaseSizeBeforeUpdate = nutritionDataRepository.findAll().size();
//
//        // Create the NutritionData
//
//        // If the entity doesn't have an ID, it will throw BadRequestAlertException
//        restNutritionDataMockMvc.perform(put("/api/nutrition-data")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(nutritionData)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the NutritionData in the database
//        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
//        assertThat(nutritionDataList).hasSize(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    public void deleteNutritionData() throws Exception {
//        // Initialize the database
//        nutritionDataService.save(nutritionData);
//
//        int databaseSizeBeforeDelete = nutritionDataRepository.findAll().size();
//
//        // Delete the nutritionData
//        restNutritionDataMockMvc.perform(delete("/api/nutrition-data/{id}", nutritionData.getId())
//            .accept(TestUtil.APPLICATION_JSON_UTF8))
//            .andExpect(status().isOk());
//
//        // Validate the database is empty
//        List<NutritionData> nutritionDataList = nutritionDataRepository.findAll();
//        assertThat(nutritionDataList).hasSize(databaseSizeBeforeDelete - 1);
//    }
//
//    @Test
//    @Transactional
//    public void equalsVerifier() throws Exception {
//        TestUtil.equalsVerifier(NutritionData.class);
//        NutritionData nutritionData1 = new NutritionData();
//        nutritionData1.setId(1L);
//        NutritionData nutritionData2 = new NutritionData();
//        nutritionData2.setId(nutritionData1.getId());
//        assertThat(nutritionData1).isEqualTo(nutritionData2);
//        nutritionData2.setId(2L);
//        assertThat(nutritionData1).isNotEqualTo(nutritionData2);
//        nutritionData1.setId(null);
//        assertThat(nutritionData1).isNotEqualTo(nutritionData2);
//    }
}
