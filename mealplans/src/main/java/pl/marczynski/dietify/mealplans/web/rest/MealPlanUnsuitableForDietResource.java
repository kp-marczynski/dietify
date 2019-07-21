package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.service.MealPlanUnsuitableForDietService;
import pl.marczynski.dietify.mealplans.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanUnsuitableForDietDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.mealplans.domain.MealPlanUnsuitableForDiet}.
 */
@RestController
@RequestMapping("/api")
public class MealPlanUnsuitableForDietResource {

    private final Logger log = LoggerFactory.getLogger(MealPlanUnsuitableForDietResource.class);

    private static final String ENTITY_NAME = "mealplansMealPlanUnsuitableForDiet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealPlanUnsuitableForDietService mealPlanUnsuitableForDietService;

    public MealPlanUnsuitableForDietResource(MealPlanUnsuitableForDietService mealPlanUnsuitableForDietService) {
        this.mealPlanUnsuitableForDietService = mealPlanUnsuitableForDietService;
    }

    /**
     * {@code POST  /meal-plan-unsuitable-for-diets} : Create a new mealPlanUnsuitableForDiet.
     *
     * @param mealPlanUnsuitableForDietDTO the mealPlanUnsuitableForDietDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealPlanUnsuitableForDietDTO, or with status {@code 400 (Bad Request)} if the mealPlanUnsuitableForDiet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-plan-unsuitable-for-diets")
    public ResponseEntity<MealPlanUnsuitableForDietDTO> createMealPlanUnsuitableForDiet(@Valid @RequestBody MealPlanUnsuitableForDietDTO mealPlanUnsuitableForDietDTO) throws URISyntaxException {
        log.debug("REST request to save MealPlanUnsuitableForDiet : {}", mealPlanUnsuitableForDietDTO);
        if (mealPlanUnsuitableForDietDTO.getId() != null) {
            throw new BadRequestAlertException("A new mealPlanUnsuitableForDiet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealPlanUnsuitableForDietDTO result = mealPlanUnsuitableForDietService.save(mealPlanUnsuitableForDietDTO);
        return ResponseEntity.created(new URI("/api/meal-plan-unsuitable-for-diets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-plan-unsuitable-for-diets} : Updates an existing mealPlanUnsuitableForDiet.
     *
     * @param mealPlanUnsuitableForDietDTO the mealPlanUnsuitableForDietDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealPlanUnsuitableForDietDTO,
     * or with status {@code 400 (Bad Request)} if the mealPlanUnsuitableForDietDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealPlanUnsuitableForDietDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-plan-unsuitable-for-diets")
    public ResponseEntity<MealPlanUnsuitableForDietDTO> updateMealPlanUnsuitableForDiet(@Valid @RequestBody MealPlanUnsuitableForDietDTO mealPlanUnsuitableForDietDTO) throws URISyntaxException {
        log.debug("REST request to update MealPlanUnsuitableForDiet : {}", mealPlanUnsuitableForDietDTO);
        if (mealPlanUnsuitableForDietDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealPlanUnsuitableForDietDTO result = mealPlanUnsuitableForDietService.save(mealPlanUnsuitableForDietDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealPlanUnsuitableForDietDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-plan-unsuitable-for-diets} : get all the mealPlanUnsuitableForDiets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealPlanUnsuitableForDiets in body.
     */
    @GetMapping("/meal-plan-unsuitable-for-diets")
    public List<MealPlanUnsuitableForDietDTO> getAllMealPlanUnsuitableForDiets() {
        log.debug("REST request to get all MealPlanUnsuitableForDiets");
        return mealPlanUnsuitableForDietService.findAll();
    }

    /**
     * {@code GET  /meal-plan-unsuitable-for-diets/:id} : get the "id" mealPlanUnsuitableForDiet.
     *
     * @param id the id of the mealPlanUnsuitableForDietDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealPlanUnsuitableForDietDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-plan-unsuitable-for-diets/{id}")
    public ResponseEntity<MealPlanUnsuitableForDietDTO> getMealPlanUnsuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to get MealPlanUnsuitableForDiet : {}", id);
        Optional<MealPlanUnsuitableForDietDTO> mealPlanUnsuitableForDietDTO = mealPlanUnsuitableForDietService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealPlanUnsuitableForDietDTO);
    }

    /**
     * {@code DELETE  /meal-plan-unsuitable-for-diets/:id} : delete the "id" mealPlanUnsuitableForDiet.
     *
     * @param id the id of the mealPlanUnsuitableForDietDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-plan-unsuitable-for-diets/{id}")
    public ResponseEntity<Void> deleteMealPlanUnsuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to delete MealPlanUnsuitableForDiet : {}", id);
        mealPlanUnsuitableForDietService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-plan-unsuitable-for-diets?query=:query} : search for the mealPlanUnsuitableForDiet corresponding
     * to the query.
     *
     * @param query the query of the mealPlanUnsuitableForDiet search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-plan-unsuitable-for-diets")
    public List<MealPlanUnsuitableForDietDTO> searchMealPlanUnsuitableForDiets(@RequestParam String query) {
        log.debug("REST request to search MealPlanUnsuitableForDiets for query {}", query);
        return mealPlanUnsuitableForDietService.search(query);
    }

}
