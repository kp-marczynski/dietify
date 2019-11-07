package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.Recipe;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Recipe}.
 */
public interface RecipeService {

    /**
     * Save a recipe.
     *
     * @param recipe the entity to save.
     * @return the persisted entity.
     */
    Recipe save(Recipe recipe);

    /**
     * Get all the recipes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Recipe> findAll(Pageable pageable);

    /**
     * Get all the recipes with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Recipe> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" recipe.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Recipe> findOne(Long id);

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
    Page<Recipe> search(String query, Pageable pageable);

    Page<Recipe> findBySearchAndFilters(String searchPhrase, String language, Pageable pageable);
}
