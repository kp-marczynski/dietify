package pl.marczynski.dietify.gateway.service.impl;

import pl.marczynski.dietify.gateway.service.LandingPageCardService;
import pl.marczynski.dietify.gateway.domain.LandingPageCard;
import pl.marczynski.dietify.gateway.repository.LandingPageCardRepository;
import pl.marczynski.dietify.gateway.repository.search.LandingPageCardSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link LandingPageCard}.
 */
@Service
@Transactional
public class LandingPageCardServiceImpl implements LandingPageCardService {

    private final Logger log = LoggerFactory.getLogger(LandingPageCardServiceImpl.class);

    private final LandingPageCardRepository landingPageCardRepository;

    private final LandingPageCardSearchRepository landingPageCardSearchRepository;

    public LandingPageCardServiceImpl(LandingPageCardRepository landingPageCardRepository, LandingPageCardSearchRepository landingPageCardSearchRepository) {
        this.landingPageCardRepository = landingPageCardRepository;
        this.landingPageCardSearchRepository = landingPageCardSearchRepository;
    }

    /**
     * Save a landingPageCard.
     *
     * @param landingPageCard the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LandingPageCard save(LandingPageCard landingPageCard) {
        log.debug("Request to save LandingPageCard : {}", landingPageCard);
        LandingPageCard result = landingPageCardRepository.save(landingPageCard);
        landingPageCardSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the landingPageCards.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LandingPageCard> findAll() {
        log.debug("Request to get all LandingPageCards");
        return landingPageCardRepository.findAll();
    }


    /**
     * Get one landingPageCard by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LandingPageCard> findOne(Long id) {
        log.debug("Request to get LandingPageCard : {}", id);
        return landingPageCardRepository.findById(id);
    }

    /**
     * Delete the landingPageCard by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LandingPageCard : {}", id);
        landingPageCardRepository.deleteById(id);
        landingPageCardSearchRepository.deleteById(id);
    }

    /**
     * Search for the landingPageCard corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LandingPageCard> search(String query) {
        log.debug("Request to search LandingPageCards for query {}", query);
        return StreamSupport
            .stream(landingPageCardSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
