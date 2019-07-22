package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestionTemplate;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CustomNutritionalInterviewQuestionTemplate}.
 */
public interface CustomNutritionalInterviewQuestionTemplateService {

    /**
     * Save a customNutritionalInterviewQuestionTemplate.
     *
     * @param customNutritionalInterviewQuestionTemplate the entity to save.
     * @return the persisted entity.
     */
    CustomNutritionalInterviewQuestionTemplate save(CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate);

    /**
     * Get all the customNutritionalInterviewQuestionTemplates.
     *
     * @return the list of entities.
     */
    List<CustomNutritionalInterviewQuestionTemplate> findAll();


    /**
     * Get the "id" customNutritionalInterviewQuestionTemplate.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CustomNutritionalInterviewQuestionTemplate> findOne(Long id);

    /**
     * Delete the "id" customNutritionalInterviewQuestionTemplate.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
