package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.domain.NutritionDefinition;
import pl.marczynski.dietify.products.service.NutritionDefinitionService;
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
 * REST controller for managing {@link pl.marczynski.dietify.products.domain.NutritionDefinition}.
 */
@RestController
@RequestMapping("/api")
public class NutritionDefinitionResource {

    private final Logger log = LoggerFactory.getLogger(NutritionDefinitionResource.class);

    private static final String ENTITY_NAME = "productsNutritionDefinition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NutritionDefinitionService nutritionDefinitionService;

    public NutritionDefinitionResource(NutritionDefinitionService nutritionDefinitionService) {
        this.nutritionDefinitionService = nutritionDefinitionService;
    }

    /**
     * {@code POST  /nutrition-definitions} : Create a new nutritionDefinition.
     *
     * @param nutritionDefinition the nutritionDefinition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nutritionDefinition, or with status {@code 400 (Bad Request)} if the nutritionDefinition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nutrition-definitions")
    public ResponseEntity<NutritionDefinition> createNutritionDefinition(@Valid @RequestBody NutritionDefinition nutritionDefinition) throws URISyntaxException {
        log.debug("REST request to save NutritionDefinition : {}", nutritionDefinition);
        if (nutritionDefinition.getId() != null) {
            throw new BadRequestAlertException("A new nutritionDefinition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NutritionDefinition result = nutritionDefinitionService.save(nutritionDefinition);
        return ResponseEntity.created(new URI("/api/nutrition-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nutrition-definitions} : Updates an existing nutritionDefinition.
     *
     * @param nutritionDefinition the nutritionDefinition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutritionDefinition,
     * or with status {@code 400 (Bad Request)} if the nutritionDefinition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nutritionDefinition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nutrition-definitions")
    public ResponseEntity<NutritionDefinition> updateNutritionDefinition(@Valid @RequestBody NutritionDefinition nutritionDefinition) throws URISyntaxException {
        log.debug("REST request to update NutritionDefinition : {}", nutritionDefinition);
        if (nutritionDefinition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NutritionDefinition result = nutritionDefinitionService.save(nutritionDefinition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutritionDefinition.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nutrition-definitions} : get all the nutritionDefinitions.
     *
     * @param excludeBasicNutritions flag specifying if basic nutritions should be excluded
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nutritionDefinitions in body.
     */
    @GetMapping("/nutrition-definitions")
    public List<NutritionDefinition> getAllNutritionDefinitions(@RequestParam(required = false) Boolean excludeBasicNutritions) {
        log.debug("REST request to get all NutritionDefinitions");
        if (excludeBasicNutritions != null && excludeBasicNutritions) {
            return nutritionDefinitionService.findAllExceptBasicNutritions();
        } else {
            return nutritionDefinitionService.findAll();
        }
    }

    /**
     * {@code GET  /nutrition-definitions/:id} : get the "id" nutritionDefinition.
     *
     * @param id the id of the nutritionDefinition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nutritionDefinition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nutrition-definitions/{id}")
    public ResponseEntity<NutritionDefinition> getNutritionDefinition(@PathVariable Long id) {
        log.debug("REST request to get NutritionDefinition : {}", id);
        Optional<NutritionDefinition> nutritionDefinition = nutritionDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nutritionDefinition);
    }

    /**
     * {@code DELETE  /nutrition-definitions/:id} : delete the "id" nutritionDefinition.
     *
     * @param id the id of the nutritionDefinition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nutrition-definitions/{id}")
    public ResponseEntity<Void> deleteNutritionDefinition(@PathVariable Long id) {
        log.debug("REST request to delete NutritionDefinition : {}", id);
        nutritionDefinitionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/nutrition-definitions?query=:query} : search for the nutritionDefinition corresponding
     * to the query.
     *
     * @param query the query of the nutritionDefinition search.
     * @return the result of the search.
     */
    @GetMapping("/_search/nutrition-definitions")
    public List<NutritionDefinition> searchNutritionDefinitions(@RequestParam String query) {
        log.debug("REST request to search NutritionDefinitions for query {}", query);
        return nutritionDefinitionService.search(query);
    }

}
