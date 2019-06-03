package pl.marczynski.dietify.core.web.rest;
import pl.marczynski.dietify.core.domain.BodyMeasurment;
import pl.marczynski.dietify.core.service.BodyMeasurmentService;
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
 * REST controller for managing BodyMeasurment.
 */
@RestController
@RequestMapping("/api")
public class BodyMeasurmentResource {

    private final Logger log = LoggerFactory.getLogger(BodyMeasurmentResource.class);

    private static final String ENTITY_NAME = "bodyMeasurment";

    private final BodyMeasurmentService bodyMeasurmentService;

    public BodyMeasurmentResource(BodyMeasurmentService bodyMeasurmentService) {
        this.bodyMeasurmentService = bodyMeasurmentService;
    }

    /**
     * POST  /body-measurments : Create a new bodyMeasurment.
     *
     * @param bodyMeasurment the bodyMeasurment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bodyMeasurment, or with status 400 (Bad Request) if the bodyMeasurment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/body-measurments")
    public ResponseEntity<BodyMeasurment> createBodyMeasurment(@Valid @RequestBody BodyMeasurment bodyMeasurment) throws URISyntaxException {
        log.debug("REST request to save BodyMeasurment : {}", bodyMeasurment);
        if (bodyMeasurment.getId() != null) {
            throw new BadRequestAlertException("A new bodyMeasurment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BodyMeasurment result = bodyMeasurmentService.save(bodyMeasurment);
        return ResponseEntity.created(new URI("/api/body-measurments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /body-measurments : Updates an existing bodyMeasurment.
     *
     * @param bodyMeasurment the bodyMeasurment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bodyMeasurment,
     * or with status 400 (Bad Request) if the bodyMeasurment is not valid,
     * or with status 500 (Internal Server Error) if the bodyMeasurment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/body-measurments")
    public ResponseEntity<BodyMeasurment> updateBodyMeasurment(@Valid @RequestBody BodyMeasurment bodyMeasurment) throws URISyntaxException {
        log.debug("REST request to update BodyMeasurment : {}", bodyMeasurment);
        if (bodyMeasurment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BodyMeasurment result = bodyMeasurmentService.save(bodyMeasurment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bodyMeasurment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /body-measurments : get all the bodyMeasurments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bodyMeasurments in body
     */
    @GetMapping("/body-measurments")
    public List<BodyMeasurment> getAllBodyMeasurments() {
        log.debug("REST request to get all BodyMeasurments");
        return bodyMeasurmentService.findAll();
    }

    /**
     * GET  /body-measurments/:id : get the "id" bodyMeasurment.
     *
     * @param id the id of the bodyMeasurment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bodyMeasurment, or with status 404 (Not Found)
     */
    @GetMapping("/body-measurments/{id}")
    public ResponseEntity<BodyMeasurment> getBodyMeasurment(@PathVariable Long id) {
        log.debug("REST request to get BodyMeasurment : {}", id);
        Optional<BodyMeasurment> bodyMeasurment = bodyMeasurmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bodyMeasurment);
    }

    /**
     * DELETE  /body-measurments/:id : delete the "id" bodyMeasurment.
     *
     * @param id the id of the bodyMeasurment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/body-measurments/{id}")
    public ResponseEntity<Void> deleteBodyMeasurment(@PathVariable Long id) {
        log.debug("REST request to delete BodyMeasurment : {}", id);
        bodyMeasurmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
