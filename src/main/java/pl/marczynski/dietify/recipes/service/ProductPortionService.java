package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.ProductPortion;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ProductPortion.
 */
public interface ProductPortionService {

    /**
     * Save a productPortion.
     *
     * @param productPortion the entity to save
     * @return the persisted entity
     */
    ProductPortion save(ProductPortion productPortion);

    /**
     * Get all the productPortions.
     *
     * @return the list of entities
     */
    List<ProductPortion> findAll();


    /**
     * Get the "id" productPortion.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ProductPortion> findOne(Long id);

    /**
     * Delete the "id" productPortion.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
