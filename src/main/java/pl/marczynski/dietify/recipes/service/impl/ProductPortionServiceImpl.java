package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.ProductPortionService;
import pl.marczynski.dietify.recipes.domain.ProductPortion;
import pl.marczynski.dietify.recipes.repository.ProductPortionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ProductPortion.
 */
@Service
@Transactional
public class ProductPortionServiceImpl implements ProductPortionService {

    private final Logger log = LoggerFactory.getLogger(ProductPortionServiceImpl.class);

    private final ProductPortionRepository productPortionRepository;

    public ProductPortionServiceImpl(ProductPortionRepository productPortionRepository) {
        this.productPortionRepository = productPortionRepository;
    }

    /**
     * Save a productPortion.
     *
     * @param productPortion the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductPortion save(ProductPortion productPortion) {
        log.debug("Request to save ProductPortion : {}", productPortion);
        return productPortionRepository.save(productPortion);
    }

    /**
     * Get all the productPortions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductPortion> findAll() {
        log.debug("Request to get all ProductPortions");
        return productPortionRepository.findAll();
    }


    /**
     * Get one productPortion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductPortion> findOne(Long id) {
        log.debug("Request to get ProductPortion : {}", id);
        return productPortionRepository.findById(id);
    }

    /**
     * Delete the productPortion by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductPortion : {}", id);
        productPortionRepository.deleteById(id);
    }
}
