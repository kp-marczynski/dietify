package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet;
import pl.marczynski.dietify.mealplans.service.MealPlanSuitableForDietService;
import pl.marczynski.dietify.mealplans.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet}.
 */
@RestController
@RequestMapping("/api")
public class MealPlanSuitableForDietResource {

    private final Logger log = LoggerFactory.getLogger(MealPlanSuitableForDietResource.class);

    private static final String ENTITY_NAME = "mealplansMealPlanSuitableForDiet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealPlanSuitableForDietService mealPlanSuitableForDietService;

    public MealPlanSuitableForDietResource(MealPlanSuitableForDietService mealPlanSuitableForDietService) {
        this.mealPlanSuitableForDietService = mealPlanSuitableForDietService;
    }

    /**
     * {@code POST  /meal-plan-suitable-for-diets} : Create a new mealPlanSuitableForDiet.
     *
     * @param mealPlanSuitableForDiet the mealPlanSuitableForDiet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealPlanSuitableForDiet, or with status {@code 400 (Bad Request)} if the mealPlanSuitableForDiet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-plan-suitable-for-diets")
    public ResponseEntity<MealPlanSuitableForDiet> createMealPlanSuitableForDiet(@Valid @RequestBody MealPlanSuitableForDiet mealPlanSuitableForDiet) throws URISyntaxException {
        log.debug("REST request to save MealPlanSuitableForDiet : {}", mealPlanSuitableForDiet);
        if (mealPlanSuitableForDiet.getId() != null) {
            throw new BadRequestAlertException("A new mealPlanSuitableForDiet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealPlanSuitableForDiet result = mealPlanSuitableForDietService.save(mealPlanSuitableForDiet);
        return ResponseEntity.created(new URI("/api/meal-plan-suitable-for-diets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-plan-suitable-for-diets} : Updates an existing mealPlanSuitableForDiet.
     *
     * @param mealPlanSuitableForDiet the mealPlanSuitableForDiet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealPlanSuitableForDiet,
     * or with status {@code 400 (Bad Request)} if the mealPlanSuitableForDiet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealPlanSuitableForDiet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-plan-suitable-for-diets")
    public ResponseEntity<MealPlanSuitableForDiet> updateMealPlanSuitableForDiet(@Valid @RequestBody MealPlanSuitableForDiet mealPlanSuitableForDiet) throws URISyntaxException {
        log.debug("REST request to update MealPlanSuitableForDiet : {}", mealPlanSuitableForDiet);
        if (mealPlanSuitableForDiet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealPlanSuitableForDiet result = mealPlanSuitableForDietService.save(mealPlanSuitableForDiet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealPlanSuitableForDiet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-plan-suitable-for-diets} : get all the mealPlanSuitableForDiets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealPlanSuitableForDiets in body.
     */
    @GetMapping("/meal-plan-suitable-for-diets")
    public List<MealPlanSuitableForDiet> getAllMealPlanSuitableForDiets() {
        log.debug("REST request to get all MealPlanSuitableForDiets");
        return mealPlanSuitableForDietService.findAll();
    }

    /**
     * {@code GET  /meal-plan-suitable-for-diets/:id} : get the "id" mealPlanSuitableForDiet.
     *
     * @param id the id of the mealPlanSuitableForDiet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealPlanSuitableForDiet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-plan-suitable-for-diets/{id}")
    public ResponseEntity<MealPlanSuitableForDiet> getMealPlanSuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to get MealPlanSuitableForDiet : {}", id);
        Optional<MealPlanSuitableForDiet> mealPlanSuitableForDiet = mealPlanSuitableForDietService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealPlanSuitableForDiet);
    }

    /**
     * {@code DELETE  /meal-plan-suitable-for-diets/:id} : delete the "id" mealPlanSuitableForDiet.
     *
     * @param id the id of the mealPlanSuitableForDiet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-plan-suitable-for-diets/{id}")
    public ResponseEntity<Void> deleteMealPlanSuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to delete MealPlanSuitableForDiet : {}", id);
        mealPlanSuitableForDietService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-plan-suitable-for-diets?query=:query} : search for the mealPlanSuitableForDiet corresponding
     * to the query.
     *
     * @param query the query of the mealPlanSuitableForDiet search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-plan-suitable-for-diets")
    public List<MealPlanSuitableForDiet> searchMealPlanSuitableForDiets(@RequestParam String query) {
        log.debug("REST request to search MealPlanSuitableForDiets for query {}", query);
        return mealPlanSuitableForDietService.search(query);
    }

}
