package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.OwnedKitchenApplianceService;
import pl.marczynski.dietify.appointments.domain.OwnedKitchenAppliance;
import pl.marczynski.dietify.appointments.repository.OwnedKitchenApplianceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link OwnedKitchenAppliance}.
 */
@Service
@Transactional
public class OwnedKitchenApplianceServiceImpl implements OwnedKitchenApplianceService {

    private final Logger log = LoggerFactory.getLogger(OwnedKitchenApplianceServiceImpl.class);

    private final OwnedKitchenApplianceRepository ownedKitchenApplianceRepository;

    public OwnedKitchenApplianceServiceImpl(OwnedKitchenApplianceRepository ownedKitchenApplianceRepository) {
        this.ownedKitchenApplianceRepository = ownedKitchenApplianceRepository;
    }

    /**
     * Save a ownedKitchenAppliance.
     *
     * @param ownedKitchenAppliance the entity to save.
     * @return the persisted entity.
     */
    @Override
    public OwnedKitchenAppliance save(OwnedKitchenAppliance ownedKitchenAppliance) {
        log.debug("Request to save OwnedKitchenAppliance : {}", ownedKitchenAppliance);
        return ownedKitchenApplianceRepository.save(ownedKitchenAppliance);
    }

    /**
     * Get all the ownedKitchenAppliances.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<OwnedKitchenAppliance> findAll() {
        log.debug("Request to get all OwnedKitchenAppliances");
        return ownedKitchenApplianceRepository.findAll();
    }


    /**
     * Get one ownedKitchenAppliance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<OwnedKitchenAppliance> findOne(Long id) {
        log.debug("Request to get OwnedKitchenAppliance : {}", id);
        return ownedKitchenApplianceRepository.findById(id);
    }

    /**
     * Delete the ownedKitchenAppliance by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OwnedKitchenAppliance : {}", id);
        ownedKitchenApplianceRepository.deleteById(id);
    }
}
