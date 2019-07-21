package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.DishTypeTranslationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.DishTypeTranslation}.
 */
public interface DishTypeTranslationService {

    /**
     * Save a dishTypeTranslation.
     *
     * @param dishTypeTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    DishTypeTranslationDTO save(DishTypeTranslationDTO dishTypeTranslationDTO);

    /**
     * Get all the dishTypeTranslations.
     *
     * @return the list of entities.
     */
    List<DishTypeTranslationDTO> findAll();


    /**
     * Get the "id" dishTypeTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DishTypeTranslationDTO> findOne(Long id);

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
    List<DishTypeTranslationDTO> search(String query);
}
