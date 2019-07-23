package pl.marczynski.dietify.mealplans.repository;

import pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealPlanSuitableForDiet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealPlanSuitableForDietRepository extends JpaRepository<MealPlanSuitableForDiet, Long> {

}
