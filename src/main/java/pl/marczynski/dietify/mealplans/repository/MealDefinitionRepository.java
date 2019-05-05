package pl.marczynski.dietify.mealplans.repository;

import pl.marczynski.dietify.mealplans.domain.MealDefinition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealDefinitionRepository extends JpaRepository<MealDefinition, Long> {

}
