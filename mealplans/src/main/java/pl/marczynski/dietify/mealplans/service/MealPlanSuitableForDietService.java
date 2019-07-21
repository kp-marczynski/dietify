package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.service.dto.MealPlanSuitableForDietDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet}.
 */
public interface MealPlanSuitableForDietService {

    /**
     * Save a mealPlanSuitableForDiet.
     *
     * @param mealPlanSuitableForDietDTO the entity to save.
     * @return the persisted entity.
     */
    MealPlanSuitableForDietDTO save(MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO);

    /**
     * Get all the mealPlanSuitableForDiets.
     *
     * @return the list of entities.
     */
    List<MealPlanSuitableForDietDTO> findAll();


    /**
     * Get the "id" mealPlanSuitableForDiet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealPlanSuitableForDietDTO> findOne(Long id);

    /**
     * Delete the "id" mealPlanSuitableForDiet.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealPlanSuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealPlanSuitableForDietDTO> search(String query);
}
