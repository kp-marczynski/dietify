package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.domain.AppointmentEvaluation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link AppointmentEvaluation}.
 */
public interface AppointmentEvaluationService {

    /**
     * Save a appointmentEvaluation.
     *
     * @param appointmentEvaluation the entity to save.
     * @return the persisted entity.
     */
    AppointmentEvaluation save(AppointmentEvaluation appointmentEvaluation);

    /**
     * Get all the appointmentEvaluations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AppointmentEvaluation> findAll(Pageable pageable);


    /**
     * Get the "id" appointmentEvaluation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AppointmentEvaluation> findOne(Long id);

    /**
     * Delete the "id" appointmentEvaluation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
