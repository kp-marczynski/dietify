package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.DishTypeService;
import pl.marczynski.dietify.recipes.domain.DishType;
import pl.marczynski.dietify.recipes.repository.DishTypeRepository;
import pl.marczynski.dietify.recipes.repository.search.DishTypeSearchRepository;
import pl.marczynski.dietify.recipes.service.dto.DishTypeDTO;
import pl.marczynski.dietify.recipes.service.mapper.DishTypeMapper;
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
 * Service Implementation for managing {@link DishType}.
 */
@Service
@Transactional
public class DishTypeServiceImpl implements DishTypeService {

    private final Logger log = LoggerFactory.getLogger(DishTypeServiceImpl.class);

    private final DishTypeRepository dishTypeRepository;

    private final DishTypeMapper dishTypeMapper;

    private final DishTypeSearchRepository dishTypeSearchRepository;

    public DishTypeServiceImpl(DishTypeRepository dishTypeRepository, DishTypeMapper dishTypeMapper, DishTypeSearchRepository dishTypeSearchRepository) {
        this.dishTypeRepository = dishTypeRepository;
        this.dishTypeMapper = dishTypeMapper;
        this.dishTypeSearchRepository = dishTypeSearchRepository;
    }

    /**
     * Save a dishType.
     *
     * @param dishTypeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DishTypeDTO save(DishTypeDTO dishTypeDTO) {
        log.debug("Request to save DishType : {}", dishTypeDTO);
        DishType dishType = dishTypeMapper.toEntity(dishTypeDTO);
        dishType = dishTypeRepository.save(dishType);
        DishTypeDTO result = dishTypeMapper.toDto(dishType);
        dishTypeSearchRepository.save(dishType);
        return result;
    }

    /**
     * Get all the dishTypes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DishTypeDTO> findAll() {
        log.debug("Request to get all DishTypes");
        return dishTypeRepository.findAll().stream()
            .map(dishTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one dishType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DishTypeDTO> findOne(Long id) {
        log.debug("Request to get DishType : {}", id);
        return dishTypeRepository.findById(id)
            .map(dishTypeMapper::toDto);
    }

    /**
     * Delete the dishType by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DishType : {}", id);
        dishTypeRepository.deleteById(id);
        dishTypeSearchRepository.deleteById(id);
    }

    /**
     * Search for the dishType corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DishTypeDTO> search(String query) {
        log.debug("Request to search DishTypes for query {}", query);
        return StreamSupport
            .stream(dishTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(dishTypeMapper::toDto)
            .collect(Collectors.toList());
    }
}
