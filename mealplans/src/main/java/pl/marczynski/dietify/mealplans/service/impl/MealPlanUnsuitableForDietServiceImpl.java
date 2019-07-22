package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealPlanUnsuitableForDietService;
import pl.marczynski.dietify.mealplans.domain.MealPlanUnsuitableForDiet;
import pl.marczynski.dietify.mealplans.repository.MealPlanUnsuitableForDietRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealPlanUnsuitableForDietSearchRepository;
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
 * Service Implementation for managing {@link MealPlanUnsuitableForDiet}.
 */
@Service
@Transactional
public class MealPlanUnsuitableForDietServiceImpl implements MealPlanUnsuitableForDietService {

    private final Logger log = LoggerFactory.getLogger(MealPlanUnsuitableForDietServiceImpl.class);

    private final MealPlanUnsuitableForDietRepository mealPlanUnsuitableForDietRepository;

    private final MealPlanUnsuitableForDietSearchRepository mealPlanUnsuitableForDietSearchRepository;

    public MealPlanUnsuitableForDietServiceImpl(MealPlanUnsuitableForDietRepository mealPlanUnsuitableForDietRepository, MealPlanUnsuitableForDietSearchRepository mealPlanUnsuitableForDietSearchRepository) {
        this.mealPlanUnsuitableForDietRepository = mealPlanUnsuitableForDietRepository;
        this.mealPlanUnsuitableForDietSearchRepository = mealPlanUnsuitableForDietSearchRepository;
    }

    /**
     * Save a mealPlanUnsuitableForDiet.
     *
     * @param mealPlanUnsuitableForDiet the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealPlanUnsuitableForDiet save(MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet) {
        log.debug("Request to save MealPlanUnsuitableForDiet : {}", mealPlanUnsuitableForDiet);
        MealPlanUnsuitableForDiet result = mealPlanUnsuitableForDietRepository.save(mealPlanUnsuitableForDiet);
        mealPlanUnsuitableForDietSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the mealPlanUnsuitableForDiets.
     *
     * @return the list of entities.
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
     * @param id the id of the entity.
     * @return the entity.
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
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealPlanUnsuitableForDiet : {}", id);
        mealPlanUnsuitableForDietRepository.deleteById(id);
        mealPlanUnsuitableForDietSearchRepository.deleteById(id);
    }

    /**
     * Search for the mealPlanUnsuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealPlanUnsuitableForDiet> search(String query) {
        log.debug("Request to search MealPlanUnsuitableForDiets for query {}", query);
        return StreamSupport
            .stream(mealPlanUnsuitableForDietSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
