package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.DietTypeTranslationService;
import pl.marczynski.dietify.products.domain.DietTypeTranslation;
import pl.marczynski.dietify.products.repository.DietTypeTranslationRepository;
import pl.marczynski.dietify.products.repository.search.DietTypeTranslationSearchRepository;
import pl.marczynski.dietify.products.service.dto.DietTypeTranslationDTO;
import pl.marczynski.dietify.products.service.mapper.DietTypeTranslationMapper;
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
 * Service Implementation for managing {@link DietTypeTranslation}.
 */
@Service
@Transactional
public class DietTypeTranslationServiceImpl implements DietTypeTranslationService {

    private final Logger log = LoggerFactory.getLogger(DietTypeTranslationServiceImpl.class);

    private final DietTypeTranslationRepository dietTypeTranslationRepository;

    private final DietTypeTranslationMapper dietTypeTranslationMapper;

    private final DietTypeTranslationSearchRepository dietTypeTranslationSearchRepository;

    public DietTypeTranslationServiceImpl(DietTypeTranslationRepository dietTypeTranslationRepository, DietTypeTranslationMapper dietTypeTranslationMapper, DietTypeTranslationSearchRepository dietTypeTranslationSearchRepository) {
        this.dietTypeTranslationRepository = dietTypeTranslationRepository;
        this.dietTypeTranslationMapper = dietTypeTranslationMapper;
        this.dietTypeTranslationSearchRepository = dietTypeTranslationSearchRepository;
    }

    /**
     * Save a dietTypeTranslation.
     *
     * @param dietTypeTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DietTypeTranslationDTO save(DietTypeTranslationDTO dietTypeTranslationDTO) {
        log.debug("Request to save DietTypeTranslation : {}", dietTypeTranslationDTO);
        DietTypeTranslation dietTypeTranslation = dietTypeTranslationMapper.toEntity(dietTypeTranslationDTO);
        dietTypeTranslation = dietTypeTranslationRepository.save(dietTypeTranslation);
        DietTypeTranslationDTO result = dietTypeTranslationMapper.toDto(dietTypeTranslation);
        dietTypeTranslationSearchRepository.save(dietTypeTranslation);
        return result;
    }

    /**
     * Get all the dietTypeTranslations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DietTypeTranslationDTO> findAll() {
        log.debug("Request to get all DietTypeTranslations");
        return dietTypeTranslationRepository.findAll().stream()
            .map(dietTypeTranslationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one dietTypeTranslation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DietTypeTranslationDTO> findOne(Long id) {
        log.debug("Request to get DietTypeTranslation : {}", id);
        return dietTypeTranslationRepository.findById(id)
            .map(dietTypeTranslationMapper::toDto);
    }

    /**
     * Delete the dietTypeTranslation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DietTypeTranslation : {}", id);
        dietTypeTranslationRepository.deleteById(id);
        dietTypeTranslationSearchRepository.deleteById(id);
    }

    /**
     * Search for the dietTypeTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DietTypeTranslationDTO> search(String query) {
        log.debug("Request to search DietTypeTranslations for query {}", query);
        return StreamSupport
            .stream(dietTypeTranslationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(dietTypeTranslationMapper::toDto)
            .collect(Collectors.toList());
    }
}
