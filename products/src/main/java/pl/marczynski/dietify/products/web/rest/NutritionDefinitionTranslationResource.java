package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.service.NutritionDefinitionTranslationService;
import pl.marczynski.dietify.products.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.products.service.dto.NutritionDefinitionTranslationDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.products.domain.NutritionDefinitionTranslation}.
 */
@RestController
@RequestMapping("/api")
public class NutritionDefinitionTranslationResource {

    private final Logger log = LoggerFactory.getLogger(NutritionDefinitionTranslationResource.class);

    private static final String ENTITY_NAME = "productsNutritionDefinitionTranslation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NutritionDefinitionTranslationService nutritionDefinitionTranslationService;

    public NutritionDefinitionTranslationResource(NutritionDefinitionTranslationService nutritionDefinitionTranslationService) {
        this.nutritionDefinitionTranslationService = nutritionDefinitionTranslationService;
    }

    /**
     * {@code POST  /nutrition-definition-translations} : Create a new nutritionDefinitionTranslation.
     *
     * @param nutritionDefinitionTranslationDTO the nutritionDefinitionTranslationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nutritionDefinitionTranslationDTO, or with status {@code 400 (Bad Request)} if the nutritionDefinitionTranslation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nutrition-definition-translations")
    public ResponseEntity<NutritionDefinitionTranslationDTO> createNutritionDefinitionTranslation(@Valid @RequestBody NutritionDefinitionTranslationDTO nutritionDefinitionTranslationDTO) throws URISyntaxException {
        log.debug("REST request to save NutritionDefinitionTranslation : {}", nutritionDefinitionTranslationDTO);
        if (nutritionDefinitionTranslationDTO.getId() != null) {
            throw new BadRequestAlertException("A new nutritionDefinitionTranslation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NutritionDefinitionTranslationDTO result = nutritionDefinitionTranslationService.save(nutritionDefinitionTranslationDTO);
        return ResponseEntity.created(new URI("/api/nutrition-definition-translations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nutrition-definition-translations} : Updates an existing nutritionDefinitionTranslation.
     *
     * @param nutritionDefinitionTranslationDTO the nutritionDefinitionTranslationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutritionDefinitionTranslationDTO,
     * or with status {@code 400 (Bad Request)} if the nutritionDefinitionTranslationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nutritionDefinitionTranslationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nutrition-definition-translations")
    public ResponseEntity<NutritionDefinitionTranslationDTO> updateNutritionDefinitionTranslation(@Valid @RequestBody NutritionDefinitionTranslationDTO nutritionDefinitionTranslationDTO) throws URISyntaxException {
        log.debug("REST request to update NutritionDefinitionTranslation : {}", nutritionDefinitionTranslationDTO);
        if (nutritionDefinitionTranslationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NutritionDefinitionTranslationDTO result = nutritionDefinitionTranslationService.save(nutritionDefinitionTranslationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutritionDefinitionTranslationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nutrition-definition-translations} : get all the nutritionDefinitionTranslations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nutritionDefinitionTranslations in body.
     */
    @GetMapping("/nutrition-definition-translations")
    public List<NutritionDefinitionTranslationDTO> getAllNutritionDefinitionTranslations() {
        log.debug("REST request to get all NutritionDefinitionTranslations");
        return nutritionDefinitionTranslationService.findAll();
    }

    /**
     * {@code GET  /nutrition-definition-translations/:id} : get the "id" nutritionDefinitionTranslation.
     *
     * @param id the id of the nutritionDefinitionTranslationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nutritionDefinitionTranslationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nutrition-definition-translations/{id}")
    public ResponseEntity<NutritionDefinitionTranslationDTO> getNutritionDefinitionTranslation(@PathVariable Long id) {
        log.debug("REST request to get NutritionDefinitionTranslation : {}", id);
        Optional<NutritionDefinitionTranslationDTO> nutritionDefinitionTranslationDTO = nutritionDefinitionTranslationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nutritionDefinitionTranslationDTO);
    }

    /**
     * {@code DELETE  /nutrition-definition-translations/:id} : delete the "id" nutritionDefinitionTranslation.
     *
     * @param id the id of the nutritionDefinitionTranslationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nutrition-definition-translations/{id}")
    public ResponseEntity<Void> deleteNutritionDefinitionTranslation(@PathVariable Long id) {
        log.debug("REST request to delete NutritionDefinitionTranslation : {}", id);
        nutritionDefinitionTranslationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/nutrition-definition-translations?query=:query} : search for the nutritionDefinitionTranslation corresponding
     * to the query.
     *
     * @param query the query of the nutritionDefinitionTranslation search.
     * @return the result of the search.
     */
    @GetMapping("/_search/nutrition-definition-translations")
    public List<NutritionDefinitionTranslationDTO> searchNutritionDefinitionTranslations(@RequestParam String query) {
        log.debug("REST request to search NutritionDefinitionTranslations for query {}", query);
        return nutritionDefinitionTranslationService.search(query);
    }

}
