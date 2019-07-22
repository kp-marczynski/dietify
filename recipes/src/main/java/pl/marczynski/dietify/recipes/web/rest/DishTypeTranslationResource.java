package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.domain.DishTypeTranslation;
import pl.marczynski.dietify.recipes.service.DishTypeTranslationService;
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
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.DishTypeTranslation}.
 */
@RestController
@RequestMapping("/api")
public class DishTypeTranslationResource {

    private final Logger log = LoggerFactory.getLogger(DishTypeTranslationResource.class);

    private static final String ENTITY_NAME = "recipesDishTypeTranslation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DishTypeTranslationService dishTypeTranslationService;

    public DishTypeTranslationResource(DishTypeTranslationService dishTypeTranslationService) {
        this.dishTypeTranslationService = dishTypeTranslationService;
    }

    /**
     * {@code POST  /dish-type-translations} : Create a new dishTypeTranslation.
     *
     * @param dishTypeTranslation the dishTypeTranslation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dishTypeTranslation, or with status {@code 400 (Bad Request)} if the dishTypeTranslation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dish-type-translations")
    public ResponseEntity<DishTypeTranslation> createDishTypeTranslation(@Valid @RequestBody DishTypeTranslation dishTypeTranslation) throws URISyntaxException {
        log.debug("REST request to save DishTypeTranslation : {}", dishTypeTranslation);
        if (dishTypeTranslation.getId() != null) {
            throw new BadRequestAlertException("A new dishTypeTranslation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DishTypeTranslation result = dishTypeTranslationService.save(dishTypeTranslation);
        return ResponseEntity.created(new URI("/api/dish-type-translations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dish-type-translations} : Updates an existing dishTypeTranslation.
     *
     * @param dishTypeTranslation the dishTypeTranslation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dishTypeTranslation,
     * or with status {@code 400 (Bad Request)} if the dishTypeTranslation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dishTypeTranslation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dish-type-translations")
    public ResponseEntity<DishTypeTranslation> updateDishTypeTranslation(@Valid @RequestBody DishTypeTranslation dishTypeTranslation) throws URISyntaxException {
        log.debug("REST request to update DishTypeTranslation : {}", dishTypeTranslation);
        if (dishTypeTranslation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DishTypeTranslation result = dishTypeTranslationService.save(dishTypeTranslation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dishTypeTranslation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dish-type-translations} : get all the dishTypeTranslations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dishTypeTranslations in body.
     */
    @GetMapping("/dish-type-translations")
    public List<DishTypeTranslation> getAllDishTypeTranslations() {
        log.debug("REST request to get all DishTypeTranslations");
        return dishTypeTranslationService.findAll();
    }

    /**
     * {@code GET  /dish-type-translations/:id} : get the "id" dishTypeTranslation.
     *
     * @param id the id of the dishTypeTranslation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dishTypeTranslation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dish-type-translations/{id}")
    public ResponseEntity<DishTypeTranslation> getDishTypeTranslation(@PathVariable Long id) {
        log.debug("REST request to get DishTypeTranslation : {}", id);
        Optional<DishTypeTranslation> dishTypeTranslation = dishTypeTranslationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dishTypeTranslation);
    }

    /**
     * {@code DELETE  /dish-type-translations/:id} : delete the "id" dishTypeTranslation.
     *
     * @param id the id of the dishTypeTranslation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dish-type-translations/{id}")
    public ResponseEntity<Void> deleteDishTypeTranslation(@PathVariable Long id) {
        log.debug("REST request to delete DishTypeTranslation : {}", id);
        dishTypeTranslationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/dish-type-translations?query=:query} : search for the dishTypeTranslation corresponding
     * to the query.
     *
     * @param query the query of the dishTypeTranslation search.
     * @return the result of the search.
     */
    @GetMapping("/_search/dish-type-translations")
    public List<DishTypeTranslation> searchDishTypeTranslations(@RequestParam String query) {
        log.debug("REST request to search DishTypeTranslations for query {}", query);
        return dishTypeTranslationService.search(query);
    }

}
