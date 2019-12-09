package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.NutritionDefinitionTranslation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link NutritionDefinitionTranslation}.
 */
public interface NutritionDefinitionTranslationService {

    /**
     * Save a nutritionDefinitionTranslation.
     *
     * @param nutritionDefinitionTranslation the entity to save.
     * @return the persisted entity.
     */
    NutritionDefinitionTranslation save(NutritionDefinitionTranslation nutritionDefinitionTranslation);

    /**
     * Get all the nutritionDefinitionTranslations.
     *
     * @return the list of entities.
     */
    List<NutritionDefinitionTranslation> findAll();


    /**
     * Get the "id" nutritionDefinitionTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NutritionDefinitionTranslation> findOne(Long id);

    /**
     * Delete the "id" nutritionDefinitionTranslation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the nutritionDefinitionTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<NutritionDefinitionTranslation> search(String query);
}
