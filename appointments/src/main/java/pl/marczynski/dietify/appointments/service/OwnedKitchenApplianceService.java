package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.service.dto.OwnedKitchenApplianceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.appointments.domain.OwnedKitchenAppliance}.
 */
public interface OwnedKitchenApplianceService {

    /**
     * Save a ownedKitchenAppliance.
     *
     * @param ownedKitchenApplianceDTO the entity to save.
     * @return the persisted entity.
     */
    OwnedKitchenApplianceDTO save(OwnedKitchenApplianceDTO ownedKitchenApplianceDTO);

    /**
     * Get all the ownedKitchenAppliances.
     *
     * @return the list of entities.
     */
    List<OwnedKitchenApplianceDTO> findAll();


    /**
     * Get the "id" ownedKitchenAppliance.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OwnedKitchenApplianceDTO> findOne(Long id);

    /**
     * Delete the "id" ownedKitchenAppliance.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
