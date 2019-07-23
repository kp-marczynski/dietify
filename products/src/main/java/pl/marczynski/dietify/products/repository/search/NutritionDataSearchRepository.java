package pl.marczynski.dietify.products.repository.search;

import pl.marczynski.dietify.products.domain.NutritionData;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NutritionData} entity.
 */
public interface NutritionDataSearchRepository extends ElasticsearchRepository<NutritionData, Long> {
}
