package pl.marczynski.dietify.products.web.rest;
import org.springframework.security.access.prepost.PreAuthorize;
import pl.marczynski.dietify.core.security.AuthoritiesConstants;
import pl.marczynski.dietify.products.domain.NutritionDefinition;
import pl.marczynski.dietify.products.service.NutritionDefinitionService;
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
 * REST controller for managing NutritionDefinition.
 */
@RestController
@RequestMapping("/api")
public class NutritionDefinitionResource {

    private final Logger log = LoggerFactory.getLogger(NutritionDefinitionResource.class);

    private static final String ENTITY_NAME = "nutritionDefinition";

    private final NutritionDefinitionService nutritionDefinitionService;

    public NutritionDefinitionResource(NutritionDefinitionService nutritionDefinitionService) {
        this.nutritionDefinitionService = nutritionDefinitionService;
    }

    /**
     * POST  /nutrition-definitions : Create a new nutritionDefinition.
     *
     * @param nutritionDefinition the nutritionDefinition to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nutritionDefinition, or with status 400 (Bad Request) if the nutritionDefinition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nutrition-definitions")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<NutritionDefinition> createNutritionDefinition(@Valid @RequestBody NutritionDefinition nutritionDefinition) throws URISyntaxException {
        log.debug("REST request to save NutritionDefinition : {}", nutritionDefinition);
        if (nutritionDefinition.getId() != null) {
            throw new BadRequestAlertException("A new nutritionDefinition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NutritionDefinition result = nutritionDefinitionService.save(nutritionDefinition);
        return ResponseEntity.created(new URI("/api/nutrition-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nutrition-definitions : Updates an existing nutritionDefinition.
     *
     * @param nutritionDefinition the nutritionDefinition to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nutritionDefinition,
     * or with status 400 (Bad Request) if the nutritionDefinition is not valid,
     * or with status 500 (Internal Server Error) if the nutritionDefinition couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nutrition-definitions")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<NutritionDefinition> updateNutritionDefinition(@Valid @RequestBody NutritionDefinition nutritionDefinition) throws URISyntaxException {
        log.debug("REST request to update NutritionDefinition : {}", nutritionDefinition);
        if (nutritionDefinition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NutritionDefinition result = nutritionDefinitionService.save(nutritionDefinition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nutritionDefinition.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nutrition-definitions : get all the nutritionDefinitions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nutritionDefinitions in body
     */
    @GetMapping("/nutrition-definitions")
    public List<NutritionDefinition> getAllNutritionDefinitions() {
        log.debug("REST request to get all NutritionDefinitions");
        return nutritionDefinitionService.findAll();
    }

    /**
     * GET  /nutrition-definitions/:id : get the "id" nutritionDefinition.
     *
     * @param id the id of the nutritionDefinition to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nutritionDefinition, or with status 404 (Not Found)
     */
    @GetMapping("/nutrition-definitions/{id}")
    public ResponseEntity<NutritionDefinition> getNutritionDefinition(@PathVariable Long id) {
        log.debug("REST request to get NutritionDefinition : {}", id);
        Optional<NutritionDefinition> nutritionDefinition = nutritionDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nutritionDefinition);
    }

    /**
     * DELETE  /nutrition-definitions/:id : delete the "id" nutritionDefinition.
     *
     * @param id the id of the nutritionDefinition to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nutrition-definitions/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteNutritionDefinition(@PathVariable Long id) {
        log.debug("REST request to delete NutritionDefinition : {}", id);
        nutritionDefinitionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
