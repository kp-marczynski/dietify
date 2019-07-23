package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.domain.NutritionalInterview;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link NutritionalInterview}.
 */
public interface NutritionalInterviewService {

    /**
     * Save a nutritionalInterview.
     *
     * @param nutritionalInterview the entity to save.
     * @return the persisted entity.
     */
    NutritionalInterview save(NutritionalInterview nutritionalInterview);

    /**
     * Get all the nutritionalInterviews.
     *
     * @return the list of entities.
     */
    List<NutritionalInterview> findAll();
    /**
     * Get all the NutritionalInterviewDTO where Appointment is {@code null}.
     *
     * @return the list of entities.
     */
    List<NutritionalInterview> findAllWhereAppointmentIsNull();


    /**
     * Get the "id" nutritionalInterview.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NutritionalInterview> findOne(Long id);

    /**
     * Delete the "id" nutritionalInterview.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
