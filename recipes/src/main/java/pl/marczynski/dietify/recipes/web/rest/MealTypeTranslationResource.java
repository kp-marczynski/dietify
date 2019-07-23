package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.domain.MealTypeTranslation;
import pl.marczynski.dietify.recipes.service.MealTypeTranslationService;
import pl.marczynski.dietify.recipes.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.MealTypeTranslation}.
 */
@RestController
@RequestMapping("/api")
public class MealTypeTranslationResource {

    private final Logger log = LoggerFactory.getLogger(MealTypeTranslationResource.class);

    private static final String ENTITY_NAME = "recipesMealTypeTranslation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealTypeTranslationService mealTypeTranslationService;

    public MealTypeTranslationResource(MealTypeTranslationService mealTypeTranslationService) {
        this.mealTypeTranslationService = mealTypeTranslationService;
    }

    /**
     * {@code POST  /meal-type-translations} : Create a new mealTypeTranslation.
     *
     * @param mealTypeTranslation the mealTypeTranslation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealTypeTranslation, or with status {@code 400 (Bad Request)} if the mealTypeTranslation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-type-translations")
    public ResponseEntity<MealTypeTranslation> createMealTypeTranslation(@Valid @RequestBody MealTypeTranslation mealTypeTranslation) throws URISyntaxException {
        log.debug("REST request to save MealTypeTranslation : {}", mealTypeTranslation);
        if (mealTypeTranslation.getId() != null) {
            throw new BadRequestAlertException("A new mealTypeTranslation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealTypeTranslation result = mealTypeTranslationService.save(mealTypeTranslation);
        return ResponseEntity.created(new URI("/api/meal-type-translations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-type-translations} : Updates an existing mealTypeTranslation.
     *
     * @param mealTypeTranslation the mealTypeTranslation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealTypeTranslation,
     * or with status {@code 400 (Bad Request)} if the mealTypeTranslation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealTypeTranslation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-type-translations")
    public ResponseEntity<MealTypeTranslation> updateMealTypeTranslation(@Valid @RequestBody MealTypeTranslation mealTypeTranslation) throws URISyntaxException {
        log.debug("REST request to update MealTypeTranslation : {}", mealTypeTranslation);
        if (mealTypeTranslation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealTypeTranslation result = mealTypeTranslationService.save(mealTypeTranslation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealTypeTranslation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-type-translations} : get all the mealTypeTranslations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealTypeTranslations in body.
     */
    @GetMapping("/meal-type-translations")
    public List<MealTypeTranslation> getAllMealTypeTranslations() {
        log.debug("REST request to get all MealTypeTranslations");
        return mealTypeTranslationService.findAll();
    }

    /**
     * {@code GET  /meal-type-translations/:id} : get the "id" mealTypeTranslation.
     *
     * @param id the id of the mealTypeTranslation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealTypeTranslation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-type-translations/{id}")
    public ResponseEntity<MealTypeTranslation> getMealTypeTranslation(@PathVariable Long id) {
        log.debug("REST request to get MealTypeTranslation : {}", id);
        Optional<MealTypeTranslation> mealTypeTranslation = mealTypeTranslationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealTypeTranslation);
    }

    /**
     * {@code DELETE  /meal-type-translations/:id} : delete the "id" mealTypeTranslation.
     *
     * @param id the id of the mealTypeTranslation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-type-translations/{id}")
    public ResponseEntity<Void> deleteMealTypeTranslation(@PathVariable Long id) {
        log.debug("REST request to delete MealTypeTranslation : {}", id);
        mealTypeTranslationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-type-translations?query=:query} : search for the mealTypeTranslation corresponding
     * to the query.
     *
     * @param query the query of the mealTypeTranslation search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-type-translations")
    public List<MealTypeTranslation> searchMealTypeTranslations(@RequestParam String query) {
        log.debug("REST request to search MealTypeTranslations for query {}", query);
        return mealTypeTranslationService.search(query);
    }

}
