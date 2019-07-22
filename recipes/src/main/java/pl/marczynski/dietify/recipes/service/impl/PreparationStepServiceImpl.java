package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.PreparationStepService;
import pl.marczynski.dietify.recipes.domain.PreparationStep;
import pl.marczynski.dietify.recipes.repository.PreparationStepRepository;
import pl.marczynski.dietify.recipes.repository.search.PreparationStepSearchRepository;
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
 * Service Implementation for managing {@link PreparationStep}.
 */
@Service
@Transactional
public class PreparationStepServiceImpl implements PreparationStepService {

    private final Logger log = LoggerFactory.getLogger(PreparationStepServiceImpl.class);

    private final PreparationStepRepository preparationStepRepository;

    private final PreparationStepSearchRepository preparationStepSearchRepository;

    public PreparationStepServiceImpl(PreparationStepRepository preparationStepRepository, PreparationStepSearchRepository preparationStepSearchRepository) {
        this.preparationStepRepository = preparationStepRepository;
        this.preparationStepSearchRepository = preparationStepSearchRepository;
    }

    /**
     * Save a preparationStep.
     *
     * @param preparationStep the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PreparationStep save(PreparationStep preparationStep) {
        log.debug("Request to save PreparationStep : {}", preparationStep);
        PreparationStep result = preparationStepRepository.save(preparationStep);
        preparationStepSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the preparationSteps.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PreparationStep> findAll() {
        log.debug("Request to get all PreparationSteps");
        return preparationStepRepository.findAll();
    }


    /**
     * Get one preparationStep by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PreparationStep> findOne(Long id) {
        log.debug("Request to get PreparationStep : {}", id);
        return preparationStepRepository.findById(id);
    }

    /**
     * Delete the preparationStep by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PreparationStep : {}", id);
        preparationStepRepository.deleteById(id);
        preparationStepSearchRepository.deleteById(id);
    }

    /**
     * Search for the preparationStep corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PreparationStep> search(String query) {
        log.debug("Request to search PreparationSteps for query {}", query);
        return StreamSupport
            .stream(preparationStepSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
