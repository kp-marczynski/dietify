package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.DietTypeTranslationService;
import pl.marczynski.dietify.products.domain.DietTypeTranslation;
import pl.marczynski.dietify.products.repository.DietTypeTranslationRepository;
import pl.marczynski.dietify.products.repository.search.DietTypeTranslationSearchRepository;
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
 * Service Implementation for managing {@link DietTypeTranslation}.
 */
@Service
@Transactional
public class DietTypeTranslationServiceImpl implements DietTypeTranslationService {

    private final Logger log = LoggerFactory.getLogger(DietTypeTranslationServiceImpl.class);

    private final DietTypeTranslationRepository dietTypeTranslationRepository;

    private final DietTypeTranslationSearchRepository dietTypeTranslationSearchRepository;

    public DietTypeTranslationServiceImpl(DietTypeTranslationRepository dietTypeTranslationRepository, DietTypeTranslationSearchRepository dietTypeTranslationSearchRepository) {
        this.dietTypeTranslationRepository = dietTypeTranslationRepository;
        this.dietTypeTranslationSearchRepository = dietTypeTranslationSearchRepository;
    }

    /**
     * Save a dietTypeTranslation.
     *
     * @param dietTypeTranslation the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DietTypeTranslation save(DietTypeTranslation dietTypeTranslation) {
        log.debug("Request to save DietTypeTranslation : {}", dietTypeTranslation);
        DietTypeTranslation result = dietTypeTranslationRepository.save(dietTypeTranslation);
        dietTypeTranslationSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the dietTypeTranslations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DietTypeTranslation> findAll() {
        log.debug("Request to get all DietTypeTranslations");
        return dietTypeTranslationRepository.findAll();
    }


    /**
     * Get one dietTypeTranslation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DietTypeTranslation> findOne(Long id) {
        log.debug("Request to get DietTypeTranslation : {}", id);
        return dietTypeTranslationRepository.findById(id);
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
    public List<DietTypeTranslation> search(String query) {
        log.debug("Request to search DietTypeTranslations for query {}", query);
        return StreamSupport
            .stream(dietTypeTranslationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
