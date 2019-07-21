package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.HouseholdMeasureDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.HouseholdMeasure}.
 */
public interface HouseholdMeasureService {

    /**
     * Save a householdMeasure.
     *
     * @param householdMeasureDTO the entity to save.
     * @return the persisted entity.
     */
    HouseholdMeasureDTO save(HouseholdMeasureDTO householdMeasureDTO);

    /**
     * Get all the householdMeasures.
     *
     * @return the list of entities.
     */
    List<HouseholdMeasureDTO> findAll();


    /**
     * Get the "id" householdMeasure.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HouseholdMeasureDTO> findOne(Long id);

    /**
     * Delete the "id" householdMeasure.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the householdMeasure corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<HouseholdMeasureDTO> search(String query);
}
