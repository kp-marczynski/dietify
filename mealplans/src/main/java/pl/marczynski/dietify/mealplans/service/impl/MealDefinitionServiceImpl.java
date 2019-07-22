package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealDefinitionService;
import pl.marczynski.dietify.mealplans.domain.MealDefinition;
import pl.marczynski.dietify.mealplans.repository.MealDefinitionRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealDefinitionSearchRepository;
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
 * Service Implementation for managing {@link MealDefinition}.
 */
@Service
@Transactional
public class MealDefinitionServiceImpl implements MealDefinitionService {

    private final Logger log = LoggerFactory.getLogger(MealDefinitionServiceImpl.class);

    private final MealDefinitionRepository mealDefinitionRepository;

    private final MealDefinitionSearchRepository mealDefinitionSearchRepository;

    public MealDefinitionServiceImpl(MealDefinitionRepository mealDefinitionRepository, MealDefinitionSearchRepository mealDefinitionSearchRepository) {
        this.mealDefinitionRepository = mealDefinitionRepository;
        this.mealDefinitionSearchRepository = mealDefinitionSearchRepository;
    }

    /**
     * Save a mealDefinition.
     *
     * @param mealDefinition the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealDefinition save(MealDefinition mealDefinition) {
        log.debug("Request to save MealDefinition : {}", mealDefinition);
        MealDefinition result = mealDefinitionRepository.save(mealDefinition);
        mealDefinitionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the mealDefinitions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealDefinition> findAll() {
        log.debug("Request to get all MealDefinitions");
        return mealDefinitionRepository.findAll();
    }


    /**
     * Get one mealDefinition by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealDefinition> findOne(Long id) {
        log.debug("Request to get MealDefinition : {}", id);
        return mealDefinitionRepository.findById(id);
    }

    /**
     * Delete the mealDefinition by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealDefinition : {}", id);
        mealDefinitionRepository.deleteById(id);
        mealDefinitionSearchRepository.deleteById(id);
    }

    /**
     * Search for the mealDefinition corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealDefinition> search(String query) {
        log.debug("Request to search MealDefinitions for query {}", query);
        return StreamSupport
            .stream(mealDefinitionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
