package pl.marczynski.dietify.products.repository.search;

import pl.marczynski.dietify.products.domain.ProductCategoryTranslation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ProductCategoryTranslation} entity.
 */
public interface ProductCategoryTranslationSearchRepository extends ElasticsearchRepository<ProductCategoryTranslation, Long> {
}
