package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.PreparationStepDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.PreparationStep}.
 */
public interface PreparationStepService {

    /**
     * Save a preparationStep.
     *
     * @param preparationStepDTO the entity to save.
     * @return the persisted entity.
     */
    PreparationStepDTO save(PreparationStepDTO preparationStepDTO);

    /**
     * Get all the preparationSteps.
     *
     * @return the list of entities.
     */
    List<PreparationStepDTO> findAll();


    /**
     * Get the "id" preparationStep.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PreparationStepDTO> findOne(Long id);

    /**
     * Delete the "id" preparationStep.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the preparationStep corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<PreparationStepDTO> search(String query);
}
