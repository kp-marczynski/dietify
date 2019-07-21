package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealProductService;
import pl.marczynski.dietify.mealplans.domain.MealProduct;
import pl.marczynski.dietify.mealplans.repository.MealProductRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealProductSearchRepository;
import pl.marczynski.dietify.mealplans.service.dto.MealProductDTO;
import pl.marczynski.dietify.mealplans.service.mapper.MealProductMapper;
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
 * Service Implementation for managing {@link MealProduct}.
 */
@Service
@Transactional
public class MealProductServiceImpl implements MealProductService {

    private final Logger log = LoggerFactory.getLogger(MealProductServiceImpl.class);

    private final MealProductRepository mealProductRepository;

    private final MealProductMapper mealProductMapper;

    private final MealProductSearchRepository mealProductSearchRepository;

    public MealProductServiceImpl(MealProductRepository mealProductRepository, MealProductMapper mealProductMapper, MealProductSearchRepository mealProductSearchRepository) {
        this.mealProductRepository = mealProductRepository;
        this.mealProductMapper = mealProductMapper;
        this.mealProductSearchRepository = mealProductSearchRepository;
    }

    /**
     * Save a mealProduct.
     *
     * @param mealProductDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealProductDTO save(MealProductDTO mealProductDTO) {
        log.debug("Request to save MealProduct : {}", mealProductDTO);
        MealProduct mealProduct = mealProductMapper.toEntity(mealProductDTO);
        mealProduct = mealProductRepository.save(mealProduct);
        MealProductDTO result = mealProductMapper.toDto(mealProduct);
        mealProductSearchRepository.save(mealProduct);
        return result;
    }

    /**
     * Get all the mealProducts.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealProductDTO> findAll() {
        log.debug("Request to get all MealProducts");
        return mealProductRepository.findAll().stream()
            .map(mealProductMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one mealProduct by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealProductDTO> findOne(Long id) {
        log.debug("Request to get MealProduct : {}", id);
        return mealProductRepository.findById(id)
            .map(mealProductMapper::toDto);
    }

    /**
     * Delete the mealProduct by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealProduct : {}", id);
        mealProductRepository.deleteById(id);
        mealProductSearchRepository.deleteById(id);
    }

    /**
     * Search for the mealProduct corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealProductDTO> search(String query) {
        log.debug("Request to search MealProducts for query {}", query);
        return StreamSupport
            .stream(mealProductSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(mealProductMapper::toDto)
            .collect(Collectors.toList());
    }
}
