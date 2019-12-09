package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.DishTypeTranslation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link DishTypeTranslation} entity.
 */
public interface DishTypeTranslationSearchRepository extends ElasticsearchRepository<DishTypeTranslation, Long> {
}
