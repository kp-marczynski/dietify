package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.service.PatientCardService;
import pl.marczynski.dietify.appointments.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.appointments.service.dto.PatientCardDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link pl.marczynski.dietify.appointments.domain.PatientCard}.
 */
@RestController
@RequestMapping("/api")
public class PatientCardResource {

    private final Logger log = LoggerFactory.getLogger(PatientCardResource.class);

    private static final String ENTITY_NAME = "appointmentsPatientCard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PatientCardService patientCardService;

    public PatientCardResource(PatientCardService patientCardService) {
        this.patientCardService = patientCardService;
    }

    /**
     * {@code POST  /patient-cards} : Create a new patientCard.
     *
     * @param patientCardDTO the patientCardDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new patientCardDTO, or with status {@code 400 (Bad Request)} if the patientCard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/patient-cards")
    public ResponseEntity<PatientCardDTO> createPatientCard(@Valid @RequestBody PatientCardDTO patientCardDTO) throws URISyntaxException {
        log.debug("REST request to save PatientCard : {}", patientCardDTO);
        if (patientCardDTO.getId() != null) {
            throw new BadRequestAlertException("A new patientCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PatientCardDTO result = patientCardService.save(patientCardDTO);
        return ResponseEntity.created(new URI("/api/patient-cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /patient-cards} : Updates an existing patientCard.
     *
     * @param patientCardDTO the patientCardDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated patientCardDTO,
     * or with status {@code 400 (Bad Request)} if the patientCardDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the patientCardDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/patient-cards")
    public ResponseEntity<PatientCardDTO> updatePatientCard(@Valid @RequestBody PatientCardDTO patientCardDTO) throws URISyntaxException {
        log.debug("REST request to update PatientCard : {}", patientCardDTO);
        if (patientCardDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PatientCardDTO result = patientCardService.save(patientCardDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, patientCardDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /patient-cards} : get all the patientCards.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of patientCards in body.
     */
    @GetMapping("/patient-cards")
    public ResponseEntity<List<PatientCardDTO>> getAllPatientCards(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of PatientCards");
        Page<PatientCardDTO> page = patientCardService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /patient-cards/:id} : get the "id" patientCard.
     *
     * @param id the id of the patientCardDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the patientCardDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/patient-cards/{id}")
    public ResponseEntity<PatientCardDTO> getPatientCard(@PathVariable Long id) {
        log.debug("REST request to get PatientCard : {}", id);
        Optional<PatientCardDTO> patientCardDTO = patientCardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(patientCardDTO);
    }

    /**
     * {@code DELETE  /patient-cards/:id} : delete the "id" patientCard.
     *
     * @param id the id of the patientCardDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/patient-cards/{id}")
    public ResponseEntity<Void> deletePatientCard(@PathVariable Long id) {
        log.debug("REST request to delete PatientCard : {}", id);
        patientCardService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
