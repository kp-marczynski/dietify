package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.DishTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.DishType}.
 */
public interface DishTypeService {

    /**
     * Save a dishType.
     *
     * @param dishTypeDTO the entity to save.
     * @return the persisted entity.
     */
    DishTypeDTO save(DishTypeDTO dishTypeDTO);

    /**
     * Get all the dishTypes.
     *
     * @return the list of entities.
     */
    List<DishTypeDTO> findAll();


    /**
     * Get the "id" dishType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DishTypeDTO> findOne(Long id);

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
    List<DishTypeDTO> search(String query);
}
