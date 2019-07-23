package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.domain.DishType;
import pl.marczynski.dietify.recipes.service.DishTypeService;
import pl.marczynski.dietify.recipes.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.DishType}.
 */
@RestController
@RequestMapping("/api")
public class DishTypeResource {

    private final Logger log = LoggerFactory.getLogger(DishTypeResource.class);

    private static final String ENTITY_NAME = "recipesDishType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DishTypeService dishTypeService;

    public DishTypeResource(DishTypeService dishTypeService) {
        this.dishTypeService = dishTypeService;
    }

    /**
     * {@code POST  /dish-types} : Create a new dishType.
     *
     * @param dishType the dishType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dishType, or with status {@code 400 (Bad Request)} if the dishType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dish-types")
    public ResponseEntity<DishType> createDishType(@Valid @RequestBody DishType dishType) throws URISyntaxException {
        log.debug("REST request to save DishType : {}", dishType);
        if (dishType.getId() != null) {
            throw new BadRequestAlertException("A new dishType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DishType result = dishTypeService.save(dishType);
        return ResponseEntity.created(new URI("/api/dish-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dish-types} : Updates an existing dishType.
     *
     * @param dishType the dishType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dishType,
     * or with status {@code 400 (Bad Request)} if the dishType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dishType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dish-types")
    public ResponseEntity<DishType> updateDishType(@Valid @RequestBody DishType dishType) throws URISyntaxException {
        log.debug("REST request to update DishType : {}", dishType);
        if (dishType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DishType result = dishTypeService.save(dishType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dishType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dish-types} : get all the dishTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dishTypes in body.
     */
    @GetMapping("/dish-types")
    public List<DishType> getAllDishTypes() {
        log.debug("REST request to get all DishTypes");
        return dishTypeService.findAll();
    }

    /**
     * {@code GET  /dish-types/:id} : get the "id" dishType.
     *
     * @param id the id of the dishType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dishType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dish-types/{id}")
    public ResponseEntity<DishType> getDishType(@PathVariable Long id) {
        log.debug("REST request to get DishType : {}", id);
        Optional<DishType> dishType = dishTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dishType);
    }

    /**
     * {@code DELETE  /dish-types/:id} : delete the "id" dishType.
     *
     * @param id the id of the dishType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dish-types/{id}")
    public ResponseEntity<Void> deleteDishType(@PathVariable Long id) {
        log.debug("REST request to delete DishType : {}", id);
        dishTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/dish-types?query=:query} : search for the dishType corresponding
     * to the query.
     *
     * @param query the query of the dishType search.
     * @return the result of the search.
     */
    @GetMapping("/_search/dish-types")
    public List<DishType> searchDishTypes(@RequestParam String query) {
        log.debug("REST request to search DishTypes for query {}", query);
        return dishTypeService.search(query);
    }

}
