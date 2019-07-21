package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.ProductCategoryService;
import pl.marczynski.dietify.products.domain.ProductCategory;
import pl.marczynski.dietify.products.repository.ProductCategoryRepository;
import pl.marczynski.dietify.products.repository.search.ProductCategorySearchRepository;
import pl.marczynski.dietify.products.service.dto.ProductCategoryDTO;
import pl.marczynski.dietify.products.service.mapper.ProductCategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link ProductCategory}.
 */
@Service
@Transactional
public class ProductCategoryServiceImpl implements ProductCategoryService {

    private final Logger log = LoggerFactory.getLogger(ProductCategoryServiceImpl.class);

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductCategoryMapper productCategoryMapper;

    private final ProductCategorySearchRepository productCategorySearchRepository;

    public ProductCategoryServiceImpl(ProductCategoryRepository productCategoryRepository, ProductCategoryMapper productCategoryMapper, ProductCategorySearchRepository productCategorySearchRepository) {
        this.productCategoryRepository = productCategoryRepository;
        this.productCategoryMapper = productCategoryMapper;
        this.productCategorySearchRepository = productCategorySearchRepository;
    }

    /**
     * Save a productCategory.
     *
     * @param productCategoryDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProductCategoryDTO save(ProductCategoryDTO productCategoryDTO) {
        log.debug("Request to save ProductCategory : {}", productCategoryDTO);
        ProductCategory productCategory = productCategoryMapper.toEntity(productCategoryDTO);
        productCategory = productCategoryRepository.save(productCategory);
        ProductCategoryDTO result = productCategoryMapper.toDto(productCategory);
        productCategorySearchRepository.save(productCategory);
        return result;
    }

    /**
     * Get all the productCategories.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductCategoryDTO> findAll() {
        log.debug("Request to get all ProductCategories");
        return productCategoryRepository.findAll().stream()
            .map(productCategoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one productCategory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductCategoryDTO> findOne(Long id) {
        log.debug("Request to get ProductCategory : {}", id);
        return productCategoryRepository.findById(id)
            .map(productCategoryMapper::toDto);
    }

    /**
     * Delete the productCategory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductCategory : {}", id);
        productCategoryRepository.deleteById(id);
        productCategorySearchRepository.deleteById(id);
    }

    /**
     * Search for the productCategory corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductCategoryDTO> search(String query) {
        log.debug("Request to search ProductCategories for query {}", query);
        return StreamSupport
            .stream(productCategorySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(productCategoryMapper::toDto)
            .collect(Collectors.toList());
    }
}
