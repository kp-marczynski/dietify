package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.domain.DietTypeTranslation;
import pl.marczynski.dietify.products.service.DietTypeTranslationService;
import pl.marczynski.dietify.products.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link pl.marczynski.dietify.products.domain.DietTypeTranslation}.
 */
@RestController
@RequestMapping("/api")
public class DietTypeTranslationResource {

    private final Logger log = LoggerFactory.getLogger(DietTypeTranslationResource.class);

    private static final String ENTITY_NAME = "productsDietTypeTranslation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DietTypeTranslationService dietTypeTranslationService;

    public DietTypeTranslationResource(DietTypeTranslationService dietTypeTranslationService) {
        this.dietTypeTranslationService = dietTypeTranslationService;
    }

    /**
     * {@code POST  /diet-type-translations} : Create a new dietTypeTranslation.
     *
     * @param dietTypeTranslation the dietTypeTranslation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dietTypeTranslation, or with status {@code 400 (Bad Request)} if the dietTypeTranslation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diet-type-translations")
    public ResponseEntity<DietTypeTranslation> createDietTypeTranslation(@Valid @RequestBody DietTypeTranslation dietTypeTranslation) throws URISyntaxException {
        log.debug("REST request to save DietTypeTranslation : {}", dietTypeTranslation);
        if (dietTypeTranslation.getId() != null) {
            throw new BadRequestAlertException("A new dietTypeTranslation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DietTypeTranslation result = dietTypeTranslationService.save(dietTypeTranslation);
        return ResponseEntity.created(new URI("/api/diet-type-translations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diet-type-translations} : Updates an existing dietTypeTranslation.
     *
     * @param dietTypeTranslation the dietTypeTranslation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dietTypeTranslation,
     * or with status {@code 400 (Bad Request)} if the dietTypeTranslation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dietTypeTranslation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diet-type-translations")
    public ResponseEntity<DietTypeTranslation> updateDietTypeTranslation(@Valid @RequestBody DietTypeTranslation dietTypeTranslation) throws URISyntaxException {
        log.debug("REST request to update DietTypeTranslation : {}", dietTypeTranslation);
        if (dietTypeTranslation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DietTypeTranslation result = dietTypeTranslationService.save(dietTypeTranslation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dietTypeTranslation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diet-type-translations} : get all the dietTypeTranslations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dietTypeTranslations in body.
     */
    @GetMapping("/diet-type-translations")
    public List<DietTypeTranslation> getAllDietTypeTranslations() {
        log.debug("REST request to get all DietTypeTranslations");
        return dietTypeTranslationService.findAll();
    }

    /**
     * {@code GET  /diet-type-translations/:id} : get the "id" dietTypeTranslation.
     *
     * @param id the id of the dietTypeTranslation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dietTypeTranslation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diet-type-translations/{id}")
    public ResponseEntity<DietTypeTranslation> getDietTypeTranslation(@PathVariable Long id) {
        log.debug("REST request to get DietTypeTranslation : {}", id);
        Optional<DietTypeTranslation> dietTypeTranslation = dietTypeTranslationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dietTypeTranslation);
    }

    /**
     * {@code DELETE  /diet-type-translations/:id} : delete the "id" dietTypeTranslation.
     *
     * @param id the id of the dietTypeTranslation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diet-type-translations/{id}")
    public ResponseEntity<Void> deleteDietTypeTranslation(@PathVariable Long id) {
        log.debug("REST request to delete DietTypeTranslation : {}", id);
        dietTypeTranslationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/diet-type-translations?query=:query} : search for the dietTypeTranslation corresponding
     * to the query.
     *
     * @param query the query of the dietTypeTranslation search.
     * @return the result of the search.
     */
    @GetMapping("/_search/diet-type-translations")
    public List<DietTypeTranslation> searchDietTypeTranslations(@RequestParam String query) {
        log.debug("REST request to search DietTypeTranslations for query {}", query);
        return dietTypeTranslationService.search(query);
    }

}
