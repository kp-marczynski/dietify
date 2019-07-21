package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.RecipeSectionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.RecipeSection}.
 */
public interface RecipeSectionService {

    /**
     * Save a recipeSection.
     *
     * @param recipeSectionDTO the entity to save.
     * @return the persisted entity.
     */
    RecipeSectionDTO save(RecipeSectionDTO recipeSectionDTO);

    /**
     * Get all the recipeSections.
     *
     * @return the list of entities.
     */
    List<RecipeSectionDTO> findAll();


    /**
     * Get the "id" recipeSection.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RecipeSectionDTO> findOne(Long id);

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
    List<RecipeSectionDTO> search(String query);
}
