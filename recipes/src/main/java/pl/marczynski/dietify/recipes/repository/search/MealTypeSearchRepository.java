package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.MealType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealType} entity.
 */
public interface MealTypeSearchRepository extends ElasticsearchRepository<MealType, Long> {
}
