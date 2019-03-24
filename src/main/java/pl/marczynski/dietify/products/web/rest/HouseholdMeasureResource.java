package pl.marczynski.dietify.products.web.rest;
import pl.marczynski.dietify.products.domain.HouseholdMeasure;
import pl.marczynski.dietify.products.service.HouseholdMeasureService;
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
 * REST controller for managing HouseholdMeasure.
 */
@RestController
@RequestMapping("/api")
public class HouseholdMeasureResource {

    private final Logger log = LoggerFactory.getLogger(HouseholdMeasureResource.class);

    private static final String ENTITY_NAME = "householdMeasure";

    private final HouseholdMeasureService householdMeasureService;

    public HouseholdMeasureResource(HouseholdMeasureService householdMeasureService) {
        this.householdMeasureService = householdMeasureService;
    }

    /**
     * POST  /household-measures : Create a new householdMeasure.
     *
     * @param householdMeasure the householdMeasure to create
     * @return the ResponseEntity with status 201 (Created) and with body the new householdMeasure, or with status 400 (Bad Request) if the householdMeasure has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/household-measures")
    public ResponseEntity<HouseholdMeasure> createHouseholdMeasure(@Valid @RequestBody HouseholdMeasure householdMeasure) throws URISyntaxException {
        log.debug("REST request to save HouseholdMeasure : {}", householdMeasure);
        if (householdMeasure.getId() != null) {
            throw new BadRequestAlertException("A new householdMeasure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HouseholdMeasure result = householdMeasureService.save(householdMeasure);
        return ResponseEntity.created(new URI("/api/household-measures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /household-measures : Updates an existing householdMeasure.
     *
     * @param householdMeasure the householdMeasure to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated householdMeasure,
     * or with status 400 (Bad Request) if the householdMeasure is not valid,
     * or with status 500 (Internal Server Error) if the householdMeasure couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/household-measures")
    public ResponseEntity<HouseholdMeasure> updateHouseholdMeasure(@Valid @RequestBody HouseholdMeasure householdMeasure) throws URISyntaxException {
        log.debug("REST request to update HouseholdMeasure : {}", householdMeasure);
        if (householdMeasure.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HouseholdMeasure result = householdMeasureService.save(householdMeasure);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, householdMeasure.getId().toString()))
            .body(result);
    }

    /**
     * GET  /household-measures : get all the householdMeasures.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of householdMeasures in body
     */
    @GetMapping("/household-measures")
    public List<HouseholdMeasure> getAllHouseholdMeasures() {
        log.debug("REST request to get all HouseholdMeasures");
        return householdMeasureService.findAll();
    }

    /**
     * GET  /household-measures/:id : get the "id" householdMeasure.
     *
     * @param id the id of the householdMeasure to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the householdMeasure, or with status 404 (Not Found)
     */
    @GetMapping("/household-measures/{id}")
    public ResponseEntity<HouseholdMeasure> getHouseholdMeasure(@PathVariable Long id) {
        log.debug("REST request to get HouseholdMeasure : {}", id);
        Optional<HouseholdMeasure> householdMeasure = householdMeasureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(householdMeasure);
    }

    /**
     * DELETE  /household-measures/:id : delete the "id" householdMeasure.
     *
     * @param id the id of the householdMeasure to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/household-measures/{id}")
    public ResponseEntity<Void> deleteHouseholdMeasure(@PathVariable Long id) {
        log.debug("REST request to delete HouseholdMeasure : {}", id);
        householdMeasureService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
