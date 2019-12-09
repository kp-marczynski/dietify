package pl.marczynski.dietify.mealplans.repository.search;

import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealPlanDay} entity.
 */
public interface MealPlanDaySearchRepository extends ElasticsearchRepository<MealPlanDay, Long> {
}
