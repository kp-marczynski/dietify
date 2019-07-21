package pl.marczynski.dietify.mealplans.web.rest;
import pl.marczynski.dietify.mealplans.domain.MealPlanUnsuitableForDiet;
import pl.marczynski.dietify.mealplans.service.MealPlanUnsuitableForDietService;
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
 * REST controller for managing MealPlanUnsuitableForDiet.
 */
@RestController
@RequestMapping("/api")
public class MealPlanUnsuitableForDietResource {

    private final Logger log = LoggerFactory.getLogger(MealPlanUnsuitableForDietResource.class);

    private static final String ENTITY_NAME = "mealPlanUnsuitableForDiet";

    private final MealPlanUnsuitableForDietService mealPlanUnsuitableForDietService;

    public MealPlanUnsuitableForDietResource(MealPlanUnsuitableForDietService mealPlanUnsuitableForDietService) {
        this.mealPlanUnsuitableForDietService = mealPlanUnsuitableForDietService;
    }

    /**
     * POST  /meal-plan-unsuitable-for-diets : Create a new mealPlanUnsuitableForDiet.
     *
     * @param mealPlanUnsuitableForDiet the mealPlanUnsuitableForDiet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealPlanUnsuitableForDiet, or with status 400 (Bad Request) if the mealPlanUnsuitableForDiet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-plan-unsuitable-for-diets")
    public ResponseEntity<MealPlanUnsuitableForDiet> createMealPlanUnsuitableForDiet(@Valid @RequestBody MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet) throws URISyntaxException {
        log.debug("REST request to save MealPlanUnsuitableForDiet : {}", mealPlanUnsuitableForDiet);
        if (mealPlanUnsuitableForDiet.getId() != null) {
            throw new BadRequestAlertException("A new mealPlanUnsuitableForDiet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealPlanUnsuitableForDiet result = mealPlanUnsuitableForDietService.save(mealPlanUnsuitableForDiet);
        return ResponseEntity.created(new URI("/api/meal-plan-unsuitable-for-diets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meal-plan-unsuitable-for-diets : Updates an existing mealPlanUnsuitableForDiet.
     *
     * @param mealPlanUnsuitableForDiet the mealPlanUnsuitableForDiet to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealPlanUnsuitableForDiet,
     * or with status 400 (Bad Request) if the mealPlanUnsuitableForDiet is not valid,
     * or with status 500 (Internal Server Error) if the mealPlanUnsuitableForDiet couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-plan-unsuitable-for-diets")
    public ResponseEntity<MealPlanUnsuitableForDiet> updateMealPlanUnsuitableForDiet(@Valid @RequestBody MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet) throws URISyntaxException {
        log.debug("REST request to update MealPlanUnsuitableForDiet : {}", mealPlanUnsuitableForDiet);
        if (mealPlanUnsuitableForDiet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealPlanUnsuitableForDiet result = mealPlanUnsuitableForDietService.save(mealPlanUnsuitableForDiet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealPlanUnsuitableForDiet.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-plan-unsuitable-for-diets : get all the mealPlanUnsuitableForDiets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mealPlanUnsuitableForDiets in body
     */
    @GetMapping("/meal-plan-unsuitable-for-diets")
    public List<MealPlanUnsuitableForDiet> getAllMealPlanUnsuitableForDiets() {
        log.debug("REST request to get all MealPlanUnsuitableForDiets");
        return mealPlanUnsuitableForDietService.findAll();
    }

    /**
     * GET  /meal-plan-unsuitable-for-diets/:id : get the "id" mealPlanUnsuitableForDiet.
     *
     * @param id the id of the mealPlanUnsuitableForDiet to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealPlanUnsuitableForDiet, or with status 404 (Not Found)
     */
    @GetMapping("/meal-plan-unsuitable-for-diets/{id}")
    public ResponseEntity<MealPlanUnsuitableForDiet> getMealPlanUnsuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to get MealPlanUnsuitableForDiet : {}", id);
        Optional<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDiet = mealPlanUnsuitableForDietService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealPlanUnsuitableForDiet);
    }

    /**
     * DELETE  /meal-plan-unsuitable-for-diets/:id : delete the "id" mealPlanUnsuitableForDiet.
     *
     * @param id the id of the mealPlanUnsuitableForDiet to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-plan-unsuitable-for-diets/{id}")
    public ResponseEntity<Void> deleteMealPlanUnsuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to delete MealPlanUnsuitableForDiet : {}", id);
        mealPlanUnsuitableForDietService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
