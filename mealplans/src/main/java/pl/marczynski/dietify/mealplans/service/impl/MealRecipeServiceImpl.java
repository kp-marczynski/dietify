package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealRecipeService;
import pl.marczynski.dietify.mealplans.domain.MealRecipe;
import pl.marczynski.dietify.mealplans.repository.MealRecipeRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealRecipeSearchRepository;
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
 * Service Implementation for managing {@link MealRecipe}.
 */
@Service
@Transactional
public class MealRecipeServiceImpl implements MealRecipeService {

    private final Logger log = LoggerFactory.getLogger(MealRecipeServiceImpl.class);

    private final MealRecipeRepository mealRecipeRepository;

    private final MealRecipeSearchRepository mealRecipeSearchRepository;

    public MealRecipeServiceImpl(MealRecipeRepository mealRecipeRepository, MealRecipeSearchRepository mealRecipeSearchRepository) {
        this.mealRecipeRepository = mealRecipeRepository;
        this.mealRecipeSearchRepository = mealRecipeSearchRepository;
    }

    /**
     * Save a mealRecipe.
     *
     * @param mealRecipe the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealRecipe save(MealRecipe mealRecipe) {
        log.debug("Request to save MealRecipe : {}", mealRecipe);
        MealRecipe result = mealRecipeRepository.save(mealRecipe);
        mealRecipeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the mealRecipes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealRecipe> findAll() {
        log.debug("Request to get all MealRecipes");
        return mealRecipeRepository.findAll();
    }


    /**
     * Get one mealRecipe by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealRecipe> findOne(Long id) {
        log.debug("Request to get MealRecipe : {}", id);
        return mealRecipeRepository.findById(id);
    }

    /**
     * Delete the mealRecipe by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealRecipe : {}", id);
        mealRecipeRepository.deleteById(id);
        mealRecipeSearchRepository.deleteById(id);
    }

    /**
     * Search for the mealRecipe corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealRecipe> search(String query) {
        log.debug("Request to search MealRecipes for query {}", query);
        return StreamSupport
            .stream(mealRecipeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
