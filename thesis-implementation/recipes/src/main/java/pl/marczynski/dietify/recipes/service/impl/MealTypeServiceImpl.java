package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.MealTypeService;
import pl.marczynski.dietify.recipes.domain.MealType;
import pl.marczynski.dietify.recipes.repository.MealTypeRepository;
import pl.marczynski.dietify.recipes.repository.search.MealTypeSearchRepository;
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
 * Service Implementation for managing {@link MealType}.
 */
@Service
@Transactional
public class MealTypeServiceImpl implements MealTypeService {

    private final Logger log = LoggerFactory.getLogger(MealTypeServiceImpl.class);

    private final MealTypeRepository mealTypeRepository;

    private final MealTypeSearchRepository mealTypeSearchRepository;

    public MealTypeServiceImpl(MealTypeRepository mealTypeRepository, MealTypeSearchRepository mealTypeSearchRepository) {
        this.mealTypeRepository = mealTypeRepository;
        this.mealTypeSearchRepository = mealTypeSearchRepository;
    }

    /**
     * Save a mealType.
     *
     * @param mealType the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealType save(MealType mealType) {
        log.debug("Request to save MealType : {}", mealType);
        MealType result = mealTypeRepository.save(mealType);
        mealTypeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the mealTypes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealType> findAll() {
        log.debug("Request to get all MealTypes");
        return mealTypeRepository.findAll();
    }


    /**
     * Get one mealType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealType> findOne(Long id) {
        log.debug("Request to get MealType : {}", id);
        return mealTypeRepository.findById(id);
    }

    /**
     * Delete the mealType by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealType : {}", id);
        mealTypeRepository.deleteById(id);
        mealTypeSearchRepository.deleteById(id);
    }

    /**
     * Search for the mealType corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealType> search(String query) {
        log.debug("Request to search MealTypes for query {}", query);
        return StreamSupport
            .stream(mealTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
