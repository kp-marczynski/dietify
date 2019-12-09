package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link MealPlanSuitableForDiet}.
 */
public interface MealPlanSuitableForDietService {

    /**
     * Save a mealPlanSuitableForDiet.
     *
     * @param mealPlanSuitableForDiet the entity to save.
     * @return the persisted entity.
     */
    MealPlanSuitableForDiet save(MealPlanSuitableForDiet mealPlanSuitableForDiet);

    /**
     * Get all the mealPlanSuitableForDiets.
     *
     * @return the list of entities.
     */
    List<MealPlanSuitableForDiet> findAll();


    /**
     * Get the "id" mealPlanSuitableForDiet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealPlanSuitableForDiet> findOne(Long id);

    /**
     * Delete the "id" mealPlanSuitableForDiet.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealPlanSuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealPlanSuitableForDiet> search(String query);
}
