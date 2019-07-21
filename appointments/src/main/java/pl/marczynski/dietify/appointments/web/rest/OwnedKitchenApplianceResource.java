package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.service.OwnedKitchenApplianceService;
import pl.marczynski.dietify.appointments.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.appointments.service.dto.OwnedKitchenApplianceDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.appointments.domain.OwnedKitchenAppliance}.
 */
@RestController
@RequestMapping("/api")
public class OwnedKitchenApplianceResource {

    private final Logger log = LoggerFactory.getLogger(OwnedKitchenApplianceResource.class);

    private static final String ENTITY_NAME = "appointmentsOwnedKitchenAppliance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OwnedKitchenApplianceService ownedKitchenApplianceService;

    public OwnedKitchenApplianceResource(OwnedKitchenApplianceService ownedKitchenApplianceService) {
        this.ownedKitchenApplianceService = ownedKitchenApplianceService;
    }

    /**
     * {@code POST  /owned-kitchen-appliances} : Create a new ownedKitchenAppliance.
     *
     * @param ownedKitchenApplianceDTO the ownedKitchenApplianceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ownedKitchenApplianceDTO, or with status {@code 400 (Bad Request)} if the ownedKitchenAppliance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/owned-kitchen-appliances")
    public ResponseEntity<OwnedKitchenApplianceDTO> createOwnedKitchenAppliance(@Valid @RequestBody OwnedKitchenApplianceDTO ownedKitchenApplianceDTO) throws URISyntaxException {
        log.debug("REST request to save OwnedKitchenAppliance : {}", ownedKitchenApplianceDTO);
        if (ownedKitchenApplianceDTO.getId() != null) {
            throw new BadRequestAlertException("A new ownedKitchenAppliance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OwnedKitchenApplianceDTO result = ownedKitchenApplianceService.save(ownedKitchenApplianceDTO);
        return ResponseEntity.created(new URI("/api/owned-kitchen-appliances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /owned-kitchen-appliances} : Updates an existing ownedKitchenAppliance.
     *
     * @param ownedKitchenApplianceDTO the ownedKitchenApplianceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ownedKitchenApplianceDTO,
     * or with status {@code 400 (Bad Request)} if the ownedKitchenApplianceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ownedKitchenApplianceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/owned-kitchen-appliances")
    public ResponseEntity<OwnedKitchenApplianceDTO> updateOwnedKitchenAppliance(@Valid @RequestBody OwnedKitchenApplianceDTO ownedKitchenApplianceDTO) throws URISyntaxException {
        log.debug("REST request to update OwnedKitchenAppliance : {}", ownedKitchenApplianceDTO);
        if (ownedKitchenApplianceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OwnedKitchenApplianceDTO result = ownedKitchenApplianceService.save(ownedKitchenApplianceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ownedKitchenApplianceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /owned-kitchen-appliances} : get all the ownedKitchenAppliances.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ownedKitchenAppliances in body.
     */
    @GetMapping("/owned-kitchen-appliances")
    public List<OwnedKitchenApplianceDTO> getAllOwnedKitchenAppliances() {
        log.debug("REST request to get all OwnedKitchenAppliances");
        return ownedKitchenApplianceService.findAll();
    }

    /**
     * {@code GET  /owned-kitchen-appliances/:id} : get the "id" ownedKitchenAppliance.
     *
     * @param id the id of the ownedKitchenApplianceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ownedKitchenApplianceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/owned-kitchen-appliances/{id}")
    public ResponseEntity<OwnedKitchenApplianceDTO> getOwnedKitchenAppliance(@PathVariable Long id) {
        log.debug("REST request to get OwnedKitchenAppliance : {}", id);
        Optional<OwnedKitchenApplianceDTO> ownedKitchenApplianceDTO = ownedKitchenApplianceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ownedKitchenApplianceDTO);
    }

    /**
     * {@code DELETE  /owned-kitchen-appliances/:id} : delete the "id" ownedKitchenAppliance.
     *
     * @param id the id of the ownedKitchenApplianceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/owned-kitchen-appliances/{id}")
    public ResponseEntity<Void> deleteOwnedKitchenAppliance(@PathVariable Long id) {
        log.debug("REST request to delete OwnedKitchenAppliance : {}", id);
        ownedKitchenApplianceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
