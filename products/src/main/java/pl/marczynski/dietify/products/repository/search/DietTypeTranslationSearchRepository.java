package pl.marczynski.dietify.products.repository.search;

import pl.marczynski.dietify.products.domain.DietTypeTranslation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link DietTypeTranslation} entity.
 */
public interface DietTypeTranslationSearchRepository extends ElasticsearchRepository<DietTypeTranslation, Long> {
}
