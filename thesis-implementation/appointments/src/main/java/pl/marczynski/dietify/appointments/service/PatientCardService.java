package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.domain.BmiResult;
import pl.marczynski.dietify.appointments.domain.PatientCard;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link PatientCard}.
 */
public interface PatientCardService {

    /**
     * Save a patientCard.
     *
     * @param patientCard the entity to save.
     * @return the persisted entity.
     */
    PatientCard save(PatientCard patientCard);

    List<BmiResult> getBmiResults(Long patientCardId);
    /**
     * Get all the patientCards.
     *
     *
     * @param dietitianId
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PatientCard> findAll(Long dietitianId, Pageable pageable);


    /**
     * Get the "id" patientCard.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PatientCard> findOne(Long id);

    /**
     * Delete the "id" patientCard.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
