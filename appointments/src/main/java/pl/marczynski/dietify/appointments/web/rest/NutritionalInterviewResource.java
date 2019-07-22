package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.domain.NutritionalInterview;
import pl.marczynski.dietify.appointments.service.NutritionalInterviewService;
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
 * REST controller for managing {@link pl.marczynski.dietify.appointments.domain.NutritionalInterview}.
 */
@RestController
@RequestMapping("/api")
public class NutritionalInterviewResource {

    private final Logger log = LoggerFactory.getLogger(NutritionalInterviewResource.class);

    private static final String ENTITY_NAME = "appointmentsNutritionalInterview";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NutritionalInterviewService nutritionalInterviewService;

    public NutritionalInterviewResource(NutritionalInterviewService nutritionalInterviewService) {
        this.nutritionalInterviewService = nutritionalInterviewService;
    }

    /**
     * {@code POST  /nutritional-interviews} : Create a new nutritionalInterview.
     *
     * @param nutritionalInterview the nutritionalInterview to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nutritionalInterview, or with status {@code 400 (Bad Request)} if the nutritionalInterview has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nutritional-interviews")
    public ResponseEntity<NutritionalInterview> createNutritionalInterview(@Valid @RequestBody NutritionalInterview nutritionalInterview) throws URISyntaxException {
        log.debug("REST request to save NutritionalInterview : {}", nutritionalInterview);
        if (nutritionalInterview.getId() != null) {
            throw new BadRequestAlertException("A new nutritionalInterview cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NutritionalInterview result = nutritionalInterviewService.save(nutritionalInterview);
        return ResponseEntity.created(new URI("/api/nutritional-interviews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nutritional-interviews} : Updates an existing nutritionalInterview.
     *
     * @param nutritionalInterview the nutritionalInterview to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutritionalInterview,
     * or with status {@code 400 (Bad Request)} if the nutritionalInterview is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nutritionalInterview couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nutritional-interviews")
    public ResponseEntity<NutritionalInterview> updateNutritionalInterview(@Valid @RequestBody NutritionalInterview nutritionalInterview) throws URISyntaxException {
        log.debug("REST request to update NutritionalInterview : {}", nutritionalInterview);
        if (nutritionalInterview.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NutritionalInterview result = nutritionalInterviewService.save(nutritionalInterview);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutritionalInterview.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nutritional-interviews} : get all the nutritionalInterviews.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nutritionalInterviews in body.
     */
    @GetMapping("/nutritional-interviews")
    public List<NutritionalInterview> getAllNutritionalInterviews(@RequestParam(required = false) String filter) {
        if ("appointment-is-null".equals(filter)) {
            log.debug("REST request to get all NutritionalInterviews where appointment is null");
            return nutritionalInterviewService.findAllWhereAppointmentIsNull();
        }
        log.debug("REST request to get all NutritionalInterviews");
        return nutritionalInterviewService.findAll();
    }

    /**
     * {@code GET  /nutritional-interviews/:id} : get the "id" nutritionalInterview.
     *
     * @param id the id of the nutritionalInterview to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nutritionalInterview, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nutritional-interviews/{id}")
    public ResponseEntity<NutritionalInterview> getNutritionalInterview(@PathVariable Long id) {
        log.debug("REST request to get NutritionalInterview : {}", id);
        Optional<NutritionalInterview> nutritionalInterview = nutritionalInterviewService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nutritionalInterview);
    }

    /**
     * {@code DELETE  /nutritional-interviews/:id} : delete the "id" nutritionalInterview.
     *
     * @param id the id of the nutritionalInterview to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nutritional-interviews/{id}")
    public ResponseEntity<Void> deleteNutritionalInterview(@PathVariable Long id) {
        log.debug("REST request to delete NutritionalInterview : {}", id);
        nutritionalInterviewService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
