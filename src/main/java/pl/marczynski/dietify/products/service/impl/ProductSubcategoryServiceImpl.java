package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.ProductSubcategoryService;
import pl.marczynski.dietify.products.domain.ProductSubcategory;
import pl.marczynski.dietify.products.repository.ProductSubcategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ProductSubcategory.
 */
@Service
@Transactional
public class ProductSubcategoryServiceImpl implements ProductSubcategoryService {

    private final Logger log = LoggerFactory.getLogger(ProductSubcategoryServiceImpl.class);

    private final ProductSubcategoryRepository productSubcategoryRepository;

    public ProductSubcategoryServiceImpl(ProductSubcategoryRepository productSubcategoryRepository) {
        this.productSubcategoryRepository = productSubcategoryRepository;
    }

    /**
     * Save a productSubcategory.
     *
     * @param productSubcategory the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductSubcategory save(ProductSubcategory productSubcategory) {
        log.debug("Request to save ProductSubcategory : {}", productSubcategory);
        return productSubcategoryRepository.save(productSubcategory);
    }

    /**
     * Get all the productSubcategories.
     *
     * @return the list of entities
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
     * @param id the id of the entity
     * @return the entity
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
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductSubcategory : {}", id);
        productSubcategoryRepository.deleteById(id);
    }
}
