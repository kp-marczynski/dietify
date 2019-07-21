package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.service.MealDefinitionService;
import pl.marczynski.dietify.mealplans.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.mealplans.service.dto.MealDefinitionDTO;

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
     * @param mealDefinitionDTO the mealDefinitionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealDefinitionDTO, or with status {@code 400 (Bad Request)} if the mealDefinition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-definitions")
    public ResponseEntity<MealDefinitionDTO> createMealDefinition(@Valid @RequestBody MealDefinitionDTO mealDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to save MealDefinition : {}", mealDefinitionDTO);
        if (mealDefinitionDTO.getId() != null) {
            throw new BadRequestAlertException("A new mealDefinition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealDefinitionDTO result = mealDefinitionService.save(mealDefinitionDTO);
        return ResponseEntity.created(new URI("/api/meal-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-definitions} : Updates an existing mealDefinition.
     *
     * @param mealDefinitionDTO the mealDefinitionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealDefinitionDTO,
     * or with status {@code 400 (Bad Request)} if the mealDefinitionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealDefinitionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-definitions")
    public ResponseEntity<MealDefinitionDTO> updateMealDefinition(@Valid @RequestBody MealDefinitionDTO mealDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to update MealDefinition : {}", mealDefinitionDTO);
        if (mealDefinitionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealDefinitionDTO result = mealDefinitionService.save(mealDefinitionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealDefinitionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-definitions} : get all the mealDefinitions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealDefinitions in body.
     */
    @GetMapping("/meal-definitions")
    public List<MealDefinitionDTO> getAllMealDefinitions() {
        log.debug("REST request to get all MealDefinitions");
        return mealDefinitionService.findAll();
    }

    /**
     * {@code GET  /meal-definitions/:id} : get the "id" mealDefinition.
     *
     * @param id the id of the mealDefinitionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealDefinitionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-definitions/{id}")
    public ResponseEntity<MealDefinitionDTO> getMealDefinition(@PathVariable Long id) {
        log.debug("REST request to get MealDefinition : {}", id);
        Optional<MealDefinitionDTO> mealDefinitionDTO = mealDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealDefinitionDTO);
    }

    /**
     * {@code DELETE  /meal-definitions/:id} : delete the "id" mealDefinition.
     *
     * @param id the id of the mealDefinitionDTO to delete.
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
    public List<MealDefinitionDTO> searchMealDefinitions(@RequestParam String query) {
        log.debug("REST request to search MealDefinitions for query {}", query);
        return mealDefinitionService.search(query);
    }

}
