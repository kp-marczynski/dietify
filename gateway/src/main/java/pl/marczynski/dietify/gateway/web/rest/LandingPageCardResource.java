package pl.marczynski.dietify.gateway.web.rest;

import pl.marczynski.dietify.gateway.service.LandingPageCardService;
import pl.marczynski.dietify.gateway.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.gateway.service.dto.LandingPageCardDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.gateway.domain.LandingPageCard}.
 */
@RestController
@RequestMapping("/api")
public class LandingPageCardResource {

    private final Logger log = LoggerFactory.getLogger(LandingPageCardResource.class);

    private static final String ENTITY_NAME = "landingPageCard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LandingPageCardService landingPageCardService;

    public LandingPageCardResource(LandingPageCardService landingPageCardService) {
        this.landingPageCardService = landingPageCardService;
    }

    /**
     * {@code POST  /landing-page-cards} : Create a new landingPageCard.
     *
     * @param landingPageCardDTO the landingPageCardDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new landingPageCardDTO, or with status {@code 400 (Bad Request)} if the landingPageCard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/landing-page-cards")
    public ResponseEntity<LandingPageCardDTO> createLandingPageCard(@Valid @RequestBody LandingPageCardDTO landingPageCardDTO) throws URISyntaxException {
        log.debug("REST request to save LandingPageCard : {}", landingPageCardDTO);
        if (landingPageCardDTO.getId() != null) {
            throw new BadRequestAlertException("A new landingPageCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LandingPageCardDTO result = landingPageCardService.save(landingPageCardDTO);
        return ResponseEntity.created(new URI("/api/landing-page-cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /landing-page-cards} : Updates an existing landingPageCard.
     *
     * @param landingPageCardDTO the landingPageCardDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated landingPageCardDTO,
     * or with status {@code 400 (Bad Request)} if the landingPageCardDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the landingPageCardDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/landing-page-cards")
    public ResponseEntity<LandingPageCardDTO> updateLandingPageCard(@Valid @RequestBody LandingPageCardDTO landingPageCardDTO) throws URISyntaxException {
        log.debug("REST request to update LandingPageCard : {}", landingPageCardDTO);
        if (landingPageCardDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LandingPageCardDTO result = landingPageCardService.save(landingPageCardDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, landingPageCardDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /landing-page-cards} : get all the landingPageCards.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of landingPageCards in body.
     */
    @GetMapping("/landing-page-cards")
    public List<LandingPageCardDTO> getAllLandingPageCards() {
        log.debug("REST request to get all LandingPageCards");
        return landingPageCardService.findAll();
    }

    /**
     * {@code GET  /landing-page-cards/:id} : get the "id" landingPageCard.
     *
     * @param id the id of the landingPageCardDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the landingPageCardDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/landing-page-cards/{id}")
    public ResponseEntity<LandingPageCardDTO> getLandingPageCard(@PathVariable Long id) {
        log.debug("REST request to get LandingPageCard : {}", id);
        Optional<LandingPageCardDTO> landingPageCardDTO = landingPageCardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(landingPageCardDTO);
    }

    /**
     * {@code DELETE  /landing-page-cards/:id} : delete the "id" landingPageCard.
     *
     * @param id the id of the landingPageCardDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/landing-page-cards/{id}")
    public ResponseEntity<Void> deleteLandingPageCard(@PathVariable Long id) {
        log.debug("REST request to delete LandingPageCard : {}", id);
        landingPageCardService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/landing-page-cards?query=:query} : search for the landingPageCard corresponding
     * to the query.
     *
     * @param query the query of the landingPageCard search.
     * @return the result of the search.
     */
    @GetMapping("/_search/landing-page-cards")
    public List<LandingPageCardDTO> searchLandingPageCards(@RequestParam String query) {
        log.debug("REST request to search LandingPageCards for query {}", query);
        return landingPageCardService.search(query);
    }

}
