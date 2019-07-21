package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.DietTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.DietType}.
 */
public interface DietTypeService {

    /**
     * Save a dietType.
     *
     * @param dietTypeDTO the entity to save.
     * @return the persisted entity.
     */
    DietTypeDTO save(DietTypeDTO dietTypeDTO);

    /**
     * Get all the dietTypes.
     *
     * @return the list of entities.
     */
    List<DietTypeDTO> findAll();


    /**
     * Get the "id" dietType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DietTypeDTO> findOne(Long id);

    /**
     * Delete the "id" dietType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the dietType corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<DietTypeDTO> search(String query);
}
