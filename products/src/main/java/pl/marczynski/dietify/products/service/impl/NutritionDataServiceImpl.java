package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.NutritionDataService;
import pl.marczynski.dietify.products.domain.NutritionData;
import pl.marczynski.dietify.products.repository.NutritionDataRepository;
import pl.marczynski.dietify.products.repository.search.NutritionDataSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link NutritionData}.
 */
@Service
@Transactional
public class NutritionDataServiceImpl implements NutritionDataService {

    private final Logger log = LoggerFactory.getLogger(NutritionDataServiceImpl.class);

    private final NutritionDataRepository nutritionDataRepository;

    private final NutritionDataSearchRepository nutritionDataSearchRepository;

    public NutritionDataServiceImpl(NutritionDataRepository nutritionDataRepository, NutritionDataSearchRepository nutritionDataSearchRepository) {
        this.nutritionDataRepository = nutritionDataRepository;
        this.nutritionDataSearchRepository = nutritionDataSearchRepository;
    }

    /**
     * Save a nutritionData.
     *
     * @param nutritionData the entity to save.
     * @return the persisted entity.
     */
    @Override
    public NutritionData save(NutritionData nutritionData) {
        log.debug("Request to save NutritionData : {}", nutritionData);
        NutritionData result = nutritionDataRepository.save(nutritionData);
        nutritionDataSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the nutritionData.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<NutritionData> findAll() {
        log.debug("Request to get all NutritionData");
        return nutritionDataRepository.findAll();
    }


    /**
     * Get one nutritionData by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NutritionData> findOne(Long id) {
        log.debug("Request to get NutritionData : {}", id);
        return nutritionDataRepository.findById(id);
    }

    /**
     * Delete the nutritionData by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NutritionData : {}", id);
        nutritionDataRepository.deleteById(id);
        nutritionDataSearchRepository.deleteById(id);
    }

    /**
     * Search for the nutritionData corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<NutritionData> search(String query) {
        log.debug("Request to search NutritionData for query {}", query);
        return StreamSupport
            .stream(nutritionDataSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
