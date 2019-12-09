package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.RecipeSuitableForDiet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RecipeSuitableForDiet} entity.
 */
public interface RecipeSuitableForDietSearchRepository extends ElasticsearchRepository<RecipeSuitableForDiet, Long> {
}
