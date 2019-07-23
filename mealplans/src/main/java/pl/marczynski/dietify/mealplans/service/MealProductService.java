package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.domain.MealProduct;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link MealProduct}.
 */
public interface MealProductService {

    /**
     * Save a mealProduct.
     *
     * @param mealProduct the entity to save.
     * @return the persisted entity.
     */
    MealProduct save(MealProduct mealProduct);

    /**
     * Get all the mealProducts.
     *
     * @return the list of entities.
     */
    List<MealProduct> findAll();


    /**
     * Get the "id" mealProduct.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealProduct> findOne(Long id);

    /**
     * Delete the "id" mealProduct.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the mealProduct corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<MealProduct> search(String query);
}
