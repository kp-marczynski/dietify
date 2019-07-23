package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.BodyMeasurementService;
import pl.marczynski.dietify.appointments.domain.BodyMeasurement;
import pl.marczynski.dietify.appointments.repository.BodyMeasurementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link BodyMeasurement}.
 */
@Service
@Transactional
public class BodyMeasurementServiceImpl implements BodyMeasurementService {

    private final Logger log = LoggerFactory.getLogger(BodyMeasurementServiceImpl.class);

    private final BodyMeasurementRepository bodyMeasurementRepository;

    public BodyMeasurementServiceImpl(BodyMeasurementRepository bodyMeasurementRepository) {
        this.bodyMeasurementRepository = bodyMeasurementRepository;
    }

    /**
     * Save a bodyMeasurement.
     *
     * @param bodyMeasurement the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BodyMeasurement save(BodyMeasurement bodyMeasurement) {
        log.debug("Request to save BodyMeasurement : {}", bodyMeasurement);
        return bodyMeasurementRepository.save(bodyMeasurement);
    }

    /**
     * Get all the bodyMeasurements.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<BodyMeasurement> findAll() {
        log.debug("Request to get all BodyMeasurements");
        return bodyMeasurementRepository.findAll();
    }



    /**
    *  Get all the bodyMeasurements where Appointment is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<BodyMeasurement> findAllWhereAppointmentIsNull() {
        log.debug("Request to get all bodyMeasurements where Appointment is null");
        return StreamSupport
            .stream(bodyMeasurementRepository.findAll().spliterator(), false)
            .filter(bodyMeasurement -> bodyMeasurement.getAppointment() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one bodyMeasurement by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BodyMeasurement> findOne(Long id) {
        log.debug("Request to get BodyMeasurement : {}", id);
        return bodyMeasurementRepository.findById(id);
    }

    /**
     * Delete the bodyMeasurement by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BodyMeasurement : {}", id);
        bodyMeasurementRepository.deleteById(id);
    }
}
