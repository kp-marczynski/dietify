package pl.marczynski.dietify.products.repository.search;

import pl.marczynski.dietify.products.domain.HouseholdMeasure;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link HouseholdMeasure} entity.
 */
public interface HouseholdMeasureSearchRepository extends ElasticsearchRepository<HouseholdMeasure, Long> {
}
