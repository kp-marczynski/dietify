package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.CustomNutritionalInterviewQuestionService;
import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestion;
import pl.marczynski.dietify.appointments.repository.CustomNutritionalInterviewQuestionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CustomNutritionalInterviewQuestion}.
 */
@Service
@Transactional
public class CustomNutritionalInterviewQuestionServiceImpl implements CustomNutritionalInterviewQuestionService {

    private final Logger log = LoggerFactory.getLogger(CustomNutritionalInterviewQuestionServiceImpl.class);

    private final CustomNutritionalInterviewQuestionRepository customNutritionalInterviewQuestionRepository;

    public CustomNutritionalInterviewQuestionServiceImpl(CustomNutritionalInterviewQuestionRepository customNutritionalInterviewQuestionRepository) {
        this.customNutritionalInterviewQuestionRepository = customNutritionalInterviewQuestionRepository;
    }

    /**
     * Save a customNutritionalInterviewQuestion.
     *
     * @param customNutritionalInterviewQuestion the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CustomNutritionalInterviewQuestion save(CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion) {
        log.debug("Request to save CustomNutritionalInterviewQuestion : {}", customNutritionalInterviewQuestion);
        return customNutritionalInterviewQuestionRepository.save(customNutritionalInterviewQuestion);
    }

    /**
     * Get all the customNutritionalInterviewQuestions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomNutritionalInterviewQuestion> findAll() {
        log.debug("Request to get all CustomNutritionalInterviewQuestions");
        return customNutritionalInterviewQuestionRepository.findAll();
    }


    /**
     * Get one customNutritionalInterviewQuestion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustomNutritionalInterviewQuestion> findOne(Long id) {
        log.debug("Request to get CustomNutritionalInterviewQuestion : {}", id);
        return customNutritionalInterviewQuestionRepository.findById(id);
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
