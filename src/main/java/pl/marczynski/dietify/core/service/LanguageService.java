package pl.marczynski.dietify.core.service;

import pl.marczynski.dietify.core.domain.Language;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Language.
 */
public interface LanguageService {

    /**
     * Save a language.
     *
     * @param language the entity to save
     * @return the persisted entity
     */
    Language save(Language language);

    /**
     * Get all the languages.
     *
     * @return the list of entities
     */
    List<Language> findAll();


    /**
     * Get the "id" language.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Language> findOne(Long id);

    /**
     * Delete the "id" language.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
