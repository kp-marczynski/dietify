package pl.marczynski.dietify.core.service;

import pl.marczynski.dietify.core.domain.HouseholdMeasure;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing HouseholdMeasure.
 */
public interface HouseholdMeasureService {

    /**
     * Save a householdMeasure.
     *
     * @param householdMeasure the entity to save
     * @return the persisted entity
     */
    HouseholdMeasure save(HouseholdMeasure householdMeasure);

    /**
     * Get all the householdMeasures.
     *
     * @return the list of entities
     */
    List<HouseholdMeasure> findAll();


    /**
     * Get the "id" householdMeasure.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<HouseholdMeasure> findOne(Long id);

    /**
     * Delete the "id" householdMeasure.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
