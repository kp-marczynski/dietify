package pl.marczynski.dietify.mealplans.repository.search;

import pl.marczynski.dietify.mealplans.domain.MealPlan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealPlan} entity.
 */
public interface MealPlanSearchRepository extends ElasticsearchRepository<MealPlan, Long> {
}
