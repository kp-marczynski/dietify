package pl.marczynski.dietify.recipes.web.rest;

import pl.marczynski.dietify.recipes.service.ProductPortionService;
import pl.marczynski.dietify.recipes.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.recipes.service.dto.ProductPortionDTO;

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
     * @param productPortionDTO the productPortionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productPortionDTO, or with status {@code 400 (Bad Request)} if the productPortion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-portions")
    public ResponseEntity<ProductPortionDTO> createProductPortion(@Valid @RequestBody ProductPortionDTO productPortionDTO) throws URISyntaxException {
        log.debug("REST request to save ProductPortion : {}", productPortionDTO);
        if (productPortionDTO.getId() != null) {
            throw new BadRequestAlertException("A new productPortion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductPortionDTO result = productPortionService.save(productPortionDTO);
        return ResponseEntity.created(new URI("/api/product-portions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-portions} : Updates an existing productPortion.
     *
     * @param productPortionDTO the productPortionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productPortionDTO,
     * or with status {@code 400 (Bad Request)} if the productPortionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productPortionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-portions")
    public ResponseEntity<ProductPortionDTO> updateProductPortion(@Valid @RequestBody ProductPortionDTO productPortionDTO) throws URISyntaxException {
        log.debug("REST request to update ProductPortion : {}", productPortionDTO);
        if (productPortionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductPortionDTO result = productPortionService.save(productPortionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productPortionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /product-portions} : get all the productPortions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productPortions in body.
     */
    @GetMapping("/product-portions")
    public List<ProductPortionDTO> getAllProductPortions() {
        log.debug("REST request to get all ProductPortions");
        return productPortionService.findAll();
    }

    /**
     * {@code GET  /product-portions/:id} : get the "id" productPortion.
     *
     * @param id the id of the productPortionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productPortionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-portions/{id}")
    public ResponseEntity<ProductPortionDTO> getProductPortion(@PathVariable Long id) {
        log.debug("REST request to get ProductPortion : {}", id);
        Optional<ProductPortionDTO> productPortionDTO = productPortionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productPortionDTO);
    }

    /**
     * {@code DELETE  /product-portions/:id} : delete the "id" productPortion.
     *
     * @param id the id of the productPortionDTO to delete.
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
    public List<ProductPortionDTO> searchProductPortions(@RequestParam String query) {
        log.debug("REST request to search ProductPortions for query {}", query);
        return productPortionService.search(query);
    }

}
