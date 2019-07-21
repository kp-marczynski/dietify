package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.service.dto.MealPlanUnsuitableForDietDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.mealplans.domain.MealPlanUnsuitableForDiet}.
 */
public interface MealPlanUnsuitableForDietService {

    /**
     * Save a mealPlanUnsuitableForDiet.
     *
     * @param mealPlanUnsuitableForDietDTO the entity to save.
     * @return the persisted entity.
     */
    MealPlanUnsuitableForDietDTO save(MealPlanUnsuitableForDietDTO mealPlanUnsuitableForDietDTO);

    /**
     * Get all the mealPlanUnsuitableForDiets.
     *
     * @return the list of entities.
     */
    List<MealPlanUnsuitableForDietDTO> findAll();


    /**
     * Get the "id" mealPlanUnsuitableForDiet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealPlanUnsuitableForDietDTO> findOne(Long id);

    /**
     * Delete the "id" mealPlanUnsuitableForDiet.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealPlanUnsuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealPlanUnsuitableForDietDTO> search(String query);
}
