package pl.marczynski.dietify.products.repository.search;

import pl.marczynski.dietify.products.domain.NutritionDefinition;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NutritionDefinition} entity.
 */
public interface NutritionDefinitionSearchRepository extends ElasticsearchRepository<NutritionDefinition, Long> {
}
