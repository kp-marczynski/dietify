package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.service.DietTypeService;
import pl.marczynski.dietify.products.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.products.service.dto.DietTypeDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.products.domain.DietType}.
 */
@RestController
@RequestMapping("/api")
public class DietTypeResource {

    private final Logger log = LoggerFactory.getLogger(DietTypeResource.class);

    private static final String ENTITY_NAME = "productsDietType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DietTypeService dietTypeService;

    public DietTypeResource(DietTypeService dietTypeService) {
        this.dietTypeService = dietTypeService;
    }

    /**
     * {@code POST  /diet-types} : Create a new dietType.
     *
     * @param dietTypeDTO the dietTypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dietTypeDTO, or with status {@code 400 (Bad Request)} if the dietType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diet-types")
    public ResponseEntity<DietTypeDTO> createDietType(@Valid @RequestBody DietTypeDTO dietTypeDTO) throws URISyntaxException {
        log.debug("REST request to save DietType : {}", dietTypeDTO);
        if (dietTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new dietType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DietTypeDTO result = dietTypeService.save(dietTypeDTO);
        return ResponseEntity.created(new URI("/api/diet-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diet-types} : Updates an existing dietType.
     *
     * @param dietTypeDTO the dietTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dietTypeDTO,
     * or with status {@code 400 (Bad Request)} if the dietTypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dietTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diet-types")
    public ResponseEntity<DietTypeDTO> updateDietType(@Valid @RequestBody DietTypeDTO dietTypeDTO) throws URISyntaxException {
        log.debug("REST request to update DietType : {}", dietTypeDTO);
        if (dietTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DietTypeDTO result = dietTypeService.save(dietTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dietTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diet-types} : get all the dietTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dietTypes in body.
     */
    @GetMapping("/diet-types")
    public List<DietTypeDTO> getAllDietTypes() {
        log.debug("REST request to get all DietTypes");
        return dietTypeService.findAll();
    }

    /**
     * {@code GET  /diet-types/:id} : get the "id" dietType.
     *
     * @param id the id of the dietTypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dietTypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diet-types/{id}")
    public ResponseEntity<DietTypeDTO> getDietType(@PathVariable Long id) {
        log.debug("REST request to get DietType : {}", id);
        Optional<DietTypeDTO> dietTypeDTO = dietTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dietTypeDTO);
    }

    /**
     * {@code DELETE  /diet-types/:id} : delete the "id" dietType.
     *
     * @param id the id of the dietTypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diet-types/{id}")
    public ResponseEntity<Void> deleteDietType(@PathVariable Long id) {
        log.debug("REST request to delete DietType : {}", id);
        dietTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/diet-types?query=:query} : search for the dietType corresponding
     * to the query.
     *
     * @param query the query of the dietType search.
     * @return the result of the search.
     */
    @GetMapping("/_search/diet-types")
    public List<DietTypeDTO> searchDietTypes(@RequestParam String query) {
        log.debug("REST request to search DietTypes for query {}", query);
        return dietTypeService.search(query);
    }

}
