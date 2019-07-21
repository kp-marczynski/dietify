package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.Recipe;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Recipe} entity.
 */
public interface RecipeSearchRepository extends ElasticsearchRepository<Recipe, Long> {
}
