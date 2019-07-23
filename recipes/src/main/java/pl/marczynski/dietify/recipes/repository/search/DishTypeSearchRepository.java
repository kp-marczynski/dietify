package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.DishType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link DishType} entity.
 */
public interface DishTypeSearchRepository extends ElasticsearchRepository<DishType, Long> {
}
