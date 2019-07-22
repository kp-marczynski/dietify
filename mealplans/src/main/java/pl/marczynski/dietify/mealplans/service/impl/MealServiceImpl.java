package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealService;
import pl.marczynski.dietify.mealplans.domain.Meal;
import pl.marczynski.dietify.mealplans.repository.MealRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Meal}.
 */
@Service
@Transactional
public class MealServiceImpl implements MealService {

    private final Logger log = LoggerFactory.getLogger(MealServiceImpl.class);

    private final MealRepository mealRepository;

    private final MealSearchRepository mealSearchRepository;

    public MealServiceImpl(MealRepository mealRepository, MealSearchRepository mealSearchRepository) {
        this.mealRepository = mealRepository;
        this.mealSearchRepository = mealSearchRepository;
    }

    /**
     * Save a meal.
     *
     * @param meal the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Meal save(Meal meal) {
        log.debug("Request to save Meal : {}", meal);
        Meal result = mealRepository.save(meal);
        mealSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the meals.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Meal> findAll() {
        log.debug("Request to get all Meals");
        return mealRepository.findAll();
    }


    /**
     * Get one meal by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Meal> findOne(Long id) {
        log.debug("Request to get Meal : {}", id);
        return mealRepository.findById(id);
    }

    /**
     * Delete the meal by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Meal : {}", id);
        mealRepository.deleteById(id);
        mealSearchRepository.deleteById(id);
    }

    /**
     * Search for the meal corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Meal> search(String query) {
        log.debug("Request to search Meals for query {}", query);
        return StreamSupport
            .stream(mealSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
