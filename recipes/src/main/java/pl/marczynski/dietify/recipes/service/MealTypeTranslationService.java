package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.MealTypeTranslationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.MealTypeTranslation}.
 */
public interface MealTypeTranslationService {

    /**
     * Save a mealTypeTranslation.
     *
     * @param mealTypeTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    MealTypeTranslationDTO save(MealTypeTranslationDTO mealTypeTranslationDTO);

    /**
     * Get all the mealTypeTranslations.
     *
     * @return the list of entities.
     */
    List<MealTypeTranslationDTO> findAll();


    /**
     * Get the "id" mealTypeTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealTypeTranslationDTO> findOne(Long id);

    /**
     * Delete the "id" mealTypeTranslation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealTypeTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealTypeTranslationDTO> search(String query);
}
