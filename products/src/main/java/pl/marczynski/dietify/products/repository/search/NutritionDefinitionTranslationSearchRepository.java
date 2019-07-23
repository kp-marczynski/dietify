package pl.marczynski.dietify.products.repository.search;

import pl.marczynski.dietify.products.domain.NutritionDefinitionTranslation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NutritionDefinitionTranslation} entity.
 */
public interface NutritionDefinitionTranslationSearchRepository extends ElasticsearchRepository<NutritionDefinitionTranslation, Long> {
}
