package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.domain.MealPlanDay;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MealPlanDay.
 */
public interface MealPlanDayService {

    /**
     * Save a mealPlanDay.
     *
     * @param mealPlanDay the entity to save
     * @return the persisted entity
     */
    MealPlanDay save(MealPlanDay mealPlanDay);

    /**
     * Get all the mealPlanDays.
     *
     * @return the list of entities
     */
    List<MealPlanDay> findAll();


    /**
     * Get the "id" mealPlanDay.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MealPlanDay> findOne(Long id);

    /**
     * Delete the "id" mealPlanDay.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
