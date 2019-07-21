package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.service.AssignedMealPlanService;
import pl.marczynski.dietify.appointments.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.appointments.service.dto.AssignedMealPlanDTO;

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

/**
 * REST controller for managing {@link pl.marczynski.dietify.appointments.domain.AssignedMealPlan}.
 */
@RestController
@RequestMapping("/api")
public class AssignedMealPlanResource {

    private final Logger log = LoggerFactory.getLogger(AssignedMealPlanResource.class);

    private static final String ENTITY_NAME = "appointmentsAssignedMealPlan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AssignedMealPlanService assignedMealPlanService;

    public AssignedMealPlanResource(AssignedMealPlanService assignedMealPlanService) {
        this.assignedMealPlanService = assignedMealPlanService;
    }

    /**
     * {@code POST  /assigned-meal-plans} : Create a new assignedMealPlan.
     *
     * @param assignedMealPlanDTO the assignedMealPlanDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new assignedMealPlanDTO, or with status {@code 400 (Bad Request)} if the assignedMealPlan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/assigned-meal-plans")
    public ResponseEntity<AssignedMealPlanDTO> createAssignedMealPlan(@Valid @RequestBody AssignedMealPlanDTO assignedMealPlanDTO) throws URISyntaxException {
        log.debug("REST request to save AssignedMealPlan : {}", assignedMealPlanDTO);
        if (assignedMealPlanDTO.getId() != null) {
            throw new BadRequestAlertException("A new assignedMealPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssignedMealPlanDTO result = assignedMealPlanService.save(assignedMealPlanDTO);
        return ResponseEntity.created(new URI("/api/assigned-meal-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /assigned-meal-plans} : Updates an existing assignedMealPlan.
     *
     * @param assignedMealPlanDTO the assignedMealPlanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assignedMealPlanDTO,
     * or with status {@code 400 (Bad Request)} if the assignedMealPlanDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the assignedMealPlanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/assigned-meal-plans")
    public ResponseEntity<AssignedMealPlanDTO> updateAssignedMealPlan(@Valid @RequestBody AssignedMealPlanDTO assignedMealPlanDTO) throws URISyntaxException {
        log.debug("REST request to update AssignedMealPlan : {}", assignedMealPlanDTO);
        if (assignedMealPlanDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AssignedMealPlanDTO result = assignedMealPlanService.save(assignedMealPlanDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignedMealPlanDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /assigned-meal-plans} : get all the assignedMealPlans.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of assignedMealPlans in body.
     */
    @GetMapping("/assigned-meal-plans")
    public List<AssignedMealPlanDTO> getAllAssignedMealPlans() {
        log.debug("REST request to get all AssignedMealPlans");
        return assignedMealPlanService.findAll();
    }

    /**
     * {@code GET  /assigned-meal-plans/:id} : get the "id" assignedMealPlan.
     *
     * @param id the id of the assignedMealPlanDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the assignedMealPlanDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/assigned-meal-plans/{id}")
    public ResponseEntity<AssignedMealPlanDTO> getAssignedMealPlan(@PathVariable Long id) {
        log.debug("REST request to get AssignedMealPlan : {}", id);
        Optional<AssignedMealPlanDTO> assignedMealPlanDTO = assignedMealPlanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(assignedMealPlanDTO);
    }

    /**
     * {@code DELETE  /assigned-meal-plans/:id} : delete the "id" assignedMealPlan.
     *
     * @param id the id of the assignedMealPlanDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/assigned-meal-plans/{id}")
    public ResponseEntity<Void> deleteAssignedMealPlan(@PathVariable Long id) {
        log.debug("REST request to delete AssignedMealPlan : {}", id);
        assignedMealPlanService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
