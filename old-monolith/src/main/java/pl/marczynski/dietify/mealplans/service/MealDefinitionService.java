package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.domain.MealDefinition;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MealDefinition.
 */
public interface MealDefinitionService {

    /**
     * Save a mealDefinition.
     *
     * @param mealDefinition the entity to save
     * @return the persisted entity
     */
    MealDefinition save(MealDefinition mealDefinition);

    /**
     * Get all the mealDefinitions.
     *
     * @return the list of entities
     */
    List<MealDefinition> findAll();


    /**
     * Get the "id" mealDefinition.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MealDefinition> findOne(Long id);

    /**
     * Delete the "id" mealDefinition.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
