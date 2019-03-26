package pl.marczynski.dietify.products.service;

import javassist.NotFoundException;
import pl.marczynski.dietify.products.domain.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Product.
 */
public interface ProductService {

    /**
     * Save a product.
     *
     * @param product the entity to save
     * @return the persisted entity
     */
    Product save(Product product);

    /**
     * Get all the products.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Product> findAll(Pageable pageable);

    /**
     * Get all the Product with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Product> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" product.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Product> findOne(Long id);

    /**
     * Delete the "id" product.
     *
     * @param id the id of the entity
     */
    void delete(Long id) throws NotFoundException;
}
