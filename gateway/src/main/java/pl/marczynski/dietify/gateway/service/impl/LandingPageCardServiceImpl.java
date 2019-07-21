package pl.marczynski.dietify.gateway.service.impl;

import pl.marczynski.dietify.gateway.service.LandingPageCardService;
import pl.marczynski.dietify.gateway.domain.LandingPageCard;
import pl.marczynski.dietify.gateway.repository.LandingPageCardRepository;
import pl.marczynski.dietify.gateway.repository.search.LandingPageCardSearchRepository;
import pl.marczynski.dietify.gateway.service.dto.LandingPageCardDTO;
import pl.marczynski.dietify.gateway.service.mapper.LandingPageCardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
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

    private final LandingPageCardMapper landingPageCardMapper;

    private final LandingPageCardSearchRepository landingPageCardSearchRepository;

    public LandingPageCardServiceImpl(LandingPageCardRepository landingPageCardRepository, LandingPageCardMapper landingPageCardMapper, LandingPageCardSearchRepository landingPageCardSearchRepository) {
        this.landingPageCardRepository = landingPageCardRepository;
        this.landingPageCardMapper = landingPageCardMapper;
        this.landingPageCardSearchRepository = landingPageCardSearchRepository;
    }

    /**
     * Save a landingPageCard.
     *
     * @param landingPageCardDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LandingPageCardDTO save(LandingPageCardDTO landingPageCardDTO) {
        log.debug("Request to save LandingPageCard : {}", landingPageCardDTO);
        LandingPageCard landingPageCard = landingPageCardMapper.toEntity(landingPageCardDTO);
        landingPageCard = landingPageCardRepository.save(landingPageCard);
        LandingPageCardDTO result = landingPageCardMapper.toDto(landingPageCard);
        landingPageCardSearchRepository.save(landingPageCard);
        return result;
    }

    /**
     * Get all the landingPageCards.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LandingPageCardDTO> findAll() {
        log.debug("Request to get all LandingPageCards");
        return landingPageCardRepository.findAll().stream()
            .map(landingPageCardMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one landingPageCard by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LandingPageCardDTO> findOne(Long id) {
        log.debug("Request to get LandingPageCard : {}", id);
        return landingPageCardRepository.findById(id)
            .map(landingPageCardMapper::toDto);
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
    public List<LandingPageCardDTO> search(String query) {
        log.debug("Request to search LandingPageCards for query {}", query);
        return StreamSupport
            .stream(landingPageCardSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(landingPageCardMapper::toDto)
            .collect(Collectors.toList());
    }
}
