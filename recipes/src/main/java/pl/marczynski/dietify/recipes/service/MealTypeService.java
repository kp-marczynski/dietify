package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.MealType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link MealType}.
 */
public interface MealTypeService {

    /**
     * Save a mealType.
     *
     * @param mealType the entity to save.
     * @return the persisted entity.
     */
    MealType save(MealType mealType);

    /**
     * Get all the mealTypes.
     *
     * @return the list of entities.
     */
    List<MealType> findAll();


    /**
     * Get the "id" mealType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealType> findOne(Long id);

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
    List<MealType> search(String query);
}
