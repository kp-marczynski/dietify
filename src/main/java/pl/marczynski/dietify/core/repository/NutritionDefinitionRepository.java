package pl.marczynski.dietify.core.repository;

import pl.marczynski.dietify.core.domain.NutritionDefinition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NutritionDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutritionDefinitionRepository extends JpaRepository<NutritionDefinition, Long> {

}
