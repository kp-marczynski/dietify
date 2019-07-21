package pl.marczynski.dietify.appointments.repository;

import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomNutritionalInterviewQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomNutritionalInterviewQuestionRepository extends JpaRepository<CustomNutritionalInterviewQuestion, Long> {

}
