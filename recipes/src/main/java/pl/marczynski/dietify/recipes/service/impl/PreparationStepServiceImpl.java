package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.PreparationStepService;
import pl.marczynski.dietify.recipes.domain.PreparationStep;
import pl.marczynski.dietify.recipes.repository.PreparationStepRepository;
import pl.marczynski.dietify.recipes.repository.search.PreparationStepSearchRepository;
import pl.marczynski.dietify.recipes.service.dto.PreparationStepDTO;
import pl.marczynski.dietify.recipes.service.mapper.PreparationStepMapper;
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
 * Service Implementation for managing {@link PreparationStep}.
 */
@Service
@Transactional
public class PreparationStepServiceImpl implements PreparationStepService {

    private final Logger log = LoggerFactory.getLogger(PreparationStepServiceImpl.class);

    private final PreparationStepRepository preparationStepRepository;

    private final PreparationStepMapper preparationStepMapper;

    private final PreparationStepSearchRepository preparationStepSearchRepository;

    public PreparationStepServiceImpl(PreparationStepRepository preparationStepRepository, PreparationStepMapper preparationStepMapper, PreparationStepSearchRepository preparationStepSearchRepository) {
        this.preparationStepRepository = preparationStepRepository;
        this.preparationStepMapper = preparationStepMapper;
        this.preparationStepSearchRepository = preparationStepSearchRepository;
    }

    /**
     * Save a preparationStep.
     *
     * @param preparationStepDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PreparationStepDTO save(PreparationStepDTO preparationStepDTO) {
        log.debug("Request to save PreparationStep : {}", preparationStepDTO);
        PreparationStep preparationStep = preparationStepMapper.toEntity(preparationStepDTO);
        preparationStep = preparationStepRepository.save(preparationStep);
        PreparationStepDTO result = preparationStepMapper.toDto(preparationStep);
        preparationStepSearchRepository.save(preparationStep);
        return result;
    }

    /**
     * Get all the preparationSteps.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PreparationStepDTO> findAll() {
        log.debug("Request to get all PreparationSteps");
        return preparationStepRepository.findAll().stream()
            .map(preparationStepMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one preparationStep by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PreparationStepDTO> findOne(Long id) {
        log.debug("Request to get PreparationStep : {}", id);
        return preparationStepRepository.findById(id)
            .map(preparationStepMapper::toDto);
    }

    /**
     * Delete the preparationStep by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PreparationStep : {}", id);
        preparationStepRepository.deleteById(id);
        preparationStepSearchRepository.deleteById(id);
    }

    /**
     * Search for the preparationStep corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PreparationStepDTO> search(String query) {
        log.debug("Request to search PreparationSteps for query {}", query);
        return StreamSupport
            .stream(preparationStepSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(preparationStepMapper::toDto)
            .collect(Collectors.toList());
    }
}
