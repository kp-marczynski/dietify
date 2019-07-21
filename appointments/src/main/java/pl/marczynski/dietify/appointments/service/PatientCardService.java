package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.service.dto.PatientCardDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.appointments.domain.PatientCard}.
 */
public interface PatientCardService {

    /**
     * Save a patientCard.
     *
     * @param patientCardDTO the entity to save.
     * @return the persisted entity.
     */
    PatientCardDTO save(PatientCardDTO patientCardDTO);

    /**
     * Get all the patientCards.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PatientCardDTO> findAll(Pageable pageable);


    /**
     * Get the "id" patientCard.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PatientCardDTO> findOne(Long id);

    /**
     * Delete the "id" patientCard.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
