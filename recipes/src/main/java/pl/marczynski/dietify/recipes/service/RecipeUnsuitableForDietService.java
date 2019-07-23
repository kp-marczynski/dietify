package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.RecipeUnsuitableForDiet;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link RecipeUnsuitableForDiet}.
 */
public interface RecipeUnsuitableForDietService {

    /**
     * Save a recipeUnsuitableForDiet.
     *
     * @param recipeUnsuitableForDiet the entity to save.
     * @return the persisted entity.
     */
    RecipeUnsuitableForDiet save(RecipeUnsuitableForDiet recipeUnsuitableForDiet);

    /**
     * Get all the recipeUnsuitableForDiets.
     *
     * @return the list of entities.
     */
    List<RecipeUnsuitableForDiet> findAll();


    /**
     * Get the "id" recipeUnsuitableForDiet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RecipeUnsuitableForDiet> findOne(Long id);

    /**
     * Delete the "id" recipeUnsuitableForDiet.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the recipeUnsuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<RecipeUnsuitableForDiet> search(String query);
}
