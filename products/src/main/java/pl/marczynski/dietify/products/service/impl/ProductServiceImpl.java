package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.ProductService;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.repository.ProductRepository;
import pl.marczynski.dietify.products.repository.search.ProductSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.products.service.ProductSubcategoryService;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Product}.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;

    private final ProductSearchRepository productSearchRepository;

    private final ProductSubcategoryService productSubcategoryService;

    public ProductServiceImpl(ProductRepository productRepository, ProductSearchRepository productSearchRepository, ProductSubcategoryService productSubcategoryService) {
        this.productRepository = productRepository;
        this.productSearchRepository = productSearchRepository;
        this.productSubcategoryService = productSubcategoryService;
    }

    /**
     * Save a product.
     *
     * @param product the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Product save(Product product) {
        log.debug("Request to save Product : {}", product);
        if (product.getSubcategory().getId() == null) {
            product.setSubcategory(this.productSubcategoryService.save(product.getSubcategory()));
        }
        Product result = productRepository.saveAndFlush(product);
        productSearchRepository.save(result);
        productSubcategoryService.removeOrphans();
        return result;
    }

    /**
     * Get all the products.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Product> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAll(pageable);
    }

    /**
     * Get all the products with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Product> findAllWithEagerRelationships(Pageable pageable) {
        return productRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     * Get one product by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Product> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.deleteById(id);
        productSearchRepository.deleteById(id);
        productSubcategoryService.removeOrphans();
    }

    /**
     * Search for the product corresponding to the query.
     *
     * @param query    the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Product> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Products for query {}", query);
        return productSearchRepository.search(queryStringQuery(query), pageable);
    }

    @Override
    public Page<Product> findBySearchAndFilters(String searchPhrase, String language, Long categoryId, Long subcategoryId, Pageable pageable) {
        if (subcategoryId != null) {
            return productRepository.findByDescriptionContainingIgnoreCaseAndSubcategoryId(searchPhrase, subcategoryId, pageable);
        } else if (categoryId != null) {
            return productRepository.findByDescriptionContainingIgnoreCaseAndSubcategoryCategoryIdAndLanguage(searchPhrase, categoryId, language, pageable);
        } else if (language != null) {
            return productRepository.findByDescriptionContainingIgnoreCaseAndLanguage(searchPhrase, language, pageable);
        } else {
            return this.productRepository.findByDescriptionContainingIgnoreCase(searchPhrase, pageable);
        }
    }
}
