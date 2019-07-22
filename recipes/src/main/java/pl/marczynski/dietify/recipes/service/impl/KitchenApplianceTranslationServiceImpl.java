package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.KitchenApplianceTranslationService;
import pl.marczynski.dietify.recipes.domain.KitchenApplianceTranslation;
import pl.marczynski.dietify.recipes.repository.KitchenApplianceTranslationRepository;
import pl.marczynski.dietify.recipes.repository.search.KitchenApplianceTranslationSearchRepository;
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
 * Service Implementation for managing {@link KitchenApplianceTranslation}.
 */
@Service
@Transactional
public class KitchenApplianceTranslationServiceImpl implements KitchenApplianceTranslationService {

    private final Logger log = LoggerFactory.getLogger(KitchenApplianceTranslationServiceImpl.class);

    private final KitchenApplianceTranslationRepository kitchenApplianceTranslationRepository;

    private final KitchenApplianceTranslationSearchRepository kitchenApplianceTranslationSearchRepository;

    public KitchenApplianceTranslationServiceImpl(KitchenApplianceTranslationRepository kitchenApplianceTranslationRepository, KitchenApplianceTranslationSearchRepository kitchenApplianceTranslationSearchRepository) {
        this.kitchenApplianceTranslationRepository = kitchenApplianceTranslationRepository;
        this.kitchenApplianceTranslationSearchRepository = kitchenApplianceTranslationSearchRepository;
    }

    /**
     * Save a kitchenApplianceTranslation.
     *
     * @param kitchenApplianceTranslation the entity to save.
     * @return the persisted entity.
     */
    @Override
    public KitchenApplianceTranslation save(KitchenApplianceTranslation kitchenApplianceTranslation) {
        log.debug("Request to save KitchenApplianceTranslation : {}", kitchenApplianceTranslation);
        KitchenApplianceTranslation result = kitchenApplianceTranslationRepository.save(kitchenApplianceTranslation);
        kitchenApplianceTranslationSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the kitchenApplianceTranslations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<KitchenApplianceTranslation> findAll() {
        log.debug("Request to get all KitchenApplianceTranslations");
        return kitchenApplianceTranslationRepository.findAll();
    }


    /**
     * Get one kitchenApplianceTranslation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<KitchenApplianceTranslation> findOne(Long id) {
        log.debug("Request to get KitchenApplianceTranslation : {}", id);
        return kitchenApplianceTranslationRepository.findById(id);
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
    public List<KitchenApplianceTranslation> search(String query) {
        log.debug("Request to search KitchenApplianceTranslations for query {}", query);
        return StreamSupport
            .stream(kitchenApplianceTranslationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
