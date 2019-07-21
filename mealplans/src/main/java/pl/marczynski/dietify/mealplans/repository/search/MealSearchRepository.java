package pl.marczynski.dietify.mealplans.repository.search;

import pl.marczynski.dietify.mealplans.domain.Meal;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Meal} entity.
 */
public interface MealSearchRepository extends ElasticsearchRepository<Meal, Long> {
}
