package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.AssignedMealPlanService;
import pl.marczynski.dietify.appointments.domain.AssignedMealPlan;
import pl.marczynski.dietify.appointments.repository.AssignedMealPlanRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link AssignedMealPlan}.
 */
@Service
@Transactional
public class AssignedMealPlanServiceImpl implements AssignedMealPlanService {

    private final Logger log = LoggerFactory.getLogger(AssignedMealPlanServiceImpl.class);

    private final AssignedMealPlanRepository assignedMealPlanRepository;

    public AssignedMealPlanServiceImpl(AssignedMealPlanRepository assignedMealPlanRepository) {
        this.assignedMealPlanRepository = assignedMealPlanRepository;
    }

    /**
     * Save a assignedMealPlan.
     *
     * @param assignedMealPlan the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AssignedMealPlan save(AssignedMealPlan assignedMealPlan) {
        log.debug("Request to save AssignedMealPlan : {}", assignedMealPlan);
        return assignedMealPlanRepository.save(assignedMealPlan);
    }

    /**
     * Get all the assignedMealPlans.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<AssignedMealPlan> findAll() {
        log.debug("Request to get all AssignedMealPlans");
        return assignedMealPlanRepository.findAll();
    }


    /**
     * Get one assignedMealPlan by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AssignedMealPlan> findOne(Long id) {
        log.debug("Request to get AssignedMealPlan : {}", id);
        return assignedMealPlanRepository.findById(id);
    }

    /**
     * Delete the assignedMealPlan by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AssignedMealPlan : {}", id);
        assignedMealPlanRepository.deleteById(id);
    }
}
