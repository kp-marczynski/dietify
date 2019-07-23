package pl.marczynski.dietify.mealplans.repository.search;

import pl.marczynski.dietify.mealplans.domain.MealDefinition;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealDefinition} entity.
 */
public interface MealDefinitionSearchRepository extends ElasticsearchRepository<MealDefinition, Long> {
}
