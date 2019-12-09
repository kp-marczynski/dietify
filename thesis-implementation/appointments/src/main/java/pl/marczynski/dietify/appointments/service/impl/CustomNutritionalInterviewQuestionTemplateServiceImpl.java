package pl.marczynski.dietify.appointments.service.impl;

import pl.marczynski.dietify.appointments.service.CustomNutritionalInterviewQuestionTemplateService;
import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestionTemplate;
import pl.marczynski.dietify.appointments.repository.CustomNutritionalInterviewQuestionTemplateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CustomNutritionalInterviewQuestionTemplate}.
 */
@Service
@Transactional
public class CustomNutritionalInterviewQuestionTemplateServiceImpl implements CustomNutritionalInterviewQuestionTemplateService {

    private final Logger log = LoggerFactory.getLogger(CustomNutritionalInterviewQuestionTemplateServiceImpl.class);

    private final CustomNutritionalInterviewQuestionTemplateRepository customNutritionalInterviewQuestionTemplateRepository;

    public CustomNutritionalInterviewQuestionTemplateServiceImpl(CustomNutritionalInterviewQuestionTemplateRepository customNutritionalInterviewQuestionTemplateRepository) {
        this.customNutritionalInterviewQuestionTemplateRepository = customNutritionalInterviewQuestionTemplateRepository;
    }

    /**
     * Save a customNutritionalInterviewQuestionTemplate.
     *
     * @param customNutritionalInterviewQuestionTemplate the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CustomNutritionalInterviewQuestionTemplate save(CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate) {
        log.debug("Request to save CustomNutritionalInterviewQuestionTemplate : {}", customNutritionalInterviewQuestionTemplate);
        return customNutritionalInterviewQuestionTemplateRepository.save(customNutritionalInterviewQuestionTemplate);
    }

    /**
     * Get all the customNutritionalInterviewQuestionTemplates.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomNutritionalInterviewQuestionTemplate> findAll() {
        log.debug("Request to get all CustomNutritionalInterviewQuestionTemplates");
        return customNutritionalInterviewQuestionTemplateRepository.findAll();
    }


    /**
     * Get one customNutritionalInterviewQuestionTemplate by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustomNutritionalInterviewQuestionTemplate> findOne(Long id) {
        log.debug("Request to get CustomNutritionalInterviewQuestionTemplate : {}", id);
        return customNutritionalInterviewQuestionTemplateRepository.findById(id);
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
