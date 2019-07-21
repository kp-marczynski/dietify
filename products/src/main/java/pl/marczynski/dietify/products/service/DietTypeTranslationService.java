package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.DietTypeTranslationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.DietTypeTranslation}.
 */
public interface DietTypeTranslationService {

    /**
     * Save a dietTypeTranslation.
     *
     * @param dietTypeTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    DietTypeTranslationDTO save(DietTypeTranslationDTO dietTypeTranslationDTO);

    /**
     * Get all the dietTypeTranslations.
     *
     * @return the list of entities.
     */
    List<DietTypeTranslationDTO> findAll();


    /**
     * Get the "id" dietTypeTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DietTypeTranslationDTO> findOne(Long id);

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
    List<DietTypeTranslationDTO> search(String query);
}
