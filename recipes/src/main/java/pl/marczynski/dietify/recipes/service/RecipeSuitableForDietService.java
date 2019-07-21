package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.RecipeSuitableForDietDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.RecipeSuitableForDiet}.
 */
public interface RecipeSuitableForDietService {

    /**
     * Save a recipeSuitableForDiet.
     *
     * @param recipeSuitableForDietDTO the entity to save.
     * @return the persisted entity.
     */
    RecipeSuitableForDietDTO save(RecipeSuitableForDietDTO recipeSuitableForDietDTO);

    /**
     * Get all the recipeSuitableForDiets.
     *
     * @return the list of entities.
     */
    List<RecipeSuitableForDietDTO> findAll();


    /**
     * Get the "id" recipeSuitableForDiet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RecipeSuitableForDietDTO> findOne(Long id);

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
    List<RecipeSuitableForDietDTO> search(String query);
}
