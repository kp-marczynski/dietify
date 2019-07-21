package pl.marczynski.dietify.gateway.service;

import pl.marczynski.dietify.gateway.service.dto.LandingPageCardDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.gateway.domain.LandingPageCard}.
 */
public interface LandingPageCardService {

    /**
     * Save a landingPageCard.
     *
     * @param landingPageCardDTO the entity to save.
     * @return the persisted entity.
     */
    LandingPageCardDTO save(LandingPageCardDTO landingPageCardDTO);

    /**
     * Get all the landingPageCards.
     *
     * @return the list of entities.
     */
    List<LandingPageCardDTO> findAll();


    /**
     * Get the "id" landingPageCard.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LandingPageCardDTO> findOne(Long id);

    /**
     * Delete the "id" landingPageCard.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the landingPageCard corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<LandingPageCardDTO> search(String query);
}
