package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.service.NutritionDefinitionService;
import pl.marczynski.dietify.products.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.products.service.dto.NutritionDefinitionDTO;

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
     * @param nutritionDefinitionDTO the nutritionDefinitionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nutritionDefinitionDTO, or with status {@code 400 (Bad Request)} if the nutritionDefinition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nutrition-definitions")
    public ResponseEntity<NutritionDefinitionDTO> createNutritionDefinition(@Valid @RequestBody NutritionDefinitionDTO nutritionDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to save NutritionDefinition : {}", nutritionDefinitionDTO);
        if (nutritionDefinitionDTO.getId() != null) {
            throw new BadRequestAlertException("A new nutritionDefinition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NutritionDefinitionDTO result = nutritionDefinitionService.save(nutritionDefinitionDTO);
        return ResponseEntity.created(new URI("/api/nutrition-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nutrition-definitions} : Updates an existing nutritionDefinition.
     *
     * @param nutritionDefinitionDTO the nutritionDefinitionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutritionDefinitionDTO,
     * or with status {@code 400 (Bad Request)} if the nutritionDefinitionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nutritionDefinitionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nutrition-definitions")
    public ResponseEntity<NutritionDefinitionDTO> updateNutritionDefinition(@Valid @RequestBody NutritionDefinitionDTO nutritionDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to update NutritionDefinition : {}", nutritionDefinitionDTO);
        if (nutritionDefinitionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NutritionDefinitionDTO result = nutritionDefinitionService.save(nutritionDefinitionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutritionDefinitionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nutrition-definitions} : get all the nutritionDefinitions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nutritionDefinitions in body.
     */
    @GetMapping("/nutrition-definitions")
    public List<NutritionDefinitionDTO> getAllNutritionDefinitions() {
        log.debug("REST request to get all NutritionDefinitions");
        return nutritionDefinitionService.findAll();
    }

    /**
     * {@code GET  /nutrition-definitions/:id} : get the "id" nutritionDefinition.
     *
     * @param id the id of the nutritionDefinitionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nutritionDefinitionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nutrition-definitions/{id}")
    public ResponseEntity<NutritionDefinitionDTO> getNutritionDefinition(@PathVariable Long id) {
        log.debug("REST request to get NutritionDefinition : {}", id);
        Optional<NutritionDefinitionDTO> nutritionDefinitionDTO = nutritionDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nutritionDefinitionDTO);
    }

    /**
     * {@code DELETE  /nutrition-definitions/:id} : delete the "id" nutritionDefinition.
     *
     * @param id the id of the nutritionDefinitionDTO to delete.
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
    public List<NutritionDefinitionDTO> searchNutritionDefinitions(@RequestParam String query) {
        log.debug("REST request to search NutritionDefinitions for query {}", query);
        return nutritionDefinitionService.search(query);
    }

}
