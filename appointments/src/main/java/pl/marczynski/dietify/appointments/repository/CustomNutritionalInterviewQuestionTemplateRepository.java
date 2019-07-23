package pl.marczynski.dietify.appointments.repository;

import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestionTemplate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomNutritionalInterviewQuestionTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomNutritionalInterviewQuestionTemplateRepository extends JpaRepository<CustomNutritionalInterviewQuestionTemplate, Long> {

}
