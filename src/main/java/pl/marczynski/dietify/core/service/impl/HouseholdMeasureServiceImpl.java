package pl.marczynski.dietify.core.service.impl;

import pl.marczynski.dietify.core.service.HouseholdMeasureService;
import pl.marczynski.dietify.core.domain.HouseholdMeasure;
import pl.marczynski.dietify.core.repository.HouseholdMeasureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing HouseholdMeasure.
 */
@Service
@Transactional
public class HouseholdMeasureServiceImpl implements HouseholdMeasureService {

    private final Logger log = LoggerFactory.getLogger(HouseholdMeasureServiceImpl.class);

    private final HouseholdMeasureRepository householdMeasureRepository;

    public HouseholdMeasureServiceImpl(HouseholdMeasureRepository householdMeasureRepository) {
        this.householdMeasureRepository = householdMeasureRepository;
    }

    /**
     * Save a householdMeasure.
     *
     * @param householdMeasure the entity to save
     * @return the persisted entity
     */
    @Override
    public HouseholdMeasure save(HouseholdMeasure householdMeasure) {
        log.debug("Request to save HouseholdMeasure : {}", householdMeasure);
        return householdMeasureRepository.save(householdMeasure);
    }

    /**
     * Get all the householdMeasures.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<HouseholdMeasure> findAll() {
        log.debug("Request to get all HouseholdMeasures");
        return householdMeasureRepository.findAll();
    }


    /**
     * Get one householdMeasure by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HouseholdMeasure> findOne(Long id) {
        log.debug("Request to get HouseholdMeasure : {}", id);
        return householdMeasureRepository.findById(id);
    }

    /**
     * Delete the householdMeasure by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HouseholdMeasure : {}", id);
        householdMeasureRepository.deleteById(id);
    }
}
