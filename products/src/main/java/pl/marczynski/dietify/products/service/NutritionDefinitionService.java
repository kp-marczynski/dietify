package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.NutritionDefinition;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link NutritionDefinition}.
 */
public interface NutritionDefinitionService {

    /**
     * Save a nutritionDefinition.
     *
     * @param nutritionDefinition the entity to save.
     * @return the persisted entity.
     */
    NutritionDefinition save(NutritionDefinition nutritionDefinition);

    /**
     * Get all the nutritionDefinitions.
     *
     * @return the list of entities.
     */
    List<NutritionDefinition> findAll();

    /**
     * Get all the nutritionDefinitions for basic nutritions.
     *
     * @return the list of entities.
     */
    List<NutritionDefinition> findAllBasicNutritions();

    /**
     * Get the "id" nutritionDefinition.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NutritionDefinition> findOne(Long id);

    /**
     * Delete the "id" nutritionDefinition.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the nutritionDefinition corresponding to the query.
     *
     * @param query the query of the search.
     *
     * @return the list of entities.
     */
    List<NutritionDefinition> search(String query);
}
