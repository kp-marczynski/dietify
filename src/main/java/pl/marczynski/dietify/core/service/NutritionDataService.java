package pl.marczynski.dietify.core.service;

import pl.marczynski.dietify.core.domain.NutritionData;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing NutritionData.
 */
public interface NutritionDataService {

    /**
     * Save a nutritionData.
     *
     * @param nutritionData the entity to save
     * @return the persisted entity
     */
    NutritionData save(NutritionData nutritionData);

    /**
     * Get all the nutritionData.
     *
     * @return the list of entities
     */
    List<NutritionData> findAll();


    /**
     * Get the "id" nutritionData.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<NutritionData> findOne(Long id);

    /**
     * Delete the "id" nutritionData.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
