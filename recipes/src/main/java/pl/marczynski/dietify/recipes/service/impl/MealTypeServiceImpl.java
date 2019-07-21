package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.MealTypeService;
import pl.marczynski.dietify.recipes.domain.MealType;
import pl.marczynski.dietify.recipes.repository.MealTypeRepository;
import pl.marczynski.dietify.recipes.repository.search.MealTypeSearchRepository;
import pl.marczynski.dietify.recipes.service.dto.MealTypeDTO;
import pl.marczynski.dietify.recipes.service.mapper.MealTypeMapper;
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
 * Service Implementation for managing {@link MealType}.
 */
@Service
@Transactional
public class MealTypeServiceImpl implements MealTypeService {

    private final Logger log = LoggerFactory.getLogger(MealTypeServiceImpl.class);

    private final MealTypeRepository mealTypeRepository;

    private final MealTypeMapper mealTypeMapper;

    private final MealTypeSearchRepository mealTypeSearchRepository;

    public MealTypeServiceImpl(MealTypeRepository mealTypeRepository, MealTypeMapper mealTypeMapper, MealTypeSearchRepository mealTypeSearchRepository) {
        this.mealTypeRepository = mealTypeRepository;
        this.mealTypeMapper = mealTypeMapper;
        this.mealTypeSearchRepository = mealTypeSearchRepository;
    }

    /**
     * Save a mealType.
     *
     * @param mealTypeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealTypeDTO save(MealTypeDTO mealTypeDTO) {
        log.debug("Request to save MealType : {}", mealTypeDTO);
        MealType mealType = mealTypeMapper.toEntity(mealTypeDTO);
        mealType = mealTypeRepository.save(mealType);
        MealTypeDTO result = mealTypeMapper.toDto(mealType);
        mealTypeSearchRepository.save(mealType);
        return result;
    }

    /**
     * Get all the mealTypes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealTypeDTO> findAll() {
        log.debug("Request to get all MealTypes");
        return mealTypeRepository.findAll().stream()
            .map(mealTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one mealType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealTypeDTO> findOne(Long id) {
        log.debug("Request to get MealType : {}", id);
        return mealTypeRepository.findById(id)
            .map(mealTypeMapper::toDto);
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
    public List<MealTypeDTO> search(String query) {
        log.debug("Request to search MealTypes for query {}", query);
        return StreamSupport
            .stream(mealTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(mealTypeMapper::toDto)
            .collect(Collectors.toList());
    }
}
