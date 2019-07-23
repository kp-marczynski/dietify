package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.NutritionDefinitionService;
import pl.marczynski.dietify.products.domain.NutritionDefinition;
import pl.marczynski.dietify.products.repository.NutritionDefinitionRepository;
import pl.marczynski.dietify.products.repository.search.NutritionDefinitionSearchRepository;
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
 * Service Implementation for managing {@link NutritionDefinition}.
 */
@Service
@Transactional
public class NutritionDefinitionServiceImpl implements NutritionDefinitionService {

    private final Logger log = LoggerFactory.getLogger(NutritionDefinitionServiceImpl.class);

    private final NutritionDefinitionRepository nutritionDefinitionRepository;

    private final NutritionDefinitionSearchRepository nutritionDefinitionSearchRepository;

    public NutritionDefinitionServiceImpl(NutritionDefinitionRepository nutritionDefinitionRepository, NutritionDefinitionSearchRepository nutritionDefinitionSearchRepository) {
        this.nutritionDefinitionRepository = nutritionDefinitionRepository;
        this.nutritionDefinitionSearchRepository = nutritionDefinitionSearchRepository;
    }

    /**
     * Save a nutritionDefinition.
     *
     * @param nutritionDefinition the entity to save.
     * @return the persisted entity.
     */
    @Override
    public NutritionDefinition save(NutritionDefinition nutritionDefinition) {
        log.debug("Request to save NutritionDefinition : {}", nutritionDefinition);
        NutritionDefinition result = nutritionDefinitionRepository.save(nutritionDefinition);
        nutritionDefinitionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the nutritionDefinitions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<NutritionDefinition> findAll() {
        log.debug("Request to get all NutritionDefinitions");
        return nutritionDefinitionRepository.findAll();
    }


    /**
     * Get one nutritionDefinition by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NutritionDefinition> findOne(Long id) {
        log.debug("Request to get NutritionDefinition : {}", id);
        return nutritionDefinitionRepository.findById(id);
    }

    /**
     * Delete the nutritionDefinition by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NutritionDefinition : {}", id);
        nutritionDefinitionRepository.deleteById(id);
        nutritionDefinitionSearchRepository.deleteById(id);
    }

    /**
     * Search for the nutritionDefinition corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<NutritionDefinition> search(String query) {
        log.debug("Request to search NutritionDefinitions for query {}", query);
        return StreamSupport
            .stream(nutritionDefinitionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
