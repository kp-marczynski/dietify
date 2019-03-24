package pl.marczynski.dietify.products.web.rest;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import pl.marczynski.dietify.core.DietifyApp;

/**
 * Test class for the HouseholdMeasureResource REST controller.
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class HouseholdMeasureResourceIntTest {
//
//    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
//    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";
//
//    private static final Double DEFAULT_GRAMS_WEIGHT = 0D;
//    private static final Double UPDATED_GRAMS_WEIGHT = 1D;
//
//    private static final Boolean DEFAULT_IS_VISIBLE = false;
//    private static final Boolean UPDATED_IS_VISIBLE = true;
//
//    @Autowired
//    private HouseholdMeasureRepository householdMeasureRepository;
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    @Autowired
//    private HouseholdMeasureService householdMeasureService;
//
//    @Autowired
//    private ProductService productService;
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
//    private MockMvc restHouseholdMeasureMockMvc;
//    private MockMvc restProductMockMvc;
//
//    private HouseholdMeasure householdMeasure;
//    private Product product;
//
//    @Before
//    public void setup() {
//        MockitoAnnotations.initMocks(this);
//        final HouseholdMeasureResource householdMeasureResource = new HouseholdMeasureResource(householdMeasureService);
//        this.restHouseholdMeasureMockMvc = MockMvcBuilders.standaloneSetup(householdMeasureResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter)
//            .setValidator(validator).build();
//
//        final ProductResource productResource = new ProductResource(productService);
//        this.restProductMockMvc = MockMvcBuilders.standaloneSetup(productResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter)
//            .setValidator(validator).build();
//    }
//
//    /**
//     * Create an entity for this test.
//     * <p>
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static HouseholdMeasure createEntity(EntityManager em) {
//        HouseholdMeasure householdMeasure = new HouseholdMeasure()
//            .description(DEFAULT_DESCRIPTION)
//            .gramsWeight(DEFAULT_GRAMS_WEIGHT)
//            .isVisible(DEFAULT_IS_VISIBLE);
//        // Add required entity
//        Product product = ProductResourceIntTest.createEntity(em);
//        em.persist(product);
//        em.flush();
//        return householdMeasure;
//    }
//
//    @Before
//    public void initTest() {
//        householdMeasure = createEntity(em);
//        product = ProductResourceIntTest.createEntity(em);
//        product.addHouseholdMeasures(householdMeasure);
//    }
//
//    @Test
//    @Transactional
//    public void createHouseholdMeasure() throws Exception {
//        int databaseSizeBeforeCreate = householdMeasureRepository.findAll().size();
//
//        // Create the HouseholdMeasure
//        restProductMockMvc.perform(post("/api/products")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(product)))
//            .andExpect(status().isCreated());
//
//        // Validate the HouseholdMeasure in the database
//        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
//        assertThat(householdMeasureList).hasSize(databaseSizeBeforeCreate + 1);
//        HouseholdMeasure testHouseholdMeasure = householdMeasureList.get(householdMeasureList.size() - 1);
//        assertThat(testHouseholdMeasure.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
//        assertThat(testHouseholdMeasure.getGramsWeight()).isEqualTo(DEFAULT_GRAMS_WEIGHT);
//        assertThat(testHouseholdMeasure.isIsVisible()).isEqualTo(DEFAULT_IS_VISIBLE);
//    }
//
//    @Test
//    @Transactional
//    public void createHouseholdMeasureWithExistingId() throws Exception {
//        int databaseSizeBeforeCreate = householdMeasureRepository.findAll().size();
//
//        // Create the HouseholdMeasure with an existing ID
//        householdMeasure.setId(1L);
//
//        // An entity with an existing ID cannot be created, so this API call must fail
//        restHouseholdMeasureMockMvc.perform(post("/api/household-measures")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(householdMeasure)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the HouseholdMeasure in the database
//        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
//        assertThat(householdMeasureList).hasSize(databaseSizeBeforeCreate);
//    }
//
//    @Test
//    @Transactional
//    public void checkDescriptionIsRequired() throws Exception {
//        int databaseSizeBeforeTest = householdMeasureRepository.findAll().size();
//        // set the field null
//        householdMeasure.setDescription(null);
//
//        // Create the HouseholdMeasure, which fails.
//
//        restHouseholdMeasureMockMvc.perform(post("/api/household-measures")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(householdMeasure)))
//            .andExpect(status().isBadRequest());
//
//        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
//        assertThat(householdMeasureList).hasSize(databaseSizeBeforeTest);
//    }
//
//    @Test
//    @Transactional
//    public void checkGramsWeightIsRequired() throws Exception {
//        int databaseSizeBeforeTest = householdMeasureRepository.findAll().size();
//        // set the field null
//        householdMeasure.setGramsWeight(null);
//
//        // Create the HouseholdMeasure, which fails.
//
//        restHouseholdMeasureMockMvc.perform(post("/api/household-measures")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(householdMeasure)))
//            .andExpect(status().isBadRequest());
//
//        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
//        assertThat(householdMeasureList).hasSize(databaseSizeBeforeTest);
//    }
//
//    @Test
//    @Transactional
//    public void checkIsVisibleIsRequired() throws Exception {
//        int databaseSizeBeforeTest = householdMeasureRepository.findAll().size();
//        // set the field null
//        householdMeasure.setIsVisible(null);
//
//        // Create the HouseholdMeasure, which fails.
//
//        restHouseholdMeasureMockMvc.perform(post("/api/household-measures")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(householdMeasure)))
//            .andExpect(status().isBadRequest());
//
//        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
//        assertThat(householdMeasureList).hasSize(databaseSizeBeforeTest);
//    }
////
////    @Test
////    @Transactional
////    public void getAllHouseholdMeasures() throws Exception {
////        // Initialize the database
////        householdMeasureRepository.saveAndFlush(householdMeasure);
////
////        // Get all the householdMeasureList
////        restHouseholdMeasureMockMvc.perform(get("/api/household-measures?sort=id,desc"))
////            .andExpect(status().isOk())
////            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
////            .andExpect(jsonPath("$.[*].id").value(hasItem(householdMeasure.getId().intValue())))
////            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
////            .andExpect(jsonPath("$.[*].gramsWeight").value(hasItem(DEFAULT_GRAMS_WEIGHT.doubleValue())))
////            .andExpect(jsonPath("$.[*].isVisible").value(hasItem(DEFAULT_IS_VISIBLE.booleanValue())));
////    }
//
//    @Test
//    @Transactional
//    public void getHouseholdMeasure() throws Exception {
//        // Initialize the database
//        productRepository.saveAndFlush(product);
//
//        // Get the householdMeasure
//        restHouseholdMeasureMockMvc.perform(get("/api/household-measures/{id}", householdMeasure.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.id").value(householdMeasure.getId().intValue()))
//            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
//            .andExpect(jsonPath("$.gramsWeight").value(DEFAULT_GRAMS_WEIGHT.doubleValue()))
//            .andExpect(jsonPath("$.isVisible").value(DEFAULT_IS_VISIBLE.booleanValue()));
//    }
//
//    @Test
//    @Transactional
//    public void getNonExistingHouseholdMeasure() throws Exception {
//        // Get the householdMeasure
//        restHouseholdMeasureMockMvc.perform(get("/api/household-measures/{id}", Long.MAX_VALUE))
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    @Transactional
//    public void updateHouseholdMeasure() throws Exception {
//        // Initialize the database
//        productService.save(product);
//
//        int databaseSizeBeforeUpdate = householdMeasureRepository.findAll().size();
//
//        // Update the householdMeasure
//        HouseholdMeasure updatedHouseholdMeasure = householdMeasureRepository.findById(householdMeasure.getId()).get();
//        // Disconnect from session so that the updates on updatedHouseholdMeasure are not directly saved in db
//        em.detach(updatedHouseholdMeasure);
//        updatedHouseholdMeasure
//            .description(UPDATED_DESCRIPTION)
//            .gramsWeight(UPDATED_GRAMS_WEIGHT)
//            .isVisible(UPDATED_IS_VISIBLE);
//
//        restHouseholdMeasureMockMvc.perform(put("/api/household-measures")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(updatedHouseholdMeasure)))
//            .andExpect(status().isOk());
//
//        // Validate the HouseholdMeasure in the database
//        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
//        assertThat(householdMeasureList).hasSize(databaseSizeBeforeUpdate);
//        HouseholdMeasure testHouseholdMeasure = householdMeasureList.get(householdMeasureList.size() - 1);
//        assertThat(testHouseholdMeasure.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
//        assertThat(testHouseholdMeasure.getGramsWeight()).isEqualTo(UPDATED_GRAMS_WEIGHT);
//        assertThat(testHouseholdMeasure.isIsVisible()).isEqualTo(UPDATED_IS_VISIBLE);
//    }
//
//    @Test
//    @Transactional
//    public void updateNonExistingHouseholdMeasure() throws Exception {
//        int databaseSizeBeforeUpdate = householdMeasureRepository.findAll().size();
//
//        // Create the HouseholdMeasure
//
//        // If the entity doesn't have an ID, it will throw BadRequestAlertException
//        restHouseholdMeasureMockMvc.perform(put("/api/household-measures")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(householdMeasure)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the HouseholdMeasure in the database
//        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
//        assertThat(householdMeasureList).hasSize(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    public void deleteHouseholdMeasure() throws Exception {
//        // Initialize the database
//        productService.save(product);
//
//        int databaseSizeBeforeDelete = householdMeasureRepository.findAll().size();
//
//        // Delete the householdMeasure
//        restHouseholdMeasureMockMvc.perform(delete("/api/household-measures/{id}", householdMeasure.getId())
//            .accept(TestUtil.APPLICATION_JSON_UTF8))
//            .andExpect(status().isOk());
//
//        // Validate the database is empty
//        List<HouseholdMeasure> householdMeasureList = householdMeasureRepository.findAll();
//        assertThat(householdMeasureList).hasSize(databaseSizeBeforeDelete - 1);
//    }
//
//    @Test
//    @Transactional
//    public void equalsVerifier() throws Exception {
//        TestUtil.equalsVerifier(HouseholdMeasure.class);
//        HouseholdMeasure householdMeasure1 = new HouseholdMeasure();
//        householdMeasure1.setId(1L);
//        HouseholdMeasure householdMeasure2 = new HouseholdMeasure();
//        householdMeasure2.setId(householdMeasure1.getId());
//        assertThat(householdMeasure1).isEqualTo(householdMeasure2);
//        householdMeasure2.setId(2L);
//        assertThat(householdMeasure1).isNotEqualTo(householdMeasure2);
//        householdMeasure1.setId(null);
//        assertThat(householdMeasure1).isNotEqualTo(householdMeasure2);
//    }
}
