package pl.marczynski.dietify.appointments.repository;

import pl.marczynski.dietify.appointments.domain.AssignedMealPlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AssignedMealPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssignedMealPlanRepository extends JpaRepository<AssignedMealPlan, Long> {

}
