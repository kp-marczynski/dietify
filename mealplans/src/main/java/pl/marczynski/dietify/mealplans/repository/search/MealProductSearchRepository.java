package pl.marczynski.dietify.mealplans.repository.search;

import pl.marczynski.dietify.mealplans.domain.MealProduct;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealProduct} entity.
 */
public interface MealProductSearchRepository extends ElasticsearchRepository<MealProduct, Long> {
}
