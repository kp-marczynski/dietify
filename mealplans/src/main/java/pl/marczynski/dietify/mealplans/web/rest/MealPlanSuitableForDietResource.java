package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.service.MealPlanSuitableForDietService;
import pl.marczynski.dietify.mealplans.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanSuitableForDietDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet}.
 */
@RestController
@RequestMapping("/api")
public class MealPlanSuitableForDietResource {

    private final Logger log = LoggerFactory.getLogger(MealPlanSuitableForDietResource.class);

    private static final String ENTITY_NAME = "mealplansMealPlanSuitableForDiet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealPlanSuitableForDietService mealPlanSuitableForDietService;

    public MealPlanSuitableForDietResource(MealPlanSuitableForDietService mealPlanSuitableForDietService) {
        this.mealPlanSuitableForDietService = mealPlanSuitableForDietService;
    }

    /**
     * {@code POST  /meal-plan-suitable-for-diets} : Create a new mealPlanSuitableForDiet.
     *
     * @param mealPlanSuitableForDietDTO the mealPlanSuitableForDietDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealPlanSuitableForDietDTO, or with status {@code 400 (Bad Request)} if the mealPlanSuitableForDiet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-plan-suitable-for-diets")
    public ResponseEntity<MealPlanSuitableForDietDTO> createMealPlanSuitableForDiet(@Valid @RequestBody MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO) throws URISyntaxException {
        log.debug("REST request to save MealPlanSuitableForDiet : {}", mealPlanSuitableForDietDTO);
        if (mealPlanSuitableForDietDTO.getId() != null) {
            throw new BadRequestAlertException("A new mealPlanSuitableForDiet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealPlanSuitableForDietDTO result = mealPlanSuitableForDietService.save(mealPlanSuitableForDietDTO);
        return ResponseEntity.created(new URI("/api/meal-plan-suitable-for-diets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-plan-suitable-for-diets} : Updates an existing mealPlanSuitableForDiet.
     *
     * @param mealPlanSuitableForDietDTO the mealPlanSuitableForDietDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealPlanSuitableForDietDTO,
     * or with status {@code 400 (Bad Request)} if the mealPlanSuitableForDietDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealPlanSuitableForDietDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-plan-suitable-for-diets")
    public ResponseEntity<MealPlanSuitableForDietDTO> updateMealPlanSuitableForDiet(@Valid @RequestBody MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO) throws URISyntaxException {
        log.debug("REST request to update MealPlanSuitableForDiet : {}", mealPlanSuitableForDietDTO);
        if (mealPlanSuitableForDietDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealPlanSuitableForDietDTO result = mealPlanSuitableForDietService.save(mealPlanSuitableForDietDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealPlanSuitableForDietDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-plan-suitable-for-diets} : get all the mealPlanSuitableForDiets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealPlanSuitableForDiets in body.
     */
    @GetMapping("/meal-plan-suitable-for-diets")
    public List<MealPlanSuitableForDietDTO> getAllMealPlanSuitableForDiets() {
        log.debug("REST request to get all MealPlanSuitableForDiets");
        return mealPlanSuitableForDietService.findAll();
    }

    /**
     * {@code GET  /meal-plan-suitable-for-diets/:id} : get the "id" mealPlanSuitableForDiet.
     *
     * @param id the id of the mealPlanSuitableForDietDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealPlanSuitableForDietDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-plan-suitable-for-diets/{id}")
    public ResponseEntity<MealPlanSuitableForDietDTO> getMealPlanSuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to get MealPlanSuitableForDiet : {}", id);
        Optional<MealPlanSuitableForDietDTO> mealPlanSuitableForDietDTO = mealPlanSuitableForDietService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealPlanSuitableForDietDTO);
    }

    /**
     * {@code DELETE  /meal-plan-suitable-for-diets/:id} : delete the "id" mealPlanSuitableForDiet.
     *
     * @param id the id of the mealPlanSuitableForDietDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-plan-suitable-for-diets/{id}")
    public ResponseEntity<Void> deleteMealPlanSuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to delete MealPlanSuitableForDiet : {}", id);
        mealPlanSuitableForDietService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-plan-suitable-for-diets?query=:query} : search for the mealPlanSuitableForDiet corresponding
     * to the query.
     *
     * @param query the query of the mealPlanSuitableForDiet search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-plan-suitable-for-diets")
    public List<MealPlanSuitableForDietDTO> searchMealPlanSuitableForDiets(@RequestParam String query) {
        log.debug("REST request to search MealPlanSuitableForDiets for query {}", query);
        return mealPlanSuitableForDietService.search(query);
    }

}
