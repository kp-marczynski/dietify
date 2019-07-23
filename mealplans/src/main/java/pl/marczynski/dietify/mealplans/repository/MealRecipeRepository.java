package pl.marczynski.dietify.mealplans.repository;

import pl.marczynski.dietify.mealplans.domain.MealRecipe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealRecipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealRecipeRepository extends JpaRepository<MealRecipe, Long> {

}
