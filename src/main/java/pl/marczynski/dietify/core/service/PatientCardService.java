package pl.marczynski.dietify.core.service;

import pl.marczynski.dietify.core.domain.PatientCard;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing PatientCard.
 */
public interface PatientCardService {

    /**
     * Save a patientCard.
     *
     * @param patientCard the entity to save
     * @return the persisted entity
     */
    PatientCard save(PatientCard patientCard);

    /**
     * Get all the patientCards.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PatientCard> findAll(Pageable pageable);


    /**
     * Get the "id" patientCard.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PatientCard> findOne(Long id);

    /**
     * Delete the "id" patientCard.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
