package pl.marczynski.dietify.gateway.web.rest;

import pl.marczynski.dietify.gateway.GatewayApp;
import pl.marczynski.dietify.gateway.domain.LandingPageCard;
import pl.marczynski.dietify.gateway.repository.LandingPageCardRepository;
import pl.marczynski.dietify.gateway.repository.search.LandingPageCardSearchRepository;
import pl.marczynski.dietify.gateway.service.LandingPageCardService;
import pl.marczynski.dietify.gateway.service.dto.LandingPageCardDTO;
import pl.marczynski.dietify.gateway.service.mapper.LandingPageCardMapper;
import pl.marczynski.dietify.gateway.web.rest.errors.ExceptionTranslator;

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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static pl.marczynski.dietify.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link LandingPageCardResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
public class LandingPageCardResourceIT {

    private static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    private static final Integer UPDATED_ORDINAL_NUMBER = 2;

    private static final String DEFAULT_HTML_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_HTML_CONTENT = "BBBBBBBBBB";

    @Autowired
    private LandingPageCardRepository landingPageCardRepository;

    @Autowired
    private LandingPageCardMapper landingPageCardMapper;

    @Autowired
    private LandingPageCardService landingPageCardService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.gateway.repository.search test package.
     *
     * @see pl.marczynski.dietify.gateway.repository.search.LandingPageCardSearchRepositoryMockConfiguration
     */
    @Autowired
    private LandingPageCardSearchRepository mockLandingPageCardSearchRepository;

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

    private MockMvc restLandingPageCardMockMvc;

