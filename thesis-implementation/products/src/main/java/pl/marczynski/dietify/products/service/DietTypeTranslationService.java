package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.DietTypeTranslation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link DietTypeTranslation}.
 */
public interface DietTypeTranslationService {

    /**
     * Save a dietTypeTranslation.
     *
     * @param dietTypeTranslation the entity to save.
     * @return the persisted entity.
     */
    DietTypeTranslation save(DietTypeTranslation dietTypeTranslation);

    /**
     * Get all the dietTypeTranslations.
     *
     * @return the list of entities.
     */
    List<DietTypeTranslation> findAll();


    /**
     * Get the "id" dietTypeTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DietTypeTranslation> findOne(Long id);

    /**
     * Delete the "id" dietTypeTranslation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the dietTypeTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<DietTypeTranslation> search(String query);
}
