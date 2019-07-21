package pl.marczynski.dietify.products.web.rest;

import pl.marczynski.dietify.products.service.ProductBasicNutritionDataService;
import pl.marczynski.dietify.products.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.products.service.dto.ProductBasicNutritionDataDTO;

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
 * REST controller for managing {@link pl.marczynski.dietify.products.domain.ProductBasicNutritionData}.
 */
@RestController
@RequestMapping("/api")
public class ProductBasicNutritionDataResource {

    private final Logger log = LoggerFactory.getLogger(ProductBasicNutritionDataResource.class);

    private static final String ENTITY_NAME = "productsProductBasicNutritionData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductBasicNutritionDataService productBasicNutritionDataService;

    public ProductBasicNutritionDataResource(ProductBasicNutritionDataService productBasicNutritionDataService) {
        this.productBasicNutritionDataService = productBasicNutritionDataService;
    }

    /**
     * {@code POST  /product-basic-nutrition-data} : Create a new productBasicNutritionData.
     *
     * @param productBasicNutritionDataDTO the productBasicNutritionDataDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productBasicNutritionDataDTO, or with status {@code 400 (Bad Request)} if the productBasicNutritionData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-basic-nutrition-data")
    public ResponseEntity<ProductBasicNutritionDataDTO> createProductBasicNutritionData(@Valid @RequestBody ProductBasicNutritionDataDTO productBasicNutritionDataDTO) throws URISyntaxException {
        log.debug("REST request to save ProductBasicNutritionData : {}", productBasicNutritionDataDTO);
        if (productBasicNutritionDataDTO.getId() != null) {
            throw new BadRequestAlertException("A new productBasicNutritionData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductBasicNutritionDataDTO result = productBasicNutritionDataService.save(productBasicNutritionDataDTO);
        return ResponseEntity.created(new URI("/api/product-basic-nutrition-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-basic-nutrition-data} : Updates an existing productBasicNutritionData.
     *
     * @param productBasicNutritionDataDTO the productBasicNutritionDataDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productBasicNutritionDataDTO,
     * or with status {@code 400 (Bad Request)} if the productBasicNutritionDataDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productBasicNutritionDataDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-basic-nutrition-data")
    public ResponseEntity<ProductBasicNutritionDataDTO> updateProductBasicNutritionData(@Valid @RequestBody ProductBasicNutritionDataDTO productBasicNutritionDataDTO) throws URISyntaxException {
        log.debug("REST request to update ProductBasicNutritionData : {}", productBasicNutritionDataDTO);
        if (productBasicNutritionDataDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductBasicNutritionDataDTO result = productBasicNutritionDataService.save(productBasicNutritionDataDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productBasicNutritionDataDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /product-basic-nutrition-data} : get all the productBasicNutritionData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productBasicNutritionData in body.
     */
    @GetMapping("/product-basic-nutrition-data")
    public List<ProductBasicNutritionDataDTO> getAllProductBasicNutritionData() {
        log.debug("REST request to get all ProductBasicNutritionData");
        return productBasicNutritionDataService.findAll();
    }

    /**
     * {@code GET  /product-basic-nutrition-data/:id} : get the "id" productBasicNutritionData.
     *
     * @param id the id of the productBasicNutritionDataDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productBasicNutritionDataDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-basic-nutrition-data/{id}")
    public ResponseEntity<ProductBasicNutritionDataDTO> getProductBasicNutritionData(@PathVariable Long id) {
        log.debug("REST request to get ProductBasicNutritionData : {}", id);
        Optional<ProductBasicNutritionDataDTO> productBasicNutritionDataDTO = productBasicNutritionDataService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productBasicNutritionDataDTO);
    }

    /**
     * {@code DELETE  /product-basic-nutrition-data/:id} : delete the "id" productBasicNutritionData.
     *
     * @param id the id of the productBasicNutritionDataDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-basic-nutrition-data/{id}")
    public ResponseEntity<Void> deleteProductBasicNutritionData(@PathVariable Long id) {
        log.debug("REST request to delete ProductBasicNutritionData : {}", id);
        productBasicNutritionDataService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/product-basic-nutrition-data?query=:query} : search for the productBasicNutritionData corresponding
     * to the query.
     *
     * @param query the query of the productBasicNutritionData search.
     * @return the result of the search.
     */
    @GetMapping("/_search/product-basic-nutrition-data")
    public List<ProductBasicNutritionDataDTO> searchProductBasicNutritionData(@RequestParam String query) {
        log.debug("REST request to search ProductBasicNutritionData for query {}", query);
        return productBasicNutritionDataService.search(query);
    }

}
