package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.NutritionDefinitionTranslationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.NutritionDefinitionTranslation}.
 */
public interface NutritionDefinitionTranslationService {

    /**
     * Save a nutritionDefinitionTranslation.
     *
     * @param nutritionDefinitionTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    NutritionDefinitionTranslationDTO save(NutritionDefinitionTranslationDTO nutritionDefinitionTranslationDTO);

    /**
     * Get all the nutritionDefinitionTranslations.
     *
     * @return the list of entities.
     */
    List<NutritionDefinitionTranslationDTO> findAll();


    /**
     * Get the "id" nutritionDefinitionTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NutritionDefinitionTranslationDTO> findOne(Long id);

    /**
     * Delete the "id" nutritionDefinitionTranslation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the nutritionDefinitionTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<NutritionDefinitionTranslationDTO> search(String query);
}
