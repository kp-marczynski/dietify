package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.ProductSubcategory;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ProductSubcategory.
 */
public interface ProductSubcategoryService {

    /**
     * Save a productSubcategory.
     *
     * @param productSubcategory the entity to save
     * @return the persisted entity
     */
    ProductSubcategory save(ProductSubcategory productSubcategory);

    /**
     * Get all the productSubcategories.
     *
     * @return the list of entities
     */
    List<ProductSubcategory> findAll();


    /**
     * Get the "id" productSubcategory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ProductSubcategory> findOne(Long id);

    /**
     * Delete the "id" productSubcategory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
