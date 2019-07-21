package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.NutritionDefinitionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.NutritionDefinition}.
 */
public interface NutritionDefinitionService {

    /**
     * Save a nutritionDefinition.
     *
     * @param nutritionDefinitionDTO the entity to save.
     * @return the persisted entity.
     */
    NutritionDefinitionDTO save(NutritionDefinitionDTO nutritionDefinitionDTO);

    /**
     * Get all the nutritionDefinitions.
     *
     * @return the list of entities.
     */
    List<NutritionDefinitionDTO> findAll();


    /**
     * Get the "id" nutritionDefinition.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NutritionDefinitionDTO> findOne(Long id);

    /**
     * Delete the "id" nutritionDefinition.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the nutritionDefinition corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<NutritionDefinitionDTO> search(String query);
}
