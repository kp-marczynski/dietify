package pl.marczynski.dietify.mealplans.service;

import pl.marczynski.dietify.mealplans.service.dto.MealProductDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.mealplans.domain.MealProduct}.
 */
public interface MealProductService {

    /**
     * Save a mealProduct.
     *
     * @param mealProductDTO the entity to save.
     * @return the persisted entity.
     */
    MealProductDTO save(MealProductDTO mealProductDTO);

    /**
     * Get all the mealProducts.
     *
     * @return the list of entities.
     */
    List<MealProductDTO> findAll();


    /**
     * Get the "id" mealProduct.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MealProductDTO> findOne(Long id);

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
    List<MealProductDTO> search(String query);
}
