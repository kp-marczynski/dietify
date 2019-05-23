package pl.marczynski.dietify.core.web.rest;
import pl.marczynski.dietify.core.domain.PatientCard;
import pl.marczynski.dietify.core.service.PatientCardService;
import pl.marczynski.dietify.core.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.core.web.rest.util.HeaderUtil;
import pl.marczynski.dietify.core.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PatientCard.
 */
@RestController
@RequestMapping("/api")
public class PatientCardResource {

    private final Logger log = LoggerFactory.getLogger(PatientCardResource.class);

    private static final String ENTITY_NAME = "patientCard";

    private final PatientCardService patientCardService;

    public PatientCardResource(PatientCardService patientCardService) {
        this.patientCardService = patientCardService;
    }

    /**
     * POST  /patient-cards : Create a new patientCard.
     *
     * @param patientCard the patientCard to create
     * @return the ResponseEntity with status 201 (Created) and with body the new patientCard, or with status 400 (Bad Request) if the patientCard has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/patient-cards")
    public ResponseEntity<PatientCard> createPatientCard(@Valid @RequestBody PatientCard patientCard) throws URISyntaxException {
        log.debug("REST request to save PatientCard : {}", patientCard);
        if (patientCard.getId() != null) {
            throw new BadRequestAlertException("A new patientCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PatientCard result = patientCardService.save(patientCard);
        return ResponseEntity.created(new URI("/api/patient-cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /patient-cards : Updates an existing patientCard.
     *
     * @param patientCard the patientCard to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated patientCard,
     * or with status 400 (Bad Request) if the patientCard is not valid,
     * or with status 500 (Internal Server Error) if the patientCard couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/patient-cards")
    public ResponseEntity<PatientCard> updatePatientCard(@Valid @RequestBody PatientCard patientCard) throws URISyntaxException {
        log.debug("REST request to update PatientCard : {}", patientCard);
        if (patientCard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PatientCard result = patientCardService.save(patientCard);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, patientCard.getId().toString()))
            .body(result);
    }

    /**
     * GET  /patient-cards : get all the patientCards.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of patientCards in body
     */
    @GetMapping("/patient-cards")
    public ResponseEntity<List<PatientCard>> getAllPatientCards(Pageable pageable) {
        log.debug("REST request to get a page of PatientCards");
        Page<PatientCard> page = patientCardService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/patient-cards");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /patient-cards/:id : get the "id" patientCard.
     *
     * @param id the id of the patientCard to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the patientCard, or with status 404 (Not Found)
     */
    @GetMapping("/patient-cards/{id}")
    public ResponseEntity<PatientCard> getPatientCard(@PathVariable Long id) {
        log.debug("REST request to get PatientCard : {}", id);
        Optional<PatientCard> patientCard = patientCardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(patientCard);
    }

    /**
     * DELETE  /patient-cards/:id : delete the "id" patientCard.
     *
     * @param id the id of the patientCard to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/patient-cards/{id}")
    public ResponseEntity<Void> deletePatientCard(@PathVariable Long id) {
        log.debug("REST request to delete PatientCard : {}", id);
        patientCardService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
