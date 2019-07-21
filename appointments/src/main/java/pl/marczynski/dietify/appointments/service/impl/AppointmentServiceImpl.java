package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.AppointmentService;
import pl.marczynski.dietify.appointments.domain.Appointment;
import pl.marczynski.dietify.appointments.repository.AppointmentRepository;
import pl.marczynski.dietify.appointments.service.dto.AppointmentDTO;
import pl.marczynski.dietify.appointments.service.mapper.AppointmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Appointment}.
 */
@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final Logger log = LoggerFactory.getLogger(AppointmentServiceImpl.class);

    private final AppointmentRepository appointmentRepository;

    private final AppointmentMapper appointmentMapper;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, AppointmentMapper appointmentMapper) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
    }

    /**
     * Save a appointment.
     *
     * @param appointmentDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AppointmentDTO save(AppointmentDTO appointmentDTO) {
        log.debug("Request to save Appointment : {}", appointmentDTO);
        Appointment appointment = appointmentMapper.toEntity(appointmentDTO);
        appointment = appointmentRepository.save(appointment);
        return appointmentMapper.toDto(appointment);
    }

    /**
     * Get all the appointments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AppointmentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Appointments");
        return appointmentRepository.findAll(pageable)
            .map(appointmentMapper::toDto);
    }



    /**
    *  Get all the appointments where BodyMeasurement is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<AppointmentDTO> findAllWhereBodyMeasurementIsNull() {
        log.debug("Request to get all appointments where BodyMeasurement is null");
        return StreamSupport
            .stream(appointmentRepository.findAll().spliterator(), false)
            .filter(appointment -> appointment.getBodyMeasurement() == null)
            .map(appointmentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
    *  Get all the appointments where NutritionalInterview is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<AppointmentDTO> findAllWhereNutritionalInterviewIsNull() {
        log.debug("Request to get all appointments where NutritionalInterview is null");
        return StreamSupport
            .stream(appointmentRepository.findAll().spliterator(), false)
            .filter(appointment -> appointment.getNutritionalInterview() == null)
            .map(appointmentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one appointment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AppointmentDTO> findOne(Long id) {
        log.debug("Request to get Appointment : {}", id);
        return appointmentRepository.findById(id)
            .map(appointmentMapper::toDto);
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
}
