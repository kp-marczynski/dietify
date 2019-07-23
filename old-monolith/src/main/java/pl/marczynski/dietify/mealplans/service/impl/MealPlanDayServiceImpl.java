package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealPlanDayService;
import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import pl.marczynski.dietify.mealplans.repository.MealPlanDayRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing MealPlanDay.
 */
@Service
@Transactional
public class MealPlanDayServiceImpl implements MealPlanDayService {

    private final Logger log = LoggerFactory.getLogger(MealPlanDayServiceImpl.class);

    private final MealPlanDayRepository mealPlanDayRepository;

    public MealPlanDayServiceImpl(MealPlanDayRepository mealPlanDayRepository) {
        this.mealPlanDayRepository = mealPlanDayRepository;
    }

    /**
     * Save a mealPlanDay.
     *
     * @param mealPlanDay the entity to save
     * @return the persisted entity
     */
    @Override
    public MealPlanDay save(MealPlanDay mealPlanDay) {
        log.debug("Request to save MealPlanDay : {}", mealPlanDay);
        return mealPlanDayRepository.save(mealPlanDay);
    }

    /**
     * Get all the mealPlanDays.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealPlanDay> findAll() {
        log.debug("Request to get all MealPlanDays");
        return mealPlanDayRepository.findAll();
    }


    /**
     * Get one mealPlanDay by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealPlanDay> findOne(Long id) {
        log.debug("Request to get MealPlanDay : {}", id);
        return mealPlanDayRepository.findById(id);
    }

    /**
     * Delete the mealPlanDay by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealPlanDay : {}", id);
        mealPlanDayRepository.deleteById(id);
    }
}
