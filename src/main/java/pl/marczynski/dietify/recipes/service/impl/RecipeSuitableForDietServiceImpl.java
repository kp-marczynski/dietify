package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.RecipeSuitableForDietService;
import pl.marczynski.dietify.recipes.domain.RecipeSuitableForDiet;
import pl.marczynski.dietify.recipes.repository.RecipeSuitableForDietRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing RecipeSuitableForDiet.
 */
@Service
@Transactional
public class RecipeSuitableForDietServiceImpl implements RecipeSuitableForDietService {

    private final Logger log = LoggerFactory.getLogger(RecipeSuitableForDietServiceImpl.class);

    private final RecipeSuitableForDietRepository recipeSuitableForDietRepository;

    public RecipeSuitableForDietServiceImpl(RecipeSuitableForDietRepository recipeSuitableForDietRepository) {
        this.recipeSuitableForDietRepository = recipeSuitableForDietRepository;
    }

    /**
     * Save a recipeSuitableForDiet.
     *
     * @param recipeSuitableForDiet the entity to save
     * @return the persisted entity
     */
    @Override
    public RecipeSuitableForDiet save(RecipeSuitableForDiet recipeSuitableForDiet) {
        log.debug("Request to save RecipeSuitableForDiet : {}", recipeSuitableForDiet);
        return recipeSuitableForDietRepository.save(recipeSuitableForDiet);
    }

    /**
     * Get all the recipeSuitableForDiets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecipeSuitableForDiet> findAll() {
        log.debug("Request to get all RecipeSuitableForDiets");
        return recipeSuitableForDietRepository.findAll();
    }


    /**
     * Get one recipeSuitableForDiet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RecipeSuitableForDiet> findOne(Long id) {
        log.debug("Request to get RecipeSuitableForDiet : {}", id);
        return recipeSuitableForDietRepository.findById(id);
    }

    /**
     * Delete the recipeSuitableForDiet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RecipeSuitableForDiet : {}", id);
        recipeSuitableForDietRepository.deleteById(id);
    }
}
