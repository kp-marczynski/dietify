package pl.marczynski.dietify.products.web.rest;

import javassist.NotFoundException;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.service.ProductService;
import pl.marczynski.dietify.core.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.core.web.rest.util.HeaderUtil;
import pl.marczynski.dietify.core.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.marczynski.dietify.products.service.dto.BasicNutritionRequestDTO;
import pl.marczynski.dietify.products.service.dto.BasicNutritionResponseDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Product.
 */
@RestController
@RequestMapping("/api")
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private static final String ENTITY_NAME = "product";

    private final ProductService productService;

    public ProductResource(ProductService productService) {
        this.productService = productService;
    }

    /**
     * POST  /products : Create a new product.
     *
     * @param product the product to create
     * @return the ResponseEntity with status 201 (Created) and with body the new product, or with status 400 (Bad Request) if the product has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to save Product : {}", product);
        if (product.getId() != null) {
            throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Product result = productService.save(product);
        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /products : Updates an existing product.
     *
     * @param product the product to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated product,
     * or with status 400 (Bad Request) if the product is not valid,
     * or with status 500 (Internal Server Error) if the product couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/products")
    public ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to update Product : {}", product);
        if (product.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Product result = productService.save(product);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, product.getId().toString()))
            .body(result);
    }

    /**
     * GET  /products : get all the products.
     *
     * @param pageable  the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of products in body
     */
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(Pageable pageable,
                                                        @RequestParam(required = false, defaultValue = "false") boolean eagerload,
                                                        @RequestParam(required = false) String search,
                                                        @RequestParam(required = false) Long categoryId,
                                                        @RequestParam(required = false) Long subcategoryId,
                                                        @RequestParam(required = false) Long languageId) {
        log.debug("REST request to get a page of Products");
        log.debug("category: " + categoryId + "; subcategory: " + subcategoryId);
        Page<Product> page;
        if (languageId != null) {
            page = productService.findBySearchAndFilters(search, languageId, categoryId, subcategoryId, pageable);
        } else if (eagerload) {
            page = productService.findAllWithEagerRelationships(pageable);
        } else {
            page = productService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/products?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /products/:id : get the "id" product.
     *
     * @param id the id of the product to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the product, or with status 404 (Not Found)
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Optional<Product> product = productService.findOne(id);
        return ResponseUtil.wrapOrNotFound(product);
    }

    /**
     * DELETE  /products/:id : delete the "id" product.
     *
     * @param id the id of the product to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        try {
            productService.delete(id);
        } catch (NotFoundException e) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idNotExist");
        }
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/products/basic-nutritions")
    public ResponseEntity<BasicNutritionResponseDTO> getProductBasicNutritions(@RequestBody List<BasicNutritionRequestDTO> nutritionRequest) {
        Optional<BasicNutritionResponseDTO> nutritions = productService.getProductBasicNutritions(nutritionRequest);
        return ResponseUtil.wrapOrNotFound(nutritions);
    }
}
