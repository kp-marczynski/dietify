package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.domain.MealDefinition;
import pl.marczynski.dietify.mealplans.service.MealDefinitionService;
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
 * REST controller for managing {@link pl.marczynski.dietify.mealplans.domain.MealDefinition}.
 */
@RestController
@RequestMapping("/api")
public class MealDefinitionResource {

    private final Logger log = LoggerFactory.getLogger(MealDefinitionResource.class);

    private static final String ENTITY_NAME = "mealplansMealDefinition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealDefinitionService mealDefinitionService;

    public MealDefinitionResource(MealDefinitionService mealDefinitionService) {
        this.mealDefinitionService = mealDefinitionService;
    }

    /**
     * {@code POST  /meal-definitions} : Create a new mealDefinition.
     *
     * @param mealDefinition the mealDefinition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealDefinition, or with status {@code 400 (Bad Request)} if the mealDefinition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-definitions")
    public ResponseEntity<MealDefinition> createMealDefinition(@Valid @RequestBody MealDefinition mealDefinition) throws URISyntaxException {
        log.debug("REST request to save MealDefinition : {}", mealDefinition);
        if (mealDefinition.getId() != null) {
            throw new BadRequestAlertException("A new mealDefinition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealDefinition result = mealDefinitionService.save(mealDefinition);
        return ResponseEntity.created(new URI("/api/meal-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-definitions} : Updates an existing mealDefinition.
     *
     * @param mealDefinition the mealDefinition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealDefinition,
     * or with status {@code 400 (Bad Request)} if the mealDefinition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealDefinition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-definitions")
    public ResponseEntity<MealDefinition> updateMealDefinition(@Valid @RequestBody MealDefinition mealDefinition) throws URISyntaxException {
        log.debug("REST request to update MealDefinition : {}", mealDefinition);
        if (mealDefinition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealDefinition result = mealDefinitionService.save(mealDefinition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealDefinition.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-definitions} : get all the mealDefinitions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealDefinitions in body.
     */
    @GetMapping("/meal-definitions")
    public List<MealDefinition> getAllMealDefinitions() {
        log.debug("REST request to get all MealDefinitions");
        return mealDefinitionService.findAll();
    }

    /**
     * {@code GET  /meal-definitions/:id} : get the "id" mealDefinition.
     *
     * @param id the id of the mealDefinition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealDefinition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-definitions/{id}")
    public ResponseEntity<MealDefinition> getMealDefinition(@PathVariable Long id) {
        log.debug("REST request to get MealDefinition : {}", id);
        Optional<MealDefinition> mealDefinition = mealDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealDefinition);
    }

    /**
     * {@code DELETE  /meal-definitions/:id} : delete the "id" mealDefinition.
     *
     * @param id the id of the mealDefinition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-definitions/{id}")
    public ResponseEntity<Void> deleteMealDefinition(@PathVariable Long id) {
        log.debug("REST request to delete MealDefinition : {}", id);
        mealDefinitionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-definitions?query=:query} : search for the mealDefinition corresponding
     * to the query.
     *
     * @param query the query of the mealDefinition search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-definitions")
    public List<MealDefinition> searchMealDefinitions(@RequestParam String query) {
        log.debug("REST request to search MealDefinitions for query {}", query);
        return mealDefinitionService.search(query);
    }

}
