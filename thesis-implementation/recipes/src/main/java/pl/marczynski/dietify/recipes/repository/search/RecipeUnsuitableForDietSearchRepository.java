package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.RecipeUnsuitableForDiet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RecipeUnsuitableForDiet} entity.
 */
public interface RecipeUnsuitableForDietSearchRepository extends ElasticsearchRepository<RecipeUnsuitableForDiet, Long> {
}
