package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.DishTypeService;
import pl.marczynski.dietify.recipes.domain.DishType;
import pl.marczynski.dietify.recipes.repository.DishTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing DishType.
 */
@Service
@Transactional
public class DishTypeServiceImpl implements DishTypeService {

    private final Logger log = LoggerFactory.getLogger(DishTypeServiceImpl.class);

    private final DishTypeRepository dishTypeRepository;

    public DishTypeServiceImpl(DishTypeRepository dishTypeRepository) {
        this.dishTypeRepository = dishTypeRepository;
    }

    /**
     * Save a dishType.
     *
     * @param dishType the entity to save
     * @return the persisted entity
     */
    @Override
    public DishType save(DishType dishType) {
        log.debug("Request to save DishType : {}", dishType);
        return dishTypeRepository.save(dishType);
    }

    /**
     * Get all the dishTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DishType> findAll() {
        log.debug("Request to get all DishTypes");
        return dishTypeRepository.findAll();
    }


    /**
     * Get one dishType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DishType> findOne(Long id) {
        log.debug("Request to get DishType : {}", id);
        return dishTypeRepository.findById(id);
    }

    /**
     * Delete the dishType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DishType : {}", id);
        dishTypeRepository.deleteById(id);
    }
}
