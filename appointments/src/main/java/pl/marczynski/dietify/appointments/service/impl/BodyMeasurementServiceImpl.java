package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.BodyMeasurementService;
import pl.marczynski.dietify.appointments.domain.BodyMeasurement;
import pl.marczynski.dietify.appointments.repository.BodyMeasurementRepository;
import pl.marczynski.dietify.appointments.service.dto.BodyMeasurementDTO;
import pl.marczynski.dietify.appointments.service.mapper.BodyMeasurementMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link BodyMeasurement}.
 */
@Service
@Transactional
public class BodyMeasurementServiceImpl implements BodyMeasurementService {

    private final Logger log = LoggerFactory.getLogger(BodyMeasurementServiceImpl.class);

    private final BodyMeasurementRepository bodyMeasurementRepository;

    private final BodyMeasurementMapper bodyMeasurementMapper;

    public BodyMeasurementServiceImpl(BodyMeasurementRepository bodyMeasurementRepository, BodyMeasurementMapper bodyMeasurementMapper) {
        this.bodyMeasurementRepository = bodyMeasurementRepository;
        this.bodyMeasurementMapper = bodyMeasurementMapper;
    }

    /**
     * Save a bodyMeasurement.
     *
     * @param bodyMeasurementDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BodyMeasurementDTO save(BodyMeasurementDTO bodyMeasurementDTO) {
        log.debug("Request to save BodyMeasurement : {}", bodyMeasurementDTO);
        BodyMeasurement bodyMeasurement = bodyMeasurementMapper.toEntity(bodyMeasurementDTO);
        bodyMeasurement = bodyMeasurementRepository.save(bodyMeasurement);
        return bodyMeasurementMapper.toDto(bodyMeasurement);
    }

    /**
     * Get all the bodyMeasurements.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<BodyMeasurementDTO> findAll() {
        log.debug("Request to get all BodyMeasurements");
        return bodyMeasurementRepository.findAll().stream()
            .map(bodyMeasurementMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one bodyMeasurement by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BodyMeasurementDTO> findOne(Long id) {
        log.debug("Request to get BodyMeasurement : {}", id);
        return bodyMeasurementRepository.findById(id)
            .map(bodyMeasurementMapper::toDto);
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
