package pl.marczynski.dietify.mealplans.web.rest;

import pl.marczynski.dietify.mealplans.service.MealProductService;
import pl.marczynski.dietify.mealplans.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.mealplans.service.dto.MealProductDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.mealplans.domain.MealProduct}.
 */
@RestController
@RequestMapping("/api")
public class MealProductResource {

    private final Logger log = LoggerFactory.getLogger(MealProductResource.class);

    private static final String ENTITY_NAME = "mealplansMealProduct";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealProductService mealProductService;

    public MealProductResource(MealProductService mealProductService) {
        this.mealProductService = mealProductService;
    }

    /**
     * {@code POST  /meal-products} : Create a new mealProduct.
     *
     * @param mealProductDTO the mealProductDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealProductDTO, or with status {@code 400 (Bad Request)} if the mealProduct has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-products")
    public ResponseEntity<MealProductDTO> createMealProduct(@Valid @RequestBody MealProductDTO mealProductDTO) throws URISyntaxException {
        log.debug("REST request to save MealProduct : {}", mealProductDTO);
        if (mealProductDTO.getId() != null) {
            throw new BadRequestAlertException("A new mealProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealProductDTO result = mealProductService.save(mealProductDTO);
        return ResponseEntity.created(new URI("/api/meal-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-products} : Updates an existing mealProduct.
     *
     * @param mealProductDTO the mealProductDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealProductDTO,
     * or with status {@code 400 (Bad Request)} if the mealProductDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealProductDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-products")
    public ResponseEntity<MealProductDTO> updateMealProduct(@Valid @RequestBody MealProductDTO mealProductDTO) throws URISyntaxException {
        log.debug("REST request to update MealProduct : {}", mealProductDTO);
        if (mealProductDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealProductDTO result = mealProductService.save(mealProductDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mealProductDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-products} : get all the mealProducts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealProducts in body.
     */
    @GetMapping("/meal-products")
    public List<MealProductDTO> getAllMealProducts() {
        log.debug("REST request to get all MealProducts");
        return mealProductService.findAll();
    }

    /**
     * {@code GET  /meal-products/:id} : get the "id" mealProduct.
     *
     * @param id the id of the mealProductDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealProductDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-products/{id}")
    public ResponseEntity<MealProductDTO> getMealProduct(@PathVariable Long id) {
        log.debug("REST request to get MealProduct : {}", id);
        Optional<MealProductDTO> mealProductDTO = mealProductService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mealProductDTO);
    }

    /**
     * {@code DELETE  /meal-products/:id} : delete the "id" mealProduct.
     *
     * @param id the id of the mealProductDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-products/{id}")
    public ResponseEntity<Void> deleteMealProduct(@PathVariable Long id) {
        log.debug("REST request to delete MealProduct : {}", id);
        mealProductService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-products?query=:query} : search for the mealProduct corresponding
     * to the query.
     *
     * @param query the query of the mealProduct search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-products")
    public List<MealProductDTO> searchMealProducts(@RequestParam String query) {
        log.debug("REST request to search MealProducts for query {}", query);
        return mealProductService.search(query);
    }

}
