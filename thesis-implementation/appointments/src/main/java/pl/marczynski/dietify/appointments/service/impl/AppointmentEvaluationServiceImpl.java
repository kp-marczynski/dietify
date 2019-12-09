package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.AppointmentEvaluationService;
import pl.marczynski.dietify.appointments.domain.AppointmentEvaluation;
import pl.marczynski.dietify.appointments.repository.AppointmentEvaluationRepository;
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

    public AppointmentEvaluationServiceImpl(AppointmentEvaluationRepository appointmentEvaluationRepository) {
        this.appointmentEvaluationRepository = appointmentEvaluationRepository;
    }

    /**
     * Save a appointmentEvaluation.
     *
     * @param appointmentEvaluation the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AppointmentEvaluation save(AppointmentEvaluation appointmentEvaluation) {
        log.debug("Request to save AppointmentEvaluation : {}", appointmentEvaluation);
        return appointmentEvaluationRepository.save(appointmentEvaluation);
    }

    /**
     * Get all the appointmentEvaluations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AppointmentEvaluation> findAll(Pageable pageable) {
        log.debug("Request to get all AppointmentEvaluations");
        return appointmentEvaluationRepository.findAll(pageable);
    }


    /**
     * Get one appointmentEvaluation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AppointmentEvaluation> findOne(Long id) {
        log.debug("Request to get AppointmentEvaluation : {}", id);
        return appointmentEvaluationRepository.findById(id);
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
