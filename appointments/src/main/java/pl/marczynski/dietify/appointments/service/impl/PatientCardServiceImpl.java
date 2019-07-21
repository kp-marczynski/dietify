package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.PatientCardService;
import pl.marczynski.dietify.appointments.domain.PatientCard;
import pl.marczynski.dietify.appointments.repository.PatientCardRepository;
import pl.marczynski.dietify.appointments.service.dto.PatientCardDTO;
import pl.marczynski.dietify.appointments.service.mapper.PatientCardMapper;
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

    private final PatientCardMapper patientCardMapper;

    public PatientCardServiceImpl(PatientCardRepository patientCardRepository, PatientCardMapper patientCardMapper) {
        this.patientCardRepository = patientCardRepository;
        this.patientCardMapper = patientCardMapper;
    }

    /**
     * Save a patientCard.
     *
     * @param patientCardDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PatientCardDTO save(PatientCardDTO patientCardDTO) {
        log.debug("Request to save PatientCard : {}", patientCardDTO);
        PatientCard patientCard = patientCardMapper.toEntity(patientCardDTO);
        patientCard = patientCardRepository.save(patientCard);
        return patientCardMapper.toDto(patientCard);
    }

    /**
     * Get all the patientCards.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PatientCardDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PatientCards");
        return patientCardRepository.findAll(pageable)
            .map(patientCardMapper::toDto);
    }


    /**
     * Get one patientCard by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PatientCardDTO> findOne(Long id) {
        log.debug("Request to get PatientCard : {}", id);
        return patientCardRepository.findById(id)
            .map(patientCardMapper::toDto);
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
