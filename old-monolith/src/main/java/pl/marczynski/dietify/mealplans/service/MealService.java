package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.domain.Meal;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Meal.
 */
public interface MealService {

    /**
     * Save a meal.
     *
     * @param meal the entity to save
     * @return the persisted entity
     */
    Meal save(Meal meal);

    /**
     * Get all the meals.
     *
     * @return the list of entities
     */
    List<Meal> findAll();


    /**
     * Get the "id" meal.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Meal> findOne(Long id);

    /**
     * Delete the "id" meal.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
