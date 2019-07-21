package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.service.MealTypeTranslationService;
import pl.marczynski.dietify.recipes.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.recipes.service.dto.MealTypeTranslationDTO;

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
     * @param mealTypeTranslationDTO the mealTypeTranslationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealTypeTranslationDTO, or with status {@code 400 (Bad Request)} if the mealTypeTranslation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-type-translations")
    public ResponseEntity<MealTypeTranslationDTO> createMealTypeTranslation(@Valid @RequestBody MealTypeTranslationDTO mealTypeTranslationDTO) throws URISyntaxException {
        log.debug("REST request to save MealTypeTranslation : {}", mealTypeTranslationDTO);
        if (mealTypeTranslationDTO.getId() != null) {
            throw new BadRequestAlertException("A new mealTypeTranslation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealTypeTranslationDTO result = mealTypeTranslationService.save(mealTypeTranslationDTO);
        return ResponseEntity.created(new URI("/api/meal-type-translations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-type-translations} : Updates an existing mealTypeTranslation.
     *
     * @param mealTypeTranslationDTO the mealTypeTranslationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealTypeTranslationDTO,
     * or with status {@code 400 (Bad Request)} if the mealTypeTranslationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealTypeTranslationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-type-translations")
    public ResponseEntity<MealTypeTranslationDTO> updateMealTypeTranslation(@Valid @RequestBody MealTypeTranslationDTO mealTypeTranslationDTO) throws URISyntaxException {
        log.debug("REST request to update MealTypeTranslation : {}", mealTypeTranslationDTO);
        if (mealTypeTranslationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealTypeTranslationDTO result = mealTypeTranslationService.save(mealTypeTranslationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealTypeTranslationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-type-translations} : get all the mealTypeTranslations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealTypeTranslations in body.
     */
    @GetMapping("/meal-type-translations")
    public List<MealTypeTranslationDTO> getAllMealTypeTranslations() {
        log.debug("REST request to get all MealTypeTranslations");
        return mealTypeTranslationService.findAll();
    }

    /**
     * {@code GET  /meal-type-translations/:id} : get the "id" mealTypeTranslation.
     *
     * @param id the id of the mealTypeTranslationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealTypeTranslationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-type-translations/{id}")
    public ResponseEntity<MealTypeTranslationDTO> getMealTypeTranslation(@PathVariable Long id) {
        log.debug("REST request to get MealTypeTranslation : {}", id);
        Optional<MealTypeTranslationDTO> mealTypeTranslationDTO = mealTypeTranslationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealTypeTranslationDTO);
    }

    /**
     * {@code DELETE  /meal-type-translations/:id} : delete the "id" mealTypeTranslation.
     *
     * @param id the id of the mealTypeTranslationDTO to delete.
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
    public List<MealTypeTranslationDTO> searchMealTypeTranslations(@RequestParam String query) {
        log.debug("REST request to search MealTypeTranslations for query {}", query);
        return mealTypeTranslationService.search(query);
    }

}
