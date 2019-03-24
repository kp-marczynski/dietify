package pl.marczynski.dietify.products.web.rest;
import org.springframework.security.access.prepost.PreAuthorize;
import pl.marczynski.dietify.core.security.AuthoritiesConstants;
import pl.marczynski.dietify.products.domain.DietType;
import pl.marczynski.dietify.products.service.DietTypeService;
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
 * REST controller for managing DietType.
 */
@RestController
@RequestMapping("/api")
public class DietTypeResource {

    private final Logger log = LoggerFactory.getLogger(DietTypeResource.class);

    private static final String ENTITY_NAME = "dietType";

    private final DietTypeService dietTypeService;

    public DietTypeResource(DietTypeService dietTypeService) {
        this.dietTypeService = dietTypeService;
    }

    /**
     * POST  /diet-types : Create a new dietType.
     *
     * @param dietType the dietType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dietType, or with status 400 (Bad Request) if the dietType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/diet-types")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<DietType> createDietType(@Valid @RequestBody DietType dietType) throws URISyntaxException {
        log.debug("REST request to save DietType : {}", dietType);
        if (dietType.getId() != null) {
            throw new BadRequestAlertException("A new dietType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DietType result = dietTypeService.save(dietType);
        return ResponseEntity.created(new URI("/api/diet-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /diet-types : Updates an existing dietType.
     *
     * @param dietType the dietType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dietType,
     * or with status 400 (Bad Request) if the dietType is not valid,
     * or with status 500 (Internal Server Error) if the dietType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/diet-types")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<DietType> updateDietType(@Valid @RequestBody DietType dietType) throws URISyntaxException {
        log.debug("REST request to update DietType : {}", dietType);
        if (dietType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DietType result = dietTypeService.save(dietType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dietType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /diet-types : get all the dietTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dietTypes in body
     */
    @GetMapping("/diet-types")
    public List<DietType> getAllDietTypes() {
        log.debug("REST request to get all DietTypes");
        return dietTypeService.findAll();
    }

    /**
     * GET  /diet-types/:id : get the "id" dietType.
     *
     * @param id the id of the dietType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dietType, or with status 404 (Not Found)
     */
    @GetMapping("/diet-types/{id}")
    public ResponseEntity<DietType> getDietType(@PathVariable Long id) {
        log.debug("REST request to get DietType : {}", id);
        Optional<DietType> dietType = dietTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dietType);
    }

    /**
     * DELETE  /diet-types/:id : delete the "id" dietType.
     *
     * @param id the id of the dietType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/diet-types/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteDietType(@PathVariable Long id) {
        log.debug("REST request to delete DietType : {}", id);
        dietTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
