package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.MealTypeTranslationService;
import pl.marczynski.dietify.recipes.domain.MealTypeTranslation;
import pl.marczynski.dietify.recipes.repository.MealTypeTranslationRepository;
import pl.marczynski.dietify.recipes.repository.search.MealTypeTranslationSearchRepository;
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
 * Service Implementation for managing {@link MealTypeTranslation}.
 */
@Service
@Transactional
public class MealTypeTranslationServiceImpl implements MealTypeTranslationService {

    private final Logger log = LoggerFactory.getLogger(MealTypeTranslationServiceImpl.class);

    private final MealTypeTranslationRepository mealTypeTranslationRepository;

    private final MealTypeTranslationSearchRepository mealTypeTranslationSearchRepository;

    public MealTypeTranslationServiceImpl(MealTypeTranslationRepository mealTypeTranslationRepository, MealTypeTranslationSearchRepository mealTypeTranslationSearchRepository) {
        this.mealTypeTranslationRepository = mealTypeTranslationRepository;
        this.mealTypeTranslationSearchRepository = mealTypeTranslationSearchRepository;
    }

    /**
     * Save a mealTypeTranslation.
     *
     * @param mealTypeTranslation the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealTypeTranslation save(MealTypeTranslation mealTypeTranslation) {
        log.debug("Request to save MealTypeTranslation : {}", mealTypeTranslation);
        MealTypeTranslation result = mealTypeTranslationRepository.save(mealTypeTranslation);
        mealTypeTranslationSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the mealTypeTranslations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealTypeTranslation> findAll() {
        log.debug("Request to get all MealTypeTranslations");
        return mealTypeTranslationRepository.findAll();
    }


    /**
     * Get one mealTypeTranslation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealTypeTranslation> findOne(Long id) {
        log.debug("Request to get MealTypeTranslation : {}", id);
        return mealTypeTranslationRepository.findById(id);
    }

    /**
     * Delete the mealTypeTranslation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealTypeTranslation : {}", id);
        mealTypeTranslationRepository.deleteById(id);
        mealTypeTranslationSearchRepository.deleteById(id);
    }

    /**
     * Search for the mealTypeTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealTypeTranslation> search(String query) {
        log.debug("Request to search MealTypeTranslations for query {}", query);
        return StreamSupport
            .stream(mealTypeTranslationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
