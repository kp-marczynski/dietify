package pl.marczynski.dietify.mealplans.repository.search;

import pl.marczynski.dietify.mealplans.domain.MealRecipe;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealRecipe} entity.
 */
public interface MealRecipeSearchRepository extends ElasticsearchRepository<MealRecipe, Long> {
}
