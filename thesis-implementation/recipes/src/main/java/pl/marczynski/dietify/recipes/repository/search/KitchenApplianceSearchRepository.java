package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.KitchenAppliance;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link KitchenAppliance} entity.
 */
public interface KitchenApplianceSearchRepository extends ElasticsearchRepository<KitchenAppliance, Long> {
}
