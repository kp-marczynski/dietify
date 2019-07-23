package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.domain.MealPlan;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link MealPlan}.
 */
public interface MealPlanService {

    /**
     * Save a mealPlan.
     *
     * @param mealPlan the entity to save.
     * @return the persisted entity.
     */
    MealPlan save(MealPlan mealPlan);

    /**
     * Get all the mealPlans.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MealPlan> findAll(Pageable pageable);


    /**
     * Get the "id" mealPlan.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealPlan> findOne(Long id);

    /**
     * Delete the "id" mealPlan.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealPlan corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MealPlan> search(String query, Pageable pageable);
}
