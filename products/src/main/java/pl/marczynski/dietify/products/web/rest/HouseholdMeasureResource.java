package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.service.HouseholdMeasureService;
import pl.marczynski.dietify.products.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.products.service.dto.HouseholdMeasureDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.products.domain.HouseholdMeasure}.
 */
@RestController
@RequestMapping("/api")
public class HouseholdMeasureResource {

    private final Logger log = LoggerFactory.getLogger(HouseholdMeasureResource.class);

    private static final String ENTITY_NAME = "productsHouseholdMeasure";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HouseholdMeasureService householdMeasureService;

    public HouseholdMeasureResource(HouseholdMeasureService householdMeasureService) {
        this.householdMeasureService = householdMeasureService;
    }

    /**
     * {@code POST  /household-measures} : Create a new householdMeasure.
     *
     * @param householdMeasureDTO the householdMeasureDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new householdMeasureDTO, or with status {@code 400 (Bad Request)} if the householdMeasure has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/household-measures")
    public ResponseEntity<HouseholdMeasureDTO> createHouseholdMeasure(@Valid @RequestBody HouseholdMeasureDTO householdMeasureDTO) throws URISyntaxException {
        log.debug("REST request to save HouseholdMeasure : {}", householdMeasureDTO);
        if (householdMeasureDTO.getId() != null) {
            throw new BadRequestAlertException("A new householdMeasure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HouseholdMeasureDTO result = householdMeasureService.save(householdMeasureDTO);
        return ResponseEntity.created(new URI("/api/household-measures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /household-measures} : Updates an existing householdMeasure.
     *
     * @param householdMeasureDTO the householdMeasureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated householdMeasureDTO,
     * or with status {@code 400 (Bad Request)} if the householdMeasureDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the householdMeasureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/household-measures")
    public ResponseEntity<HouseholdMeasureDTO> updateHouseholdMeasure(@Valid @RequestBody HouseholdMeasureDTO householdMeasureDTO) throws URISyntaxException {
        log.debug("REST request to update HouseholdMeasure : {}", householdMeasureDTO);
        if (householdMeasureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HouseholdMeasureDTO result = householdMeasureService.save(householdMeasureDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, householdMeasureDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /household-measures} : get all the householdMeasures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of householdMeasures in body.
     */
    @GetMapping("/household-measures")
    public List<HouseholdMeasureDTO> getAllHouseholdMeasures() {
        log.debug("REST request to get all HouseholdMeasures");
        return householdMeasureService.findAll();
    }

    /**
     * {@code GET  /household-measures/:id} : get the "id" householdMeasure.
     *
     * @param id the id of the householdMeasureDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the householdMeasureDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/household-measures/{id}")
    public ResponseEntity<HouseholdMeasureDTO> getHouseholdMeasure(@PathVariable Long id) {
        log.debug("REST request to get HouseholdMeasure : {}", id);
        Optional<HouseholdMeasureDTO> householdMeasureDTO = householdMeasureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(householdMeasureDTO);
    }

    /**
     * {@code DELETE  /household-measures/:id} : delete the "id" householdMeasure.
     *
     * @param id the id of the householdMeasureDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/household-measures/{id}")
    public ResponseEntity<Void> deleteHouseholdMeasure(@PathVariable Long id) {
        log.debug("REST request to delete HouseholdMeasure : {}", id);
        householdMeasureService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/household-measures?query=:query} : search for the householdMeasure corresponding
     * to the query.
     *
     * @param query the query of the householdMeasure search.
     * @return the result of the search.
     */
    @GetMapping("/_search/household-measures")
    public List<HouseholdMeasureDTO> searchHouseholdMeasures(@RequestParam String query) {
        log.debug("REST request to search HouseholdMeasures for query {}", query);
        return householdMeasureService.search(query);
    }

}
