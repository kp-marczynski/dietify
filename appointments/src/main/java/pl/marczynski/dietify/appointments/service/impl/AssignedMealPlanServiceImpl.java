package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.AssignedMealPlanService;
import pl.marczynski.dietify.appointments.domain.AssignedMealPlan;
import pl.marczynski.dietify.appointments.repository.AssignedMealPlanRepository;
import pl.marczynski.dietify.appointments.service.dto.AssignedMealPlanDTO;
import pl.marczynski.dietify.appointments.service.mapper.AssignedMealPlanMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link AssignedMealPlan}.
 */
@Service
@Transactional
public class AssignedMealPlanServiceImpl implements AssignedMealPlanService {

    private final Logger log = LoggerFactory.getLogger(AssignedMealPlanServiceImpl.class);

    private final AssignedMealPlanRepository assignedMealPlanRepository;

    private final AssignedMealPlanMapper assignedMealPlanMapper;

    public AssignedMealPlanServiceImpl(AssignedMealPlanRepository assignedMealPlanRepository, AssignedMealPlanMapper assignedMealPlanMapper) {
        this.assignedMealPlanRepository = assignedMealPlanRepository;
        this.assignedMealPlanMapper = assignedMealPlanMapper;
    }

    /**
     * Save a assignedMealPlan.
     *
     * @param assignedMealPlanDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AssignedMealPlanDTO save(AssignedMealPlanDTO assignedMealPlanDTO) {
        log.debug("Request to save AssignedMealPlan : {}", assignedMealPlanDTO);
        AssignedMealPlan assignedMealPlan = assignedMealPlanMapper.toEntity(assignedMealPlanDTO);
        assignedMealPlan = assignedMealPlanRepository.save(assignedMealPlan);
        return assignedMealPlanMapper.toDto(assignedMealPlan);
    }

    /**
     * Get all the assignedMealPlans.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<AssignedMealPlanDTO> findAll() {
        log.debug("Request to get all AssignedMealPlans");
        return assignedMealPlanRepository.findAll().stream()
            .map(assignedMealPlanMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one assignedMealPlan by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AssignedMealPlanDTO> findOne(Long id) {
        log.debug("Request to get AssignedMealPlan : {}", id);
        return assignedMealPlanRepository.findById(id)
            .map(assignedMealPlanMapper::toDto);
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
