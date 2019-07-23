package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.NutritionalInterviewService;
import pl.marczynski.dietify.appointments.domain.NutritionalInterview;
import pl.marczynski.dietify.appointments.repository.NutritionalInterviewRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link NutritionalInterview}.
 */
@Service
@Transactional
public class NutritionalInterviewServiceImpl implements NutritionalInterviewService {

    private final Logger log = LoggerFactory.getLogger(NutritionalInterviewServiceImpl.class);

    private final NutritionalInterviewRepository nutritionalInterviewRepository;

    public NutritionalInterviewServiceImpl(NutritionalInterviewRepository nutritionalInterviewRepository) {
        this.nutritionalInterviewRepository = nutritionalInterviewRepository;
    }

    /**
     * Save a nutritionalInterview.
     *
     * @param nutritionalInterview the entity to save.
     * @return the persisted entity.
     */
    @Override
    public NutritionalInterview save(NutritionalInterview nutritionalInterview) {
        log.debug("Request to save NutritionalInterview : {}", nutritionalInterview);
        return nutritionalInterviewRepository.save(nutritionalInterview);
    }

    /**
     * Get all the nutritionalInterviews.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<NutritionalInterview> findAll() {
        log.debug("Request to get all NutritionalInterviews");
        return nutritionalInterviewRepository.findAll();
    }



    /**
    *  Get all the nutritionalInterviews where Appointment is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<NutritionalInterview> findAllWhereAppointmentIsNull() {
        log.debug("Request to get all nutritionalInterviews where Appointment is null");
        return StreamSupport
            .stream(nutritionalInterviewRepository.findAll().spliterator(), false)
            .filter(nutritionalInterview -> nutritionalInterview.getAppointment() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one nutritionalInterview by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NutritionalInterview> findOne(Long id) {
        log.debug("Request to get NutritionalInterview : {}", id);
        return nutritionalInterviewRepository.findById(id);
    }

    /**
     * Delete the nutritionalInterview by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NutritionalInterview : {}", id);
        nutritionalInterviewRepository.deleteById(id);
    }
}
