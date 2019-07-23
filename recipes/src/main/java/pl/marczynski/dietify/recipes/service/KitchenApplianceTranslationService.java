package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.KitchenApplianceTranslation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link KitchenApplianceTranslation}.
 */
public interface KitchenApplianceTranslationService {

    /**
     * Save a kitchenApplianceTranslation.
     *
     * @param kitchenApplianceTranslation the entity to save.
     * @return the persisted entity.
     */
    KitchenApplianceTranslation save(KitchenApplianceTranslation kitchenApplianceTranslation);

    /**
     * Get all the kitchenApplianceTranslations.
     *
     * @return the list of entities.
     */
    List<KitchenApplianceTranslation> findAll();


    /**
     * Get the "id" kitchenApplianceTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<KitchenApplianceTranslation> findOne(Long id);

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
    List<KitchenApplianceTranslation> search(String query);
}
