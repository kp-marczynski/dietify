package pl.marczynski.dietify.core.service;

import pl.marczynski.dietify.core.domain.DietType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DietType.
 */
public interface DietTypeService {

    /**
     * Save a dietType.
     *
     * @param dietType the entity to save
     * @return the persisted entity
     */
    DietType save(DietType dietType);

    /**
     * Get all the dietTypes.
     *
     * @return the list of entities
     */
    List<DietType> findAll();


    /**
     * Get the "id" dietType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DietType> findOne(Long id);

    /**
     * Delete the "id" dietType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
