package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealPlanSuitableForDietService;
import pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet;
import pl.marczynski.dietify.mealplans.repository.MealPlanSuitableForDietRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing MealPlanSuitableForDiet.
 */
@Service
@Transactional
public class MealPlanSuitableForDietServiceImpl implements MealPlanSuitableForDietService {

    private final Logger log = LoggerFactory.getLogger(MealPlanSuitableForDietServiceImpl.class);

    private final MealPlanSuitableForDietRepository mealPlanSuitableForDietRepository;

    public MealPlanSuitableForDietServiceImpl(MealPlanSuitableForDietRepository mealPlanSuitableForDietRepository) {
        this.mealPlanSuitableForDietRepository = mealPlanSuitableForDietRepository;
    }

    /**
     * Save a mealPlanSuitableForDiet.
     *
     * @param mealPlanSuitableForDiet the entity to save
     * @return the persisted entity
     */
    @Override
    public MealPlanSuitableForDiet save(MealPlanSuitableForDiet mealPlanSuitableForDiet) {
        log.debug("Request to save MealPlanSuitableForDiet : {}", mealPlanSuitableForDiet);
        return mealPlanSuitableForDietRepository.save(mealPlanSuitableForDiet);
    }

    /**
     * Get all the mealPlanSuitableForDiets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealPlanSuitableForDiet> findAll() {
        log.debug("Request to get all MealPlanSuitableForDiets");
        return mealPlanSuitableForDietRepository.findAll();
    }


    /**
     * Get one mealPlanSuitableForDiet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealPlanSuitableForDiet> findOne(Long id) {
        log.debug("Request to get MealPlanSuitableForDiet : {}", id);
        return mealPlanSuitableForDietRepository.findById(id);
    }

    /**
     * Delete the mealPlanSuitableForDiet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealPlanSuitableForDiet : {}", id);
        mealPlanSuitableForDietRepository.deleteById(id);
    }
}
