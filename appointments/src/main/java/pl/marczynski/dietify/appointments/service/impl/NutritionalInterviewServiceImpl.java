package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.NutritionalInterviewService;
import pl.marczynski.dietify.appointments.domain.NutritionalInterview;
import pl.marczynski.dietify.appointments.repository.NutritionalInterviewRepository;
import pl.marczynski.dietify.appointments.service.dto.NutritionalInterviewDTO;
import pl.marczynski.dietify.appointments.service.mapper.NutritionalInterviewMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link NutritionalInterview}.
 */
@Service
@Transactional
public class NutritionalInterviewServiceImpl implements NutritionalInterviewService {

    private final Logger log = LoggerFactory.getLogger(NutritionalInterviewServiceImpl.class);

    private final NutritionalInterviewRepository nutritionalInterviewRepository;

    private final NutritionalInterviewMapper nutritionalInterviewMapper;

    public NutritionalInterviewServiceImpl(NutritionalInterviewRepository nutritionalInterviewRepository, NutritionalInterviewMapper nutritionalInterviewMapper) {
        this.nutritionalInterviewRepository = nutritionalInterviewRepository;
        this.nutritionalInterviewMapper = nutritionalInterviewMapper;
    }

    /**
     * Save a nutritionalInterview.
     *
     * @param nutritionalInterviewDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public NutritionalInterviewDTO save(NutritionalInterviewDTO nutritionalInterviewDTO) {
        log.debug("Request to save NutritionalInterview : {}", nutritionalInterviewDTO);
        NutritionalInterview nutritionalInterview = nutritionalInterviewMapper.toEntity(nutritionalInterviewDTO);
        nutritionalInterview = nutritionalInterviewRepository.save(nutritionalInterview);
        return nutritionalInterviewMapper.toDto(nutritionalInterview);
    }

    /**
     * Get all the nutritionalInterviews.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<NutritionalInterviewDTO> findAll() {
        log.debug("Request to get all NutritionalInterviews");
        return nutritionalInterviewRepository.findAll().stream()
            .map(nutritionalInterviewMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one nutritionalInterview by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NutritionalInterviewDTO> findOne(Long id) {
        log.debug("Request to get NutritionalInterview : {}", id);
        return nutritionalInterviewRepository.findById(id)
            .map(nutritionalInterviewMapper::toDto);
    }

    /**
     * Delete the nutritionalInterview by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NutritionalInterview : {}", id);
        nutritionalInterviewRepository.deleteById(id);
    }
}
