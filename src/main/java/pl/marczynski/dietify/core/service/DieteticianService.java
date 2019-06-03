package pl.marczynski.dietify.core.service;

import pl.marczynski.dietify.core.domain.Dietetician;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Dietetician.
 */
public interface DieteticianService {

    /**
     * Save a dietetician.
     *
     * @param dietetician the entity to save
     * @return the persisted entity
     */
    Dietetician save(Dietetician dietetician);

    /**
     * Get all the dieteticians.
     *
     * @return the list of entities
     */
    List<Dietetician> findAll();


    /**
     * Get the "id" dietetician.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Dietetician> findOne(Long id);

    /**
     * Delete the "id" dietetician.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
