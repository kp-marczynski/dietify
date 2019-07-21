package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.service.KitchenApplianceTranslationService;
import pl.marczynski.dietify.recipes.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.recipes.service.dto.KitchenApplianceTranslationDTO;

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

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.KitchenApplianceTranslation}.
 */
@RestController
@RequestMapping("/api")
public class KitchenApplianceTranslationResource {

    private final Logger log = LoggerFactory.getLogger(KitchenApplianceTranslationResource.class);

    private static final String ENTITY_NAME = "recipesKitchenApplianceTranslation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KitchenApplianceTranslationService kitchenApplianceTranslationService;

    public KitchenApplianceTranslationResource(KitchenApplianceTranslationService kitchenApplianceTranslationService) {
        this.kitchenApplianceTranslationService = kitchenApplianceTranslationService;
    }

    /**
     * {@code POST  /kitchen-appliance-translations} : Create a new kitchenApplianceTranslation.
     *
     * @param kitchenApplianceTranslationDTO the kitchenApplianceTranslationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kitchenApplianceTranslationDTO, or with status {@code 400 (Bad Request)} if the kitchenApplianceTranslation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kitchen-appliance-translations")
    public ResponseEntity<KitchenApplianceTranslationDTO> createKitchenApplianceTranslation(@Valid @RequestBody KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO) throws URISyntaxException {
        log.debug("REST request to save KitchenApplianceTranslation : {}", kitchenApplianceTranslationDTO);
        if (kitchenApplianceTranslationDTO.getId() != null) {
            throw new BadRequestAlertException("A new kitchenApplianceTranslation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KitchenApplianceTranslationDTO result = kitchenApplianceTranslationService.save(kitchenApplianceTranslationDTO);
        return ResponseEntity.created(new URI("/api/kitchen-appliance-translations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kitchen-appliance-translations} : Updates an existing kitchenApplianceTranslation.
     *
     * @param kitchenApplianceTranslationDTO the kitchenApplianceTranslationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kitchenApplianceTranslationDTO,
     * or with status {@code 400 (Bad Request)} if the kitchenApplianceTranslationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kitchenApplianceTranslationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kitchen-appliance-translations")
    public ResponseEntity<KitchenApplianceTranslationDTO> updateKitchenApplianceTranslation(@Valid @RequestBody KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO) throws URISyntaxException {
        log.debug("REST request to update KitchenApplianceTranslation : {}", kitchenApplianceTranslationDTO);
        if (kitchenApplianceTranslationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KitchenApplianceTranslationDTO result = kitchenApplianceTranslationService.save(kitchenApplianceTranslationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, kitchenApplianceTranslationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /kitchen-appliance-translations} : get all the kitchenApplianceTranslations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kitchenApplianceTranslations in body.
     */
    @GetMapping("/kitchen-appliance-translations")
    public List<KitchenApplianceTranslationDTO> getAllKitchenApplianceTranslations() {
        log.debug("REST request to get all KitchenApplianceTranslations");
        return kitchenApplianceTranslationService.findAll();
    }

    /**
     * {@code GET  /kitchen-appliance-translations/:id} : get the "id" kitchenApplianceTranslation.
     *
     * @param id the id of the kitchenApplianceTranslationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kitchenApplianceTranslationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kitchen-appliance-translations/{id}")
    public ResponseEntity<KitchenApplianceTranslationDTO> getKitchenApplianceTranslation(@PathVariable Long id) {
        log.debug("REST request to get KitchenApplianceTranslation : {}", id);
        Optional<KitchenApplianceTranslationDTO> kitchenApplianceTranslationDTO = kitchenApplianceTranslationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(kitchenApplianceTranslationDTO);
    }

    /**
     * {@code DELETE  /kitchen-appliance-translations/:id} : delete the "id" kitchenApplianceTranslation.
     *
     * @param id the id of the kitchenApplianceTranslationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kitchen-appliance-translations/{id}")
    public ResponseEntity<Void> deleteKitchenApplianceTranslation(@PathVariable Long id) {
        log.debug("REST request to delete KitchenApplianceTranslation : {}", id);
        kitchenApplianceTranslationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/kitchen-appliance-translations?query=:query} : search for the kitchenApplianceTranslation corresponding
     * to the query.
     *
     * @param query the query of the kitchenApplianceTranslation search.
     * @return the result of the search.
     */
    @GetMapping("/_search/kitchen-appliance-translations")
    public List<KitchenApplianceTranslationDTO> searchKitchenApplianceTranslations(@RequestParam String query) {
        log.debug("REST request to search KitchenApplianceTranslations for query {}", query);
        return kitchenApplianceTranslationService.search(query);
    }

}
