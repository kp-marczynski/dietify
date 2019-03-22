package pl.marczynski.dietify.core.service.impl;

import pl.marczynski.dietify.core.service.DietTypeService;
import pl.marczynski.dietify.core.domain.DietType;
import pl.marczynski.dietify.core.repository.DietTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing DietType.
 */
@Service
@Transactional
public class DietTypeServiceImpl implements DietTypeService {

    private final Logger log = LoggerFactory.getLogger(DietTypeServiceImpl.class);

    private final DietTypeRepository dietTypeRepository;

    public DietTypeServiceImpl(DietTypeRepository dietTypeRepository) {
        this.dietTypeRepository = dietTypeRepository;
    }

    /**
     * Save a dietType.
     *
     * @param dietType the entity to save
     * @return the persisted entity
     */
    @Override
    public DietType save(DietType dietType) {
        log.debug("Request to save DietType : {}", dietType);
        return dietTypeRepository.save(dietType);
    }

    /**
     * Get all the dietTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DietType> findAll() {
        log.debug("Request to get all DietTypes");
        return dietTypeRepository.findAll();
    }


    /**
     * Get one dietType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DietType> findOne(Long id) {
        log.debug("Request to get DietType : {}", id);
        return dietTypeRepository.findById(id);
    }

    /**
     * Delete the dietType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DietType : {}", id);
        dietTypeRepository.deleteById(id);
    }
}
