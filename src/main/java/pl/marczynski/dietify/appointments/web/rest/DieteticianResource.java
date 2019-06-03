package pl.marczynski.dietify.appointments.web.rest;
import pl.marczynski.dietify.appointments.domain.Dietetician;
import pl.marczynski.dietify.appointments.service.DieteticianService;
import pl.marczynski.dietify.core.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.core.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Dietetician.
 */
@RestController
@RequestMapping("/api")
public class DieteticianResource {

    private final Logger log = LoggerFactory.getLogger(DieteticianResource.class);

    private static final String ENTITY_NAME = "dietetician";

    private final DieteticianService dieteticianService;

    public DieteticianResource(DieteticianService dieteticianService) {
        this.dieteticianService = dieteticianService;
    }

    /**
     * POST  /dieteticians : Create a new dietetician.
     *
     * @param dietetician the dietetician to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dietetician, or with status 400 (Bad Request) if the dietetician has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dieteticians")
    public ResponseEntity<Dietetician> createDietetician(@RequestBody Dietetician dietetician) throws URISyntaxException {
        log.debug("REST request to save Dietetician : {}", dietetician);
        if (dietetician.getId() != null) {
            throw new BadRequestAlertException("A new dietetician cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dietetician result = dieteticianService.save(dietetician);
        return ResponseEntity.created(new URI("/api/dieteticians/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dieteticians : Updates an existing dietetician.
     *
     * @param dietetician the dietetician to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dietetician,
     * or with status 400 (Bad Request) if the dietetician is not valid,
     * or with status 500 (Internal Server Error) if the dietetician couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dieteticians")
    public ResponseEntity<Dietetician> updateDietetician(@RequestBody Dietetician dietetician) throws URISyntaxException {
        log.debug("REST request to update Dietetician : {}", dietetician);
        if (dietetician.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dietetician result = dieteticianService.save(dietetician);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dietetician.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dieteticians : get all the dieteticians.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dieteticians in body
     */
    @GetMapping("/dieteticians")
    public List<Dietetician> getAllDieteticians() {
        log.debug("REST request to get all Dieteticians");
        return dieteticianService.findAll();
    }

    /**
     * GET  /dieteticians/:id : get the "id" dietetician.
     *
     * @param id the id of the dietetician to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dietetician, or with status 404 (Not Found)
     */
    @GetMapping("/dieteticians/{id}")
    public ResponseEntity<Dietetician> getDietetician(@PathVariable Long id) {
        log.debug("REST request to get Dietetician : {}", id);
        Optional<Dietetician> dietetician = dieteticianService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dietetician);
    }

    /**
     * DELETE  /dieteticians/:id : delete the "id" dietetician.
     *
     * @param id the id of the dietetician to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dieteticians/{id}")
    public ResponseEntity<Void> deleteDietetician(@PathVariable Long id) {
        log.debug("REST request to delete Dietetician : {}", id);
        dieteticianService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
