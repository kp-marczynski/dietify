package pl.marczynski.dietify.mealplans.web.rest;
import pl.marczynski.dietify.mealplans.domain.MealDefinition;
import pl.marczynski.dietify.mealplans.service.MealDefinitionService;
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
 * REST controller for managing MealDefinition.
 */
@RestController
@RequestMapping("/api")
public class MealDefinitionResource {

    private final Logger log = LoggerFactory.getLogger(MealDefinitionResource.class);

    private static final String ENTITY_NAME = "mealDefinition";

    private final MealDefinitionService mealDefinitionService;

    public MealDefinitionResource(MealDefinitionService mealDefinitionService) {
        this.mealDefinitionService = mealDefinitionService;
    }

    /**
     * POST  /meal-definitions : Create a new mealDefinition.
     *
     * @param mealDefinition the mealDefinition to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealDefinition, or with status 400 (Bad Request) if the mealDefinition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-definitions")
    public ResponseEntity<MealDefinition> createMealDefinition(@Valid @RequestBody MealDefinition mealDefinition) throws URISyntaxException {
        log.debug("REST request to save MealDefinition : {}", mealDefinition);
        if (mealDefinition.getId() != null) {
            throw new BadRequestAlertException("A new mealDefinition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealDefinition result = mealDefinitionService.save(mealDefinition);
        return ResponseEntity.created(new URI("/api/meal-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meal-definitions : Updates an existing mealDefinition.
     *
     * @param mealDefinition the mealDefinition to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealDefinition,
     * or with status 400 (Bad Request) if the mealDefinition is not valid,
     * or with status 500 (Internal Server Error) if the mealDefinition couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-definitions")
    public ResponseEntity<MealDefinition> updateMealDefinition(@Valid @RequestBody MealDefinition mealDefinition) throws URISyntaxException {
        log.debug("REST request to update MealDefinition : {}", mealDefinition);
        if (mealDefinition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealDefinition result = mealDefinitionService.save(mealDefinition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealDefinition.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-definitions : get all the mealDefinitions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mealDefinitions in body
     */
    @GetMapping("/meal-definitions")
    public List<MealDefinition> getAllMealDefinitions() {
        log.debug("REST request to get all MealDefinitions");
        return mealDefinitionService.findAll();
    }

    /**
     * GET  /meal-definitions/:id : get the "id" mealDefinition.
     *
     * @param id the id of the mealDefinition to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealDefinition, or with status 404 (Not Found)
     */
    @GetMapping("/meal-definitions/{id}")
    public ResponseEntity<MealDefinition> getMealDefinition(@PathVariable Long id) {
        log.debug("REST request to get MealDefinition : {}", id);
        Optional<MealDefinition> mealDefinition = mealDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealDefinition);
    }

    /**
     * DELETE  /meal-definitions/:id : delete the "id" mealDefinition.
     *
     * @param id the id of the mealDefinition to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-definitions/{id}")
    public ResponseEntity<Void> deleteMealDefinition(@PathVariable Long id) {
        log.debug("REST request to delete MealDefinition : {}", id);
        mealDefinitionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
