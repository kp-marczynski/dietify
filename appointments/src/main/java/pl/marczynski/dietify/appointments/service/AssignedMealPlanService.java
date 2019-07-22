package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.domain.AssignedMealPlan;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link AssignedMealPlan}.
 */
public interface AssignedMealPlanService {

    /**
     * Save a assignedMealPlan.
     *
     * @param assignedMealPlan the entity to save.
     * @return the persisted entity.
     */
    AssignedMealPlan save(AssignedMealPlan assignedMealPlan);

    /**
     * Get all the assignedMealPlans.
     *
     * @return the list of entities.
     */
    List<AssignedMealPlan> findAll();


    /**
     * Get the "id" assignedMealPlan.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AssignedMealPlan> findOne(Long id);

    /**
     * Delete the "id" assignedMealPlan.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
