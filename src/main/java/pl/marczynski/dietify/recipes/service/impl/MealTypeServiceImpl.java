package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.MealTypeService;
import pl.marczynski.dietify.recipes.domain.MealType;
import pl.marczynski.dietify.recipes.repository.MealTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing MealType.
 */
@Service
@Transactional
public class MealTypeServiceImpl implements MealTypeService {

    private final Logger log = LoggerFactory.getLogger(MealTypeServiceImpl.class);

    private final MealTypeRepository mealTypeRepository;

    public MealTypeServiceImpl(MealTypeRepository mealTypeRepository) {
        this.mealTypeRepository = mealTypeRepository;
    }

    /**
     * Save a mealType.
     *
     * @param mealType the entity to save
     * @return the persisted entity
     */
    @Override
    public MealType save(MealType mealType) {
        log.debug("Request to save MealType : {}", mealType);
        return mealTypeRepository.save(mealType);
    }

    /**
     * Get all the mealTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealType> findAll() {
        log.debug("Request to get all MealTypes");
        return mealTypeRepository.findAll();
    }


    /**
     * Get one mealType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealType> findOne(Long id) {
        log.debug("Request to get MealType : {}", id);
        return mealTypeRepository.findById(id);
    }

    /**
     * Delete the mealType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealType : {}", id);
        mealTypeRepository.deleteById(id);
    }
}
