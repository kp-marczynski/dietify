package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.service.RecipeSuitableForDietService;
import pl.marczynski.dietify.recipes.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.recipes.service.dto.RecipeSuitableForDietDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.RecipeSuitableForDiet}.
 */
@RestController
@RequestMapping("/api")
public class RecipeSuitableForDietResource {

    private final Logger log = LoggerFactory.getLogger(RecipeSuitableForDietResource.class);

    private static final String ENTITY_NAME = "recipesRecipeSuitableForDiet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecipeSuitableForDietService recipeSuitableForDietService;

    public RecipeSuitableForDietResource(RecipeSuitableForDietService recipeSuitableForDietService) {
        this.recipeSuitableForDietService = recipeSuitableForDietService;
    }

    /**
     * {@code POST  /recipe-suitable-for-diets} : Create a new recipeSuitableForDiet.
     *
     * @param recipeSuitableForDietDTO the recipeSuitableForDietDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recipeSuitableForDietDTO, or with status {@code 400 (Bad Request)} if the recipeSuitableForDiet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/recipe-suitable-for-diets")
    public ResponseEntity<RecipeSuitableForDietDTO> createRecipeSuitableForDiet(@Valid @RequestBody RecipeSuitableForDietDTO recipeSuitableForDietDTO) throws URISyntaxException {
        log.debug("REST request to save RecipeSuitableForDiet : {}", recipeSuitableForDietDTO);
        if (recipeSuitableForDietDTO.getId() != null) {
            throw new BadRequestAlertException("A new recipeSuitableForDiet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecipeSuitableForDietDTO result = recipeSuitableForDietService.save(recipeSuitableForDietDTO);
        return ResponseEntity.created(new URI("/api/recipe-suitable-for-diets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /recipe-suitable-for-diets} : Updates an existing recipeSuitableForDiet.
     *
     * @param recipeSuitableForDietDTO the recipeSuitableForDietDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recipeSuitableForDietDTO,
     * or with status {@code 400 (Bad Request)} if the recipeSuitableForDietDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recipeSuitableForDietDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/recipe-suitable-for-diets")
    public ResponseEntity<RecipeSuitableForDietDTO> updateRecipeSuitableForDiet(@Valid @RequestBody RecipeSuitableForDietDTO recipeSuitableForDietDTO) throws URISyntaxException {
        log.debug("REST request to update RecipeSuitableForDiet : {}", recipeSuitableForDietDTO);
        if (recipeSuitableForDietDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecipeSuitableForDietDTO result = recipeSuitableForDietService.save(recipeSuitableForDietDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recipeSuitableForDietDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /recipe-suitable-for-diets} : get all the recipeSuitableForDiets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recipeSuitableForDiets in body.
     */
    @GetMapping("/recipe-suitable-for-diets")
    public List<RecipeSuitableForDietDTO> getAllRecipeSuitableForDiets() {
        log.debug("REST request to get all RecipeSuitableForDiets");
        return recipeSuitableForDietService.findAll();
    }

    /**
     * {@code GET  /recipe-suitable-for-diets/:id} : get the "id" recipeSuitableForDiet.
     *
     * @param id the id of the recipeSuitableForDietDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recipeSuitableForDietDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/recipe-suitable-for-diets/{id}")
    public ResponseEntity<RecipeSuitableForDietDTO> getRecipeSuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to get RecipeSuitableForDiet : {}", id);
        Optional<RecipeSuitableForDietDTO> recipeSuitableForDietDTO = recipeSuitableForDietService.findOne(id);
        return ResponseUtil.wrapOrNotFound(recipeSuitableForDietDTO);
    }

    /**
     * {@code DELETE  /recipe-suitable-for-diets/:id} : delete the "id" recipeSuitableForDiet.
     *
     * @param id the id of the recipeSuitableForDietDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/recipe-suitable-for-diets/{id}")
    public ResponseEntity<Void> deleteRecipeSuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to delete RecipeSuitableForDiet : {}", id);
        recipeSuitableForDietService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/recipe-suitable-for-diets?query=:query} : search for the recipeSuitableForDiet corresponding
     * to the query.
     *
     * @param query the query of the recipeSuitableForDiet search.
     * @return the result of the search.
     */
    @GetMapping("/_search/recipe-suitable-for-diets")
    public List<RecipeSuitableForDietDTO> searchRecipeSuitableForDiets(@RequestParam String query) {
        log.debug("REST request to search RecipeSuitableForDiets for query {}", query);
        return recipeSuitableForDietService.search(query);
    }

}
