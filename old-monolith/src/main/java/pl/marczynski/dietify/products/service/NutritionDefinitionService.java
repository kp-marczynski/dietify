package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.NutritionDefinition;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing NutritionDefinition.
 */
public interface NutritionDefinitionService {

    /**
     * Save a nutritionDefinition.
     *
     * @param nutritionDefinition the entity to save
     * @return the persisted entity
     */
    NutritionDefinition save(NutritionDefinition nutritionDefinition);

    /**
     * Get all the nutritionDefinitions.
     *
     * @return the list of entities
     */
    List<NutritionDefinition> findAll();


    /**
     * Get the "id" nutritionDefinition.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<NutritionDefinition> findOne(Long id);

    /**
     * Delete the "id" nutritionDefinition.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
