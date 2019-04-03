package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.core.web.rest.TestUtil;
import pl.marczynski.dietify.recipes.domain.KitchenAppliance;
import pl.marczynski.dietify.recipes.repository.KitchenApplianceRepository;
import pl.marczynski.dietify.recipes.service.KitchenApplianceService;
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
import pl.marczynski.dietify.recipes.web.rest.KitchenApplianceResource;

import javax.persistence.EntityManager;
import java.util.List;


import static pl.marczynski.dietify.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the KitchenApplianceResource REST controller.
 *
 * @see KitchenApplianceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class KitchenApplianceResourceIntTest {

    private static final String DEFAULT_NAME_POLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_POLISH = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_ENGLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_ENGLISH = "BBBBBBBBBB";

    @Autowired
    private KitchenApplianceRepository kitchenApplianceRepository;

    @Autowired
    private KitchenApplianceService kitchenApplianceService;

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

    private MockMvc restKitchenApplianceMockMvc;

    private KitchenAppliance kitchenAppliance;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KitchenApplianceResource kitchenApplianceResource = new KitchenApplianceResource(kitchenApplianceService);
        this.restKitchenApplianceMockMvc = MockMvcBuilders.standaloneSetup(kitchenApplianceResource)
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
    public static KitchenAppliance createEntity(EntityManager em) {
        KitchenAppliance kitchenAppliance = new KitchenAppliance()
            .namePolish(DEFAULT_NAME_POLISH)
            .nameEnglish(DEFAULT_NAME_ENGLISH);
        return kitchenAppliance;
    }

    @Before
    public void initTest() {
        kitchenAppliance = createEntity(em);
    }

    @Test
    @Transactional
    public void createKitchenAppliance() throws Exception {
        int databaseSizeBeforeCreate = kitchenApplianceRepository.findAll().size();

        // Create the KitchenAppliance
        restKitchenApplianceMockMvc.perform(post("/api/kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenAppliance)))
            .andExpect(status().isCreated());

        // Validate the KitchenAppliance in the database
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeCreate + 1);
        KitchenAppliance testKitchenAppliance = kitchenApplianceList.get(kitchenApplianceList.size() - 1);
        assertThat(testKitchenAppliance.getNamePolish()).isEqualTo(DEFAULT_NAME_POLISH);
        assertThat(testKitchenAppliance.getNameEnglish()).isEqualTo(DEFAULT_NAME_ENGLISH);
    }

    @Test
    @Transactional
    public void createKitchenApplianceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kitchenApplianceRepository.findAll().size();

        // Create the KitchenAppliance with an existing ID
        kitchenAppliance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKitchenApplianceMockMvc.perform(post("/api/kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenAppliance)))
            .andExpect(status().isBadRequest());

        // Validate the KitchenAppliance in the database
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllKitchenAppliances() throws Exception {
        // Initialize the database
        kitchenApplianceRepository.saveAndFlush(kitchenAppliance);

        // Get all the kitchenApplianceList
        restKitchenApplianceMockMvc.perform(get("/api/kitchen-appliances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kitchenAppliance.getId().intValue())))
            .andExpect(jsonPath("$.[*].namePolish").value(hasItem(DEFAULT_NAME_POLISH.toString())))
            .andExpect(jsonPath("$.[*].nameEnglish").value(hasItem(DEFAULT_NAME_ENGLISH.toString())));
    }
    
    @Test
    @Transactional
    public void getKitchenAppliance() throws Exception {
        // Initialize the database
        kitchenApplianceRepository.saveAndFlush(kitchenAppliance);

        // Get the kitchenAppliance
        restKitchenApplianceMockMvc.perform(get("/api/kitchen-appliances/{id}", kitchenAppliance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kitchenAppliance.getId().intValue()))
            .andExpect(jsonPath("$.namePolish").value(DEFAULT_NAME_POLISH.toString()))
            .andExpect(jsonPath("$.nameEnglish").value(DEFAULT_NAME_ENGLISH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKitchenAppliance() throws Exception {
        // Get the kitchenAppliance
        restKitchenApplianceMockMvc.perform(get("/api/kitchen-appliances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKitchenAppliance() throws Exception {
        // Initialize the database
        kitchenApplianceService.save(kitchenAppliance);

        int databaseSizeBeforeUpdate = kitchenApplianceRepository.findAll().size();

        // Update the kitchenAppliance
        KitchenAppliance updatedKitchenAppliance = kitchenApplianceRepository.findById(kitchenAppliance.getId()).get();
        // Disconnect from session so that the updates on updatedKitchenAppliance are not directly saved in db
        em.detach(updatedKitchenAppliance);
        updatedKitchenAppliance
            .namePolish(UPDATED_NAME_POLISH)
            .nameEnglish(UPDATED_NAME_ENGLISH);

        restKitchenApplianceMockMvc.perform(put("/api/kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKitchenAppliance)))
            .andExpect(status().isOk());

        // Validate the KitchenAppliance in the database
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeUpdate);
        KitchenAppliance testKitchenAppliance = kitchenApplianceList.get(kitchenApplianceList.size() - 1);
        assertThat(testKitchenAppliance.getNamePolish()).isEqualTo(UPDATED_NAME_POLISH);
        assertThat(testKitchenAppliance.getNameEnglish()).isEqualTo(UPDATED_NAME_ENGLISH);
    }

    @Test
    @Transactional
    public void updateNonExistingKitchenAppliance() throws Exception {
        int databaseSizeBeforeUpdate = kitchenApplianceRepository.findAll().size();

        // Create the KitchenAppliance

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKitchenApplianceMockMvc.perform(put("/api/kitchen-appliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchenAppliance)))
            .andExpect(status().isBadRequest());

        // Validate the KitchenAppliance in the database
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKitchenAppliance() throws Exception {
        // Initialize the database
        kitchenApplianceService.save(kitchenAppliance);

        int databaseSizeBeforeDelete = kitchenApplianceRepository.findAll().size();

        // Delete the kitchenAppliance
        restKitchenApplianceMockMvc.perform(delete("/api/kitchen-appliances/{id}", kitchenAppliance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<KitchenAppliance> kitchenApplianceList = kitchenApplianceRepository.findAll();
        assertThat(kitchenApplianceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KitchenAppliance.class);
        KitchenAppliance kitchenAppliance1 = new KitchenAppliance();
        kitchenAppliance1.setId(1L);
        KitchenAppliance kitchenAppliance2 = new KitchenAppliance();
        kitchenAppliance2.setId(kitchenAppliance1.getId());
        assertThat(kitchenAppliance1).isEqualTo(kitchenAppliance2);
        kitchenAppliance2.setId(2L);
        assertThat(kitchenAppliance1).isNotEqualTo(kitchenAppliance2);
        kitchenAppliance1.setId(null);
        assertThat(kitchenAppliance1).isNotEqualTo(kitchenAppliance2);
    }
}
