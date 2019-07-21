package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.AppointmentEvaluationService;
import pl.marczynski.dietify.appointments.domain.AppointmentEvaluation;
import pl.marczynski.dietify.appointments.repository.AppointmentEvaluationRepository;
import pl.marczynski.dietify.appointments.service.dto.AppointmentEvaluationDTO;
import pl.marczynski.dietify.appointments.service.mapper.AppointmentEvaluationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link AppointmentEvaluation}.
 */
@Service
@Transactional
public class AppointmentEvaluationServiceImpl implements AppointmentEvaluationService {

    private final Logger log = LoggerFactory.getLogger(AppointmentEvaluationServiceImpl.class);

    private final AppointmentEvaluationRepository appointmentEvaluationRepository;

    private final AppointmentEvaluationMapper appointmentEvaluationMapper;

    public AppointmentEvaluationServiceImpl(AppointmentEvaluationRepository appointmentEvaluationRepository, AppointmentEvaluationMapper appointmentEvaluationMapper) {
        this.appointmentEvaluationRepository = appointmentEvaluationRepository;
        this.appointmentEvaluationMapper = appointmentEvaluationMapper;
    }

    /**
     * Save a appointmentEvaluation.
     *
     * @param appointmentEvaluationDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AppointmentEvaluationDTO save(AppointmentEvaluationDTO appointmentEvaluationDTO) {
        log.debug("Request to save AppointmentEvaluation : {}", appointmentEvaluationDTO);
        AppointmentEvaluation appointmentEvaluation = appointmentEvaluationMapper.toEntity(appointmentEvaluationDTO);
        appointmentEvaluation = appointmentEvaluationRepository.save(appointmentEvaluation);
        return appointmentEvaluationMapper.toDto(appointmentEvaluation);
    }

    /**
     * Get all the appointmentEvaluations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AppointmentEvaluationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AppointmentEvaluations");
        return appointmentEvaluationRepository.findAll(pageable)
            .map(appointmentEvaluationMapper::toDto);
    }


    /**
     * Get one appointmentEvaluation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AppointmentEvaluationDTO> findOne(Long id) {
        log.debug("Request to get AppointmentEvaluation : {}", id);
        return appointmentEvaluationRepository.findById(id)
            .map(appointmentEvaluationMapper::toDto);
    }

    /**
     * Delete the appointmentEvaluation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AppointmentEvaluation : {}", id);
        appointmentEvaluationRepository.deleteById(id);
    }
}
