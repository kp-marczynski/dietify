package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.KitchenApplianceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.KitchenAppliance}.
 */
public interface KitchenApplianceService {

    /**
     * Save a kitchenAppliance.
     *
     * @param kitchenApplianceDTO the entity to save.
     * @return the persisted entity.
     */
    KitchenApplianceDTO save(KitchenApplianceDTO kitchenApplianceDTO);

    /**
     * Get all the kitchenAppliances.
     *
     * @return the list of entities.
     */
    List<KitchenApplianceDTO> findAll();


    /**
     * Get the "id" kitchenAppliance.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<KitchenApplianceDTO> findOne(Long id);

    /**
     * Delete the "id" kitchenAppliance.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the kitchenAppliance corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<KitchenApplianceDTO> search(String query);
}
