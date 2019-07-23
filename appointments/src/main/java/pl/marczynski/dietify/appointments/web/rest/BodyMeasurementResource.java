package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.domain.BodyMeasurement;
import pl.marczynski.dietify.appointments.service.BodyMeasurementService;
import pl.marczynski.dietify.appointments.web.rest.errors.BadRequestAlertException;

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

/**
 * REST controller for managing {@link pl.marczynski.dietify.appointments.domain.BodyMeasurement}.
 */
@RestController
@RequestMapping("/api")
public class BodyMeasurementResource {

    private final Logger log = LoggerFactory.getLogger(BodyMeasurementResource.class);

    private static final String ENTITY_NAME = "appointmentsBodyMeasurement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BodyMeasurementService bodyMeasurementService;

    public BodyMeasurementResource(BodyMeasurementService bodyMeasurementService) {
        this.bodyMeasurementService = bodyMeasurementService;
    }

    /**
     * {@code POST  /body-measurements} : Create a new bodyMeasurement.
     *
     * @param bodyMeasurement the bodyMeasurement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bodyMeasurement, or with status {@code 400 (Bad Request)} if the bodyMeasurement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/body-measurements")
    public ResponseEntity<BodyMeasurement> createBodyMeasurement(@Valid @RequestBody BodyMeasurement bodyMeasurement) throws URISyntaxException {
        log.debug("REST request to save BodyMeasurement : {}", bodyMeasurement);
        if (bodyMeasurement.getId() != null) {
            throw new BadRequestAlertException("A new bodyMeasurement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BodyMeasurement result = bodyMeasurementService.save(bodyMeasurement);
        return ResponseEntity.created(new URI("/api/body-measurements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /body-measurements} : Updates an existing bodyMeasurement.
     *
     * @param bodyMeasurement the bodyMeasurement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bodyMeasurement,
     * or with status {@code 400 (Bad Request)} if the bodyMeasurement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bodyMeasurement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/body-measurements")
    public ResponseEntity<BodyMeasurement> updateBodyMeasurement(@Valid @RequestBody BodyMeasurement bodyMeasurement) throws URISyntaxException {
        log.debug("REST request to update BodyMeasurement : {}", bodyMeasurement);
        if (bodyMeasurement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BodyMeasurement result = bodyMeasurementService.save(bodyMeasurement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bodyMeasurement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /body-measurements} : get all the bodyMeasurements.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bodyMeasurements in body.
     */
    @GetMapping("/body-measurements")
    public List<BodyMeasurement> getAllBodyMeasurements(@RequestParam(required = false) String filter) {
        if ("appointment-is-null".equals(filter)) {
            log.debug("REST request to get all BodyMeasurements where appointment is null");
            return bodyMeasurementService.findAllWhereAppointmentIsNull();
        }
        log.debug("REST request to get all BodyMeasurements");
        return bodyMeasurementService.findAll();
    }

    /**
     * {@code GET  /body-measurements/:id} : get the "id" bodyMeasurement.
     *
     * @param id the id of the bodyMeasurement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bodyMeasurement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/body-measurements/{id}")
    public ResponseEntity<BodyMeasurement> getBodyMeasurement(@PathVariable Long id) {
        log.debug("REST request to get BodyMeasurement : {}", id);
        Optional<BodyMeasurement> bodyMeasurement = bodyMeasurementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bodyMeasurement);
    }

    /**
     * {@code DELETE  /body-measurements/:id} : delete the "id" bodyMeasurement.
     *
     * @param id the id of the bodyMeasurement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/body-measurements/{id}")
    public ResponseEntity<Void> deleteBodyMeasurement(@PathVariable Long id) {
        log.debug("REST request to delete BodyMeasurement : {}", id);
        bodyMeasurementService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
