package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.PatientCardService;
import pl.marczynski.dietify.appointments.domain.PatientCard;
import pl.marczynski.dietify.appointments.repository.PatientCardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link PatientCard}.
 */
@Service
@Transactional
public class PatientCardServiceImpl implements PatientCardService {

    private final Logger log = LoggerFactory.getLogger(PatientCardServiceImpl.class);

    private final PatientCardRepository patientCardRepository;

    public PatientCardServiceImpl(PatientCardRepository patientCardRepository) {
        this.patientCardRepository = patientCardRepository;
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
        return patientCardRepository.save(patientCard);
    }

    /**
     * Get all the patientCards.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PatientCard> findAll(Pageable pageable) {
        log.debug("Request to get all PatientCards");
        return patientCardRepository.findAll(pageable);
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
