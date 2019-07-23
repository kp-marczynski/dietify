package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.DishType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link DishType}.
 */
public interface DishTypeService {

    /**
     * Save a dishType.
     *
     * @param dishType the entity to save.
     * @return the persisted entity.
     */
    DishType save(DishType dishType);

    /**
     * Get all the dishTypes.
     *
     * @return the list of entities.
     */
    List<DishType> findAll();


    /**
     * Get the "id" dishType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DishType> findOne(Long id);

    /**
     * Delete the "id" dishType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the dishType corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<DishType> search(String query);
}
