package pl.marczynski.dietify.products.repository.search;

import pl.marczynski.dietify.products.domain.ProductBasicNutritionData;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ProductBasicNutritionData} entity.
 */
public interface ProductBasicNutritionDataSearchRepository extends ElasticsearchRepository<ProductBasicNutritionData, Long> {
}
