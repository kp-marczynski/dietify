package pl.marczynski.dietify.gateway.service;

import pl.marczynski.dietify.gateway.domain.LandingPageCard;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link LandingPageCard}.
 */
public interface LandingPageCardService {

    /**
     * Save a landingPageCard.
     *
     * @param landingPageCard the entity to save.
     * @return the persisted entity.
     */
    LandingPageCard save(LandingPageCard landingPageCard);

    /**
     * Get all the landingPageCards.
     *
     * @return the list of entities.
     */
    List<LandingPageCard> findAll();


    /**
     * Get the "id" landingPageCard.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LandingPageCard> findOne(Long id);

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
    List<LandingPageCard> search(String query);
}
