package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import pl.marczynski.dietify.mealplans.service.MealPlanDayService;
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
 * REST controller for managing {@link pl.marczynski.dietify.mealplans.domain.MealPlanDay}.
 */
@RestController
@RequestMapping("/api")
public class MealPlanDayResource {

    private final Logger log = LoggerFactory.getLogger(MealPlanDayResource.class);

    private static final String ENTITY_NAME = "mealplansMealPlanDay";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealPlanDayService mealPlanDayService;

    public MealPlanDayResource(MealPlanDayService mealPlanDayService) {
        this.mealPlanDayService = mealPlanDayService;
    }

    /**
     * {@code POST  /meal-plan-days} : Create a new mealPlanDay.
     *
     * @param mealPlanDay the mealPlanDay to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealPlanDay, or with status {@code 400 (Bad Request)} if the mealPlanDay has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-plan-days")
    public ResponseEntity<MealPlanDay> createMealPlanDay(@Valid @RequestBody MealPlanDay mealPlanDay) throws URISyntaxException {
        log.debug("REST request to save MealPlanDay : {}", mealPlanDay);
        if (mealPlanDay.getId() != null) {
            throw new BadRequestAlertException("A new mealPlanDay cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealPlanDay result = mealPlanDayService.save(mealPlanDay);
        return ResponseEntity.created(new URI("/api/meal-plan-days/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-plan-days} : Updates an existing mealPlanDay.
     *
     * @param mealPlanDay the mealPlanDay to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealPlanDay,
     * or with status {@code 400 (Bad Request)} if the mealPlanDay is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealPlanDay couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-plan-days")
    public ResponseEntity<MealPlanDay> updateMealPlanDay(@Valid @RequestBody MealPlanDay mealPlanDay) throws URISyntaxException {
        log.debug("REST request to update MealPlanDay : {}", mealPlanDay);
        if (mealPlanDay.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealPlanDay result = mealPlanDayService.save(mealPlanDay);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealPlanDay.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-plan-days} : get all the mealPlanDays.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealPlanDays in body.
     */
    @GetMapping("/meal-plan-days")
    public List<MealPlanDay> getAllMealPlanDays() {
        log.debug("REST request to get all MealPlanDays");
        return mealPlanDayService.findAll();
    }

    /**
     * {@code GET  /meal-plan-days/:id} : get the "id" mealPlanDay.
     *
     * @param id the id of the mealPlanDay to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealPlanDay, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-plan-days/{id}")
    public ResponseEntity<MealPlanDay> getMealPlanDay(@PathVariable Long id) {
        log.debug("REST request to get MealPlanDay : {}", id);
        Optional<MealPlanDay> mealPlanDay = mealPlanDayService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealPlanDay);
    }

    /**
     * {@code DELETE  /meal-plan-days/:id} : delete the "id" mealPlanDay.
     *
     * @param id the id of the mealPlanDay to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-plan-days/{id}")
    public ResponseEntity<Void> deleteMealPlanDay(@PathVariable Long id) {
        log.debug("REST request to delete MealPlanDay : {}", id);
        mealPlanDayService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-plan-days?query=:query} : search for the mealPlanDay corresponding
     * to the query.
     *
     * @param query the query of the mealPlanDay search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-plan-days")
    public List<MealPlanDay> searchMealPlanDays(@RequestParam String query) {
        log.debug("REST request to search MealPlanDays for query {}", query);
        return mealPlanDayService.search(query);
    }

}
