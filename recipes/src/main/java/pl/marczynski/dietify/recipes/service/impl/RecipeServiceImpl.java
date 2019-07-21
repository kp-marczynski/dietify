package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.RecipeService;
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.repository.RecipeRepository;
import pl.marczynski.dietify.recipes.repository.search.RecipeSearchRepository;
import pl.marczynski.dietify.recipes.service.dto.RecipeDTO;
import pl.marczynski.dietify.recipes.service.mapper.RecipeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Recipe}.
 */
@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {

    private final Logger log = LoggerFactory.getLogger(RecipeServiceImpl.class);

    private final RecipeRepository recipeRepository;

    private final RecipeMapper recipeMapper;

    private final RecipeSearchRepository recipeSearchRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository, RecipeMapper recipeMapper, RecipeSearchRepository recipeSearchRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeMapper = recipeMapper;
        this.recipeSearchRepository = recipeSearchRepository;
    }

    /**
     * Save a recipe.
     *
     * @param recipeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RecipeDTO save(RecipeDTO recipeDTO) {
        log.debug("Request to save Recipe : {}", recipeDTO);
        Recipe recipe = recipeMapper.toEntity(recipeDTO);
        recipe = recipeRepository.save(recipe);
        RecipeDTO result = recipeMapper.toDto(recipe);
        recipeSearchRepository.save(recipe);
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
    public Page<RecipeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Recipes");
        return recipeRepository.findAll(pageable)
            .map(recipeMapper::toDto);
    }

    /**
     * Get all the recipes with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<RecipeDTO> findAllWithEagerRelationships(Pageable pageable) {
        return recipeRepository.findAllWithEagerRelationships(pageable).map(recipeMapper::toDto);
    }
    


    /**
    *  Get all the recipes where BasicNutritionData is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<RecipeDTO> findAllWhereBasicNutritionDataIsNull() {
        log.debug("Request to get all recipes where BasicNutritionData is null");
        return StreamSupport
            .stream(recipeRepository.findAll().spliterator(), false)
            .filter(recipe -> recipe.getBasicNutritionData() == null)
            .map(recipeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one recipe by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RecipeDTO> findOne(Long id) {
        log.debug("Request to get Recipe : {}", id);
        return recipeRepository.findOneWithEagerRelationships(id)
            .map(recipeMapper::toDto);
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
    public Page<RecipeDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Recipes for query {}", query);
        return recipeSearchRepository.search(queryStringQuery(query), pageable)
            .map(recipeMapper::toDto);
    }
}
