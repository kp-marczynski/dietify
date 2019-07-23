package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RecipeBasicNutritionData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipeBasicNutritionDataRepository extends JpaRepository<RecipeBasicNutritionData, Long> {

}
