package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.RecipeSection;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RecipeSection} entity.
 */
public interface RecipeSectionSearchRepository extends ElasticsearchRepository<RecipeSection, Long> {
}
