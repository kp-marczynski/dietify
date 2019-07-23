package pl.marczynski.dietify.mealplans.repository;

import pl.marczynski.dietify.mealplans.domain.MealPlanUnsuitableForDiet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealPlanUnsuitableForDiet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealPlanUnsuitableForDietRepository extends JpaRepository<MealPlanUnsuitableForDiet, Long> {

}
