package pl.marczynski.dietify.core.web.rest;

import pl.marczynski.dietify.appointments.web.rest.DieteticianResource;
import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.appointments.domain.Dietetician;
import pl.marczynski.dietify.appointments.repository.DieteticianRepository;
import pl.marczynski.dietify.appointments.service.DieteticianService;
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
 * Test class for the DieteticianResource REST controller.
 *
 * @see DieteticianResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class DieteticianResourceIntTest {

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    @Autowired
    private DieteticianRepository dieteticianRepository;

    @Autowired
    private DieteticianService dieteticianService;

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

    private MockMvc restDieteticianMockMvc;

    private Dietetician dietetician;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DieteticianResource dieteticianResource = new DieteticianResource(dieteticianService);
        this.restDieteticianMockMvc = MockMvcBuilders.standaloneSetup(dieteticianResource)
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
    public static Dietetician createEntity(EntityManager em) {
        Dietetician dietetician = new Dietetician()
            .userId(DEFAULT_USER_ID);
        return dietetician;
    }

    @Before
    public void initTest() {
        dietetician = createEntity(em);
    }

    @Test
    @Transactional
    public void createDietetician() throws Exception {
        int databaseSizeBeforeCreate = dieteticianRepository.findAll().size();

        // Create the Dietetician
        restDieteticianMockMvc.perform(post("/api/dieteticians")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietetician)))
            .andExpect(status().isCreated());

        // Validate the Dietetician in the database
        List<Dietetician> dieteticianList = dieteticianRepository.findAll();
        assertThat(dieteticianList).hasSize(databaseSizeBeforeCreate + 1);
        Dietetician testDietetician = dieteticianList.get(dieteticianList.size() - 1);
        assertThat(testDietetician.getUserId()).isEqualTo(DEFAULT_USER_ID);
    }

    @Test
    @Transactional
    public void createDieteticianWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dieteticianRepository.findAll().size();

        // Create the Dietetician with an existing ID
        dietetician.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDieteticianMockMvc.perform(post("/api/dieteticians")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietetician)))
            .andExpect(status().isBadRequest());

        // Validate the Dietetician in the database
        List<Dietetician> dieteticianList = dieteticianRepository.findAll();
        assertThat(dieteticianList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDieteticians() throws Exception {
        // Initialize the database
        dieteticianRepository.saveAndFlush(dietetician);

        // Get all the dieteticianList
        restDieteticianMockMvc.perform(get("/api/dieteticians?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dietetician.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getDietetician() throws Exception {
        // Initialize the database
        dieteticianRepository.saveAndFlush(dietetician);

        // Get the dietetician
        restDieteticianMockMvc.perform(get("/api/dieteticians/{id}", dietetician.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dietetician.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDietetician() throws Exception {
        // Get the dietetician
        restDieteticianMockMvc.perform(get("/api/dieteticians/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDietetician() throws Exception {
        // Initialize the database
        dieteticianService.save(dietetician);

        int databaseSizeBeforeUpdate = dieteticianRepository.findAll().size();

        // Update the dietetician
        Dietetician updatedDietetician = dieteticianRepository.findById(dietetician.getId()).get();
        // Disconnect from session so that the updates on updatedDietetician are not directly saved in db
        em.detach(updatedDietetician);
        updatedDietetician
            .userId(UPDATED_USER_ID);

        restDieteticianMockMvc.perform(put("/api/dieteticians")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDietetician)))
            .andExpect(status().isOk());

        // Validate the Dietetician in the database
        List<Dietetician> dieteticianList = dieteticianRepository.findAll();
        assertThat(dieteticianList).hasSize(databaseSizeBeforeUpdate);
        Dietetician testDietetician = dieteticianList.get(dieteticianList.size() - 1);
        assertThat(testDietetician.getUserId()).isEqualTo(UPDATED_USER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingDietetician() throws Exception {
        int databaseSizeBeforeUpdate = dieteticianRepository.findAll().size();

        // Create the Dietetician

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDieteticianMockMvc.perform(put("/api/dieteticians")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dietetician)))
            .andExpect(status().isBadRequest());

        // Validate the Dietetician in the database
        List<Dietetician> dieteticianList = dieteticianRepository.findAll();
        assertThat(dieteticianList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDietetician() throws Exception {
        // Initialize the database
        dieteticianService.save(dietetician);

        int databaseSizeBeforeDelete = dieteticianRepository.findAll().size();

        // Delete the dietetician
        restDieteticianMockMvc.perform(delete("/api/dieteticians/{id}", dietetician.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Dietetician> dieteticianList = dieteticianRepository.findAll();
        assertThat(dieteticianList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dietetician.class);
        Dietetician dietetician1 = new Dietetician();
        dietetician1.setId(1L);
        Dietetician dietetician2 = new Dietetician();
        dietetician2.setId(dietetician1.getId());
        assertThat(dietetician1).isEqualTo(dietetician2);
        dietetician2.setId(2L);
        assertThat(dietetician1).isNotEqualTo(dietetician2);
        dietetician1.setId(null);
        assertThat(dietetician1).isNotEqualTo(dietetician2);
    }
}
