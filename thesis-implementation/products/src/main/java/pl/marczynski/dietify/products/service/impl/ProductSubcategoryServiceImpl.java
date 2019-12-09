package pl.marczynski.dietify.products.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.products.domain.ProductSubcategory;
import pl.marczynski.dietify.products.repository.ProductSubcategoryRepository;
import pl.marczynski.dietify.products.repository.search.ProductSubcategorySearchRepository;
import pl.marczynski.dietify.products.service.ProductSubcategoryService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * Service Implementation for managing {@link ProductSubcategory}.
 */
@Service
@Transactional
public class ProductSubcategoryServiceImpl implements ProductSubcategoryService {

    private final Logger log = LoggerFactory.getLogger(ProductSubcategoryServiceImpl.class);

    private final ProductSubcategoryRepository productSubcategoryRepository;

    private final ProductSubcategorySearchRepository productSubcategorySearchRepository;

    public ProductSubcategoryServiceImpl(ProductSubcategoryRepository productSubcategoryRepository, ProductSubcategorySearchRepository productSubcategorySearchRepository) {
        this.productSubcategoryRepository = productSubcategoryRepository;
        this.productSubcategorySearchRepository = productSubcategorySearchRepository;
    }

    /**
     * Save a productSubcategory.
     *
     * @param productSubcategory the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProductSubcategory save(ProductSubcategory productSubcategory) {
        log.debug("Request to save ProductSubcategory : {}", productSubcategory);
        ProductSubcategory result = productSubcategoryRepository.save(productSubcategory);
        productSubcategorySearchRepository.save(result);
        return result;
    }

    /**
     * Get all the productSubcategories.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductSubcategory> findAll() {
        log.debug("Request to get all ProductSubcategories");
        return productSubcategoryRepository.findAll();
    }


    /**
     * Get one productSubcategory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductSubcategory> findOne(Long id) {
        log.debug("Request to get ProductSubcategory : {}", id);
        return productSubcategoryRepository.findById(id);
    }

    /**
     * Delete the productSubcategory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductSubcategory : {}", id);
        productSubcategoryRepository.deleteById(id);
        productSubcategorySearchRepository.deleteById(id);
    }

    /**
     * Search for the productSubcategory corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductSubcategory> search(String query) {
        log.debug("Request to search ProductSubcategories for query {}", query);
        return StreamSupport
            .stream(productSubcategorySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    @Override
    public List<ProductSubcategory> findAllByCategoryIdAndProductLanguage(Long productCategoryId, String language) {
        log.debug("Request to get all ProductSubcategories for category with id: " + productCategoryId);
        return productSubcategoryRepository.findAllByCategoryIdAndProductLanguage(productCategoryId, language);
    }

    @Override
    @Transactional
    public void removeOrphans() {
        productSubcategoryRepository.deleteAllNotAssignedToProducts();
    }
}
