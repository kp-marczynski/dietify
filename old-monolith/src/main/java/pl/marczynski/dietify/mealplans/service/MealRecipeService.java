package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.domain.MealRecipe;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MealRecipe.
 */
public interface MealRecipeService {

    /**
     * Save a mealRecipe.
     *
     * @param mealRecipe the entity to save
     * @return the persisted entity
     */
    MealRecipe save(MealRecipe mealRecipe);

    /**
     * Get all the mealRecipes.
     *
     * @return the list of entities
     */
    List<MealRecipe> findAll();


    /**
     * Get the "id" mealRecipe.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MealRecipe> findOne(Long id);

    /**
     * Delete the "id" mealRecipe.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
