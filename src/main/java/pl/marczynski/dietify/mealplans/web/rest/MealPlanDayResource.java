package pl.marczynski.dietify.mealplans.web.rest;
import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import pl.marczynski.dietify.mealplans.service.MealPlanDayService;
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
 * REST controller for managing MealPlanDay.
 */
@RestController
@RequestMapping("/api")
public class MealPlanDayResource {

    private final Logger log = LoggerFactory.getLogger(MealPlanDayResource.class);

    private static final String ENTITY_NAME = "mealPlanDay";

    private final MealPlanDayService mealPlanDayService;

    public MealPlanDayResource(MealPlanDayService mealPlanDayService) {
        this.mealPlanDayService = mealPlanDayService;
    }

    /**
     * POST  /meal-plan-days : Create a new mealPlanDay.
     *
     * @param mealPlanDay the mealPlanDay to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealPlanDay, or with status 400 (Bad Request) if the mealPlanDay has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-plan-days")
    public ResponseEntity<MealPlanDay> createMealPlanDay(@Valid @RequestBody MealPlanDay mealPlanDay) throws URISyntaxException {
        log.debug("REST request to save MealPlanDay : {}", mealPlanDay);
        if (mealPlanDay.getId() != null) {
            throw new BadRequestAlertException("A new mealPlanDay cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealPlanDay result = mealPlanDayService.save(mealPlanDay);
        return ResponseEntity.created(new URI("/api/meal-plan-days/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meal-plan-days : Updates an existing mealPlanDay.
     *
     * @param mealPlanDay the mealPlanDay to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealPlanDay,
     * or with status 400 (Bad Request) if the mealPlanDay is not valid,
     * or with status 500 (Internal Server Error) if the mealPlanDay couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-plan-days")
    public ResponseEntity<MealPlanDay> updateMealPlanDay(@Valid @RequestBody MealPlanDay mealPlanDay) throws URISyntaxException {
        log.debug("REST request to update MealPlanDay : {}", mealPlanDay);
        if (mealPlanDay.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealPlanDay result = mealPlanDayService.save(mealPlanDay);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealPlanDay.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-plan-days : get all the mealPlanDays.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mealPlanDays in body
     */
    @GetMapping("/meal-plan-days")
    public List<MealPlanDay> getAllMealPlanDays() {
        log.debug("REST request to get all MealPlanDays");
        return mealPlanDayService.findAll();
    }

    /**
     * GET  /meal-plan-days/:id : get the "id" mealPlanDay.
     *
     * @param id the id of the mealPlanDay to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealPlanDay, or with status 404 (Not Found)
     */
    @GetMapping("/meal-plan-days/{id}")
    public ResponseEntity<MealPlanDay> getMealPlanDay(@PathVariable Long id) {
        log.debug("REST request to get MealPlanDay : {}", id);
        Optional<MealPlanDay> mealPlanDay = mealPlanDayService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealPlanDay);
    }

    /**
     * DELETE  /meal-plan-days/:id : delete the "id" mealPlanDay.
     *
     * @param id the id of the mealPlanDay to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-plan-days/{id}")
    public ResponseEntity<Void> deleteMealPlanDay(@PathVariable Long id) {
        log.debug("REST request to delete MealPlanDay : {}", id);
        mealPlanDayService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
