package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.service.dto.MealPlanDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.mealplans.domain.MealPlan}.
 */
public interface MealPlanService {

    /**
     * Save a mealPlan.
     *
     * @param mealPlanDTO the entity to save.
     * @return the persisted entity.
     */
    MealPlanDTO save(MealPlanDTO mealPlanDTO);

    /**
     * Get all the mealPlans.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MealPlanDTO> findAll(Pageable pageable);


    /**
     * Get the "id" mealPlan.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealPlanDTO> findOne(Long id);

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
    Page<MealPlanDTO> search(String query, Pageable pageable);
}
