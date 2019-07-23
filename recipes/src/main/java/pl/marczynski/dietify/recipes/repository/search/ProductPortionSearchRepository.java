package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.ProductPortion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ProductPortion} entity.
 */
public interface ProductPortionSearchRepository extends ElasticsearchRepository<ProductPortion, Long> {
}
