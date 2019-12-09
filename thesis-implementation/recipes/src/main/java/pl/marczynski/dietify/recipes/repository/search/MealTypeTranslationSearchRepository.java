package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.MealTypeTranslation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealTypeTranslation} entity.
 */
public interface MealTypeTranslationSearchRepository extends ElasticsearchRepository<MealTypeTranslation, Long> {
}
