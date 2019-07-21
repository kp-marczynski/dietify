package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.MealTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.MealType}.
 */
public interface MealTypeService {

    /**
     * Save a mealType.
     *
     * @param mealTypeDTO the entity to save.
     * @return the persisted entity.
     */
    MealTypeDTO save(MealTypeDTO mealTypeDTO);

    /**
     * Get all the mealTypes.
     *
     * @return the list of entities.
     */
    List<MealTypeDTO> findAll();


    /**
     * Get the "id" mealType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealTypeDTO> findOne(Long id);

    /**
     * Delete the "id" mealType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealType corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealTypeDTO> search(String query);
}
