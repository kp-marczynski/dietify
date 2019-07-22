package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.domain.ProductCategoryTranslation;
import pl.marczynski.dietify.products.service.ProductCategoryTranslationService;
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
 * REST controller for managing {@link pl.marczynski.dietify.products.domain.ProductCategoryTranslation}.
 */
@RestController
@RequestMapping("/api")
public class ProductCategoryTranslationResource {

    private final Logger log = LoggerFactory.getLogger(ProductCategoryTranslationResource.class);

    private static final String ENTITY_NAME = "productsProductCategoryTranslation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductCategoryTranslationService productCategoryTranslationService;

    public ProductCategoryTranslationResource(ProductCategoryTranslationService productCategoryTranslationService) {
        this.productCategoryTranslationService = productCategoryTranslationService;
    }

    /**
     * {@code POST  /product-category-translations} : Create a new productCategoryTranslation.
     *
     * @param productCategoryTranslation the productCategoryTranslation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productCategoryTranslation, or with status {@code 400 (Bad Request)} if the productCategoryTranslation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-category-translations")
    public ResponseEntity<ProductCategoryTranslation> createProductCategoryTranslation(@Valid @RequestBody ProductCategoryTranslation productCategoryTranslation) throws URISyntaxException {
        log.debug("REST request to save ProductCategoryTranslation : {}", productCategoryTranslation);
        if (productCategoryTranslation.getId() != null) {
            throw new BadRequestAlertException("A new productCategoryTranslation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductCategoryTranslation result = productCategoryTranslationService.save(productCategoryTranslation);
        return ResponseEntity.created(new URI("/api/product-category-translations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-category-translations} : Updates an existing productCategoryTranslation.
     *
     * @param productCategoryTranslation the productCategoryTranslation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productCategoryTranslation,
     * or with status {@code 400 (Bad Request)} if the productCategoryTranslation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productCategoryTranslation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-category-translations")
    public ResponseEntity<ProductCategoryTranslation> updateProductCategoryTranslation(@Valid @RequestBody ProductCategoryTranslation productCategoryTranslation) throws URISyntaxException {
        log.debug("REST request to update ProductCategoryTranslation : {}", productCategoryTranslation);
        if (productCategoryTranslation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductCategoryTranslation result = productCategoryTranslationService.save(productCategoryTranslation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productCategoryTranslation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /product-category-translations} : get all the productCategoryTranslations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productCategoryTranslations in body.
     */
    @GetMapping("/product-category-translations")
    public List<ProductCategoryTranslation> getAllProductCategoryTranslations() {
        log.debug("REST request to get all ProductCategoryTranslations");
        return productCategoryTranslationService.findAll();
    }

    /**
     * {@code GET  /product-category-translations/:id} : get the "id" productCategoryTranslation.
     *
     * @param id the id of the productCategoryTranslation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productCategoryTranslation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-category-translations/{id}")
    public ResponseEntity<ProductCategoryTranslation> getProductCategoryTranslation(@PathVariable Long id) {
        log.debug("REST request to get ProductCategoryTranslation : {}", id);
        Optional<ProductCategoryTranslation> productCategoryTranslation = productCategoryTranslationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productCategoryTranslation);
    }

    /**
     * {@code DELETE  /product-category-translations/:id} : delete the "id" productCategoryTranslation.
     *
     * @param id the id of the productCategoryTranslation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-category-translations/{id}")
    public ResponseEntity<Void> deleteProductCategoryTranslation(@PathVariable Long id) {
        log.debug("REST request to delete ProductCategoryTranslation : {}", id);
        productCategoryTranslationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/product-category-translations?query=:query} : search for the productCategoryTranslation corresponding
     * to the query.
     *
     * @param query the query of the productCategoryTranslation search.
     * @return the result of the search.
     */
    @GetMapping("/_search/product-category-translations")
    public List<ProductCategoryTranslation> searchProductCategoryTranslations(@RequestParam String query) {
        log.debug("REST request to search ProductCategoryTranslations for query {}", query);
        return productCategoryTranslationService.search(query);
    }

}
