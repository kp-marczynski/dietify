package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.service.dto.AppointmentEvaluationDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.appointments.domain.AppointmentEvaluation}.
 */
public interface AppointmentEvaluationService {

    /**
     * Save a appointmentEvaluation.
     *
     * @param appointmentEvaluationDTO the entity to save.
     * @return the persisted entity.
     */
    AppointmentEvaluationDTO save(AppointmentEvaluationDTO appointmentEvaluationDTO);

    /**
     * Get all the appointmentEvaluations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AppointmentEvaluationDTO> findAll(Pageable pageable);


    /**
     * Get the "id" appointmentEvaluation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AppointmentEvaluationDTO> findOne(Long id);

    /**
     * Delete the "id" appointmentEvaluation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
