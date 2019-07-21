package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.service.AppointmentEvaluationService;
import pl.marczynski.dietify.appointments.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.appointments.service.dto.AppointmentEvaluationDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.appointments.domain.AppointmentEvaluation}.
 */
@RestController
@RequestMapping("/api")
public class AppointmentEvaluationResource {

    private final Logger log = LoggerFactory.getLogger(AppointmentEvaluationResource.class);

    private static final String ENTITY_NAME = "appointmentsAppointmentEvaluation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AppointmentEvaluationService appointmentEvaluationService;

    public AppointmentEvaluationResource(AppointmentEvaluationService appointmentEvaluationService) {
        this.appointmentEvaluationService = appointmentEvaluationService;
    }

    /**
     * {@code POST  /appointment-evaluations} : Create a new appointmentEvaluation.
     *
     * @param appointmentEvaluationDTO the appointmentEvaluationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new appointmentEvaluationDTO, or with status {@code 400 (Bad Request)} if the appointmentEvaluation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/appointment-evaluations")
    public ResponseEntity<AppointmentEvaluationDTO> createAppointmentEvaluation(@Valid @RequestBody AppointmentEvaluationDTO appointmentEvaluationDTO) throws URISyntaxException {
        log.debug("REST request to save AppointmentEvaluation : {}", appointmentEvaluationDTO);
        if (appointmentEvaluationDTO.getId() != null) {
            throw new BadRequestAlertException("A new appointmentEvaluation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppointmentEvaluationDTO result = appointmentEvaluationService.save(appointmentEvaluationDTO);
        return ResponseEntity.created(new URI("/api/appointment-evaluations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /appointment-evaluations} : Updates an existing appointmentEvaluation.
     *
     * @param appointmentEvaluationDTO the appointmentEvaluationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appointmentEvaluationDTO,
     * or with status {@code 400 (Bad Request)} if the appointmentEvaluationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the appointmentEvaluationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/appointment-evaluations")
    public ResponseEntity<AppointmentEvaluationDTO> updateAppointmentEvaluation(@Valid @RequestBody AppointmentEvaluationDTO appointmentEvaluationDTO) throws URISyntaxException {
        log.debug("REST request to update AppointmentEvaluation : {}", appointmentEvaluationDTO);
        if (appointmentEvaluationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AppointmentEvaluationDTO result = appointmentEvaluationService.save(appointmentEvaluationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, appointmentEvaluationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /appointment-evaluations} : get all the appointmentEvaluations.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of appointmentEvaluations in body.
     */
    @GetMapping("/appointment-evaluations")
    public ResponseEntity<List<AppointmentEvaluationDTO>> getAllAppointmentEvaluations(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of AppointmentEvaluations");
        Page<AppointmentEvaluationDTO> page = appointmentEvaluationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /appointment-evaluations/:id} : get the "id" appointmentEvaluation.
     *
     * @param id the id of the appointmentEvaluationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the appointmentEvaluationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/appointment-evaluations/{id}")
    public ResponseEntity<AppointmentEvaluationDTO> getAppointmentEvaluation(@PathVariable Long id) {
        log.debug("REST request to get AppointmentEvaluation : {}", id);
        Optional<AppointmentEvaluationDTO> appointmentEvaluationDTO = appointmentEvaluationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(appointmentEvaluationDTO);
    }

    /**
     * {@code DELETE  /appointment-evaluations/:id} : delete the "id" appointmentEvaluation.
     *
     * @param id the id of the appointmentEvaluationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/appointment-evaluations/{id}")
    public ResponseEntity<Void> deleteAppointmentEvaluation(@PathVariable Long id) {
        log.debug("REST request to delete AppointmentEvaluation : {}", id);
        appointmentEvaluationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
