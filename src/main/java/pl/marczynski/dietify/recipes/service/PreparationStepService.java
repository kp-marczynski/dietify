package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.PreparationStep;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PreparationStep.
 */
public interface PreparationStepService {

    /**
     * Save a preparationStep.
     *
     * @param preparationStep the entity to save
     * @return the persisted entity
     */
    PreparationStep save(PreparationStep preparationStep);

    /**
     * Get all the preparationSteps.
     *
     * @return the list of entities
     */
    List<PreparationStep> findAll();


    /**
     * Get the "id" preparationStep.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PreparationStep> findOne(Long id);

    /**
     * Delete the "id" preparationStep.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
