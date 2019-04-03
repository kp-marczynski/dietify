package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.core.DietifyApp;

import pl.marczynski.dietify.core.web.rest.TestUtil;
import pl.marczynski.dietify.recipes.domain.RecipeSection;
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.domain.ProductPortion;
import pl.marczynski.dietify.recipes.repository.RecipeSectionRepository;
import pl.marczynski.dietify.recipes.service.RecipeSectionService;
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
 * Test class for the RecipeSectionResource REST controller.
 *
 * @see RecipeSectionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class RecipeSectionResourceIntTest {

    private static final String DEFAULT_SECTION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SECTION_NAME = "BBBBBBBBBB";

    @Autowired
    private RecipeSectionRepository recipeSectionRepository;

    @Autowired
    private RecipeSectionService recipeSectionService;

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

    private MockMvc restRecipeSectionMockMvc;

    private RecipeSection recipeSection;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecipeSectionResource recipeSectionResource = new RecipeSectionResource(recipeSectionService);
        this.restRecipeSectionMockMvc = MockMvcBuilders.standaloneSetup(recipeSectionResource)
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
    public static RecipeSection createEntity(EntityManager em) {
        RecipeSection recipeSection = new RecipeSection()
            .sectionName(DEFAULT_SECTION_NAME);
        // Add required entity
        Recipe recipe = RecipeResourceIntTest.createEntity(em);
        em.persist(recipe);
        em.flush();
        recipeSection.setRecipe(recipe);
        // Add required entity
        ProductPortion productPortion = ProductPortionResourceIntTest.createEntity(em);
        em.persist(productPortion);
        em.flush();
        recipeSection.getProductPortions().add(productPortion);
        return recipeSection;
    }

    @Before
    public void initTest() {
        recipeSection = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecipeSection() throws Exception {
        int databaseSizeBeforeCreate = recipeSectionRepository.findAll().size();

        // Create the RecipeSection
        restRecipeSectionMockMvc.perform(post("/api/recipe-sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeSection)))
            .andExpect(status().isCreated());

        // Validate the RecipeSection in the database
        List<RecipeSection> recipeSectionList = recipeSectionRepository.findAll();
        assertThat(recipeSectionList).hasSize(databaseSizeBeforeCreate + 1);
        RecipeSection testRecipeSection = recipeSectionList.get(recipeSectionList.size() - 1);
        assertThat(testRecipeSection.getSectionName()).isEqualTo(DEFAULT_SECTION_NAME);
    }

    @Test
    @Transactional
    public void createRecipeSectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipeSectionRepository.findAll().size();

        // Create the RecipeSection with an existing ID
        recipeSection.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipeSectionMockMvc.perform(post("/api/recipe-sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeSection)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeSection in the database
        List<RecipeSection> recipeSectionList = recipeSectionRepository.findAll();
        assertThat(recipeSectionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRecipeSections() throws Exception {
        // Initialize the database
        recipeSectionRepository.saveAndFlush(recipeSection);

        // Get all the recipeSectionList
        restRecipeSectionMockMvc.perform(get("/api/recipe-sections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeSection.getId().intValue())))
            .andExpect(jsonPath("$.[*].sectionName").value(hasItem(DEFAULT_SECTION_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getRecipeSection() throws Exception {
        // Initialize the database
        recipeSectionRepository.saveAndFlush(recipeSection);

        // Get the recipeSection
        restRecipeSectionMockMvc.perform(get("/api/recipe-sections/{id}", recipeSection.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recipeSection.getId().intValue()))
            .andExpect(jsonPath("$.sectionName").value(DEFAULT_SECTION_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRecipeSection() throws Exception {
        // Get the recipeSection
        restRecipeSectionMockMvc.perform(get("/api/recipe-sections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipeSection() throws Exception {
        // Initialize the database
        recipeSectionService.save(recipeSection);

        int databaseSizeBeforeUpdate = recipeSectionRepository.findAll().size();

        // Update the recipeSection
        RecipeSection updatedRecipeSection = recipeSectionRepository.findById(recipeSection.getId()).get();
        // Disconnect from session so that the updates on updatedRecipeSection are not directly saved in db
        em.detach(updatedRecipeSection);
        updatedRecipeSection
            .sectionName(UPDATED_SECTION_NAME);

        restRecipeSectionMockMvc.perform(put("/api/recipe-sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecipeSection)))
            .andExpect(status().isOk());

        // Validate the RecipeSection in the database
        List<RecipeSection> recipeSectionList = recipeSectionRepository.findAll();
        assertThat(recipeSectionList).hasSize(databaseSizeBeforeUpdate);
        RecipeSection testRecipeSection = recipeSectionList.get(recipeSectionList.size() - 1);
        assertThat(testRecipeSection.getSectionName()).isEqualTo(UPDATED_SECTION_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRecipeSection() throws Exception {
        int databaseSizeBeforeUpdate = recipeSectionRepository.findAll().size();

        // Create the RecipeSection

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecipeSectionMockMvc.perform(put("/api/recipe-sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeSection)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeSection in the database
        List<RecipeSection> recipeSectionList = recipeSectionRepository.findAll();
        assertThat(recipeSectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRecipeSection() throws Exception {
        // Initialize the database
        recipeSectionService.save(recipeSection);

        int databaseSizeBeforeDelete = recipeSectionRepository.findAll().size();

        // Delete the recipeSection
        restRecipeSectionMockMvc.perform(delete("/api/recipe-sections/{id}", recipeSection.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RecipeSection> recipeSectionList = recipeSectionRepository.findAll();
        assertThat(recipeSectionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecipeSection.class);
        RecipeSection recipeSection1 = new RecipeSection();
        recipeSection1.setId(1L);
        RecipeSection recipeSection2 = new RecipeSection();
        recipeSection2.setId(recipeSection1.getId());
        assertThat(recipeSection1).isEqualTo(recipeSection2);
        recipeSection2.setId(2L);
        assertThat(recipeSection1).isNotEqualTo(recipeSection2);
        recipeSection1.setId(null);
        assertThat(recipeSection1).isNotEqualTo(recipeSection2);
    }
}