    private LandingPageCard landingPageCard;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LandingPageCardResource landingPageCardResource = new LandingPageCardResource(landingPageCardService);
        this.restLandingPageCardMockMvc = MockMvcBuilders.standaloneSetup(landingPageCardResource)
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
    public static LandingPageCard createEntity(EntityManager em) {
        LandingPageCard landingPageCard = new LandingPageCard();
        landingPageCard.setOrdinalNumber(DEFAULT_ORDINAL_NUMBER);
        landingPageCard.setHtmlContent(DEFAULT_HTML_CONTENT);
        return landingPageCard;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LandingPageCard createUpdatedEntity(EntityManager em) {
        LandingPageCard landingPageCard = new LandingPageCard();
        landingPageCard.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        landingPageCard.setHtmlContent(UPDATED_HTML_CONTENT);
        return landingPageCard;
    }

    @BeforeEach
    public void initTest() {
        landingPageCard = createEntity(em);
    }

    @Test
    @Transactional
    public void createLandingPageCard() throws Exception {
        int databaseSizeBeforeCreate = landingPageCardRepository.findAll().size();

        // Create the LandingPageCard
        LandingPageCardDTO landingPageCardDTO = landingPageCardMapper.toDto(landingPageCard);
        restLandingPageCardMockMvc.perform(post("/api/landing-page-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(landingPageCardDTO)))
            .andExpect(status().isCreated());

        // Validate the LandingPageCard in the database
        List<LandingPageCard> landingPageCardList = landingPageCardRepository.findAll();
        assertThat(landingPageCardList).hasSize(databaseSizeBeforeCreate + 1);
        LandingPageCard testLandingPageCard = landingPageCardList.get(landingPageCardList.size() - 1);
        assertThat(testLandingPageCard.getOrdinalNumber()).isEqualTo(DEFAULT_ORDINAL_NUMBER);
        assertThat(testLandingPageCard.getHtmlContent()).isEqualTo(DEFAULT_HTML_CONTENT);

        // Validate the LandingPageCard in Elasticsearch
        verify(mockLandingPageCardSearchRepository, times(1)).save(testLandingPageCard);
    }

    @Test
    @Transactional
    public void createLandingPageCardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = landingPageCardRepository.findAll().size();

        // Create the LandingPageCard with an existing ID
        landingPageCard.setId(1L);
        LandingPageCardDTO landingPageCardDTO = landingPageCardMapper.toDto(landingPageCard);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLandingPageCardMockMvc.perform(post("/api/landing-page-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(landingPageCardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LandingPageCard in the database
        List<LandingPageCard> landingPageCardList = landingPageCardRepository.findAll();
        assertThat(landingPageCardList).hasSize(databaseSizeBeforeCreate);

        // Validate the LandingPageCard in Elasticsearch
        verify(mockLandingPageCardSearchRepository, times(0)).save(landingPageCard);
    }


    @Test
    @Transactional
    public void checkOrdinalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = landingPageCardRepository.findAll().size();
        // set the field null
        landingPageCard.setOrdinalNumber(null);

        // Create the LandingPageCard, which fails.
        LandingPageCardDTO landingPageCardDTO = landingPageCardMapper.toDto(landingPageCard);

        restLandingPageCardMockMvc.perform(post("/api/landing-page-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(landingPageCardDTO)))
            .andExpect(status().isBadRequest());

        List<LandingPageCard> landingPageCardList = landingPageCardRepository.findAll();
        assertThat(landingPageCardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLandingPageCards() throws Exception {
        // Initialize the database
        landingPageCardRepository.saveAndFlush(landingPageCard);

        // Get all the landingPageCardList
        restLandingPageCardMockMvc.perform(get("/api/landing-page-cards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(landingPageCard.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)))
            .andExpect(jsonPath("$.[*].htmlContent").value(hasItem(DEFAULT_HTML_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getLandingPageCard() throws Exception {
        // Initialize the database
        landingPageCardRepository.saveAndFlush(landingPageCard);

        // Get the landingPageCard
        restLandingPageCardMockMvc.perform(get("/api/landing-page-cards/{id}", landingPageCard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(landingPageCard.getId().intValue()))
            .andExpect(jsonPath("$.ordinalNumber").value(DEFAULT_ORDINAL_NUMBER))
            .andExpect(jsonPath("$.htmlContent").value(DEFAULT_HTML_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLandingPageCard() throws Exception {
        // Get the landingPageCard
        restLandingPageCardMockMvc.perform(get("/api/landing-page-cards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLandingPageCard() throws Exception {
        // Initialize the database
        landingPageCardRepository.saveAndFlush(landingPageCard);

        int databaseSizeBeforeUpdate = landingPageCardRepository.findAll().size();

        // Update the landingPageCard
        LandingPageCard updatedLandingPageCard = landingPageCardRepository.findById(landingPageCard.getId()).get();
        // Disconnect from session so that the updates on updatedLandingPageCard are not directly saved in db
        em.detach(updatedLandingPageCard);
        updatedLandingPageCard.setOrdinalNumber(UPDATED_ORDINAL_NUMBER);
        updatedLandingPageCard.setHtmlContent(UPDATED_HTML_CONTENT);
        LandingPageCardDTO landingPageCardDTO = landingPageCardMapper.toDto(updatedLandingPageCard);

        restLandingPageCardMockMvc.perform(put("/api/landing-page-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(landingPageCardDTO)))
            .andExpect(status().isOk());

        // Validate the LandingPageCard in the database
        List<LandingPageCard> landingPageCardList = landingPageCardRepository.findAll();
        assertThat(landingPageCardList).hasSize(databaseSizeBeforeUpdate);
        LandingPageCard testLandingPageCard = landingPageCardList.get(landingPageCardList.size() - 1);
        assertThat(testLandingPageCard.getOrdinalNumber()).isEqualTo(UPDATED_ORDINAL_NUMBER);
        assertThat(testLandingPageCard.getHtmlContent()).isEqualTo(UPDATED_HTML_CONTENT);

        // Validate the LandingPageCard in Elasticsearch
        verify(mockLandingPageCardSearchRepository, times(1)).save(testLandingPageCard);
    }

    @Test
    @Transactional
    public void updateNonExistingLandingPageCard() throws Exception {
        int databaseSizeBeforeUpdate = landingPageCardRepository.findAll().size();

        // Create the LandingPageCard
        LandingPageCardDTO landingPageCardDTO = landingPageCardMapper.toDto(landingPageCard);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLandingPageCardMockMvc.perform(put("/api/landing-page-cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(landingPageCardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LandingPageCard in the database
        List<LandingPageCard> landingPageCardList = landingPageCardRepository.findAll();
        assertThat(landingPageCardList).hasSize(databaseSizeBeforeUpdate);

        // Validate the LandingPageCard in Elasticsearch
        verify(mockLandingPageCardSearchRepository, times(0)).save(landingPageCard);
    }

    @Test
    @Transactional
    public void deleteLandingPageCard() throws Exception {
        // Initialize the database
        landingPageCardRepository.saveAndFlush(landingPageCard);

        int databaseSizeBeforeDelete = landingPageCardRepository.findAll().size();

        // Delete the landingPageCard
        restLandingPageCardMockMvc.perform(delete("/api/landing-page-cards/{id}", landingPageCard.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LandingPageCard> landingPageCardList = landingPageCardRepository.findAll();
        assertThat(landingPageCardList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the LandingPageCard in Elasticsearch
        verify(mockLandingPageCardSearchRepository, times(1)).deleteById(landingPageCard.getId());
    }

    @Test
    @Transactional
    public void searchLandingPageCard() throws Exception {
        // Initialize the database
        landingPageCardRepository.saveAndFlush(landingPageCard);
        when(mockLandingPageCardSearchRepository.search(queryStringQuery("id:" + landingPageCard.getId())))
            .thenReturn(Collections.singletonList(landingPageCard));
        // Search the landingPageCard
        restLandingPageCardMockMvc.perform(get("/api/_search/landing-page-cards?query=id:" + landingPageCard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(landingPageCard.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordinalNumber").value(hasItem(DEFAULT_ORDINAL_NUMBER)))
            .andExpect(jsonPath("$.[*].htmlContent").value(hasItem(DEFAULT_HTML_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LandingPageCard.class);
        LandingPageCard landingPageCard1 = new LandingPageCard();
        landingPageCard1.setId(1L);
        LandingPageCard landingPageCard2 = new LandingPageCard();
        landingPageCard2.setId(landingPageCard1.getId());
        assertThat(landingPageCard1).isEqualTo(landingPageCard2);
        landingPageCard2.setId(2L);
        assertThat(landingPageCard1).isNotEqualTo(landingPageCard2);
        landingPageCard1.setId(null);
        assertThat(landingPageCard1).isNotEqualTo(landingPageCard2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LandingPageCardDTO.class);
        LandingPageCardDTO landingPageCardDTO1 = new LandingPageCardDTO();
        landingPageCardDTO1.setId(1L);
        LandingPageCardDTO landingPageCardDTO2 = new LandingPageCardDTO();
        assertThat(landingPageCardDTO1).isNotEqualTo(landingPageCardDTO2);
        landingPageCardDTO2.setId(landingPageCardDTO1.getId());
        assertThat(landingPageCardDTO1).isEqualTo(landingPageCardDTO2);
        landingPageCardDTO2.setId(2L);
        assertThat(landingPageCardDTO1).isNotEqualTo(landingPageCardDTO2);
        landingPageCardDTO1.setId(null);
        assertThat(landingPageCardDTO1).isNotEqualTo(landingPageCardDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(landingPageCardMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(landingPageCardMapper.fromId(null)).isNull();
    }
}
