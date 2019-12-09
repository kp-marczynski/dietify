package pl.marczynski.dietify.products.repository.search;

import pl.marczynski.dietify.products.domain.ProductSubcategory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ProductSubcategory} entity.
 */
public interface ProductSubcategorySearchRepository extends ElasticsearchRepository<ProductSubcategory, Long> {
}
