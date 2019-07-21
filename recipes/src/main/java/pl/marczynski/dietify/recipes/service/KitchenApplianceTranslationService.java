package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.KitchenApplianceTranslationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.KitchenApplianceTranslation}.
 */
public interface KitchenApplianceTranslationService {

    /**
     * Save a kitchenApplianceTranslation.
     *
     * @param kitchenApplianceTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    KitchenApplianceTranslationDTO save(KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO);

    /**
     * Get all the kitchenApplianceTranslations.
     *
     * @return the list of entities.
     */
    List<KitchenApplianceTranslationDTO> findAll();


    /**
     * Get the "id" kitchenApplianceTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<KitchenApplianceTranslationDTO> findOne(Long id);

    /**
     * Delete the "id" kitchenApplianceTranslation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the kitchenApplianceTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<KitchenApplianceTranslationDTO> search(String query);
}
