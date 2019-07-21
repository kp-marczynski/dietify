package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.ProductCategoryTranslationService;
import pl.marczynski.dietify.products.domain.ProductCategoryTranslation;
import pl.marczynski.dietify.products.repository.ProductCategoryTranslationRepository;
import pl.marczynski.dietify.products.repository.search.ProductCategoryTranslationSearchRepository;
import pl.marczynski.dietify.products.service.dto.ProductCategoryTranslationDTO;
import pl.marczynski.dietify.products.service.mapper.ProductCategoryTranslationMapper;
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
 * Service Implementation for managing {@link ProductCategoryTranslation}.
 */
@Service
@Transactional
public class ProductCategoryTranslationServiceImpl implements ProductCategoryTranslationService {

    private final Logger log = LoggerFactory.getLogger(ProductCategoryTranslationServiceImpl.class);

    private final ProductCategoryTranslationRepository productCategoryTranslationRepository;

    private final ProductCategoryTranslationMapper productCategoryTranslationMapper;

    private final ProductCategoryTranslationSearchRepository productCategoryTranslationSearchRepository;

    public ProductCategoryTranslationServiceImpl(ProductCategoryTranslationRepository productCategoryTranslationRepository, ProductCategoryTranslationMapper productCategoryTranslationMapper, ProductCategoryTranslationSearchRepository productCategoryTranslationSearchRepository) {
        this.productCategoryTranslationRepository = productCategoryTranslationRepository;
        this.productCategoryTranslationMapper = productCategoryTranslationMapper;
        this.productCategoryTranslationSearchRepository = productCategoryTranslationSearchRepository;
    }

    /**
     * Save a productCategoryTranslation.
     *
     * @param productCategoryTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProductCategoryTranslationDTO save(ProductCategoryTranslationDTO productCategoryTranslationDTO) {
        log.debug("Request to save ProductCategoryTranslation : {}", productCategoryTranslationDTO);
        ProductCategoryTranslation productCategoryTranslation = productCategoryTranslationMapper.toEntity(productCategoryTranslationDTO);
        productCategoryTranslation = productCategoryTranslationRepository.save(productCategoryTranslation);
        ProductCategoryTranslationDTO result = productCategoryTranslationMapper.toDto(productCategoryTranslation);
        productCategoryTranslationSearchRepository.save(productCategoryTranslation);
        return result;
    }

    /**
     * Get all the productCategoryTranslations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductCategoryTranslationDTO> findAll() {
        log.debug("Request to get all ProductCategoryTranslations");
        return productCategoryTranslationRepository.findAll().stream()
            .map(productCategoryTranslationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one productCategoryTranslation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductCategoryTranslationDTO> findOne(Long id) {
        log.debug("Request to get ProductCategoryTranslation : {}", id);
        return productCategoryTranslationRepository.findById(id)
            .map(productCategoryTranslationMapper::toDto);
    }

    /**
     * Delete the productCategoryTranslation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductCategoryTranslation : {}", id);
        productCategoryTranslationRepository.deleteById(id);
        productCategoryTranslationSearchRepository.deleteById(id);
    }

    /**
     * Search for the productCategoryTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductCategoryTranslationDTO> search(String query) {
        log.debug("Request to search ProductCategoryTranslations for query {}", query);
        return StreamSupport
            .stream(productCategoryTranslationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(productCategoryTranslationMapper::toDto)
            .collect(Collectors.toList());
    }
}
