package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.ProductCategoryTranslationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.ProductCategoryTranslation}.
 */
public interface ProductCategoryTranslationService {

    /**
     * Save a productCategoryTranslation.
     *
     * @param productCategoryTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    ProductCategoryTranslationDTO save(ProductCategoryTranslationDTO productCategoryTranslationDTO);

    /**
     * Get all the productCategoryTranslations.
     *
     * @return the list of entities.
     */
    List<ProductCategoryTranslationDTO> findAll();


    /**
     * Get the "id" productCategoryTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductCategoryTranslationDTO> findOne(Long id);

    /**
     * Delete the "id" productCategoryTranslation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the productCategoryTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<ProductCategoryTranslationDTO> search(String query);
}
