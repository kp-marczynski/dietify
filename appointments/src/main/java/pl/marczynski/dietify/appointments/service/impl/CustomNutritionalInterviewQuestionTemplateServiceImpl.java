package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.CustomNutritionalInterviewQuestionTemplateService;
import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestionTemplate;
import pl.marczynski.dietify.appointments.repository.CustomNutritionalInterviewQuestionTemplateRepository;
import pl.marczynski.dietify.appointments.service.dto.CustomNutritionalInterviewQuestionTemplateDTO;
import pl.marczynski.dietify.appointments.service.mapper.CustomNutritionalInterviewQuestionTemplateMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link CustomNutritionalInterviewQuestionTemplate}.
 */
@Service
@Transactional
public class CustomNutritionalInterviewQuestionTemplateServiceImpl implements CustomNutritionalInterviewQuestionTemplateService {

    private final Logger log = LoggerFactory.getLogger(CustomNutritionalInterviewQuestionTemplateServiceImpl.class);

    private final CustomNutritionalInterviewQuestionTemplateRepository customNutritionalInterviewQuestionTemplateRepository;

    private final CustomNutritionalInterviewQuestionTemplateMapper customNutritionalInterviewQuestionTemplateMapper;

    public CustomNutritionalInterviewQuestionTemplateServiceImpl(CustomNutritionalInterviewQuestionTemplateRepository customNutritionalInterviewQuestionTemplateRepository, CustomNutritionalInterviewQuestionTemplateMapper customNutritionalInterviewQuestionTemplateMapper) {
        this.customNutritionalInterviewQuestionTemplateRepository = customNutritionalInterviewQuestionTemplateRepository;
        this.customNutritionalInterviewQuestionTemplateMapper = customNutritionalInterviewQuestionTemplateMapper;
    }

    /**
     * Save a customNutritionalInterviewQuestionTemplate.
     *
     * @param customNutritionalInterviewQuestionTemplateDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CustomNutritionalInterviewQuestionTemplateDTO save(CustomNutritionalInterviewQuestionTemplateDTO customNutritionalInterviewQuestionTemplateDTO) {
        log.debug("Request to save CustomNutritionalInterviewQuestionTemplate : {}", customNutritionalInterviewQuestionTemplateDTO);
        CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate = customNutritionalInterviewQuestionTemplateMapper.toEntity(customNutritionalInterviewQuestionTemplateDTO);
        customNutritionalInterviewQuestionTemplate = customNutritionalInterviewQuestionTemplateRepository.save(customNutritionalInterviewQuestionTemplate);
        return customNutritionalInterviewQuestionTemplateMapper.toDto(customNutritionalInterviewQuestionTemplate);
    }

    /**
     * Get all the customNutritionalInterviewQuestionTemplates.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomNutritionalInterviewQuestionTemplateDTO> findAll() {
        log.debug("Request to get all CustomNutritionalInterviewQuestionTemplates");
        return customNutritionalInterviewQuestionTemplateRepository.findAll().stream()
            .map(customNutritionalInterviewQuestionTemplateMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one customNutritionalInterviewQuestionTemplate by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustomNutritionalInterviewQuestionTemplateDTO> findOne(Long id) {
        log.debug("Request to get CustomNutritionalInterviewQuestionTemplate : {}", id);
        return customNutritionalInterviewQuestionTemplateRepository.findById(id)
            .map(customNutritionalInterviewQuestionTemplateMapper::toDto);
    }

    /**
     * Delete the customNutritionalInterviewQuestionTemplate by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomNutritionalInterviewQuestionTemplate : {}", id);
        customNutritionalInterviewQuestionTemplateRepository.deleteById(id);
    }
}
