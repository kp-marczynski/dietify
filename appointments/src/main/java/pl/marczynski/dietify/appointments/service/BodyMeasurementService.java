package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.service.dto.BodyMeasurementDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.appointments.domain.BodyMeasurement}.
 */
public interface BodyMeasurementService {

    /**
     * Save a bodyMeasurement.
     *
     * @param bodyMeasurementDTO the entity to save.
     * @return the persisted entity.
     */
    BodyMeasurementDTO save(BodyMeasurementDTO bodyMeasurementDTO);

    /**
     * Get all the bodyMeasurements.
     *
     * @return the list of entities.
     */
    List<BodyMeasurementDTO> findAll();


    /**
     * Get the "id" bodyMeasurement.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BodyMeasurementDTO> findOne(Long id);

    /**
     * Delete the "id" bodyMeasurement.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
