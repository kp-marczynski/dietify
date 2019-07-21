package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.ProductPortionService;
import pl.marczynski.dietify.recipes.domain.ProductPortion;
import pl.marczynski.dietify.recipes.repository.ProductPortionRepository;
import pl.marczynski.dietify.recipes.repository.search.ProductPortionSearchRepository;
import pl.marczynski.dietify.recipes.service.dto.ProductPortionDTO;
import pl.marczynski.dietify.recipes.service.mapper.ProductPortionMapper;
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
 * Service Implementation for managing {@link ProductPortion}.
 */
@Service
@Transactional
public class ProductPortionServiceImpl implements ProductPortionService {

    private final Logger log = LoggerFactory.getLogger(ProductPortionServiceImpl.class);

    private final ProductPortionRepository productPortionRepository;

    private final ProductPortionMapper productPortionMapper;

    private final ProductPortionSearchRepository productPortionSearchRepository;

    public ProductPortionServiceImpl(ProductPortionRepository productPortionRepository, ProductPortionMapper productPortionMapper, ProductPortionSearchRepository productPortionSearchRepository) {
        this.productPortionRepository = productPortionRepository;
        this.productPortionMapper = productPortionMapper;
        this.productPortionSearchRepository = productPortionSearchRepository;
    }

    /**
     * Save a productPortion.
     *
     * @param productPortionDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProductPortionDTO save(ProductPortionDTO productPortionDTO) {
        log.debug("Request to save ProductPortion : {}", productPortionDTO);
        ProductPortion productPortion = productPortionMapper.toEntity(productPortionDTO);
        productPortion = productPortionRepository.save(productPortion);
        ProductPortionDTO result = productPortionMapper.toDto(productPortion);
        productPortionSearchRepository.save(productPortion);
        return result;
    }

    /**
     * Get all the productPortions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductPortionDTO> findAll() {
        log.debug("Request to get all ProductPortions");
        return productPortionRepository.findAll().stream()
            .map(productPortionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one productPortion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductPortionDTO> findOne(Long id) {
        log.debug("Request to get ProductPortion : {}", id);
        return productPortionRepository.findById(id)
            .map(productPortionMapper::toDto);
    }

    /**
     * Delete the productPortion by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductPortion : {}", id);
        productPortionRepository.deleteById(id);
        productPortionSearchRepository.deleteById(id);
    }

    /**
     * Search for the productPortion corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductPortionDTO> search(String query) {
        log.debug("Request to search ProductPortions for query {}", query);
        return StreamSupport
            .stream(productPortionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(productPortionMapper::toDto)
            .collect(Collectors.toList());
    }
}
