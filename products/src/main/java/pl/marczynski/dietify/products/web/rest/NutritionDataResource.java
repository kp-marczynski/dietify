package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.domain.NutritionData;
import pl.marczynski.dietify.products.service.NutritionDataService;
import pl.marczynski.dietify.products.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link pl.marczynski.dietify.products.domain.NutritionData}.
 */
@RestController
@RequestMapping("/api")
public class NutritionDataResource {

    private final Logger log = LoggerFactory.getLogger(NutritionDataResource.class);

    private static final String ENTITY_NAME = "productsNutritionData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NutritionDataService nutritionDataService;

    public NutritionDataResource(NutritionDataService nutritionDataService) {
        this.nutritionDataService = nutritionDataService;
    }

    /**
     * {@code POST  /nutrition-data} : Create a new nutritionData.
     *
     * @param nutritionData the nutritionData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nutritionData, or with status {@code 400 (Bad Request)} if the nutritionData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nutrition-data")
    public ResponseEntity<NutritionData> createNutritionData(@Valid @RequestBody NutritionData nutritionData) throws URISyntaxException {
        log.debug("REST request to save NutritionData : {}", nutritionData);
        if (nutritionData.getId() != null) {
            throw new BadRequestAlertException("A new nutritionData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NutritionData result = nutritionDataService.save(nutritionData);
        return ResponseEntity.created(new URI("/api/nutrition-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nutrition-data} : Updates an existing nutritionData.
     *
     * @param nutritionData the nutritionData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutritionData,
     * or with status {@code 400 (Bad Request)} if the nutritionData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nutritionData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nutrition-data")
    public ResponseEntity<NutritionData> updateNutritionData(@Valid @RequestBody NutritionData nutritionData) throws URISyntaxException {
        log.debug("REST request to update NutritionData : {}", nutritionData);
        if (nutritionData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NutritionData result = nutritionDataService.save(nutritionData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutritionData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nutrition-data} : get all the nutritionData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nutritionData in body.
     */
    @GetMapping("/nutrition-data")
    public List<NutritionData> getAllNutritionData() {
        log.debug("REST request to get all NutritionData");
        return nutritionDataService.findAll();
    }

    /**
     * {@code GET  /nutrition-data/:id} : get the "id" nutritionData.
     *
     * @param id the id of the nutritionData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nutritionData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nutrition-data/{id}")
    public ResponseEntity<NutritionData> getNutritionData(@PathVariable Long id) {
        log.debug("REST request to get NutritionData : {}", id);
        Optional<NutritionData> nutritionData = nutritionDataService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nutritionData);
    }

    /**
     * {@code DELETE  /nutrition-data/:id} : delete the "id" nutritionData.
     *
     * @param id the id of the nutritionData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nutrition-data/{id}")
    public ResponseEntity<Void> deleteNutritionData(@PathVariable Long id) {
        log.debug("REST request to delete NutritionData : {}", id);
        nutritionDataService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/nutrition-data?query=:query} : search for the nutritionData corresponding
     * to the query.
     *
     * @param query the query of the nutritionData search.
     * @return the result of the search.
     */
    @GetMapping("/_search/nutrition-data")
    public List<NutritionData> searchNutritionData(@RequestParam String query) {
        log.debug("REST request to search NutritionData for query {}", query);
        return nutritionDataService.search(query);
    }

}
