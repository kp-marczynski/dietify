package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.domain.BodyMeasurment;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing BodyMeasurment.
 */
public interface BodyMeasurmentService {

    /**
     * Save a bodyMeasurment.
     *
     * @param bodyMeasurment the entity to save
     * @return the persisted entity
     */
    BodyMeasurment save(BodyMeasurment bodyMeasurment);

    /**
     * Get all the bodyMeasurments.
     *
     * @return the list of entities
     */
    List<BodyMeasurment> findAll();


    /**
     * Get the "id" bodyMeasurment.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BodyMeasurment> findOne(Long id);

    /**
     * Delete the "id" bodyMeasurment.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
