package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.domain.RecipeUnsuitableForDiet;
import pl.marczynski.dietify.recipes.service.RecipeUnsuitableForDietService;
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
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.RecipeUnsuitableForDiet}.
 */
@RestController
@RequestMapping("/api")
public class RecipeUnsuitableForDietResource {

    private final Logger log = LoggerFactory.getLogger(RecipeUnsuitableForDietResource.class);

    private static final String ENTITY_NAME = "recipesRecipeUnsuitableForDiet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecipeUnsuitableForDietService recipeUnsuitableForDietService;

    public RecipeUnsuitableForDietResource(RecipeUnsuitableForDietService recipeUnsuitableForDietService) {
        this.recipeUnsuitableForDietService = recipeUnsuitableForDietService;
    }

    /**
     * {@code POST  /recipe-unsuitable-for-diets} : Create a new recipeUnsuitableForDiet.
     *
     * @param recipeUnsuitableForDiet the recipeUnsuitableForDiet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recipeUnsuitableForDiet, or with status {@code 400 (Bad Request)} if the recipeUnsuitableForDiet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/recipe-unsuitable-for-diets")
    public ResponseEntity<RecipeUnsuitableForDiet> createRecipeUnsuitableForDiet(@Valid @RequestBody RecipeUnsuitableForDiet recipeUnsuitableForDiet) throws URISyntaxException {
        log.debug("REST request to save RecipeUnsuitableForDiet : {}", recipeUnsuitableForDiet);
        if (recipeUnsuitableForDiet.getId() != null) {
            throw new BadRequestAlertException("A new recipeUnsuitableForDiet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecipeUnsuitableForDiet result = recipeUnsuitableForDietService.save(recipeUnsuitableForDiet);
        return ResponseEntity.created(new URI("/api/recipe-unsuitable-for-diets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /recipe-unsuitable-for-diets} : Updates an existing recipeUnsuitableForDiet.
     *
     * @param recipeUnsuitableForDiet the recipeUnsuitableForDiet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recipeUnsuitableForDiet,
     * or with status {@code 400 (Bad Request)} if the recipeUnsuitableForDiet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recipeUnsuitableForDiet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/recipe-unsuitable-for-diets")
    public ResponseEntity<RecipeUnsuitableForDiet> updateRecipeUnsuitableForDiet(@Valid @RequestBody RecipeUnsuitableForDiet recipeUnsuitableForDiet) throws URISyntaxException {
        log.debug("REST request to update RecipeUnsuitableForDiet : {}", recipeUnsuitableForDiet);
        if (recipeUnsuitableForDiet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecipeUnsuitableForDiet result = recipeUnsuitableForDietService.save(recipeUnsuitableForDiet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recipeUnsuitableForDiet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /recipe-unsuitable-for-diets} : get all the recipeUnsuitableForDiets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recipeUnsuitableForDiets in body.
     */
    @GetMapping("/recipe-unsuitable-for-diets")
    public List<RecipeUnsuitableForDiet> getAllRecipeUnsuitableForDiets() {
        log.debug("REST request to get all RecipeUnsuitableForDiets");
        return recipeUnsuitableForDietService.findAll();
    }

    /**
     * {@code GET  /recipe-unsuitable-for-diets/:id} : get the "id" recipeUnsuitableForDiet.
     *
     * @param id the id of the recipeUnsuitableForDiet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recipeUnsuitableForDiet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/recipe-unsuitable-for-diets/{id}")
    public ResponseEntity<RecipeUnsuitableForDiet> getRecipeUnsuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to get RecipeUnsuitableForDiet : {}", id);
        Optional<RecipeUnsuitableForDiet> recipeUnsuitableForDiet = recipeUnsuitableForDietService.findOne(id);
        return ResponseUtil.wrapOrNotFound(recipeUnsuitableForDiet);
    }

    /**
     * {@code DELETE  /recipe-unsuitable-for-diets/:id} : delete the "id" recipeUnsuitableForDiet.
     *
     * @param id the id of the recipeUnsuitableForDiet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/recipe-unsuitable-for-diets/{id}")
    public ResponseEntity<Void> deleteRecipeUnsuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to delete RecipeUnsuitableForDiet : {}", id);
        recipeUnsuitableForDietService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/recipe-unsuitable-for-diets?query=:query} : search for the recipeUnsuitableForDiet corresponding
     * to the query.
     *
     * @param query the query of the recipeUnsuitableForDiet search.
     * @return the result of the search.
     */
    @GetMapping("/_search/recipe-unsuitable-for-diets")
    public List<RecipeUnsuitableForDiet> searchRecipeUnsuitableForDiets(@RequestParam String query) {
        log.debug("REST request to search RecipeUnsuitableForDiets for query {}", query);
        return recipeUnsuitableForDietService.search(query);
    }

}
