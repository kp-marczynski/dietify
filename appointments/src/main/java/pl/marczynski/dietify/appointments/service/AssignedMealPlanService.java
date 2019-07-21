package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.service.dto.AssignedMealPlanDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.appointments.domain.AssignedMealPlan}.
 */
public interface AssignedMealPlanService {

    /**
     * Save a assignedMealPlan.
     *
     * @param assignedMealPlanDTO the entity to save.
     * @return the persisted entity.
     */
    AssignedMealPlanDTO save(AssignedMealPlanDTO assignedMealPlanDTO);

    /**
     * Get all the assignedMealPlans.
     *
     * @return the list of entities.
     */
    List<AssignedMealPlanDTO> findAll();


    /**
     * Get the "id" assignedMealPlan.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AssignedMealPlanDTO> findOne(Long id);

    /**
     * Delete the "id" assignedMealPlan.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
