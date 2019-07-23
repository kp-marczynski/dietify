package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.domain.MealPlanUnsuitableForDiet;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link MealPlanUnsuitableForDiet}.
 */
public interface MealPlanUnsuitableForDietService {

    /**
     * Save a mealPlanUnsuitableForDiet.
     *
     * @param mealPlanUnsuitableForDiet the entity to save.
     * @return the persisted entity.
     */
    MealPlanUnsuitableForDiet save(MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet);

    /**
     * Get all the mealPlanUnsuitableForDiets.
     *
     * @return the list of entities.
     */
    List<MealPlanUnsuitableForDiet> findAll();


    /**
     * Get the "id" mealPlanUnsuitableForDiet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealPlanUnsuitableForDiet> findOne(Long id);

    /**
     * Delete the "id" mealPlanUnsuitableForDiet.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealPlanUnsuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealPlanUnsuitableForDiet> search(String query);
}
