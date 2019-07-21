package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.service.ProductSubcategoryService;
import pl.marczynski.dietify.products.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.products.service.dto.ProductSubcategoryDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.products.domain.ProductSubcategory}.
 */
@RestController
@RequestMapping("/api")
public class ProductSubcategoryResource {

    private final Logger log = LoggerFactory.getLogger(ProductSubcategoryResource.class);

    private static final String ENTITY_NAME = "productsProductSubcategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductSubcategoryService productSubcategoryService;

    public ProductSubcategoryResource(ProductSubcategoryService productSubcategoryService) {
        this.productSubcategoryService = productSubcategoryService;
    }

    /**
     * {@code POST  /product-subcategories} : Create a new productSubcategory.
     *
     * @param productSubcategoryDTO the productSubcategoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productSubcategoryDTO, or with status {@code 400 (Bad Request)} if the productSubcategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-subcategories")
    public ResponseEntity<ProductSubcategoryDTO> createProductSubcategory(@Valid @RequestBody ProductSubcategoryDTO productSubcategoryDTO) throws URISyntaxException {
        log.debug("REST request to save ProductSubcategory : {}", productSubcategoryDTO);
        if (productSubcategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new productSubcategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductSubcategoryDTO result = productSubcategoryService.save(productSubcategoryDTO);
        return ResponseEntity.created(new URI("/api/product-subcategories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-subcategories} : Updates an existing productSubcategory.
     *
     * @param productSubcategoryDTO the productSubcategoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productSubcategoryDTO,
     * or with status {@code 400 (Bad Request)} if the productSubcategoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productSubcategoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-subcategories")
    public ResponseEntity<ProductSubcategoryDTO> updateProductSubcategory(@Valid @RequestBody ProductSubcategoryDTO productSubcategoryDTO) throws URISyntaxException {
        log.debug("REST request to update ProductSubcategory : {}", productSubcategoryDTO);
        if (productSubcategoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductSubcategoryDTO result = productSubcategoryService.save(productSubcategoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productSubcategoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /product-subcategories} : get all the productSubcategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productSubcategories in body.
     */
    @GetMapping("/product-subcategories")
    public List<ProductSubcategoryDTO> getAllProductSubcategories() {
        log.debug("REST request to get all ProductSubcategories");
        return productSubcategoryService.findAll();
    }

    /**
     * {@code GET  /product-subcategories/:id} : get the "id" productSubcategory.
     *
     * @param id the id of the productSubcategoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productSubcategoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-subcategories/{id}")
    public ResponseEntity<ProductSubcategoryDTO> getProductSubcategory(@PathVariable Long id) {
        log.debug("REST request to get ProductSubcategory : {}", id);
        Optional<ProductSubcategoryDTO> productSubcategoryDTO = productSubcategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productSubcategoryDTO);
    }

    /**
     * {@code DELETE  /product-subcategories/:id} : delete the "id" productSubcategory.
     *
     * @param id the id of the productSubcategoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-subcategories/{id}")
    public ResponseEntity<Void> deleteProductSubcategory(@PathVariable Long id) {
        log.debug("REST request to delete ProductSubcategory : {}", id);
        productSubcategoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/product-subcategories?query=:query} : search for the productSubcategory corresponding
     * to the query.
     *
     * @param query the query of the productSubcategory search.
     * @return the result of the search.
     */
    @GetMapping("/_search/product-subcategories")
    public List<ProductSubcategoryDTO> searchProductSubcategories(@RequestParam String query) {
        log.debug("REST request to search ProductSubcategories for query {}", query);
        return productSubcategoryService.search(query);
    }

}
