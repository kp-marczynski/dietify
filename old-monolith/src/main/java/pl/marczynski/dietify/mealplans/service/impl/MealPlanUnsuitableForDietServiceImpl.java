package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealPlanUnsuitableForDietService;
import pl.marczynski.dietify.mealplans.domain.MealPlanUnsuitableForDiet;
import pl.marczynski.dietify.mealplans.repository.MealPlanUnsuitableForDietRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing MealPlanUnsuitableForDiet.
 */
@Service
@Transactional
public class MealPlanUnsuitableForDietServiceImpl implements MealPlanUnsuitableForDietService {

    private final Logger log = LoggerFactory.getLogger(MealPlanUnsuitableForDietServiceImpl.class);

    private final MealPlanUnsuitableForDietRepository mealPlanUnsuitableForDietRepository;

    public MealPlanUnsuitableForDietServiceImpl(MealPlanUnsuitableForDietRepository mealPlanUnsuitableForDietRepository) {
        this.mealPlanUnsuitableForDietRepository = mealPlanUnsuitableForDietRepository;
    }

    /**
     * Save a mealPlanUnsuitableForDiet.
     *
     * @param mealPlanUnsuitableForDiet the entity to save
     * @return the persisted entity
     */
    @Override
    public MealPlanUnsuitableForDiet save(MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet) {
        log.debug("Request to save MealPlanUnsuitableForDiet : {}", mealPlanUnsuitableForDiet);
        return mealPlanUnsuitableForDietRepository.save(mealPlanUnsuitableForDiet);
    }

    /**
     * Get all the mealPlanUnsuitableForDiets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealPlanUnsuitableForDiet> findAll() {
        log.debug("Request to get all MealPlanUnsuitableForDiets");
        return mealPlanUnsuitableForDietRepository.findAll();
    }


    /**
     * Get one mealPlanUnsuitableForDiet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealPlanUnsuitableForDiet> findOne(Long id) {
        log.debug("Request to get MealPlanUnsuitableForDiet : {}", id);
        return mealPlanUnsuitableForDietRepository.findById(id);
    }

    /**
     * Delete the mealPlanUnsuitableForDiet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealPlanUnsuitableForDiet : {}", id);
        mealPlanUnsuitableForDietRepository.deleteById(id);
    }
}
