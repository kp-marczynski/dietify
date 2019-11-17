package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealPlanService;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.repository.MealPlanRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealPlanSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link MealPlan}.
 */
@Service
@Transactional
public class MealPlanServiceImpl implements MealPlanService {

    private final Logger log = LoggerFactory.getLogger(MealPlanServiceImpl.class);

    private final MealPlanRepository mealPlanRepository;

    private final MealPlanSearchRepository mealPlanSearchRepository;

    public MealPlanServiceImpl(MealPlanRepository mealPlanRepository, MealPlanSearchRepository mealPlanSearchRepository) {
        this.mealPlanRepository = mealPlanRepository;
        this.mealPlanSearchRepository = mealPlanSearchRepository;
    }

    /**
     * Save a mealPlan.
     *
     * @param mealPlan the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealPlan save(MealPlan mealPlan) {
        log.debug("Request to save MealPlan : {}", mealPlan);
        if(mealPlan.getId() == null || mealPlan.getCreationDate() == null){
            mealPlan.setCreationDate(LocalDate.now());
        }
        MealPlan result = mealPlanRepository.save(mealPlan);
        mealPlanSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the mealPlans.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MealPlan> findAll(Long authorId, Pageable pageable) {
        log.debug("Request to get all MealPlans");
        return mealPlanRepository.findAllByAuthorId(authorId, pageable);
    }


    /**
     * Get one mealPlan by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealPlan> findOne(Long id) {
        log.debug("Request to get MealPlan : {}", id);
        return mealPlanRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the mealPlan by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealPlan : {}", id);
        mealPlanRepository.deleteById(id);
        mealPlanSearchRepository.deleteById(id);
    }

    /**
     * Search for the mealPlan corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MealPlan> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of MealPlans for query {}", query);
        return mealPlanSearchRepository.search(queryStringQuery(query), pageable);    }
}
