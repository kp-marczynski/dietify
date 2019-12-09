package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.domain.OwnedKitchenAppliance;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link OwnedKitchenAppliance}.
 */
public interface OwnedKitchenApplianceService {

    /**
     * Save a ownedKitchenAppliance.
     *
     * @param ownedKitchenAppliance the entity to save.
     * @return the persisted entity.
     */
    OwnedKitchenAppliance save(OwnedKitchenAppliance ownedKitchenAppliance);

    /**
     * Get all the ownedKitchenAppliances.
     *
     * @return the list of entities.
     */
    List<OwnedKitchenAppliance> findAll();


    /**
     * Get the "id" ownedKitchenAppliance.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OwnedKitchenAppliance> findOne(Long id);

    /**
     * Delete the "id" ownedKitchenAppliance.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
