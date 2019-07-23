package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.domain.RecipeSection;
import pl.marczynski.dietify.recipes.service.RecipeSectionService;
import pl.marczynski.dietify.recipes.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.RecipeSection}.
 */
@RestController
@RequestMapping("/api")
public class RecipeSectionResource {

    private final Logger log = LoggerFactory.getLogger(RecipeSectionResource.class);

    private static final String ENTITY_NAME = "recipesRecipeSection";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecipeSectionService recipeSectionService;

    public RecipeSectionResource(RecipeSectionService recipeSectionService) {
        this.recipeSectionService = recipeSectionService;
    }

    /**
     * {@code POST  /recipe-sections} : Create a new recipeSection.
     *
     * @param recipeSection the recipeSection to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recipeSection, or with status {@code 400 (Bad Request)} if the recipeSection has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/recipe-sections")
    public ResponseEntity<RecipeSection> createRecipeSection(@Valid @RequestBody RecipeSection recipeSection) throws URISyntaxException {
        log.debug("REST request to save RecipeSection : {}", recipeSection);
        if (recipeSection.getId() != null) {
            throw new BadRequestAlertException("A new recipeSection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecipeSection result = recipeSectionService.save(recipeSection);
        return ResponseEntity.created(new URI("/api/recipe-sections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /recipe-sections} : Updates an existing recipeSection.
     *
     * @param recipeSection the recipeSection to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recipeSection,
     * or with status {@code 400 (Bad Request)} if the recipeSection is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recipeSection couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/recipe-sections")
    public ResponseEntity<RecipeSection> updateRecipeSection(@Valid @RequestBody RecipeSection recipeSection) throws URISyntaxException {
        log.debug("REST request to update RecipeSection : {}", recipeSection);
        if (recipeSection.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecipeSection result = recipeSectionService.save(recipeSection);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recipeSection.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /recipe-sections} : get all the recipeSections.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recipeSections in body.
     */
    @GetMapping("/recipe-sections")
    public List<RecipeSection> getAllRecipeSections() {
        log.debug("REST request to get all RecipeSections");
        return recipeSectionService.findAll();
    }

    /**
     * {@code GET  /recipe-sections/:id} : get the "id" recipeSection.
     *
     * @param id the id of the recipeSection to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recipeSection, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/recipe-sections/{id}")
    public ResponseEntity<RecipeSection> getRecipeSection(@PathVariable Long id) {
        log.debug("REST request to get RecipeSection : {}", id);
        Optional<RecipeSection> recipeSection = recipeSectionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(recipeSection);
    }

    /**
     * {@code DELETE  /recipe-sections/:id} : delete the "id" recipeSection.
     *
     * @param id the id of the recipeSection to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/recipe-sections/{id}")
    public ResponseEntity<Void> deleteRecipeSection(@PathVariable Long id) {
        log.debug("REST request to delete RecipeSection : {}", id);
        recipeSectionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/recipe-sections?query=:query} : search for the recipeSection corresponding
     * to the query.
     *
     * @param query the query of the recipeSection search.
     * @return the result of the search.
     */
    @GetMapping("/_search/recipe-sections")
    public List<RecipeSection> searchRecipeSections(@RequestParam String query) {
        log.debug("REST request to search RecipeSections for query {}", query);
        return recipeSectionService.search(query);
    }

}
