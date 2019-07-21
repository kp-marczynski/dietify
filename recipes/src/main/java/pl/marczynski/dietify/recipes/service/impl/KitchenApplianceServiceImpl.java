package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.KitchenApplianceService;
import pl.marczynski.dietify.recipes.domain.KitchenAppliance;
import pl.marczynski.dietify.recipes.repository.KitchenApplianceRepository;
import pl.marczynski.dietify.recipes.repository.search.KitchenApplianceSearchRepository;
import pl.marczynski.dietify.recipes.service.dto.KitchenApplianceDTO;
import pl.marczynski.dietify.recipes.service.mapper.KitchenApplianceMapper;
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
 * Service Implementation for managing {@link KitchenAppliance}.
 */
@Service
@Transactional
public class KitchenApplianceServiceImpl implements KitchenApplianceService {

    private final Logger log = LoggerFactory.getLogger(KitchenApplianceServiceImpl.class);

    private final KitchenApplianceRepository kitchenApplianceRepository;

    private final KitchenApplianceMapper kitchenApplianceMapper;

    private final KitchenApplianceSearchRepository kitchenApplianceSearchRepository;

    public KitchenApplianceServiceImpl(KitchenApplianceRepository kitchenApplianceRepository, KitchenApplianceMapper kitchenApplianceMapper, KitchenApplianceSearchRepository kitchenApplianceSearchRepository) {
        this.kitchenApplianceRepository = kitchenApplianceRepository;
        this.kitchenApplianceMapper = kitchenApplianceMapper;
        this.kitchenApplianceSearchRepository = kitchenApplianceSearchRepository;
    }

    /**
     * Save a kitchenAppliance.
     *
     * @param kitchenApplianceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public KitchenApplianceDTO save(KitchenApplianceDTO kitchenApplianceDTO) {
        log.debug("Request to save KitchenAppliance : {}", kitchenApplianceDTO);
        KitchenAppliance kitchenAppliance = kitchenApplianceMapper.toEntity(kitchenApplianceDTO);
        kitchenAppliance = kitchenApplianceRepository.save(kitchenAppliance);
        KitchenApplianceDTO result = kitchenApplianceMapper.toDto(kitchenAppliance);
        kitchenApplianceSearchRepository.save(kitchenAppliance);
        return result;
    }

    /**
     * Get all the kitchenAppliances.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<KitchenApplianceDTO> findAll() {
        log.debug("Request to get all KitchenAppliances");
        return kitchenApplianceRepository.findAll().stream()
            .map(kitchenApplianceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one kitchenAppliance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<KitchenApplianceDTO> findOne(Long id) {
        log.debug("Request to get KitchenAppliance : {}", id);
        return kitchenApplianceRepository.findById(id)
            .map(kitchenApplianceMapper::toDto);
    }

    /**
     * Delete the kitchenAppliance by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete KitchenAppliance : {}", id);
        kitchenApplianceRepository.deleteById(id);
        kitchenApplianceSearchRepository.deleteById(id);
    }

    /**
     * Search for the kitchenAppliance corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<KitchenApplianceDTO> search(String query) {
        log.debug("Request to search KitchenAppliances for query {}", query);
        return StreamSupport
            .stream(kitchenApplianceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(kitchenApplianceMapper::toDto)
            .collect(Collectors.toList());
    }
}
