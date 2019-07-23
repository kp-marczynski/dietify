package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.domain.DishTypeTranslation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link DishTypeTranslation}.
 */
public interface DishTypeTranslationService {

    /**
     * Save a dishTypeTranslation.
     *
     * @param dishTypeTranslation the entity to save.
     * @return the persisted entity.
     */
    DishTypeTranslation save(DishTypeTranslation dishTypeTranslation);

    /**
     * Get all the dishTypeTranslations.
     *
     * @return the list of entities.
     */
    List<DishTypeTranslation> findAll();


    /**
     * Get the "id" dishTypeTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DishTypeTranslation> findOne(Long id);

    /**
     * Delete the "id" dishTypeTranslation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the dishTypeTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<DishTypeTranslation> search(String query);
}
