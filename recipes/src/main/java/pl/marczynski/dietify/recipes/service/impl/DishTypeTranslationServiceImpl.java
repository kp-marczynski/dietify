package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.DishTypeTranslationService;
import pl.marczynski.dietify.recipes.domain.DishTypeTranslation;
import pl.marczynski.dietify.recipes.repository.DishTypeTranslationRepository;
import pl.marczynski.dietify.recipes.repository.search.DishTypeTranslationSearchRepository;
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
 * Service Implementation for managing {@link DishTypeTranslation}.
 */
@Service
@Transactional
public class DishTypeTranslationServiceImpl implements DishTypeTranslationService {

    private final Logger log = LoggerFactory.getLogger(DishTypeTranslationServiceImpl.class);

    private final DishTypeTranslationRepository dishTypeTranslationRepository;

    private final DishTypeTranslationSearchRepository dishTypeTranslationSearchRepository;

    public DishTypeTranslationServiceImpl(DishTypeTranslationRepository dishTypeTranslationRepository, DishTypeTranslationSearchRepository dishTypeTranslationSearchRepository) {
        this.dishTypeTranslationRepository = dishTypeTranslationRepository;
        this.dishTypeTranslationSearchRepository = dishTypeTranslationSearchRepository;
    }

    /**
     * Save a dishTypeTranslation.
     *
     * @param dishTypeTranslation the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DishTypeTranslation save(DishTypeTranslation dishTypeTranslation) {
        log.debug("Request to save DishTypeTranslation : {}", dishTypeTranslation);
        DishTypeTranslation result = dishTypeTranslationRepository.save(dishTypeTranslation);
        dishTypeTranslationSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the dishTypeTranslations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DishTypeTranslation> findAll() {
        log.debug("Request to get all DishTypeTranslations");
        return dishTypeTranslationRepository.findAll();
    }


    /**
     * Get one dishTypeTranslation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DishTypeTranslation> findOne(Long id) {
        log.debug("Request to get DishTypeTranslation : {}", id);
        return dishTypeTranslationRepository.findById(id);
    }

    /**
     * Delete the dishTypeTranslation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DishTypeTranslation : {}", id);
        dishTypeTranslationRepository.deleteById(id);
        dishTypeTranslationSearchRepository.deleteById(id);
    }

    /**
     * Search for the dishTypeTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DishTypeTranslation> search(String query) {
        log.debug("Request to search DishTypeTranslations for query {}", query);
        return StreamSupport
            .stream(dishTypeTranslationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
