package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.domain.BmiResult;
import pl.marczynski.dietify.appointments.domain.enumeration.AppointmentState;
import pl.marczynski.dietify.appointments.service.AppointmentService;
import pl.marczynski.dietify.appointments.domain.Appointment;
import pl.marczynski.dietify.appointments.repository.AppointmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Appointment}.
 */
@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final Logger log = LoggerFactory.getLogger(AppointmentServiceImpl.class);

    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    /**
     * Save a appointment.
     *
     * @param appointment the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Appointment save(Appointment appointment) {
        log.debug("Request to save Appointment : {}", appointment);
        return appointmentRepository.save(appointment);
    }

    /**
     * Get all the appointments.
     *
     *
     * @param dietitianId
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Appointment> findAll(Long dietitianId, Pageable pageable) {
        log.debug("Request to get all Appointments");
        return appointmentRepository.findAllByPatientCardDietitianId(dietitianId, pageable);
    }


    /**
     * Get one appointment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Appointment> findOne(Long id) {
        log.debug("Request to get Appointment : {}", id);
        return appointmentRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the appointment by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Appointment : {}", id);
        appointmentRepository.deleteById(id);
    }

    /**
     * Get all the appointments waiting for consultation.
     *
     *
     * @param dietitianId
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    public Page<Appointment> findAllWaitingForConsultation(Long dietitianId, Pageable pageable) {
        log.debug("Request to get all Appointments waiting for consultation");
        return appointmentRepository.findAllByAppointmentStateAndPatientCardDietitianId(AppointmentState.TOOK_PLACE, dietitianId, pageable);
    }

    /**
     * Get all the patient appointments waiting for consultation.
     *
     *
     * @param dietitianId
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    public Page<Appointment> findAllByPatientWaitingForConsultation(Long dietitianId, Long patientId, Pageable pageable) {
        log.debug("Request to get all patient's Appointments waiting for consultation");
        return appointmentRepository.findAllByAppointmentStateAndPatientCardDietitianIdAndPatientCardPatientId(AppointmentState.TOOK_PLACE, dietitianId, patientId, pageable);
    }

    /**
     * Get all the appointments waiting for consultation.
     *
     *
     * @param dietitianId
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    public Page<Appointment> findAllByPatient(Long dietitianId, Long patientId, Pageable pageable) {
        log.debug("Request to get all Appointments waiting for consultation");
        return appointmentRepository.findAllByPatientCardDietitianIdAndPatientCardPatientId(dietitianId, patientId, pageable);
    }

    @Override
    public List<BmiResult> calculateBMI(Long patientCardId) {
        return appointmentRepository.calculateBMI(patientCardId);
    }
}
