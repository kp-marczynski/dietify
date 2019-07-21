package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.service.MealTypeService;
import pl.marczynski.dietify.recipes.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.recipes.service.dto.MealTypeDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.MealType}.
 */
@RestController
@RequestMapping("/api")
public class MealTypeResource {

    private final Logger log = LoggerFactory.getLogger(MealTypeResource.class);

    private static final String ENTITY_NAME = "recipesMealType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealTypeService mealTypeService;

    public MealTypeResource(MealTypeService mealTypeService) {
        this.mealTypeService = mealTypeService;
    }

    /**
     * {@code POST  /meal-types} : Create a new mealType.
     *
     * @param mealTypeDTO the mealTypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealTypeDTO, or with status {@code 400 (Bad Request)} if the mealType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-types")
    public ResponseEntity<MealTypeDTO> createMealType(@Valid @RequestBody MealTypeDTO mealTypeDTO) throws URISyntaxException {
        log.debug("REST request to save MealType : {}", mealTypeDTO);
        if (mealTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new mealType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealTypeDTO result = mealTypeService.save(mealTypeDTO);
        return ResponseEntity.created(new URI("/api/meal-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-types} : Updates an existing mealType.
     *
     * @param mealTypeDTO the mealTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealTypeDTO,
     * or with status {@code 400 (Bad Request)} if the mealTypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-types")
    public ResponseEntity<MealTypeDTO> updateMealType(@Valid @RequestBody MealTypeDTO mealTypeDTO) throws URISyntaxException {
        log.debug("REST request to update MealType : {}", mealTypeDTO);
        if (mealTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealTypeDTO result = mealTypeService.save(mealTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-types} : get all the mealTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealTypes in body.
     */
    @GetMapping("/meal-types")
    public List<MealTypeDTO> getAllMealTypes() {
        log.debug("REST request to get all MealTypes");
        return mealTypeService.findAll();
    }

    /**
     * {@code GET  /meal-types/:id} : get the "id" mealType.
     *
     * @param id the id of the mealTypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealTypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-types/{id}")
    public ResponseEntity<MealTypeDTO> getMealType(@PathVariable Long id) {
        log.debug("REST request to get MealType : {}", id);
        Optional<MealTypeDTO> mealTypeDTO = mealTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealTypeDTO);
    }

    /**
     * {@code DELETE  /meal-types/:id} : delete the "id" mealType.
     *
     * @param id the id of the mealTypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-types/{id}")
    public ResponseEntity<Void> deleteMealType(@PathVariable Long id) {
        log.debug("REST request to delete MealType : {}", id);
        mealTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-types?query=:query} : search for the mealType corresponding
     * to the query.
     *
     * @param query the query of the mealType search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-types")
    public List<MealTypeDTO> searchMealTypes(@RequestParam String query) {
        log.debug("REST request to search MealTypes for query {}", query);
        return mealTypeService.search(query);
    }

}
