package pl.marczynski.dietify.appointments.service;

import org.springframework.data.repository.query.Param;
import pl.marczynski.dietify.appointments.domain.Appointment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.marczynski.dietify.appointments.domain.BmiResult;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Appointment}.
 */
public interface AppointmentService {

    /**
     * Save a appointment.
     *
     * @param appointment the entity to save.
     * @return the persisted entity.
     */
    Appointment save(Appointment appointment);

    /**
     * Get all the appointments.
     *
     *
     * @param dietitianId
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Appointment> findAll(Long dietitianId, Pageable pageable);


    /**
     * Get the "id" appointment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Appointment> findOne(Long id);

    /**
     * Delete the "id" appointment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Page<Appointment> findAllWaitingForConsultation(Long dietitianId, Pageable pageable);

    Page<Appointment> findAllByPatientWaitingForConsultation(Long dietitianId, Long patientId, Pageable pageable);

    Page<Appointment> findAllByPatient(Long dietitianId, Long patientId, Pageable pageable);

    List<BmiResult> calculateBMI(Long patientCardId);
}
