package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.domain.ProductPortion;
import pl.marczynski.dietify.recipes.service.ProductPortionService;
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
 * REST controller for managing {@link pl.marczynski.dietify.recipes.domain.ProductPortion}.
 */
@RestController
@RequestMapping("/api")
public class ProductPortionResource {

    private final Logger log = LoggerFactory.getLogger(ProductPortionResource.class);

    private static final String ENTITY_NAME = "recipesProductPortion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductPortionService productPortionService;

    public ProductPortionResource(ProductPortionService productPortionService) {
        this.productPortionService = productPortionService;
    }

    /**
     * {@code POST  /product-portions} : Create a new productPortion.
     *
     * @param productPortion the productPortion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productPortion, or with status {@code 400 (Bad Request)} if the productPortion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-portions")
    public ResponseEntity<ProductPortion> createProductPortion(@Valid @RequestBody ProductPortion productPortion) throws URISyntaxException {
        log.debug("REST request to save ProductPortion : {}", productPortion);
        if (productPortion.getId() != null) {
            throw new BadRequestAlertException("A new productPortion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductPortion result = productPortionService.save(productPortion);
        return ResponseEntity.created(new URI("/api/product-portions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-portions} : Updates an existing productPortion.
     *
     * @param productPortion the productPortion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productPortion,
     * or with status {@code 400 (Bad Request)} if the productPortion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productPortion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-portions")
    public ResponseEntity<ProductPortion> updateProductPortion(@Valid @RequestBody ProductPortion productPortion) throws URISyntaxException {
        log.debug("REST request to update ProductPortion : {}", productPortion);
        if (productPortion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductPortion result = productPortionService.save(productPortion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productPortion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /product-portions} : get all the productPortions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productPortions in body.
     */
    @GetMapping("/product-portions")
    public List<ProductPortion> getAllProductPortions() {
        log.debug("REST request to get all ProductPortions");
        return productPortionService.findAll();
    }

    /**
     * {@code GET  /product-portions/:id} : get the "id" productPortion.
     *
     * @param id the id of the productPortion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productPortion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-portions/{id}")
    public ResponseEntity<ProductPortion> getProductPortion(@PathVariable Long id) {
        log.debug("REST request to get ProductPortion : {}", id);
        Optional<ProductPortion> productPortion = productPortionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productPortion);
    }

    /**
     * {@code DELETE  /product-portions/:id} : delete the "id" productPortion.
     *
     * @param id the id of the productPortion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-portions/{id}")
    public ResponseEntity<Void> deleteProductPortion(@PathVariable Long id) {
        log.debug("REST request to delete ProductPortion : {}", id);
        productPortionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/product-portions?query=:query} : search for the productPortion corresponding
     * to the query.
     *
     * @param query the query of the productPortion search.
     * @return the result of the search.
     */
    @GetMapping("/_search/product-portions")
    public List<ProductPortion> searchProductPortions(@RequestParam String query) {
        log.debug("REST request to search ProductPortions for query {}", query);
        return productPortionService.search(query);
    }

}
