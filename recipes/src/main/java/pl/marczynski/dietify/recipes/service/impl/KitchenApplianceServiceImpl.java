package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.KitchenApplianceService;
import pl.marczynski.dietify.recipes.domain.KitchenAppliance;
import pl.marczynski.dietify.recipes.repository.KitchenApplianceRepository;
import pl.marczynski.dietify.recipes.repository.search.KitchenApplianceSearchRepository;
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
 * Service Implementation for managing {@link KitchenAppliance}.
 */
@Service
@Transactional
public class KitchenApplianceServiceImpl implements KitchenApplianceService {

    private final Logger log = LoggerFactory.getLogger(KitchenApplianceServiceImpl.class);

    private final KitchenApplianceRepository kitchenApplianceRepository;

    private final KitchenApplianceSearchRepository kitchenApplianceSearchRepository;

    public KitchenApplianceServiceImpl(KitchenApplianceRepository kitchenApplianceRepository, KitchenApplianceSearchRepository kitchenApplianceSearchRepository) {
        this.kitchenApplianceRepository = kitchenApplianceRepository;
        this.kitchenApplianceSearchRepository = kitchenApplianceSearchRepository;
    }

    /**
     * Save a kitchenAppliance.
     *
     * @param kitchenAppliance the entity to save.
     * @return the persisted entity.
     */
    @Override
    public KitchenAppliance save(KitchenAppliance kitchenAppliance) {
        log.debug("Request to save KitchenAppliance : {}", kitchenAppliance);
        KitchenAppliance result = kitchenApplianceRepository.save(kitchenAppliance);
        kitchenApplianceSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the kitchenAppliances.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<KitchenAppliance> findAll() {
        log.debug("Request to get all KitchenAppliances");
        return kitchenApplianceRepository.findAll();
    }


    /**
     * Get one kitchenAppliance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<KitchenAppliance> findOne(Long id) {
        log.debug("Request to get KitchenAppliance : {}", id);
        return kitchenApplianceRepository.findById(id);
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
    public List<KitchenAppliance> search(String query) {
        log.debug("Request to search KitchenAppliances for query {}", query);
        return StreamSupport
            .stream(kitchenApplianceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
