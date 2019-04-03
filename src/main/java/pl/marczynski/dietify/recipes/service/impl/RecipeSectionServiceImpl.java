package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.RecipeSectionService;
import pl.marczynski.dietify.recipes.domain.RecipeSection;
import pl.marczynski.dietify.recipes.repository.RecipeSectionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing RecipeSection.
 */
@Service
@Transactional
public class RecipeSectionServiceImpl implements RecipeSectionService {

    private final Logger log = LoggerFactory.getLogger(RecipeSectionServiceImpl.class);

    private final RecipeSectionRepository recipeSectionRepository;

    public RecipeSectionServiceImpl(RecipeSectionRepository recipeSectionRepository) {
        this.recipeSectionRepository = recipeSectionRepository;
    }

    /**
     * Save a recipeSection.
     *
     * @param recipeSection the entity to save
     * @return the persisted entity
     */
    @Override
    public RecipeSection save(RecipeSection recipeSection) {
        log.debug("Request to save RecipeSection : {}", recipeSection);
        return recipeSectionRepository.save(recipeSection);
    }

    /**
     * Get all the recipeSections.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecipeSection> findAll() {
        log.debug("Request to get all RecipeSections");
        return recipeSectionRepository.findAll();
    }


    /**
     * Get one recipeSection by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RecipeSection> findOne(Long id) {
        log.debug("Request to get RecipeSection : {}", id);
        return recipeSectionRepository.findById(id);
    }

    /**
     * Delete the recipeSection by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RecipeSection : {}", id);
        recipeSectionRepository.deleteById(id);
    }
}
