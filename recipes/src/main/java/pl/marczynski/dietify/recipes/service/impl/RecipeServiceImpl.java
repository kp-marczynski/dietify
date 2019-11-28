package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.RecipeService;
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.repository.RecipeRepository;
import pl.marczynski.dietify.recipes.repository.search.RecipeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Recipe}.
 */
@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {

    private final Logger log = LoggerFactory.getLogger(RecipeServiceImpl.class);

    private final RecipeRepository recipeRepository;

    private final RecipeSearchRepository recipeSearchRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository, RecipeSearchRepository recipeSearchRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeSearchRepository = recipeSearchRepository;
    }

    /**
     * Save a recipe.
     *
     * @param recipe the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Recipe save(Recipe recipe) {
        log.debug("Request to save Recipe : {}", recipe);
        if(recipe.getId() == null || recipe.getCreationTimestamp() == null){
            recipe.setCreationTimestamp(Instant.now());
        }
        recipe.setLastEditTimestamp(Instant.now());
        Recipe result = recipeRepository.saveAndFlush(recipe);
        recipeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the recipes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Recipe> findAll(Pageable pageable) {
        log.debug("Request to get all Recipes");
        return recipeRepository.findAll(pageable);
    }

    /**
     * Get all the recipes with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    @Override
    public Page<Recipe> findAllWithEagerRelationships(Pageable pageable, Long author) {
        return recipeRepository.findAllWithEagerRelationships(author, pageable);
    }


    /**
     * Get one recipe by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Recipe> findOne(Long id) {
        log.debug("Request to get Recipe : {}", id);
        return recipeRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the recipe by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Recipe : {}", id);
        recipeRepository.deleteById(id);
        recipeSearchRepository.deleteById(id);
    }

    /**
     * Search for the recipe corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Recipe> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Recipes for query {}", query);
        return recipeSearchRepository.search(queryStringQuery(query), pageable);
    }

    @Override
    public Page<Recipe> findBySearchAndFilters(String searchPhrase, String language, Pageable pageable, Long author) {
        if (language != null) {
            return this.recipeRepository.findByNameContainingIgnoreCaseAndLanguageAndAuthorId(searchPhrase, language, author, pageable);
        } else {
            return this.recipeRepository.findByNameContainingIgnoreCaseAndAuthorId(searchPhrase, author, pageable);
        }
    }
}
