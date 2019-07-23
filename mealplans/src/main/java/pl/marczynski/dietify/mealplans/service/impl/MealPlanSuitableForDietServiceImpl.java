package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealPlanSuitableForDietService;
import pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet;
import pl.marczynski.dietify.mealplans.repository.MealPlanSuitableForDietRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealPlanSuitableForDietSearchRepository;
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
 * Service Implementation for managing {@link MealPlanSuitableForDiet}.
 */
@Service
@Transactional
public class MealPlanSuitableForDietServiceImpl implements MealPlanSuitableForDietService {

    private final Logger log = LoggerFactory.getLogger(MealPlanSuitableForDietServiceImpl.class);

    private final MealPlanSuitableForDietRepository mealPlanSuitableForDietRepository;

    private final MealPlanSuitableForDietSearchRepository mealPlanSuitableForDietSearchRepository;

    public MealPlanSuitableForDietServiceImpl(MealPlanSuitableForDietRepository mealPlanSuitableForDietRepository, MealPlanSuitableForDietSearchRepository mealPlanSuitableForDietSearchRepository) {
        this.mealPlanSuitableForDietRepository = mealPlanSuitableForDietRepository;
        this.mealPlanSuitableForDietSearchRepository = mealPlanSuitableForDietSearchRepository;
    }

    /**
     * Save a mealPlanSuitableForDiet.
     *
     * @param mealPlanSuitableForDiet the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealPlanSuitableForDiet save(MealPlanSuitableForDiet mealPlanSuitableForDiet) {
        log.debug("Request to save MealPlanSuitableForDiet : {}", mealPlanSuitableForDiet);
        MealPlanSuitableForDiet result = mealPlanSuitableForDietRepository.save(mealPlanSuitableForDiet);
        mealPlanSuitableForDietSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the mealPlanSuitableForDiets.
     *
     * @return the list of entities.
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
     * @param id the id of the entity.
     * @return the entity.
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
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealPlanSuitableForDiet : {}", id);
        mealPlanSuitableForDietRepository.deleteById(id);
        mealPlanSuitableForDietSearchRepository.deleteById(id);
    }

    /**
     * Search for the mealPlanSuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealPlanSuitableForDiet> search(String query) {
        log.debug("Request to search MealPlanSuitableForDiets for query {}", query);
        return StreamSupport
            .stream(mealPlanSuitableForDietSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
