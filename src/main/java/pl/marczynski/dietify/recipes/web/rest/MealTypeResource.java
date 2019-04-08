package pl.marczynski.dietify.recipes.web.rest;
import pl.marczynski.dietify.recipes.domain.MealType;
import pl.marczynski.dietify.recipes.service.MealTypeService;
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
 * REST controller for managing MealType.
 */
@RestController
@RequestMapping("/api")
public class MealTypeResource {

    private final Logger log = LoggerFactory.getLogger(MealTypeResource.class);

    private static final String ENTITY_NAME = "mealType";

    private final MealTypeService mealTypeService;

    public MealTypeResource(MealTypeService mealTypeService) {
        this.mealTypeService = mealTypeService;
    }

    /**
     * POST  /meal-types : Create a new mealType.
     *
     * @param mealType the mealType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealType, or with status 400 (Bad Request) if the mealType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-types")
    public ResponseEntity<MealType> createMealType(@Valid @RequestBody MealType mealType) throws URISyntaxException {
        log.debug("REST request to save MealType : {}", mealType);
        if (mealType.getId() != null) {
            throw new BadRequestAlertException("A new mealType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealType result = mealTypeService.save(mealType);
        return ResponseEntity.created(new URI("/api/meal-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meal-types : Updates an existing mealType.
     *
     * @param mealType the mealType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealType,
     * or with status 400 (Bad Request) if the mealType is not valid,
     * or with status 500 (Internal Server Error) if the mealType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-types")
    public ResponseEntity<MealType> updateMealType(@Valid @RequestBody MealType mealType) throws URISyntaxException {
        log.debug("REST request to update MealType : {}", mealType);
        if (mealType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealType result = mealTypeService.save(mealType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-types : get all the mealTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mealTypes in body
     */
    @GetMapping("/meal-types")
    public List<MealType> getAllMealTypes() {
        log.debug("REST request to get all MealTypes");
        return mealTypeService.findAll();
    }

    /**
     * GET  /meal-types/:id : get the "id" mealType.
     *
     * @param id the id of the mealType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealType, or with status 404 (Not Found)
     */
    @GetMapping("/meal-types/{id}")
    public ResponseEntity<MealType> getMealType(@PathVariable Long id) {
        log.debug("REST request to get MealType : {}", id);
        Optional<MealType> mealType = mealTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealType);
    }

    /**
     * DELETE  /meal-types/:id : delete the "id" mealType.
     *
     * @param id the id of the mealType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-types/{id}")
    public ResponseEntity<Void> deleteMealType(@PathVariable Long id) {
        log.debug("REST request to delete MealType : {}", id);
        mealTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
