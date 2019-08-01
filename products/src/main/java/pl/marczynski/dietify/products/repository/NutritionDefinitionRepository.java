package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.NutritionDefinition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;


/**
 * Spring Data  repository for the NutritionDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutritionDefinitionRepository extends JpaRepository<NutritionDefinition, Long> {
    List<NutritionDefinition> findAllByTagNotIn(Set<String> excludedTags);
}
