package pl.marczynski.dietify.recipes.service;

import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.marczynski.dietify.recipes.domain.Recipe;

import java.util.Optional;

/**
 * Service Interface for managing Recipe.
 */
public interface RecipeService {

    /**
     * Save a recipe.
     *
     * @param recipe the entity to save
     * @return the persisted entity
     */
    Recipe save(Recipe recipe);

    /**
     * Get all the recipes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Recipe> findAll(Pageable pageable);

    /**
     * Get all the Recipe with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Recipe> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" recipe.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Recipe> findOne(Long id);

    /**
     * Delete the "id" recipe.
     *
     * @param id the id of the entity
     */
    void delete(Long id) throws NotFoundException;

    /**
     * Get recipes with name containing search phrase
     *
     * @param searchPhrase phrase to search for in recipe name
     * @return the list of entities
     */

    Page<Recipe> findBySearchAndFilters(String searchPhrase, Long languageId, Pageable pageable);
}
