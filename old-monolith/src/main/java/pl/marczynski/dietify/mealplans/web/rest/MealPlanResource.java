package pl.marczynski.dietify.mealplans.web.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.github.jhipster.web.util.ResponseUtil;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.marczynski.dietify.core.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.core.web.rest.util.HeaderUtil;
import pl.marczynski.dietify.core.web.rest.util.PaginationUtil;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.service.MealPlanService;
import pl.marczynski.dietify.mealplans.service.dto.MailableMealPlanDto;
import pl.marczynski.dietify.mealplans.service.dto.ShoplistDto;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MealPlan.
 */
@RestController
@RequestMapping("/api")
public class MealPlanResource {

    private final Logger log = LoggerFactory.getLogger(MealPlanResource.class);

    private static final String ENTITY_NAME = "mealPlan";

    private final MealPlanService mealPlanService;

    public MealPlanResource(MealPlanService mealPlanService) {
        this.mealPlanService = mealPlanService;
    }

    /**
     * POST  /meal-plans : Create a new mealPlan.
     *
     * @param mealPlan the mealPlan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealPlan, or with status 400 (Bad Request) if the mealPlan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-plans")
    public ResponseEntity<MealPlan> createMealPlan(@Valid @RequestBody MealPlan mealPlan) throws URISyntaxException {
        log.debug("REST request to save MealPlan : {}", mealPlan);
        if (mealPlan.getId() != null) {
            throw new BadRequestAlertException("A new mealPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealPlan result = mealPlanService.save(mealPlan);
        return ResponseEntity.created(new URI("/api/meal-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/meal-plans/send")
    public ResponseEntity<Void> sendMealPlan(@RequestBody MailableMealPlanDto mailableMealPlan) throws URISyntaxException, JsonProcessingException {
        log.debug("REST request to send MailableMealPlan : {}", mailableMealPlan);

        mealPlanService.send(mailableMealPlan);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/meal-plans/send-shoplist")
    public ResponseEntity<Void> sendShoplist(@RequestBody ShoplistDto shoplistDto) throws URISyntaxException, JsonProcessingException {
        log.debug("REST request to send shoplist : {}", shoplistDto);

        mealPlanService.sendShoplist(shoplistDto);
        return ResponseEntity.ok().build();
    }

    /**
     * PUT  /meal-plans : Updates an existing mealPlan.
     *
     * @param mealPlan the mealPlan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealPlan,
     * or with status 400 (Bad Request) if the mealPlan is not valid,
     * or with status 500 (Internal Server Error) if the mealPlan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-plans")
    public ResponseEntity<MealPlan> updateMealPlan(@Valid @RequestBody MealPlan mealPlan) throws URISyntaxException {
        log.debug("REST request to update MealPlan : {}", mealPlan);
        if (mealPlan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealPlan result = mealPlanService.save(mealPlan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealPlan.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-plans : get all the mealPlans.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mealPlans in body
     */
    @GetMapping("/meal-plans")
    public ResponseEntity<List<MealPlan>> getAllMealPlans(Pageable pageable) {
        log.debug("REST request to get a page of MealPlans");
        Page<MealPlan> page = mealPlanService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/meal-plans");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /meal-plans/:id : get the "id" mealPlan.
     *
     * @param id the id of the mealPlan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealPlan, or with status 404 (Not Found)
     */
    @GetMapping("/meal-plans/{id}")
    public ResponseEntity<MealPlan> getMealPlan(@PathVariable Long id) {
        log.debug("REST request to get MealPlan : {}", id);
        Optional<MealPlan> mealPlan = mealPlanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealPlan);
    }

    /**
     * DELETE  /meal-plans/:id : delete the "id" mealPlan.
     *
     * @param id the id of the mealPlan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-plans/{id}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable Long id) {
        log.debug("REST request to delete MealPlan : {}", id);
        try {
            mealPlanService.delete(id);
        } catch (NotFoundException e) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idNotExist");
        }
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
