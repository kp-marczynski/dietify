package pl.marczynski.dietify.products.repository.search;

import pl.marczynski.dietify.products.domain.DietType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link DietType} entity.
 */
public interface DietTypeSearchRepository extends ElasticsearchRepository<DietType, Long> {
}
