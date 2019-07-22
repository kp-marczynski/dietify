package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.domain.Meal;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Meal}.
 */
public interface MealService {

    /**
     * Save a meal.
     *
     * @param meal the entity to save.
     * @return the persisted entity.
     */
    Meal save(Meal meal);

    /**
     * Get all the meals.
     *
     * @return the list of entities.
     */
    List<Meal> findAll();


    /**
     * Get the "id" meal.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Meal> findOne(Long id);

    /**
     * Delete the "id" meal.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the meal corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<Meal> search(String query);
}
