package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link RecipeBasicNutritionData}.
 */
public interface RecipeBasicNutritionDataService {

    /**
     * Save a recipeBasicNutritionData.
     *
     * @param recipeBasicNutritionData the entity to save.
     * @return the persisted entity.
     */
    RecipeBasicNutritionData save(RecipeBasicNutritionData recipeBasicNutritionData);

    /**
     * Get all the recipeBasicNutritionData.
     *
     * @return the list of entities.
     */
    List<RecipeBasicNutritionData> findAll();


    /**
     * Get the "id" recipeBasicNutritionData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RecipeBasicNutritionData> findOne(Long id);

    /**
     * Delete the "id" recipeBasicNutritionData.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the recipeBasicNutritionData corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<RecipeBasicNutritionData> search(String query);
}
