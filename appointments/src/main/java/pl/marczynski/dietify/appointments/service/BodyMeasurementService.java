package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.domain.BodyMeasurement;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link BodyMeasurement}.
 */
public interface BodyMeasurementService {

    /**
     * Save a bodyMeasurement.
     *
     * @param bodyMeasurement the entity to save.
     * @return the persisted entity.
     */
    BodyMeasurement save(BodyMeasurement bodyMeasurement);

    /**
     * Get all the bodyMeasurements.
     *
     * @return the list of entities.
     */
    List<BodyMeasurement> findAll();
    /**
     * Get all the BodyMeasurementDTO where Appointment is {@code null}.
     *
     * @return the list of entities.
     */
    List<BodyMeasurement> findAllWhereAppointmentIsNull();


    /**
     * Get the "id" bodyMeasurement.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BodyMeasurement> findOne(Long id);

    /**
     * Delete the "id" bodyMeasurement.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
