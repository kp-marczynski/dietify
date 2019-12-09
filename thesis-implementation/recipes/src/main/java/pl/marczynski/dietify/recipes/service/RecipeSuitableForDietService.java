package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.RecipeSuitableForDiet;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link RecipeSuitableForDiet}.
 */
public interface RecipeSuitableForDietService {

    /**
     * Save a recipeSuitableForDiet.
     *
     * @param recipeSuitableForDiet the entity to save.
     * @return the persisted entity.
     */
    RecipeSuitableForDiet save(RecipeSuitableForDiet recipeSuitableForDiet);

    /**
     * Get all the recipeSuitableForDiets.
     *
     * @return the list of entities.
     */
    List<RecipeSuitableForDiet> findAll();


    /**
     * Get the "id" recipeSuitableForDiet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RecipeSuitableForDiet> findOne(Long id);

    /**
     * Delete the "id" recipeSuitableForDiet.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the recipeSuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<RecipeSuitableForDiet> search(String query);
}
