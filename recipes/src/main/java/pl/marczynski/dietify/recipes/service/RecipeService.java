package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.RecipeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.Recipe}.
 */
public interface RecipeService {

    /**
     * Save a recipe.
     *
     * @param recipeDTO the entity to save.
     * @return the persisted entity.
     */
    RecipeDTO save(RecipeDTO recipeDTO);

    /**
     * Get all the recipes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RecipeDTO> findAll(Pageable pageable);
    /**
     * Get all the RecipeDTO where BasicNutritionData is {@code null}.
     *
     * @return the list of entities.
     */
    List<RecipeDTO> findAllWhereBasicNutritionDataIsNull();

    /**
     * Get all the recipes with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<RecipeDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" recipe.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RecipeDTO> findOne(Long id);

    /**
     * Delete the "id" recipe.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the recipe corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RecipeDTO> search(String query, Pageable pageable);
}
