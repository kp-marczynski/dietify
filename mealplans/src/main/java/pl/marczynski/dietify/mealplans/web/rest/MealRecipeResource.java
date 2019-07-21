package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.service.MealRecipeService;
import pl.marczynski.dietify.mealplans.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.mealplans.service.dto.MealRecipeDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.mealplans.domain.MealRecipe}.
 */
@RestController
@RequestMapping("/api")
public class MealRecipeResource {

    private final Logger log = LoggerFactory.getLogger(MealRecipeResource.class);

    private static final String ENTITY_NAME = "mealplansMealRecipe";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealRecipeService mealRecipeService;

    public MealRecipeResource(MealRecipeService mealRecipeService) {
        this.mealRecipeService = mealRecipeService;
    }

    /**
     * {@code POST  /meal-recipes} : Create a new mealRecipe.
     *
     * @param mealRecipeDTO the mealRecipeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealRecipeDTO, or with status {@code 400 (Bad Request)} if the mealRecipe has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-recipes")
    public ResponseEntity<MealRecipeDTO> createMealRecipe(@Valid @RequestBody MealRecipeDTO mealRecipeDTO) throws URISyntaxException {
        log.debug("REST request to save MealRecipe : {}", mealRecipeDTO);
        if (mealRecipeDTO.getId() != null) {
            throw new BadRequestAlertException("A new mealRecipe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealRecipeDTO result = mealRecipeService.save(mealRecipeDTO);
        return ResponseEntity.created(new URI("/api/meal-recipes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-recipes} : Updates an existing mealRecipe.
     *
     * @param mealRecipeDTO the mealRecipeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealRecipeDTO,
     * or with status {@code 400 (Bad Request)} if the mealRecipeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealRecipeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-recipes")
    public ResponseEntity<MealRecipeDTO> updateMealRecipe(@Valid @RequestBody MealRecipeDTO mealRecipeDTO) throws URISyntaxException {
        log.debug("REST request to update MealRecipe : {}", mealRecipeDTO);
        if (mealRecipeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealRecipeDTO result = mealRecipeService.save(mealRecipeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealRecipeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-recipes} : get all the mealRecipes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealRecipes in body.
     */
    @GetMapping("/meal-recipes")
    public List<MealRecipeDTO> getAllMealRecipes() {
        log.debug("REST request to get all MealRecipes");
        return mealRecipeService.findAll();
    }

    /**
     * {@code GET  /meal-recipes/:id} : get the "id" mealRecipe.
     *
     * @param id the id of the mealRecipeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealRecipeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-recipes/{id}")
    public ResponseEntity<MealRecipeDTO> getMealRecipe(@PathVariable Long id) {
        log.debug("REST request to get MealRecipe : {}", id);
        Optional<MealRecipeDTO> mealRecipeDTO = mealRecipeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealRecipeDTO);
    }

    /**
     * {@code DELETE  /meal-recipes/:id} : delete the "id" mealRecipe.
     *
     * @param id the id of the mealRecipeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-recipes/{id}")
    public ResponseEntity<Void> deleteMealRecipe(@PathVariable Long id) {
        log.debug("REST request to delete MealRecipe : {}", id);
        mealRecipeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-recipes?query=:query} : search for the mealRecipe corresponding
     * to the query.
     *
     * @param query the query of the mealRecipe search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-recipes")
    public List<MealRecipeDTO> searchMealRecipes(@RequestParam String query) {
        log.debug("REST request to search MealRecipes for query {}", query);
        return mealRecipeService.search(query);
    }

}
