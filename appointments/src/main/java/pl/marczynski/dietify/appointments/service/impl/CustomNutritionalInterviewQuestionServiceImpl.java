package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.CustomNutritionalInterviewQuestionService;
import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestion;
import pl.marczynski.dietify.appointments.repository.CustomNutritionalInterviewQuestionRepository;
import pl.marczynski.dietify.appointments.service.dto.CustomNutritionalInterviewQuestionDTO;
import pl.marczynski.dietify.appointments.service.mapper.CustomNutritionalInterviewQuestionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link CustomNutritionalInterviewQuestion}.
 */
@Service
@Transactional
public class CustomNutritionalInterviewQuestionServiceImpl implements CustomNutritionalInterviewQuestionService {

    private final Logger log = LoggerFactory.getLogger(CustomNutritionalInterviewQuestionServiceImpl.class);

    private final CustomNutritionalInterviewQuestionRepository customNutritionalInterviewQuestionRepository;

    private final CustomNutritionalInterviewQuestionMapper customNutritionalInterviewQuestionMapper;

    public CustomNutritionalInterviewQuestionServiceImpl(CustomNutritionalInterviewQuestionRepository customNutritionalInterviewQuestionRepository, CustomNutritionalInterviewQuestionMapper customNutritionalInterviewQuestionMapper) {
        this.customNutritionalInterviewQuestionRepository = customNutritionalInterviewQuestionRepository;
        this.customNutritionalInterviewQuestionMapper = customNutritionalInterviewQuestionMapper;
    }

    /**
     * Save a customNutritionalInterviewQuestion.
     *
     * @param customNutritionalInterviewQuestionDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CustomNutritionalInterviewQuestionDTO save(CustomNutritionalInterviewQuestionDTO customNutritionalInterviewQuestionDTO) {
        log.debug("Request to save CustomNutritionalInterviewQuestion : {}", customNutritionalInterviewQuestionDTO);
        CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion = customNutritionalInterviewQuestionMapper.toEntity(customNutritionalInterviewQuestionDTO);
        customNutritionalInterviewQuestion = customNutritionalInterviewQuestionRepository.save(customNutritionalInterviewQuestion);
        return customNutritionalInterviewQuestionMapper.toDto(customNutritionalInterviewQuestion);
    }

    /**
     * Get all the customNutritionalInterviewQuestions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomNutritionalInterviewQuestionDTO> findAll() {
        log.debug("Request to get all CustomNutritionalInterviewQuestions");
        return customNutritionalInterviewQuestionRepository.findAll().stream()
            .map(customNutritionalInterviewQuestionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one customNutritionalInterviewQuestion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustomNutritionalInterviewQuestionDTO> findOne(Long id) {
        log.debug("Request to get CustomNutritionalInterviewQuestion : {}", id);
        return customNutritionalInterviewQuestionRepository.findById(id)
            .map(customNutritionalInterviewQuestionMapper::toDto);
    }

    /**
     * Delete the customNutritionalInterviewQuestion by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomNutritionalInterviewQuestion : {}", id);
        customNutritionalInterviewQuestionRepository.deleteById(id);
    }
}
