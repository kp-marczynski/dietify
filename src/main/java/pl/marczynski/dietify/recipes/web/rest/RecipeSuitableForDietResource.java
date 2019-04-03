package pl.marczynski.dietify.recipes.web.rest;
import pl.marczynski.dietify.recipes.domain.RecipeSuitableForDiet;
import pl.marczynski.dietify.recipes.service.RecipeSuitableForDietService;
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
 * REST controller for managing RecipeSuitableForDiet.
 */
@RestController
@RequestMapping("/api")
public class RecipeSuitableForDietResource {

    private final Logger log = LoggerFactory.getLogger(RecipeSuitableForDietResource.class);

    private static final String ENTITY_NAME = "recipeSuitableForDiet";

    private final RecipeSuitableForDietService recipeSuitableForDietService;

    public RecipeSuitableForDietResource(RecipeSuitableForDietService recipeSuitableForDietService) {
        this.recipeSuitableForDietService = recipeSuitableForDietService;
    }

    /**
     * POST  /recipe-suitable-for-diets : Create a new recipeSuitableForDiet.
     *
     * @param recipeSuitableForDiet the recipeSuitableForDiet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recipeSuitableForDiet, or with status 400 (Bad Request) if the recipeSuitableForDiet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recipe-suitable-for-diets")
    public ResponseEntity<RecipeSuitableForDiet> createRecipeSuitableForDiet(@Valid @RequestBody RecipeSuitableForDiet recipeSuitableForDiet) throws URISyntaxException {
        log.debug("REST request to save RecipeSuitableForDiet : {}", recipeSuitableForDiet);
        if (recipeSuitableForDiet.getId() != null) {
            throw new BadRequestAlertException("A new recipeSuitableForDiet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecipeSuitableForDiet result = recipeSuitableForDietService.save(recipeSuitableForDiet);
        return ResponseEntity.created(new URI("/api/recipe-suitable-for-diets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recipe-suitable-for-diets : Updates an existing recipeSuitableForDiet.
     *
     * @param recipeSuitableForDiet the recipeSuitableForDiet to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recipeSuitableForDiet,
     * or with status 400 (Bad Request) if the recipeSuitableForDiet is not valid,
     * or with status 500 (Internal Server Error) if the recipeSuitableForDiet couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recipe-suitable-for-diets")
    public ResponseEntity<RecipeSuitableForDiet> updateRecipeSuitableForDiet(@Valid @RequestBody RecipeSuitableForDiet recipeSuitableForDiet) throws URISyntaxException {
        log.debug("REST request to update RecipeSuitableForDiet : {}", recipeSuitableForDiet);
        if (recipeSuitableForDiet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecipeSuitableForDiet result = recipeSuitableForDietService.save(recipeSuitableForDiet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recipeSuitableForDiet.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recipe-suitable-for-diets : get all the recipeSuitableForDiets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recipeSuitableForDiets in body
     */
    @GetMapping("/recipe-suitable-for-diets")
    public List<RecipeSuitableForDiet> getAllRecipeSuitableForDiets() {
        log.debug("REST request to get all RecipeSuitableForDiets");
        return recipeSuitableForDietService.findAll();
    }

    /**
     * GET  /recipe-suitable-for-diets/:id : get the "id" recipeSuitableForDiet.
     *
     * @param id the id of the recipeSuitableForDiet to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recipeSuitableForDiet, or with status 404 (Not Found)
     */
    @GetMapping("/recipe-suitable-for-diets/{id}")
    public ResponseEntity<RecipeSuitableForDiet> getRecipeSuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to get RecipeSuitableForDiet : {}", id);
        Optional<RecipeSuitableForDiet> recipeSuitableForDiet = recipeSuitableForDietService.findOne(id);
        return ResponseUtil.wrapOrNotFound(recipeSuitableForDiet);
    }

    /**
     * DELETE  /recipe-suitable-for-diets/:id : delete the "id" recipeSuitableForDiet.
     *
     * @param id the id of the recipeSuitableForDiet to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recipe-suitable-for-diets/{id}")
    public ResponseEntity<Void> deleteRecipeSuitableForDiet(@PathVariable Long id) {
        log.debug("REST request to delete RecipeSuitableForDiet : {}", id);
        recipeSuitableForDietService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
