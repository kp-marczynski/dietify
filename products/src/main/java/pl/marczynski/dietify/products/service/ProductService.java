package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.ProductDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.Product}.
 */
public interface ProductService {

    /**
     * Save a product.
     *
     * @param productDTO the entity to save.
     * @return the persisted entity.
     */
    ProductDTO save(ProductDTO productDTO);

    /**
     * Get all the products.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProductDTO> findAll(Pageable pageable);
    /**
     * Get all the ProductDTO where BasicNutritionData is {@code null}.
     *
     * @return the list of entities.
     */
    List<ProductDTO> findAllWhereBasicNutritionDataIsNull();

    /**
     * Get all the products with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<ProductDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" product.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductDTO> findOne(Long id);

    /**
     * Delete the "id" product.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the product corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProductDTO> search(String query, Pageable pageable);
}
