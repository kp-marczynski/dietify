package pl.marczynski.dietify.mealplans.repository.search;

import pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealPlanSuitableForDiet} entity.
 */
public interface MealPlanSuitableForDietSearchRepository extends ElasticsearchRepository<MealPlanSuitableForDiet, Long> {
}
