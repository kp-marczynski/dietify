package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.service.dto.CustomNutritionalInterviewQuestionTemplateDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestionTemplate}.
 */
public interface CustomNutritionalInterviewQuestionTemplateService {

    /**
     * Save a customNutritionalInterviewQuestionTemplate.
     *
     * @param customNutritionalInterviewQuestionTemplateDTO the entity to save.
     * @return the persisted entity.
     */
    CustomNutritionalInterviewQuestionTemplateDTO save(CustomNutritionalInterviewQuestionTemplateDTO customNutritionalInterviewQuestionTemplateDTO);

    /**
     * Get all the customNutritionalInterviewQuestionTemplates.
     *
     * @return the list of entities.
     */
    List<CustomNutritionalInterviewQuestionTemplateDTO> findAll();


    /**
     * Get the "id" customNutritionalInterviewQuestionTemplate.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CustomNutritionalInterviewQuestionTemplateDTO> findOne(Long id);

    /**
     * Delete the "id" customNutritionalInterviewQuestionTemplate.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
