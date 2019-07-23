package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RecipeBasicNutritionData} entity.
 */
public interface RecipeBasicNutritionDataSearchRepository extends ElasticsearchRepository<RecipeBasicNutritionData, Long> {
}
