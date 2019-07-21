package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.BodyMeasurmentService;
import pl.marczynski.dietify.appointments.domain.BodyMeasurment;
import pl.marczynski.dietify.appointments.repository.BodyMeasurmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing BodyMeasurment.
 */
@Service
@Transactional
public class BodyMeasurmentServiceImpl implements BodyMeasurmentService {

    private final Logger log = LoggerFactory.getLogger(BodyMeasurmentServiceImpl.class);

    private final BodyMeasurmentRepository bodyMeasurmentRepository;

    public BodyMeasurmentServiceImpl(BodyMeasurmentRepository bodyMeasurmentRepository) {
        this.bodyMeasurmentRepository = bodyMeasurmentRepository;
    }

    /**
     * Save a bodyMeasurment.
     *
     * @param bodyMeasurment the entity to save
     * @return the persisted entity
     */
    @Override
    public BodyMeasurment save(BodyMeasurment bodyMeasurment) {
        log.debug("Request to save BodyMeasurment : {}", bodyMeasurment);
        return bodyMeasurmentRepository.save(bodyMeasurment);
    }

    /**
     * Get all the bodyMeasurments.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BodyMeasurment> findAll() {
        log.debug("Request to get all BodyMeasurments");
        return bodyMeasurmentRepository.findAll();
    }


    /**
     * Get one bodyMeasurment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BodyMeasurment> findOne(Long id) {
        log.debug("Request to get BodyMeasurment : {}", id);
        return bodyMeasurmentRepository.findById(id);
    }

    /**
     * Delete the bodyMeasurment by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BodyMeasurment : {}", id);
        bodyMeasurmentRepository.deleteById(id);
    }
}
