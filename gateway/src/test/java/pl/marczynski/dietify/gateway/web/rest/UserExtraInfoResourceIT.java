package pl.marczynski.dietify.gateway.web.rest;

import pl.marczynski.dietify.gateway.GatewayApp;
import pl.marczynski.dietify.gateway.domain.UserExtraInfo;
import pl.marczynski.dietify.gateway.domain.User;
import pl.marczynski.dietify.gateway.repository.UserExtraInfoRepository;
import pl.marczynski.dietify.gateway.repository.search.UserExtraInfoSearchRepository;
import pl.marczynski.dietify.gateway.service.UserExtraInfoService;
import pl.marczynski.dietify.gateway.service.dto.UserExtraInfoDTO;
import pl.marczynski.dietify.gateway.service.mapper.UserExtraInfoMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static pl.marczynski.dietify.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import pl.marczynski.dietify.gateway.domain.enumeration.Gender;
/**
 * Integration tests for the {@Link UserExtraInfoResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
public class UserExtraInfoResourceIT {

    private static final Gender DEFAULT_GENDER = Gender.FEMALE;
    private static final Gender UPDATED_GENDER = Gender.MALE;

    private static final LocalDate DEFAULT_DATE_OF_BIRTH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_BIRTH = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_STREET_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_PERSONAL_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_PERSONAL_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private UserExtraInfoRepository userExtraInfoRepository;

    @Autowired
    private UserExtraInfoMapper userExtraInfoMapper;

    @Autowired
    private UserExtraInfoService userExtraInfoService;

    /**
     * This repository is mocked in the pl.marczynski.dietify.gateway.repository.search test package.
     *
     * @see pl.marczynski.dietify.gateway.repository.search.UserExtraInfoSearchRepositoryMockConfiguration
     */
    @Autowired
    private UserExtraInfoSearchRepository mockUserExtraInfoSearchRepository;

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

    private MockMvc restUserExtraInfoMockMvc;

    private UserExtraInfo userExtraInfo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserExtraInfoResource userExtraInfoResource = new UserExtraInfoResource(userExtraInfoService);
        this.restUserExtraInfoMockMvc = MockMvcBuilders.standaloneSetup(userExtraInfoResource)
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
    public static UserExtraInfo createEntity(EntityManager em) {
        UserExtraInfo userExtraInfo = new UserExtraInfo();
        userExtraInfo.setGender(DEFAULT_GENDER);
        userExtraInfo.setDateOfBirth(DEFAULT_DATE_OF_BIRTH);
        userExtraInfo.setPhoneNumber(DEFAULT_PHONE_NUMBER);
        userExtraInfo.setStreetAddress(DEFAULT_STREET_ADDRESS);
        userExtraInfo.setPostalCode(DEFAULT_POSTAL_CODE);
        userExtraInfo.setCity(DEFAULT_CITY);
        userExtraInfo.setCountry(DEFAULT_COUNTRY);
        userExtraInfo.setPersonalDescription(DEFAULT_PERSONAL_DESCRIPTION);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        userExtraInfo.setUser(user);
        return userExtraInfo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserExtraInfo createUpdatedEntity(EntityManager em) {
        UserExtraInfo userExtraInfo = new UserExtraInfo();
        userExtraInfo.setGender(UPDATED_GENDER);
        userExtraInfo.setDateOfBirth(UPDATED_DATE_OF_BIRTH);
        userExtraInfo.setPhoneNumber(UPDATED_PHONE_NUMBER);
        userExtraInfo.setStreetAddress(UPDATED_STREET_ADDRESS);
        userExtraInfo.setPostalCode(UPDATED_POSTAL_CODE);
        userExtraInfo.setCity(UPDATED_CITY);
        userExtraInfo.setCountry(UPDATED_COUNTRY);
        userExtraInfo.setPersonalDescription(UPDATED_PERSONAL_DESCRIPTION);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        userExtraInfo.setUser(user);
        return userExtraInfo;
    }

    @BeforeEach
    public void initTest() {
        userExtraInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserExtraInfo() throws Exception {
        int databaseSizeBeforeCreate = userExtraInfoRepository.findAll().size();

        // Create the UserExtraInfo
        UserExtraInfoDTO userExtraInfoDTO = userExtraInfoMapper.toDto(userExtraInfo);
        restUserExtraInfoMockMvc.perform(post("/api/user-extra-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtraInfoDTO)))
            .andExpect(status().isCreated());

        // Validate the UserExtraInfo in the database
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeCreate + 1);
        UserExtraInfo testUserExtraInfo = userExtraInfoList.get(userExtraInfoList.size() - 1);
        assertThat(testUserExtraInfo.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testUserExtraInfo.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
        assertThat(testUserExtraInfo.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testUserExtraInfo.getStreetAddress()).isEqualTo(DEFAULT_STREET_ADDRESS);
        assertThat(testUserExtraInfo.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testUserExtraInfo.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testUserExtraInfo.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testUserExtraInfo.getPersonalDescription()).isEqualTo(DEFAULT_PERSONAL_DESCRIPTION);

        // Validate the UserExtraInfo in Elasticsearch
        verify(mockUserExtraInfoSearchRepository, times(1)).save(testUserExtraInfo);
    }

    @Test
    @Transactional
    public void createUserExtraInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userExtraInfoRepository.findAll().size();

        // Create the UserExtraInfo with an existing ID
        userExtraInfo.setId(1L);
        UserExtraInfoDTO userExtraInfoDTO = userExtraInfoMapper.toDto(userExtraInfo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserExtraInfoMockMvc.perform(post("/api/user-extra-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtraInfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserExtraInfo in the database
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeCreate);

        // Validate the UserExtraInfo in Elasticsearch
        verify(mockUserExtraInfoSearchRepository, times(0)).save(userExtraInfo);
    }


    @Test
    @Transactional
    public void getAllUserExtraInfos() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);

        // Get all the userExtraInfoList
        restUserExtraInfoMockMvc.perform(get("/api/user-extra-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userExtraInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].personalDescription").value(hasItem(DEFAULT_PERSONAL_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getUserExtraInfo() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);

        // Get the userExtraInfo
        restUserExtraInfoMockMvc.perform(get("/api/user-extra-infos/{id}", userExtraInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userExtraInfo.getId().intValue()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.streetAddress").value(DEFAULT_STREET_ADDRESS.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.personalDescription").value(DEFAULT_PERSONAL_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserExtraInfo() throws Exception {
        // Get the userExtraInfo
        restUserExtraInfoMockMvc.perform(get("/api/user-extra-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserExtraInfo() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);

        int databaseSizeBeforeUpdate = userExtraInfoRepository.findAll().size();

        // Update the userExtraInfo
        UserExtraInfo updatedUserExtraInfo = userExtraInfoRepository.findById(userExtraInfo.getId()).get();
        // Disconnect from session so that the updates on updatedUserExtraInfo are not directly saved in db
        em.detach(updatedUserExtraInfo);
        updatedUserExtraInfo.setGender(UPDATED_GENDER);
        updatedUserExtraInfo.setDateOfBirth(UPDATED_DATE_OF_BIRTH);
        updatedUserExtraInfo.setPhoneNumber(UPDATED_PHONE_NUMBER);
        updatedUserExtraInfo.setStreetAddress(UPDATED_STREET_ADDRESS);
        updatedUserExtraInfo.setPostalCode(UPDATED_POSTAL_CODE);
        updatedUserExtraInfo.setCity(UPDATED_CITY);
        updatedUserExtraInfo.setCountry(UPDATED_COUNTRY);
        updatedUserExtraInfo.setPersonalDescription(UPDATED_PERSONAL_DESCRIPTION);
        UserExtraInfoDTO userExtraInfoDTO = userExtraInfoMapper.toDto(updatedUserExtraInfo);

        restUserExtraInfoMockMvc.perform(put("/api/user-extra-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtraInfoDTO)))
            .andExpect(status().isOk());

        // Validate the UserExtraInfo in the database
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeUpdate);
        UserExtraInfo testUserExtraInfo = userExtraInfoList.get(userExtraInfoList.size() - 1);
        assertThat(testUserExtraInfo.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testUserExtraInfo.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
        assertThat(testUserExtraInfo.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testUserExtraInfo.getStreetAddress()).isEqualTo(UPDATED_STREET_ADDRESS);
        assertThat(testUserExtraInfo.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testUserExtraInfo.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testUserExtraInfo.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testUserExtraInfo.getPersonalDescription()).isEqualTo(UPDATED_PERSONAL_DESCRIPTION);

        // Validate the UserExtraInfo in Elasticsearch
        verify(mockUserExtraInfoSearchRepository, times(1)).save(testUserExtraInfo);
    }

    @Test
    @Transactional
    public void updateNonExistingUserExtraInfo() throws Exception {
        int databaseSizeBeforeUpdate = userExtraInfoRepository.findAll().size();

        // Create the UserExtraInfo
        UserExtraInfoDTO userExtraInfoDTO = userExtraInfoMapper.toDto(userExtraInfo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserExtraInfoMockMvc.perform(put("/api/user-extra-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtraInfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserExtraInfo in the database
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the UserExtraInfo in Elasticsearch
        verify(mockUserExtraInfoSearchRepository, times(0)).save(userExtraInfo);
    }

    @Test
    @Transactional
    public void deleteUserExtraInfo() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);

        int databaseSizeBeforeDelete = userExtraInfoRepository.findAll().size();

        // Delete the userExtraInfo
        restUserExtraInfoMockMvc.perform(delete("/api/user-extra-infos/{id}", userExtraInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the UserExtraInfo in Elasticsearch
        verify(mockUserExtraInfoSearchRepository, times(1)).deleteById(userExtraInfo.getId());
    }

    @Test
    @Transactional
    public void searchUserExtraInfo() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);
        when(mockUserExtraInfoSearchRepository.search(queryStringQuery("id:" + userExtraInfo.getId())))
            .thenReturn(Collections.singletonList(userExtraInfo));
        // Search the userExtraInfo
        restUserExtraInfoMockMvc.perform(get("/api/_search/user-extra-infos?query=id:" + userExtraInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userExtraInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].personalDescription").value(hasItem(DEFAULT_PERSONAL_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserExtraInfo.class);
        UserExtraInfo userExtraInfo1 = new UserExtraInfo();
        userExtraInfo1.setId(1L);
        UserExtraInfo userExtraInfo2 = new UserExtraInfo();
        userExtraInfo2.setId(userExtraInfo1.getId());
        assertThat(userExtraInfo1).isEqualTo(userExtraInfo2);
        userExtraInfo2.setId(2L);
        assertThat(userExtraInfo1).isNotEqualTo(userExtraInfo2);
        userExtraInfo1.setId(null);
        assertThat(userExtraInfo1).isNotEqualTo(userExtraInfo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserExtraInfoDTO.class);
        UserExtraInfoDTO userExtraInfoDTO1 = new UserExtraInfoDTO();
        userExtraInfoDTO1.setId(1L);
        UserExtraInfoDTO userExtraInfoDTO2 = new UserExtraInfoDTO();
        assertThat(userExtraInfoDTO1).isNotEqualTo(userExtraInfoDTO2);
        userExtraInfoDTO2.setId(userExtraInfoDTO1.getId());
        assertThat(userExtraInfoDTO1).isEqualTo(userExtraInfoDTO2);
        userExtraInfoDTO2.setId(2L);
        assertThat(userExtraInfoDTO1).isNotEqualTo(userExtraInfoDTO2);
        userExtraInfoDTO1.setId(null);
        assertThat(userExtraInfoDTO1).isNotEqualTo(userExtraInfoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userExtraInfoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userExtraInfoMapper.fromId(null)).isNull();
    }
}
