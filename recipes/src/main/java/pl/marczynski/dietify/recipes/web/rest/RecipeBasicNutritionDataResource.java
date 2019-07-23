package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData;
import pl.marczynski.dietify.recipes.service.RecipeBasicNutritionDataService;
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
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData}.
 */
@RestController
@RequestMapping("/api")
public class RecipeBasicNutritionDataResource {

    private final Logger log = LoggerFactory.getLogger(RecipeBasicNutritionDataResource.class);

    private static final String ENTITY_NAME = "recipesRecipeBasicNutritionData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecipeBasicNutritionDataService recipeBasicNutritionDataService;

    public RecipeBasicNutritionDataResource(RecipeBasicNutritionDataService recipeBasicNutritionDataService) {
        this.recipeBasicNutritionDataService = recipeBasicNutritionDataService;
    }

    /**
     * {@code POST  /recipe-basic-nutrition-data} : Create a new recipeBasicNutritionData.
     *
     * @param recipeBasicNutritionData the recipeBasicNutritionData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recipeBasicNutritionData, or with status {@code 400 (Bad Request)} if the recipeBasicNutritionData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/recipe-basic-nutrition-data")
    public ResponseEntity<RecipeBasicNutritionData> createRecipeBasicNutritionData(@Valid @RequestBody RecipeBasicNutritionData recipeBasicNutritionData) throws URISyntaxException {
        log.debug("REST request to save RecipeBasicNutritionData : {}", recipeBasicNutritionData);
        if (recipeBasicNutritionData.getId() != null) {
            throw new BadRequestAlertException("A new recipeBasicNutritionData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecipeBasicNutritionData result = recipeBasicNutritionDataService.save(recipeBasicNutritionData);
        return ResponseEntity.created(new URI("/api/recipe-basic-nutrition-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /recipe-basic-nutrition-data} : Updates an existing recipeBasicNutritionData.
     *
     * @param recipeBasicNutritionData the recipeBasicNutritionData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recipeBasicNutritionData,
     * or with status {@code 400 (Bad Request)} if the recipeBasicNutritionData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recipeBasicNutritionData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/recipe-basic-nutrition-data")
    public ResponseEntity<RecipeBasicNutritionData> updateRecipeBasicNutritionData(@Valid @RequestBody RecipeBasicNutritionData recipeBasicNutritionData) throws URISyntaxException {
        log.debug("REST request to update RecipeBasicNutritionData : {}", recipeBasicNutritionData);
        if (recipeBasicNutritionData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecipeBasicNutritionData result = recipeBasicNutritionDataService.save(recipeBasicNutritionData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recipeBasicNutritionData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /recipe-basic-nutrition-data} : get all the recipeBasicNutritionData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recipeBasicNutritionData in body.
     */
    @GetMapping("/recipe-basic-nutrition-data")
    public List<RecipeBasicNutritionData> getAllRecipeBasicNutritionData() {
        log.debug("REST request to get all RecipeBasicNutritionData");
        return recipeBasicNutritionDataService.findAll();
    }

    /**
     * {@code GET  /recipe-basic-nutrition-data/:id} : get the "id" recipeBasicNutritionData.
     *
     * @param id the id of the recipeBasicNutritionData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recipeBasicNutritionData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/recipe-basic-nutrition-data/{id}")
    public ResponseEntity<RecipeBasicNutritionData> getRecipeBasicNutritionData(@PathVariable Long id) {
        log.debug("REST request to get RecipeBasicNutritionData : {}", id);
        Optional<RecipeBasicNutritionData> recipeBasicNutritionData = recipeBasicNutritionDataService.findOne(id);
        return ResponseUtil.wrapOrNotFound(recipeBasicNutritionData);
    }

    /**
     * {@code DELETE  /recipe-basic-nutrition-data/:id} : delete the "id" recipeBasicNutritionData.
     *
     * @param id the id of the recipeBasicNutritionData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/recipe-basic-nutrition-data/{id}")
    public ResponseEntity<Void> deleteRecipeBasicNutritionData(@PathVariable Long id) {
        log.debug("REST request to delete RecipeBasicNutritionData : {}", id);
        recipeBasicNutritionDataService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/recipe-basic-nutrition-data?query=:query} : search for the recipeBasicNutritionData corresponding
     * to the query.
     *
     * @param query the query of the recipeBasicNutritionData search.
     * @return the result of the search.
     */
    @GetMapping("/_search/recipe-basic-nutrition-data")
    public List<RecipeBasicNutritionData> searchRecipeBasicNutritionData(@RequestParam String query) {
        log.debug("REST request to search RecipeBasicNutritionData for query {}", query);
        return recipeBasicNutritionDataService.search(query);
    }

}
