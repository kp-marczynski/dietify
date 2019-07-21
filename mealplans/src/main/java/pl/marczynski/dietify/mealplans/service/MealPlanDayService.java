package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.service.dto.MealPlanDayDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.mealplans.domain.MealPlanDay}.
 */
public interface MealPlanDayService {

    /**
     * Save a mealPlanDay.
     *
     * @param mealPlanDayDTO the entity to save.
     * @return the persisted entity.
     */
    MealPlanDayDTO save(MealPlanDayDTO mealPlanDayDTO);

    /**
     * Get all the mealPlanDays.
     *
     * @return the list of entities.
     */
    List<MealPlanDayDTO> findAll();


    /**
     * Get the "id" mealPlanDay.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealPlanDayDTO> findOne(Long id);

    /**
     * Delete the "id" mealPlanDay.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealPlanDay corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealPlanDayDTO> search(String query);
}
