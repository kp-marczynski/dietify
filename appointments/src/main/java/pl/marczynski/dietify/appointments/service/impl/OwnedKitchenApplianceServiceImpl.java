package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.OwnedKitchenApplianceService;
import pl.marczynski.dietify.appointments.domain.OwnedKitchenAppliance;
import pl.marczynski.dietify.appointments.repository.OwnedKitchenApplianceRepository;
import pl.marczynski.dietify.appointments.service.dto.OwnedKitchenApplianceDTO;
import pl.marczynski.dietify.appointments.service.mapper.OwnedKitchenApplianceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link OwnedKitchenAppliance}.
 */
@Service
@Transactional
public class OwnedKitchenApplianceServiceImpl implements OwnedKitchenApplianceService {

    private final Logger log = LoggerFactory.getLogger(OwnedKitchenApplianceServiceImpl.class);

    private final OwnedKitchenApplianceRepository ownedKitchenApplianceRepository;

    private final OwnedKitchenApplianceMapper ownedKitchenApplianceMapper;

    public OwnedKitchenApplianceServiceImpl(OwnedKitchenApplianceRepository ownedKitchenApplianceRepository, OwnedKitchenApplianceMapper ownedKitchenApplianceMapper) {
        this.ownedKitchenApplianceRepository = ownedKitchenApplianceRepository;
        this.ownedKitchenApplianceMapper = ownedKitchenApplianceMapper;
    }

    /**
     * Save a ownedKitchenAppliance.
     *
     * @param ownedKitchenApplianceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public OwnedKitchenApplianceDTO save(OwnedKitchenApplianceDTO ownedKitchenApplianceDTO) {
        log.debug("Request to save OwnedKitchenAppliance : {}", ownedKitchenApplianceDTO);
        OwnedKitchenAppliance ownedKitchenAppliance = ownedKitchenApplianceMapper.toEntity(ownedKitchenApplianceDTO);
        ownedKitchenAppliance = ownedKitchenApplianceRepository.save(ownedKitchenAppliance);
        return ownedKitchenApplianceMapper.toDto(ownedKitchenAppliance);
    }

    /**
     * Get all the ownedKitchenAppliances.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<OwnedKitchenApplianceDTO> findAll() {
        log.debug("Request to get all OwnedKitchenAppliances");
        return ownedKitchenApplianceRepository.findAll().stream()
            .map(ownedKitchenApplianceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one ownedKitchenAppliance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<OwnedKitchenApplianceDTO> findOne(Long id) {
        log.debug("Request to get OwnedKitchenAppliance : {}", id);
        return ownedKitchenApplianceRepository.findById(id)
            .map(ownedKitchenApplianceMapper::toDto);
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
