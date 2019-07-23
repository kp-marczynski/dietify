package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.DietTypeService;
import pl.marczynski.dietify.products.domain.DietType;
import pl.marczynski.dietify.products.repository.DietTypeRepository;
import pl.marczynski.dietify.products.repository.search.DietTypeSearchRepository;
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
 * Service Implementation for managing {@link DietType}.
 */
@Service
@Transactional
public class DietTypeServiceImpl implements DietTypeService {

    private final Logger log = LoggerFactory.getLogger(DietTypeServiceImpl.class);

    private final DietTypeRepository dietTypeRepository;

    private final DietTypeSearchRepository dietTypeSearchRepository;

    public DietTypeServiceImpl(DietTypeRepository dietTypeRepository, DietTypeSearchRepository dietTypeSearchRepository) {
        this.dietTypeRepository = dietTypeRepository;
        this.dietTypeSearchRepository = dietTypeSearchRepository;
    }

    /**
     * Save a dietType.
     *
     * @param dietType the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DietType save(DietType dietType) {
        log.debug("Request to save DietType : {}", dietType);
        DietType result = dietTypeRepository.save(dietType);
        dietTypeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the dietTypes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DietType> findAll() {
        log.debug("Request to get all DietTypes");
        return dietTypeRepository.findAll();
    }


    /**
     * Get one dietType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DietType> findOne(Long id) {
        log.debug("Request to get DietType : {}", id);
        return dietTypeRepository.findById(id);
    }

    /**
     * Delete the dietType by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DietType : {}", id);
        dietTypeRepository.deleteById(id);
        dietTypeSearchRepository.deleteById(id);
    }

    /**
     * Search for the dietType corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DietType> search(String query) {
        log.debug("Request to search DietTypes for query {}", query);
        return StreamSupport
            .stream(dietTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
