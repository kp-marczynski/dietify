package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.service.dto.NutritionalInterviewDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.appointments.domain.NutritionalInterview}.
 */
public interface NutritionalInterviewService {

    /**
     * Save a nutritionalInterview.
     *
     * @param nutritionalInterviewDTO the entity to save.
     * @return the persisted entity.
     */
    NutritionalInterviewDTO save(NutritionalInterviewDTO nutritionalInterviewDTO);

    /**
     * Get all the nutritionalInterviews.
     *
     * @return the list of entities.
     */
    List<NutritionalInterviewDTO> findAll();


    /**
     * Get the "id" nutritionalInterview.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NutritionalInterviewDTO> findOne(Long id);

    /**
     * Delete the "id" nutritionalInterview.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
