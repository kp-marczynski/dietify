package pl.marczynski.dietify.mealplans.web.rest;
import pl.marczynski.dietify.mealplans.domain.MealRecipe;
import pl.marczynski.dietify.mealplans.service.MealRecipeService;
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
 * REST controller for managing MealRecipe.
 */
@RestController
@RequestMapping("/api")
public class MealRecipeResource {

    private final Logger log = LoggerFactory.getLogger(MealRecipeResource.class);

    private static final String ENTITY_NAME = "mealRecipe";

    private final MealRecipeService mealRecipeService;

    public MealRecipeResource(MealRecipeService mealRecipeService) {
        this.mealRecipeService = mealRecipeService;
    }

    /**
     * POST  /meal-recipes : Create a new mealRecipe.
     *
     * @param mealRecipe the mealRecipe to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealRecipe, or with status 400 (Bad Request) if the mealRecipe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-recipes")
    public ResponseEntity<MealRecipe> createMealRecipe(@Valid @RequestBody MealRecipe mealRecipe) throws URISyntaxException {
        log.debug("REST request to save MealRecipe : {}", mealRecipe);
        if (mealRecipe.getId() != null) {
            throw new BadRequestAlertException("A new mealRecipe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealRecipe result = mealRecipeService.save(mealRecipe);
        return ResponseEntity.created(new URI("/api/meal-recipes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meal-recipes : Updates an existing mealRecipe.
     *
     * @param mealRecipe the mealRecipe to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealRecipe,
     * or with status 400 (Bad Request) if the mealRecipe is not valid,
     * or with status 500 (Internal Server Error) if the mealRecipe couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-recipes")
    public ResponseEntity<MealRecipe> updateMealRecipe(@Valid @RequestBody MealRecipe mealRecipe) throws URISyntaxException {
        log.debug("REST request to update MealRecipe : {}", mealRecipe);
        if (mealRecipe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealRecipe result = mealRecipeService.save(mealRecipe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealRecipe.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-recipes : get all the mealRecipes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mealRecipes in body
     */
    @GetMapping("/meal-recipes")
    public List<MealRecipe> getAllMealRecipes() {
        log.debug("REST request to get all MealRecipes");
        return mealRecipeService.findAll();
    }

    /**
     * GET  /meal-recipes/:id : get the "id" mealRecipe.
     *
     * @param id the id of the mealRecipe to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealRecipe, or with status 404 (Not Found)
     */
    @GetMapping("/meal-recipes/{id}")
    public ResponseEntity<MealRecipe> getMealRecipe(@PathVariable Long id) {
        log.debug("REST request to get MealRecipe : {}", id);
        Optional<MealRecipe> mealRecipe = mealRecipeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealRecipe);
    }

    /**
     * DELETE  /meal-recipes/:id : delete the "id" mealRecipe.
     *
     * @param id the id of the mealRecipe to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-recipes/{id}")
    public ResponseEntity<Void> deleteMealRecipe(@PathVariable Long id) {
        log.debug("REST request to delete MealRecipe : {}", id);
        mealRecipeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
