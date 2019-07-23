package pl.marczynski.dietify.mealplans.repository;

import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealPlanDay entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealPlanDayRepository extends JpaRepository<MealPlanDay, Long> {

}
