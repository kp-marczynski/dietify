package pl.marczynski.dietify.recipes.web.rest;
import pl.marczynski.dietify.recipes.domain.KitchenAppliance;
import pl.marczynski.dietify.recipes.service.KitchenApplianceService;
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
 * REST controller for managing KitchenAppliance.
 */
@RestController
@RequestMapping("/api")
public class KitchenApplianceResource {

    private final Logger log = LoggerFactory.getLogger(KitchenApplianceResource.class);

    private static final String ENTITY_NAME = "kitchenAppliance";

    private final KitchenApplianceService kitchenApplianceService;

    public KitchenApplianceResource(KitchenApplianceService kitchenApplianceService) {
        this.kitchenApplianceService = kitchenApplianceService;
    }

    /**
     * POST  /kitchen-appliances : Create a new kitchenAppliance.
     *
     * @param kitchenAppliance the kitchenAppliance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new kitchenAppliance, or with status 400 (Bad Request) if the kitchenAppliance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/kitchen-appliances")
    public ResponseEntity<KitchenAppliance> createKitchenAppliance(@Valid @RequestBody KitchenAppliance kitchenAppliance) throws URISyntaxException {
        log.debug("REST request to save KitchenAppliance : {}", kitchenAppliance);
        if (kitchenAppliance.getId() != null) {
            throw new BadRequestAlertException("A new kitchenAppliance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KitchenAppliance result = kitchenApplianceService.save(kitchenAppliance);
        return ResponseEntity.created(new URI("/api/kitchen-appliances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /kitchen-appliances : Updates an existing kitchenAppliance.
     *
     * @param kitchenAppliance the kitchenAppliance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated kitchenAppliance,
     * or with status 400 (Bad Request) if the kitchenAppliance is not valid,
     * or with status 500 (Internal Server Error) if the kitchenAppliance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/kitchen-appliances")
    public ResponseEntity<KitchenAppliance> updateKitchenAppliance(@Valid @RequestBody KitchenAppliance kitchenAppliance) throws URISyntaxException {
        log.debug("REST request to update KitchenAppliance : {}", kitchenAppliance);
        if (kitchenAppliance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KitchenAppliance result = kitchenApplianceService.save(kitchenAppliance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, kitchenAppliance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /kitchen-appliances : get all the kitchenAppliances.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of kitchenAppliances in body
     */
    @GetMapping("/kitchen-appliances")
    public List<KitchenAppliance> getAllKitchenAppliances() {
        log.debug("REST request to get all KitchenAppliances");
        return kitchenApplianceService.findAll();
    }

    /**
     * GET  /kitchen-appliances/:id : get the "id" kitchenAppliance.
     *
     * @param id the id of the kitchenAppliance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the kitchenAppliance, or with status 404 (Not Found)
     */
    @GetMapping("/kitchen-appliances/{id}")
    public ResponseEntity<KitchenAppliance> getKitchenAppliance(@PathVariable Long id) {
        log.debug("REST request to get KitchenAppliance : {}", id);
        Optional<KitchenAppliance> kitchenAppliance = kitchenApplianceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(kitchenAppliance);
    }

    /**
     * DELETE  /kitchen-appliances/:id : delete the "id" kitchenAppliance.
     *
     * @param id the id of the kitchenAppliance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/kitchen-appliances/{id}")
    public ResponseEntity<Void> deleteKitchenAppliance(@PathVariable Long id) {
        log.debug("REST request to delete KitchenAppliance : {}", id);
        kitchenApplianceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
