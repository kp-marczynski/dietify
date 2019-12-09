package pl.marczynski.dietify.gateway.repository.search;

import pl.marczynski.dietify.gateway.domain.LandingPageCard;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link LandingPageCard} entity.
 */
public interface LandingPageCardSearchRepository extends ElasticsearchRepository<LandingPageCard, Long> {
}
