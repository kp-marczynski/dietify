package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.RecipeSection;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link RecipeSection}.
 */
public interface RecipeSectionService {

    /**
     * Save a recipeSection.
     *
     * @param recipeSection the entity to save.
     * @return the persisted entity.
     */
    RecipeSection save(RecipeSection recipeSection);

    /**
     * Get all the recipeSections.
     *
     * @return the list of entities.
     */
    List<RecipeSection> findAll();


    /**
     * Get the "id" recipeSection.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RecipeSection> findOne(Long id);

    /**
     * Delete the "id" recipeSection.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the recipeSection corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<RecipeSection> search(String query);
}
