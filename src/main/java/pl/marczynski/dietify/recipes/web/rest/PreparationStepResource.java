package pl.marczynski.dietify.recipes.web.rest;
import pl.marczynski.dietify.recipes.domain.PreparationStep;
import pl.marczynski.dietify.recipes.service.PreparationStepService;
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
 * REST controller for managing PreparationStep.
 */
@RestController
@RequestMapping("/api")
public class PreparationStepResource {

    private final Logger log = LoggerFactory.getLogger(PreparationStepResource.class);

    private static final String ENTITY_NAME = "preparationStep";

    private final PreparationStepService preparationStepService;

    public PreparationStepResource(PreparationStepService preparationStepService) {
        this.preparationStepService = preparationStepService;
    }

    /**
     * POST  /preparation-steps : Create a new preparationStep.
     *
     * @param preparationStep the preparationStep to create
     * @return the ResponseEntity with status 201 (Created) and with body the new preparationStep, or with status 400 (Bad Request) if the preparationStep has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/preparation-steps")
    public ResponseEntity<PreparationStep> createPreparationStep(@Valid @RequestBody PreparationStep preparationStep) throws URISyntaxException {
        log.debug("REST request to save PreparationStep : {}", preparationStep);
        if (preparationStep.getId() != null) {
            throw new BadRequestAlertException("A new preparationStep cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PreparationStep result = preparationStepService.save(preparationStep);
        return ResponseEntity.created(new URI("/api/preparation-steps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /preparation-steps : Updates an existing preparationStep.
     *
     * @param preparationStep the preparationStep to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated preparationStep,
     * or with status 400 (Bad Request) if the preparationStep is not valid,
     * or with status 500 (Internal Server Error) if the preparationStep couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/preparation-steps")
    public ResponseEntity<PreparationStep> updatePreparationStep(@Valid @RequestBody PreparationStep preparationStep) throws URISyntaxException {
        log.debug("REST request to update PreparationStep : {}", preparationStep);
        if (preparationStep.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PreparationStep result = preparationStepService.save(preparationStep);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, preparationStep.getId().toString()))
            .body(result);
    }

    /**
     * GET  /preparation-steps : get all the preparationSteps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of preparationSteps in body
     */
    @GetMapping("/preparation-steps")
    public List<PreparationStep> getAllPreparationSteps() {
        log.debug("REST request to get all PreparationSteps");
        return preparationStepService.findAll();
    }

    /**
     * GET  /preparation-steps/:id : get the "id" preparationStep.
     *
     * @param id the id of the preparationStep to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the preparationStep, or with status 404 (Not Found)
     */
    @GetMapping("/preparation-steps/{id}")
    public ResponseEntity<PreparationStep> getPreparationStep(@PathVariable Long id) {
        log.debug("REST request to get PreparationStep : {}", id);
        Optional<PreparationStep> preparationStep = preparationStepService.findOne(id);
        return ResponseUtil.wrapOrNotFound(preparationStep);
    }

    /**
     * DELETE  /preparation-steps/:id : delete the "id" preparationStep.
     *
     * @param id the id of the preparationStep to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/preparation-steps/{id}")
    public ResponseEntity<Void> deletePreparationStep(@PathVariable Long id) {
        log.debug("REST request to delete PreparationStep : {}", id);
        preparationStepService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
