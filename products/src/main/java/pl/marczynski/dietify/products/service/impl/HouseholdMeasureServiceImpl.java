package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.HouseholdMeasureService;
import pl.marczynski.dietify.products.domain.HouseholdMeasure;
import pl.marczynski.dietify.products.repository.HouseholdMeasureRepository;
import pl.marczynski.dietify.products.repository.search.HouseholdMeasureSearchRepository;
import pl.marczynski.dietify.products.service.dto.HouseholdMeasureDTO;
import pl.marczynski.dietify.products.service.mapper.HouseholdMeasureMapper;
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
 * Service Implementation for managing {@link HouseholdMeasure}.
 */
@Service
@Transactional
public class HouseholdMeasureServiceImpl implements HouseholdMeasureService {

    private final Logger log = LoggerFactory.getLogger(HouseholdMeasureServiceImpl.class);

    private final HouseholdMeasureRepository householdMeasureRepository;

    private final HouseholdMeasureMapper householdMeasureMapper;

    private final HouseholdMeasureSearchRepository householdMeasureSearchRepository;

    public HouseholdMeasureServiceImpl(HouseholdMeasureRepository householdMeasureRepository, HouseholdMeasureMapper householdMeasureMapper, HouseholdMeasureSearchRepository householdMeasureSearchRepository) {
        this.householdMeasureRepository = householdMeasureRepository;
        this.householdMeasureMapper = householdMeasureMapper;
        this.householdMeasureSearchRepository = householdMeasureSearchRepository;
    }

    /**
     * Save a householdMeasure.
     *
     * @param householdMeasureDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public HouseholdMeasureDTO save(HouseholdMeasureDTO householdMeasureDTO) {
        log.debug("Request to save HouseholdMeasure : {}", householdMeasureDTO);
        HouseholdMeasure householdMeasure = householdMeasureMapper.toEntity(householdMeasureDTO);
        householdMeasure = householdMeasureRepository.save(householdMeasure);
        HouseholdMeasureDTO result = householdMeasureMapper.toDto(householdMeasure);
        householdMeasureSearchRepository.save(householdMeasure);
        return result;
    }

    /**
     * Get all the householdMeasures.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<HouseholdMeasureDTO> findAll() {
        log.debug("Request to get all HouseholdMeasures");
        return householdMeasureRepository.findAll().stream()
            .map(householdMeasureMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one householdMeasure by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HouseholdMeasureDTO> findOne(Long id) {
        log.debug("Request to get HouseholdMeasure : {}", id);
        return householdMeasureRepository.findById(id)
            .map(householdMeasureMapper::toDto);
    }

    /**
     * Delete the householdMeasure by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HouseholdMeasure : {}", id);
        householdMeasureRepository.deleteById(id);
        householdMeasureSearchRepository.deleteById(id);
    }

    /**
     * Search for the householdMeasure corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<HouseholdMeasureDTO> search(String query) {
        log.debug("Request to search HouseholdMeasures for query {}", query);
        return StreamSupport
            .stream(householdMeasureSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(householdMeasureMapper::toDto)
            .collect(Collectors.toList());
    }
}
