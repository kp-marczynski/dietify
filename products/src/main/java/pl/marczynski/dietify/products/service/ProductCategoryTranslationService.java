package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.ProductCategoryTranslation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ProductCategoryTranslation}.
 */
public interface ProductCategoryTranslationService {

    /**
     * Save a productCategoryTranslation.
     *
     * @param productCategoryTranslation the entity to save.
     * @return the persisted entity.
     */
    ProductCategoryTranslation save(ProductCategoryTranslation productCategoryTranslation);

    /**
     * Get all the productCategoryTranslations.
     *
     * @return the list of entities.
     */
    List<ProductCategoryTranslation> findAll();


    /**
     * Get the "id" productCategoryTranslation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductCategoryTranslation> findOne(Long id);

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
    List<ProductCategoryTranslation> search(String query);
}
