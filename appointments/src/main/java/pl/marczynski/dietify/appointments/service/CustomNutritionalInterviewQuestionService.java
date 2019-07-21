package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.service.dto.CustomNutritionalInterviewQuestionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestion}.
 */
public interface CustomNutritionalInterviewQuestionService {

    /**
     * Save a customNutritionalInterviewQuestion.
     *
     * @param customNutritionalInterviewQuestionDTO the entity to save.
     * @return the persisted entity.
     */
    CustomNutritionalInterviewQuestionDTO save(CustomNutritionalInterviewQuestionDTO customNutritionalInterviewQuestionDTO);

    /**
     * Get all the customNutritionalInterviewQuestions.
     *
     * @return the list of entities.
     */
    List<CustomNutritionalInterviewQuestionDTO> findAll();


    /**
     * Get the "id" customNutritionalInterviewQuestion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CustomNutritionalInterviewQuestionDTO> findOne(Long id);

    /**
     * Delete the "id" customNutritionalInterviewQuestion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
