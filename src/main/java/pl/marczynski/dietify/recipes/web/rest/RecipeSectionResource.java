package pl.marczynski.dietify.recipes.web.rest;
import pl.marczynski.dietify.recipes.domain.RecipeSection;
import pl.marczynski.dietify.recipes.service.RecipeSectionService;
import pl.marczynski.dietify.core.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.core.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RecipeSection.
 */
@RestController
@RequestMapping("/api")
public class RecipeSectionResource {

    private final Logger log = LoggerFactory.getLogger(RecipeSectionResource.class);

    private static final String ENTITY_NAME = "recipeSection";

    private final RecipeSectionService recipeSectionService;

    public RecipeSectionResource(RecipeSectionService recipeSectionService) {
        this.recipeSectionService = recipeSectionService;
    }

    /**
     * POST  /recipe-sections : Create a new recipeSection.
     *
     * @param recipeSection the recipeSection to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recipeSection, or with status 400 (Bad Request) if the recipeSection has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recipe-sections")
    public ResponseEntity<RecipeSection> createRecipeSection(@Valid @RequestBody RecipeSection recipeSection) throws URISyntaxException {
        log.debug("REST request to save RecipeSection : {}", recipeSection);
        if (recipeSection.getId() != null) {
            throw new BadRequestAlertException("A new recipeSection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecipeSection result = recipeSectionService.save(recipeSection);
        return ResponseEntity.created(new URI("/api/recipe-sections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recipe-sections : Updates an existing recipeSection.
     *
     * @param recipeSection the recipeSection to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recipeSection,
     * or with status 400 (Bad Request) if the recipeSection is not valid,
     * or with status 500 (Internal Server Error) if the recipeSection couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recipe-sections")
    public ResponseEntity<RecipeSection> updateRecipeSection(@Valid @RequestBody RecipeSection recipeSection) throws URISyntaxException {
        log.debug("REST request to update RecipeSection : {}", recipeSection);
        if (recipeSection.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecipeSection result = recipeSectionService.save(recipeSection);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recipeSection.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recipe-sections : get all the recipeSections.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recipeSections in body
     */
    @GetMapping("/recipe-sections")
    public List<RecipeSection> getAllRecipeSections() {
        log.debug("REST request to get all RecipeSections");
        return recipeSectionService.findAll();
    }

    /**
     * GET  /recipe-sections/:id : get the "id" recipeSection.
     *
     * @param id the id of the recipeSection to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recipeSection, or with status 404 (Not Found)
     */
    @GetMapping("/recipe-sections/{id}")
    public ResponseEntity<RecipeSection> getRecipeSection(@PathVariable Long id) {
        log.debug("REST request to get RecipeSection : {}", id);
        Optional<RecipeSection> recipeSection = recipeSectionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(recipeSection);
    }

    /**
     * DELETE  /recipe-sections/:id : delete the "id" recipeSection.
     *
     * @param id the id of the recipeSection to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recipe-sections/{id}")
    public ResponseEntity<Void> deleteRecipeSection(@PathVariable Long id) {
        log.debug("REST request to delete RecipeSection : {}", id);
        recipeSectionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
