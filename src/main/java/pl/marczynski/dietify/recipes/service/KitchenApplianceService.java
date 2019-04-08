package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.KitchenAppliance;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing KitchenAppliance.
 */
public interface KitchenApplianceService {

    /**
     * Save a kitchenAppliance.
     *
     * @param kitchenAppliance the entity to save
     * @return the persisted entity
     */
    KitchenAppliance save(KitchenAppliance kitchenAppliance);

    /**
     * Get all the kitchenAppliances.
     *
     * @return the list of entities
     */
    List<KitchenAppliance> findAll();


    /**
     * Get the "id" kitchenAppliance.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<KitchenAppliance> findOne(Long id);

    /**
     * Delete the "id" kitchenAppliance.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
