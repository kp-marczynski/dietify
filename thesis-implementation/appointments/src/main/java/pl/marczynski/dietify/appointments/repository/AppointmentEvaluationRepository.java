package pl.marczynski.dietify.appointments.repository;

import pl.marczynski.dietify.appointments.domain.AppointmentEvaluation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AppointmentEvaluation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppointmentEvaluationRepository extends JpaRepository<AppointmentEvaluation, Long> {

}
