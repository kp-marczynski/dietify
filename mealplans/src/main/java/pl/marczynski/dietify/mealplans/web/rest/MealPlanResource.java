package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.service.MealPlanService;
import pl.marczynski.dietify.mealplans.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
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
 * REST controller for managing {@link pl.marczynski.dietify.mealplans.domain.MealPlan}.
 */
@RestController
@RequestMapping("/api")
public class MealPlanResource {

    private final Logger log = LoggerFactory.getLogger(MealPlanResource.class);

    private static final String ENTITY_NAME = "mealplansMealPlan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealPlanService mealPlanService;

    public MealPlanResource(MealPlanService mealPlanService) {
        this.mealPlanService = mealPlanService;
    }

    /**
     * {@code POST  /meal-plans} : Create a new mealPlan.
     *
     * @param mealPlan the mealPlan to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealPlan, or with status {@code 400 (Bad Request)} if the mealPlan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-plans")
    public ResponseEntity<MealPlan> createMealPlan(@Valid @RequestBody MealPlan mealPlan) throws URISyntaxException {
        log.debug("REST request to save MealPlan : {}", mealPlan);
        if (mealPlan.getId() != null) {
            throw new BadRequestAlertException("A new mealPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealPlan result = mealPlanService.save(mealPlan);
        return ResponseEntity.created(new URI("/api/meal-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-plans} : Updates an existing mealPlan.
     *
     * @param mealPlan the mealPlan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealPlan,
     * or with status {@code 400 (Bad Request)} if the mealPlan is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealPlan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-plans")
    public ResponseEntity<MealPlan> updateMealPlan(@Valid @RequestBody MealPlan mealPlan) throws URISyntaxException {
        log.debug("REST request to update MealPlan : {}", mealPlan);
        if (mealPlan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealPlan result = mealPlanService.save(mealPlan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealPlan.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-plans/:id} : Change mealPlan to final
     *
     * @param id the mealPlan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealPlan,
     * or with status {@code 400 (Bad Request)} if the mealPlan is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealPlan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-plans/{id}")
    public ResponseEntity<Void> changeToFinal(@PathVariable Long id) throws URISyntaxException {
        log.debug("REST request to change mealPlan to final: {}", id);
        if (id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        mealPlanService.changeToFinal(id);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code GET  /meal-plans} : get all the mealPlans.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealPlans in body.
     */
    @GetMapping("/meal-plans")
    public ResponseEntity<List<MealPlan>> getAllMealPlans(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false) Long author) {
        log.debug("REST request to get a page of MealPlans");
        Page<MealPlan> page = mealPlanService.findAll(author, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /meal-plans/:id} : get the "id" mealPlan.
     *
     * @param id the id of the mealPlan to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealPlan, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-plans/{id}")
    public ResponseEntity<MealPlan> getMealPlan(@PathVariable Long id) {
        log.debug("REST request to get MealPlan : {}", id);
        Optional<MealPlan> mealPlan = mealPlanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealPlan);
    }

    /**
     * {@code DELETE  /meal-plans/:id} : delete the "id" mealPlan.
     *
     * @param id the id of the mealPlan to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-plans/{id}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable Long id) {
        log.debug("REST request to delete MealPlan : {}", id);
        mealPlanService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-plans?query=:query} : search for the mealPlan corresponding
     * to the query.
     *
     * @param query the query of the mealPlan search.
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-plans")
    public ResponseEntity<List<MealPlan>> searchMealPlans(@RequestParam String query, Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to search for a page of MealPlans for query {}", query);
        Page<MealPlan> page = mealPlanService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
