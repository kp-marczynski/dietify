package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.service.dto.MealRecipeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.mealplans.domain.MealRecipe}.
 */
public interface MealRecipeService {

    /**
     * Save a mealRecipe.
     *
     * @param mealRecipeDTO the entity to save.
     * @return the persisted entity.
     */
    MealRecipeDTO save(MealRecipeDTO mealRecipeDTO);

    /**
     * Get all the mealRecipes.
     *
     * @return the list of entities.
     */
    List<MealRecipeDTO> findAll();


    /**
     * Get the "id" mealRecipe.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealRecipeDTO> findOne(Long id);

    /**
     * Delete the "id" mealRecipe.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealRecipe corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealRecipeDTO> search(String query);
}
