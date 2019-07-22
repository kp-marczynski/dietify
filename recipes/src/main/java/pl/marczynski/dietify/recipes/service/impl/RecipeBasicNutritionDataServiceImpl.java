package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.RecipeBasicNutritionDataService;
import pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData;
import pl.marczynski.dietify.recipes.repository.RecipeBasicNutritionDataRepository;
import pl.marczynski.dietify.recipes.repository.search.RecipeBasicNutritionDataSearchRepository;
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
 * Service Implementation for managing {@link RecipeBasicNutritionData}.
 */
@Service
@Transactional
public class RecipeBasicNutritionDataServiceImpl implements RecipeBasicNutritionDataService {

    private final Logger log = LoggerFactory.getLogger(RecipeBasicNutritionDataServiceImpl.class);

    private final RecipeBasicNutritionDataRepository recipeBasicNutritionDataRepository;

    private final RecipeBasicNutritionDataSearchRepository recipeBasicNutritionDataSearchRepository;

    public RecipeBasicNutritionDataServiceImpl(RecipeBasicNutritionDataRepository recipeBasicNutritionDataRepository, RecipeBasicNutritionDataSearchRepository recipeBasicNutritionDataSearchRepository) {
        this.recipeBasicNutritionDataRepository = recipeBasicNutritionDataRepository;
        this.recipeBasicNutritionDataSearchRepository = recipeBasicNutritionDataSearchRepository;
    }

    /**
     * Save a recipeBasicNutritionData.
     *
     * @param recipeBasicNutritionData the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RecipeBasicNutritionData save(RecipeBasicNutritionData recipeBasicNutritionData) {
        log.debug("Request to save RecipeBasicNutritionData : {}", recipeBasicNutritionData);
        RecipeBasicNutritionData result = recipeBasicNutritionDataRepository.save(recipeBasicNutritionData);
        recipeBasicNutritionDataSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the recipeBasicNutritionData.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecipeBasicNutritionData> findAll() {
        log.debug("Request to get all RecipeBasicNutritionData");
        return recipeBasicNutritionDataRepository.findAll();
    }


    /**
     * Get one recipeBasicNutritionData by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RecipeBasicNutritionData> findOne(Long id) {
        log.debug("Request to get RecipeBasicNutritionData : {}", id);
        return recipeBasicNutritionDataRepository.findById(id);
    }

    /**
     * Delete the recipeBasicNutritionData by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RecipeBasicNutritionData : {}", id);
        recipeBasicNutritionDataRepository.deleteById(id);
        recipeBasicNutritionDataSearchRepository.deleteById(id);
    }

    /**
     * Search for the recipeBasicNutritionData corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecipeBasicNutritionData> search(String query) {
        log.debug("Request to search RecipeBasicNutritionData for query {}", query);
        return StreamSupport
            .stream(recipeBasicNutritionDataSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
