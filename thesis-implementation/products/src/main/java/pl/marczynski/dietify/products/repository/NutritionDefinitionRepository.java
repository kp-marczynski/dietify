package pl.marczynski.dietify.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.marczynski.dietify.products.domain.NutritionDefinition;

import java.util.List;
import java.util.Set;


/**
 * Spring Data  repository for the NutritionDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutritionDefinitionRepository extends JpaRepository<NutritionDefinition, Long> {
    List<NutritionDefinition> findAllByTagNotIn(Set<String> excludedTags);

    List<NutritionDefinition> findAllByTagIn(Set<String> includedTags);
}
