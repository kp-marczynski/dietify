package pl.marczynski.dietify.appointments.service;

import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestion;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CustomNutritionalInterviewQuestion}.
 */
public interface CustomNutritionalInterviewQuestionService {

    /**
     * Save a customNutritionalInterviewQuestion.
     *
     * @param customNutritionalInterviewQuestion the entity to save.
     * @return the persisted entity.
     */
    CustomNutritionalInterviewQuestion save(CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion);

    /**
     * Get all the customNutritionalInterviewQuestions.
     *
     * @return the list of entities.
     */
    List<CustomNutritionalInterviewQuestion> findAll();


    /**
     * Get the "id" customNutritionalInterviewQuestion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CustomNutritionalInterviewQuestion> findOne(Long id);

    /**
     * Delete the "id" customNutritionalInterviewQuestion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
