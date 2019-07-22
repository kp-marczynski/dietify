package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.ProductBasicNutritionData;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ProductBasicNutritionData}.
 */
public interface ProductBasicNutritionDataService {

    /**
     * Save a productBasicNutritionData.
     *
     * @param productBasicNutritionData the entity to save.
     * @return the persisted entity.
     */
    ProductBasicNutritionData save(ProductBasicNutritionData productBasicNutritionData);

    /**
     * Get all the productBasicNutritionData.
     *
     * @return the list of entities.
     */
    List<ProductBasicNutritionData> findAll();


    /**
     * Get the "id" productBasicNutritionData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductBasicNutritionData> findOne(Long id);

    /**
     * Delete the "id" productBasicNutritionData.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the productBasicNutritionData corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<ProductBasicNutritionData> search(String query);
}
