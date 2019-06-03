package pl.marczynski.dietify.core.service;

import pl.marczynski.dietify.core.domain.Patient;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Patient.
 */
public interface PatientService {

    /**
     * Save a patient.
     *
     * @param patient the entity to save
     * @return the persisted entity
     */
    Patient save(Patient patient);

    /**
     * Get all the patients.
     *
     * @return the list of entities
     */
    List<Patient> findAll();


    /**
     * Get the "id" patient.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Patient> findOne(Long id);

    /**
     * Delete the "id" patient.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
