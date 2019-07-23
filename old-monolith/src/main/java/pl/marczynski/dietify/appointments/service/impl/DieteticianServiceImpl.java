package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.DieteticianService;
import pl.marczynski.dietify.appointments.domain.Dietetician;
import pl.marczynski.dietify.appointments.repository.DieteticianRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Dietetician.
 */
@Service
@Transactional
public class DieteticianServiceImpl implements DieteticianService {

    private final Logger log = LoggerFactory.getLogger(DieteticianServiceImpl.class);

    private final DieteticianRepository dieteticianRepository;

    public DieteticianServiceImpl(DieteticianRepository dieteticianRepository) {
        this.dieteticianRepository = dieteticianRepository;
    }

    /**
     * Save a dietetician.
     *
     * @param dietetician the entity to save
     * @return the persisted entity
     */
    @Override
    public Dietetician save(Dietetician dietetician) {
        log.debug("Request to save Dietetician : {}", dietetician);
        return dieteticianRepository.save(dietetician);
    }

    /**
     * Get all the dieteticians.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Dietetician> findAll() {
        log.debug("Request to get all Dieteticians");
        return dieteticianRepository.findAll();
    }


    /**
     * Get one dietetician by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Dietetician> findOne(Long id) {
        log.debug("Request to get Dietetician : {}", id);
        return dieteticianRepository.findById(id);
    }

    /**
     * Delete the dietetician by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dietetician : {}", id);
        dieteticianRepository.deleteById(id);
    }
}
