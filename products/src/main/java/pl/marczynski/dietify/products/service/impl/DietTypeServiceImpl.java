package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.DietTypeService;
import pl.marczynski.dietify.products.domain.DietType;
import pl.marczynski.dietify.products.repository.DietTypeRepository;
import pl.marczynski.dietify.products.repository.search.DietTypeSearchRepository;
import pl.marczynski.dietify.products.service.dto.DietTypeDTO;
import pl.marczynski.dietify.products.service.mapper.DietTypeMapper;
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
 * Service Implementation for managing {@link DietType}.
 */
@Service
@Transactional
public class DietTypeServiceImpl implements DietTypeService {

    private final Logger log = LoggerFactory.getLogger(DietTypeServiceImpl.class);

    private final DietTypeRepository dietTypeRepository;

    private final DietTypeMapper dietTypeMapper;

    private final DietTypeSearchRepository dietTypeSearchRepository;

    public DietTypeServiceImpl(DietTypeRepository dietTypeRepository, DietTypeMapper dietTypeMapper, DietTypeSearchRepository dietTypeSearchRepository) {
        this.dietTypeRepository = dietTypeRepository;
        this.dietTypeMapper = dietTypeMapper;
        this.dietTypeSearchRepository = dietTypeSearchRepository;
    }

    /**
     * Save a dietType.
     *
     * @param dietTypeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DietTypeDTO save(DietTypeDTO dietTypeDTO) {
        log.debug("Request to save DietType : {}", dietTypeDTO);
        DietType dietType = dietTypeMapper.toEntity(dietTypeDTO);
        dietType = dietTypeRepository.save(dietType);
        DietTypeDTO result = dietTypeMapper.toDto(dietType);
        dietTypeSearchRepository.save(dietType);
        return result;
    }

    /**
     * Get all the dietTypes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DietTypeDTO> findAll() {
        log.debug("Request to get all DietTypes");
        return dietTypeRepository.findAll().stream()
            .map(dietTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one dietType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DietTypeDTO> findOne(Long id) {
        log.debug("Request to get DietType : {}", id);
        return dietTypeRepository.findById(id)
            .map(dietTypeMapper::toDto);
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
    public List<DietTypeDTO> search(String query) {
        log.debug("Request to search DietTypes for query {}", query);
        return StreamSupport
            .stream(dietTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(dietTypeMapper::toDto)
            .collect(Collectors.toList());
    }
}
