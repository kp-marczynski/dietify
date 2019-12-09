package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.MealTypeTranslation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link MealTypeTranslation}.
 */
public interface MealTypeTranslationService {

    /**
     * Save a mealTypeTranslation.
     *
     * @param mealTypeTranslation the entity to save.
     * @return the persisted entity.
     */
    MealTypeTranslation save(MealTypeTranslation mealTypeTranslation);

    /**
     * Get all the mealTypeTranslations.
     *
     * @return the list of entities.
     */
    List<MealTypeTranslation> findAll();


    /**
     * Get the "id" mealTypeTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealTypeTranslation> findOne(Long id);

    /**
     * Delete the "id" mealTypeTranslation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealTypeTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealTypeTranslation> search(String query);
}
