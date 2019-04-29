package pl.marczynski.dietify.recipes.service.impl;

import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.core.domain.User;
import pl.marczynski.dietify.core.service.UserService;
import pl.marczynski.dietify.core.web.rest.errors.OperationNotAllowedForCurrentUserException;
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.repository.RecipeRepository;
import pl.marczynski.dietify.recipes.service.RecipeService;

import java.time.LocalDate;
import java.util.Optional;

/**
 * Service Implementation for managing Recipe.
 */
@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {

    private final Logger log = LoggerFactory.getLogger(RecipeServiceImpl.class);

    private final CacheManager cacheManager;
    private final RecipeRepository recipeRepository;
    private final UserService userService;

    public RecipeServiceImpl(CacheManager cacheManager, RecipeRepository recipeRepository, UserService userService) {
        this.cacheManager = cacheManager;
        this.recipeRepository = recipeRepository;
        this.userService = userService;
    }

    /**
     * Save a recipe.
     *
     * @param recipe the entity to save
     * @return the persisted entity
     */
    @Override
    public Recipe save(Recipe recipe) {
        log.debug("Request to save Recipe : {}", recipe);
        if (!hasRightsToPersistRecipe(recipe)) {
            throw new OperationNotAllowedForCurrentUserException();
        }
        this.clearRecipeCaches(recipe);
        if (recipe.getAuthorId() == null) {
            recipe.setAuthorId(userService.getCurrentUser().get().getId());
            recipe.creationDate(LocalDate.now());
        }
        recipe.lastEditDate(LocalDate.now());
        return recipeRepository.saveAndFlush(recipe);
    }

    private boolean hasRightsToPersistRecipe(Recipe recipe) {
        Optional<User> currentUser = userService.getCurrentUser();
        if (!currentUser.isPresent()) {
            return false;
        } else if (recipe.getId() == null || recipe.getAuthorId() == null) {
            return true;
        } else return recipe.getAuthorId().equals(currentUser.get().getId());
    }

    /**
     * Get all the recipes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Recipe> findAll(Pageable pageable) {
        log.debug("Request to get all Recipes");
        return recipeRepository.findAll(pageable);
    }

    /**
     * Get all the Recipe with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Recipe> findAllWithEagerRelationships(Pageable pageable) {
        return recipeRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     * Get one recipe by id.
     *
     * @param id the id of the entity
     * @return the entity
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
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) throws NotFoundException {
        log.debug("Request to delete Recipe : {}", id);
        Optional<Recipe> recipe = recipeRepository.findOneWithEagerRelationships(id);
        if (!recipe.isPresent()) {
            throw new NotFoundException("Recipe not found");
        }
        if (!hasRightsToPersistRecipe(recipe.get())) {
            throw new OperationNotAllowedForCurrentUserException();
        }
        this.clearRecipeCaches(id);
        recipeRepository.deleteById(id);
    }

    @Override
    public Page<Recipe> findByNameContaining(String searchPhrase, Pageable pageable) {
        return this.recipeRepository.findByNameContainingIgnoreCase(searchPhrase, pageable);
    }

    private void clearRecipeCaches(Recipe recipe) {
        if (recipe.getId() != null) {
            clearRecipeCaches(recipe.getId());
        }
    }

    private void clearRecipeCaches(long productId) {
        Cache cache = cacheManager.getCache(RecipeRepository.RECIPES_EAGER_BY_ID_CACHE);
        if (cache != null) {
            cache.evict(productId);
        }
    }
}
