package pl.marczynski.dietify.recipes.web.rest;

import io.github.jhipster.web.util.ResponseUtil;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.marczynski.dietify.core.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.core.web.rest.util.HeaderUtil;
import pl.marczynski.dietify.core.web.rest.util.PaginationUtil;
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.service.RecipeService;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Recipe.
 */
@RestController
@RequestMapping("/api")
public class RecipeResource {

    private final Logger log = LoggerFactory.getLogger(RecipeResource.class);

    private static final String ENTITY_NAME = "recipe";

    private final RecipeService recipeService;

    public RecipeResource(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    /**
     * POST  /recipes : Create a new recipe.
     *
     * @param recipe the recipe to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recipe, or with status 400 (Bad Request) if the recipe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recipes")
    public ResponseEntity<Recipe> createRecipe(@Valid @RequestBody Recipe recipe) throws URISyntaxException {
        log.debug("REST request to save Recipe : {}", recipe);
        if (recipe.getId() != null) {
            throw new BadRequestAlertException("A new recipe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recipe result = recipeService.save(recipe);
        return ResponseEntity.created(new URI("/api/recipes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recipes : Updates an existing recipe.
     *
     * @param recipe the recipe to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recipe,
     * or with status 400 (Bad Request) if the recipe is not valid,
     * or with status 500 (Internal Server Error) if the recipe couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recipes")
    public ResponseEntity<Recipe> updateRecipe(@Valid @RequestBody Recipe recipe) throws URISyntaxException {
        log.debug("REST request to update Recipe : {}", recipe);
        if (recipe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Recipe result = recipeService.save(recipe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recipe.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recipes : get all the recipes.
     *
     * @param pageable  the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of recipes in body
     */
    @GetMapping("/recipes")
    public ResponseEntity<List<Recipe>> getAllRecipes(Pageable pageable,
                                                      @RequestParam(required = false, defaultValue = "false") boolean eagerload,
                                                      @RequestParam(required = false) String search,
                                                      @RequestParam(required = false) Long languageId) {
        log.debug("REST request to get a page of Recipes");
        Page<Recipe> page;
        if (search != null) {
            page = recipeService.findBySearchAndFilters(search, languageId, pageable);
        } else if (eagerload) {
            page = recipeService.findAllWithEagerRelationships(pageable);
        } else {
            page = recipeService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/recipes?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /recipes/:id : get the "id" recipe.
     *
     * @param id the id of the recipe to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recipe, or with status 404 (Not Found)
     */
    @GetMapping("/recipes/{id}")
    public ResponseEntity<Recipe> getRecipe(@PathVariable Long id) {
        log.debug("REST request to get Recipe : {}", id);
        Optional<Recipe> recipe = recipeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(recipe);
    }

    /**
     * DELETE  /recipes/:id : delete the "id" recipe.
     *
     * @param id the id of the recipe to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recipes/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        log.debug("REST request to delete Recipe : {}", id);
        try {
            recipeService.delete(id);
        } catch (NotFoundException e) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idNotExist");
        }
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
