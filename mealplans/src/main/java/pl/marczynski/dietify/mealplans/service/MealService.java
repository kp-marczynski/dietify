package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.service.dto.MealDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.mealplans.domain.Meal}.
 */
public interface MealService {

    /**
     * Save a meal.
     *
     * @param mealDTO the entity to save.
     * @return the persisted entity.
     */
    MealDTO save(MealDTO mealDTO);

    /**
     * Get all the meals.
     *
     * @return the list of entities.
     */
    List<MealDTO> findAll();


    /**
     * Get the "id" meal.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealDTO> findOne(Long id);

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
    List<MealDTO> search(String query);
}
