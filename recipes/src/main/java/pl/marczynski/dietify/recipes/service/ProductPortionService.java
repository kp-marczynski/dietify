package pl.marczynski.dietify.recipes.service;

import pl.marczynski.dietify.recipes.service.dto.ProductPortionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.recipes.domain.ProductPortion}.
 */
public interface ProductPortionService {

    /**
     * Save a productPortion.
     *
     * @param productPortionDTO the entity to save.
     * @return the persisted entity.
     */
    ProductPortionDTO save(ProductPortionDTO productPortionDTO);

    /**
     * Get all the productPortions.
     *
     * @return the list of entities.
     */
    List<ProductPortionDTO> findAll();


    /**
     * Get the "id" productPortion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductPortionDTO> findOne(Long id);

    /**
     * Delete the "id" productPortion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the productPortion corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<ProductPortionDTO> search(String query);
}
