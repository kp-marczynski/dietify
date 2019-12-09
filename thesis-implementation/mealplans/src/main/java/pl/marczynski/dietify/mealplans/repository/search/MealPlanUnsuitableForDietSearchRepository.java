package pl.marczynski.dietify.mealplans.repository.search;

import pl.marczynski.dietify.mealplans.domain.MealPlanUnsuitableForDiet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealPlanUnsuitableForDiet} entity.
 */
public interface MealPlanUnsuitableForDietSearchRepository extends ElasticsearchRepository<MealPlanUnsuitableForDiet, Long> {
}
