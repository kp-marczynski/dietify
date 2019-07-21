package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.ProductBasicNutritionDataDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.ProductBasicNutritionData}.
 */
public interface ProductBasicNutritionDataService {

    /**
     * Save a productBasicNutritionData.
     *
     * @param productBasicNutritionDataDTO the entity to save.
     * @return the persisted entity.
     */
    ProductBasicNutritionDataDTO save(ProductBasicNutritionDataDTO productBasicNutritionDataDTO);

    /**
     * Get all the productBasicNutritionData.
     *
     * @return the list of entities.
     */
    List<ProductBasicNutritionDataDTO> findAll();


    /**
     * Get the "id" productBasicNutritionData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductBasicNutritionDataDTO> findOne(Long id);

    /**
     * Delete the "id" productBasicNutritionData.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the productBasicNutritionData corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<ProductBasicNutritionDataDTO> search(String query);
}
