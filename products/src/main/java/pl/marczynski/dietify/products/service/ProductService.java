package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Product}.
 */
public interface ProductService {

    /**
     * Save a product.
     *
     * @param product the entity to save.
     * @return the persisted entity.
     */
    Product save(Product product);

    /**
     * Get all the products.
     *
     *
     * @param author
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Product> findAll(Long author, Pageable pageable);

    /**
     * Get all the products with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Product> findAllWithEagerRelationships(Long author, Pageable pageable);

    /**
     * Get the "id" product.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Product> findOne(Long id);

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
    Page<Product> search(String query, Pageable pageable);

    /**
     * Get products with description containg search phrase
     *
     * @param searchPhrase phrase to search for in product description
     * @return the list of entities
     */
    public Page<Product> findBySearchAndFilters(String searchPhrase, String language, Long categoryId, Long subcategoryId, Long author, Pageable pageable);

    void changeToFinal(Long productId);
}
