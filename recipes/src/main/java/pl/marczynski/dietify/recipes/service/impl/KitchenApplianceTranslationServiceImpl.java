package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.KitchenApplianceTranslationService;
import pl.marczynski.dietify.recipes.domain.KitchenApplianceTranslation;
import pl.marczynski.dietify.recipes.repository.KitchenApplianceTranslationRepository;
import pl.marczynski.dietify.recipes.repository.search.KitchenApplianceTranslationSearchRepository;
import pl.marczynski.dietify.recipes.service.dto.KitchenApplianceTranslationDTO;
import pl.marczynski.dietify.recipes.service.mapper.KitchenApplianceTranslationMapper;
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
 * Service Implementation for managing {@link KitchenApplianceTranslation}.
 */
@Service
@Transactional
public class KitchenApplianceTranslationServiceImpl implements KitchenApplianceTranslationService {

    private final Logger log = LoggerFactory.getLogger(KitchenApplianceTranslationServiceImpl.class);

    private final KitchenApplianceTranslationRepository kitchenApplianceTranslationRepository;

    private final KitchenApplianceTranslationMapper kitchenApplianceTranslationMapper;

    private final KitchenApplianceTranslationSearchRepository kitchenApplianceTranslationSearchRepository;

    public KitchenApplianceTranslationServiceImpl(KitchenApplianceTranslationRepository kitchenApplianceTranslationRepository, KitchenApplianceTranslationMapper kitchenApplianceTranslationMapper, KitchenApplianceTranslationSearchRepository kitchenApplianceTranslationSearchRepository) {
        this.kitchenApplianceTranslationRepository = kitchenApplianceTranslationRepository;
        this.kitchenApplianceTranslationMapper = kitchenApplianceTranslationMapper;
        this.kitchenApplianceTranslationSearchRepository = kitchenApplianceTranslationSearchRepository;
    }

    /**
     * Save a kitchenApplianceTranslation.
     *
     * @param kitchenApplianceTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public KitchenApplianceTranslationDTO save(KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO) {
        log.debug("Request to save KitchenApplianceTranslation : {}", kitchenApplianceTranslationDTO);
        KitchenApplianceTranslation kitchenApplianceTranslation = kitchenApplianceTranslationMapper.toEntity(kitchenApplianceTranslationDTO);
        kitchenApplianceTranslation = kitchenApplianceTranslationRepository.save(kitchenApplianceTranslation);
        KitchenApplianceTranslationDTO result = kitchenApplianceTranslationMapper.toDto(kitchenApplianceTranslation);
        kitchenApplianceTranslationSearchRepository.save(kitchenApplianceTranslation);
        return result;
    }

    /**
     * Get all the kitchenApplianceTranslations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<KitchenApplianceTranslationDTO> findAll() {
        log.debug("Request to get all KitchenApplianceTranslations");
        return kitchenApplianceTranslationRepository.findAll().stream()
            .map(kitchenApplianceTranslationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one kitchenApplianceTranslation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<KitchenApplianceTranslationDTO> findOne(Long id) {
        log.debug("Request to get KitchenApplianceTranslation : {}", id);
        return kitchenApplianceTranslationRepository.findById(id)
            .map(kitchenApplianceTranslationMapper::toDto);
    }

    /**
     * Delete the kitchenApplianceTranslation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete KitchenApplianceTranslation : {}", id);
        kitchenApplianceTranslationRepository.deleteById(id);
        kitchenApplianceTranslationSearchRepository.deleteById(id);
    }

    /**
     * Search for the kitchenApplianceTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<KitchenApplianceTranslationDTO> search(String query) {
        log.debug("Request to search KitchenApplianceTranslations for query {}", query);
        return StreamSupport
            .stream(kitchenApplianceTranslationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(kitchenApplianceTranslationMapper::toDto)
            .collect(Collectors.toList());
    }
}
