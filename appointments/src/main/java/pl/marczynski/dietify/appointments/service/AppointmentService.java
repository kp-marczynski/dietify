package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.service.dto.AppointmentDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.appointments.domain.Appointment}.
 */
public interface AppointmentService {

    /**
     * Save a appointment.
     *
     * @param appointmentDTO the entity to save.
     * @return the persisted entity.
     */
    AppointmentDTO save(AppointmentDTO appointmentDTO);

    /**
     * Get all the appointments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AppointmentDTO> findAll(Pageable pageable);
    /**
     * Get all the AppointmentDTO where BodyMeasurement is {@code null}.
     *
     * @return the list of entities.
     */
    List<AppointmentDTO> findAllWhereBodyMeasurementIsNull();
    /**
     * Get all the AppointmentDTO where NutritionalInterview is {@code null}.
     *
     * @return the list of entities.
     */
    List<AppointmentDTO> findAllWhereNutritionalInterviewIsNull();


    /**
     * Get the "id" appointment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AppointmentDTO> findOne(Long id);

    /**
     * Delete the "id" appointment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
