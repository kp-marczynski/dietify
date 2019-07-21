package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.RecipeUnsuitableForDietDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.RecipeUnsuitableForDiet}.
 */
public interface RecipeUnsuitableForDietService {

    /**
     * Save a recipeUnsuitableForDiet.
     *
     * @param recipeUnsuitableForDietDTO the entity to save.
     * @return the persisted entity.
     */
    RecipeUnsuitableForDietDTO save(RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO);

    /**
     * Get all the recipeUnsuitableForDiets.
     *
     * @return the list of entities.
     */
    List<RecipeUnsuitableForDietDTO> findAll();


    /**
     * Get the "id" recipeUnsuitableForDiet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RecipeUnsuitableForDietDTO> findOne(Long id);

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
    List<RecipeUnsuitableForDietDTO> search(String query);
}
