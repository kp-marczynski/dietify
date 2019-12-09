package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.KitchenApplianceTranslation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link KitchenApplianceTranslation} entity.
 */
public interface KitchenApplianceTranslationSearchRepository extends ElasticsearchRepository<KitchenApplianceTranslation, Long> {
}
