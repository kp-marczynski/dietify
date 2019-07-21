package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.RecipeBasicNutritionDataDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData}.
 */
public interface RecipeBasicNutritionDataService {

    /**
     * Save a recipeBasicNutritionData.
     *
     * @param recipeBasicNutritionDataDTO the entity to save.
     * @return the persisted entity.
     */
    RecipeBasicNutritionDataDTO save(RecipeBasicNutritionDataDTO recipeBasicNutritionDataDTO);

    /**
     * Get all the recipeBasicNutritionData.
     *
     * @return the list of entities.
     */
    List<RecipeBasicNutritionDataDTO> findAll();


    /**
     * Get the "id" recipeBasicNutritionData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RecipeBasicNutritionDataDTO> findOne(Long id);

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
    List<RecipeBasicNutritionDataDTO> search(String query);
}
