package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.ProductBasicNutritionDataService;
import pl.marczynski.dietify.products.domain.ProductBasicNutritionData;
import pl.marczynski.dietify.products.repository.ProductBasicNutritionDataRepository;
import pl.marczynski.dietify.products.repository.search.ProductBasicNutritionDataSearchRepository;
import pl.marczynski.dietify.products.service.dto.ProductBasicNutritionDataDTO;
import pl.marczynski.dietify.products.service.mapper.ProductBasicNutritionDataMapper;
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
 * Service Implementation for managing {@link ProductBasicNutritionData}.
 */
@Service
@Transactional
public class ProductBasicNutritionDataServiceImpl implements ProductBasicNutritionDataService {

    private final Logger log = LoggerFactory.getLogger(ProductBasicNutritionDataServiceImpl.class);

    private final ProductBasicNutritionDataRepository productBasicNutritionDataRepository;

    private final ProductBasicNutritionDataMapper productBasicNutritionDataMapper;

    private final ProductBasicNutritionDataSearchRepository productBasicNutritionDataSearchRepository;

    public ProductBasicNutritionDataServiceImpl(ProductBasicNutritionDataRepository productBasicNutritionDataRepository, ProductBasicNutritionDataMapper productBasicNutritionDataMapper, ProductBasicNutritionDataSearchRepository productBasicNutritionDataSearchRepository) {
        this.productBasicNutritionDataRepository = productBasicNutritionDataRepository;
        this.productBasicNutritionDataMapper = productBasicNutritionDataMapper;
        this.productBasicNutritionDataSearchRepository = productBasicNutritionDataSearchRepository;
    }

    /**
     * Save a productBasicNutritionData.
     *
     * @param productBasicNutritionDataDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProductBasicNutritionDataDTO save(ProductBasicNutritionDataDTO productBasicNutritionDataDTO) {
        log.debug("Request to save ProductBasicNutritionData : {}", productBasicNutritionDataDTO);
        ProductBasicNutritionData productBasicNutritionData = productBasicNutritionDataMapper.toEntity(productBasicNutritionDataDTO);
        productBasicNutritionData = productBasicNutritionDataRepository.save(productBasicNutritionData);
        ProductBasicNutritionDataDTO result = productBasicNutritionDataMapper.toDto(productBasicNutritionData);
        productBasicNutritionDataSearchRepository.save(productBasicNutritionData);
        return result;
    }

    /**
     * Get all the productBasicNutritionData.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductBasicNutritionDataDTO> findAll() {
        log.debug("Request to get all ProductBasicNutritionData");
        return productBasicNutritionDataRepository.findAll().stream()
            .map(productBasicNutritionDataMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one productBasicNutritionData by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductBasicNutritionDataDTO> findOne(Long id) {
        log.debug("Request to get ProductBasicNutritionData : {}", id);
        return productBasicNutritionDataRepository.findById(id)
            .map(productBasicNutritionDataMapper::toDto);
    }

    /**
     * Delete the productBasicNutritionData by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductBasicNutritionData : {}", id);
        productBasicNutritionDataRepository.deleteById(id);
        productBasicNutritionDataSearchRepository.deleteById(id);
    }

    /**
     * Search for the productBasicNutritionData corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductBasicNutritionDataDTO> search(String query) {
        log.debug("Request to search ProductBasicNutritionData for query {}", query);
        return StreamSupport
            .stream(productBasicNutritionDataSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(productBasicNutritionDataMapper::toDto)
            .collect(Collectors.toList());
    }
}
