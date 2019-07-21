package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.ProductSubcategoryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.ProductSubcategory}.
 */
public interface ProductSubcategoryService {

    /**
     * Save a productSubcategory.
     *
     * @param productSubcategoryDTO the entity to save.
     * @return the persisted entity.
     */
    ProductSubcategoryDTO save(ProductSubcategoryDTO productSubcategoryDTO);

    /**
     * Get all the productSubcategories.
     *
     * @return the list of entities.
     */
    List<ProductSubcategoryDTO> findAll();


    /**
     * Get the "id" productSubcategory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductSubcategoryDTO> findOne(Long id);

    /**
     * Delete the "id" productSubcategory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the productSubcategory corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<ProductSubcategoryDTO> search(String query);
}
