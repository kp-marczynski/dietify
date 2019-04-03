package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.RecipeUnsuitableForDietService;
import pl.marczynski.dietify.recipes.domain.RecipeUnsuitableForDiet;
import pl.marczynski.dietify.recipes.repository.RecipeUnsuitableForDietRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing RecipeUnsuitableForDiet.
 */
@Service
@Transactional
public class RecipeUnsuitableForDietServiceImpl implements RecipeUnsuitableForDietService {

    private final Logger log = LoggerFactory.getLogger(RecipeUnsuitableForDietServiceImpl.class);

    private final RecipeUnsuitableForDietRepository recipeUnsuitableForDietRepository;

    public RecipeUnsuitableForDietServiceImpl(RecipeUnsuitableForDietRepository recipeUnsuitableForDietRepository) {
        this.recipeUnsuitableForDietRepository = recipeUnsuitableForDietRepository;
    }

    /**
     * Save a recipeUnsuitableForDiet.
     *
     * @param recipeUnsuitableForDiet the entity to save
     * @return the persisted entity
     */
    @Override
    public RecipeUnsuitableForDiet save(RecipeUnsuitableForDiet recipeUnsuitableForDiet) {
        log.debug("Request to save RecipeUnsuitableForDiet : {}", recipeUnsuitableForDiet);
        return recipeUnsuitableForDietRepository.save(recipeUnsuitableForDiet);
    }

    /**
     * Get all the recipeUnsuitableForDiets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecipeUnsuitableForDiet> findAll() {
        log.debug("Request to get all RecipeUnsuitableForDiets");
        return recipeUnsuitableForDietRepository.findAll();
    }


    /**
     * Get one recipeUnsuitableForDiet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RecipeUnsuitableForDiet> findOne(Long id) {
        log.debug("Request to get RecipeUnsuitableForDiet : {}", id);
        return recipeUnsuitableForDietRepository.findById(id);
    }

    /**
     * Delete the recipeUnsuitableForDiet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RecipeUnsuitableForDiet : {}", id);
        recipeUnsuitableForDietRepository.deleteById(id);
    }
}
