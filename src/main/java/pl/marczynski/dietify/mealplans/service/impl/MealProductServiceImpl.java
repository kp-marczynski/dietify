package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealProductService;
import pl.marczynski.dietify.mealplans.domain.MealProduct;
import pl.marczynski.dietify.mealplans.repository.MealProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing MealProduct.
 */
@Service
@Transactional
public class MealProductServiceImpl implements MealProductService {

    private final Logger log = LoggerFactory.getLogger(MealProductServiceImpl.class);

    private final MealProductRepository mealProductRepository;

    public MealProductServiceImpl(MealProductRepository mealProductRepository) {
        this.mealProductRepository = mealProductRepository;
    }

    /**
     * Save a mealProduct.
     *
     * @param mealProduct the entity to save
     * @return the persisted entity
     */
    @Override
    public MealProduct save(MealProduct mealProduct) {
        log.debug("Request to save MealProduct : {}", mealProduct);
        return mealProductRepository.save(mealProduct);
    }

    /**
     * Get all the mealProducts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealProduct> findAll() {
        log.debug("Request to get all MealProducts");
        return mealProductRepository.findAll();
    }


    /**
     * Get one mealProduct by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealProduct> findOne(Long id) {
        log.debug("Request to get MealProduct : {}", id);
        return mealProductRepository.findById(id);
    }

    /**
     * Delete the mealProduct by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealProduct : {}", id);
        mealProductRepository.deleteById(id);
    }
}
