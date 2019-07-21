package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.service.dto.MealDefinitionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.mealplans.domain.MealDefinition}.
 */
public interface MealDefinitionService {

    /**
     * Save a mealDefinition.
     *
     * @param mealDefinitionDTO the entity to save.
     * @return the persisted entity.
     */
    MealDefinitionDTO save(MealDefinitionDTO mealDefinitionDTO);

    /**
     * Get all the mealDefinitions.
     *
     * @return the list of entities.
     */
    List<MealDefinitionDTO> findAll();


    /**
     * Get the "id" mealDefinition.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealDefinitionDTO> findOne(Long id);

    /**
     * Delete the "id" mealDefinition.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealDefinition corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealDefinitionDTO> search(String query);
}
