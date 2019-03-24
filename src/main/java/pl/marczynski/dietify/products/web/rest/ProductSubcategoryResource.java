package pl.marczynski.dietify.products.web.rest;
import pl.marczynski.dietify.products.domain.ProductSubcategory;
import pl.marczynski.dietify.products.service.ProductSubcategoryService;
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
 * REST controller for managing ProductSubcategory.
 */
@RestController
@RequestMapping("/api")
public class ProductSubcategoryResource {

    private final Logger log = LoggerFactory.getLogger(ProductSubcategoryResource.class);

    private static final String ENTITY_NAME = "productSubcategory";

    private final ProductSubcategoryService productSubcategoryService;

    public ProductSubcategoryResource(ProductSubcategoryService productSubcategoryService) {
        this.productSubcategoryService = productSubcategoryService;
    }

    /**
     * POST  /product-subcategories : Create a new productSubcategory.
     *
     * @param productSubcategory the productSubcategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productSubcategory, or with status 400 (Bad Request) if the productSubcategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-subcategories")
    public ResponseEntity<ProductSubcategory> createProductSubcategory(@Valid @RequestBody ProductSubcategory productSubcategory) throws URISyntaxException {
        log.debug("REST request to save ProductSubcategory : {}", productSubcategory);
        if (productSubcategory.getId() != null) {
            throw new BadRequestAlertException("A new productSubcategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductSubcategory result = productSubcategoryService.save(productSubcategory);
        return ResponseEntity.created(new URI("/api/product-subcategories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-subcategories : Updates an existing productSubcategory.
     *
     * @param productSubcategory the productSubcategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productSubcategory,
     * or with status 400 (Bad Request) if the productSubcategory is not valid,
     * or with status 500 (Internal Server Error) if the productSubcategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-subcategories")
    public ResponseEntity<ProductSubcategory> updateProductSubcategory(@Valid @RequestBody ProductSubcategory productSubcategory) throws URISyntaxException {
        log.debug("REST request to update ProductSubcategory : {}", productSubcategory);
        if (productSubcategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductSubcategory result = productSubcategoryService.save(productSubcategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productSubcategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-subcategories : get all the productSubcategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productSubcategories in body
     */
    @GetMapping("/product-subcategories")
    public List<ProductSubcategory> getAllProductSubcategories() {
        log.debug("REST request to get all ProductSubcategories");
        return productSubcategoryService.findAll();
    }

    /**
     * GET  /product-subcategories/:id : get the "id" productSubcategory.
     *
     * @param id the id of the productSubcategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productSubcategory, or with status 404 (Not Found)
     */
    @GetMapping("/product-subcategories/{id}")
    public ResponseEntity<ProductSubcategory> getProductSubcategory(@PathVariable Long id) {
        log.debug("REST request to get ProductSubcategory : {}", id);
        Optional<ProductSubcategory> productSubcategory = productSubcategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productSubcategory);
    }

    /**
     * DELETE  /product-subcategories/:id : delete the "id" productSubcategory.
     *
     * @param id the id of the productSubcategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-subcategories/{id}")
    public ResponseEntity<Void> deleteProductSubcategory(@PathVariable Long id) {
        log.debug("REST request to delete ProductSubcategory : {}", id);
        productSubcategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
