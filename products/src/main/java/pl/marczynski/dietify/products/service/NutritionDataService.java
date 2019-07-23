package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.NutritionData;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link NutritionData}.
 */
public interface NutritionDataService {

    /**
     * Save a nutritionData.
     *
     * @param nutritionData the entity to save.
     * @return the persisted entity.
     */
    NutritionData save(NutritionData nutritionData);

    /**
     * Get all the nutritionData.
     *
     * @return the list of entities.
     */
    List<NutritionData> findAll();


    /**
     * Get the "id" nutritionData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NutritionData> findOne(Long id);

    /**
     * Delete the "id" nutritionData.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the nutritionData corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<NutritionData> search(String query);
}
