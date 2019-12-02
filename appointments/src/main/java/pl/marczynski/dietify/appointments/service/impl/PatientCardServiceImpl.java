package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.domain.BmiResult;
import pl.marczynski.dietify.appointments.service.AppointmentService;
import pl.marczynski.dietify.appointments.service.PatientCardService;
import pl.marczynski.dietify.appointments.domain.PatientCard;
import pl.marczynski.dietify.appointments.repository.PatientCardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PatientCard}.
 */
@Service
@Transactional
public class PatientCardServiceImpl implements PatientCardService {

    private final Logger log = LoggerFactory.getLogger(PatientCardServiceImpl.class);

    private final PatientCardRepository patientCardRepository;
    private final AppointmentService appointmentService;

    public PatientCardServiceImpl(PatientCardRepository patientCardRepository, AppointmentService appointmentService) {
        this.patientCardRepository = patientCardRepository;
        this.appointmentService = appointmentService;
    }

    /**
     * Save a patientCard.
     *
     * @param patientCard the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PatientCard save(PatientCard patientCard) {
        log.debug("Request to save PatientCard : {}", patientCard);
        if(patientCard.getId() == null || patientCard.getCreationDate() == null){
            patientCard.setCreationDate(LocalDate.now());
        }
        return patientCardRepository.save(patientCard);
    }

    /**
     * Get all the patientCards.
     *
     *
     * @param dietitianId
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PatientCard> findAll(Long dietitianId, Pageable pageable) {
        log.debug("Request to get all PatientCards");
        return patientCardRepository.findAllByDietitianId(dietitianId, pageable);
    }


    /**
     * Get one patientCard by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PatientCard> findOne(Long id) {
        log.debug("Request to get PatientCard : {}", id);
        return patientCardRepository.findById(id);
    }

    @Override
    public List<BmiResult> getBmiResults(Long patientCardId) {
        return this.appointmentService.calculateBMI(patientCardId);
    }
    /**
     * Delete the patientCard by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PatientCard : {}", id);
        patientCardRepository.deleteById(id);
    }
}
