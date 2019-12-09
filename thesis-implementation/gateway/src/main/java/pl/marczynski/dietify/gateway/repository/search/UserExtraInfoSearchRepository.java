package pl.marczynski.dietify.gateway.repository.search;

import pl.marczynski.dietify.gateway.domain.UserExtraInfo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link UserExtraInfo} entity.
 */
public interface UserExtraInfoSearchRepository extends ElasticsearchRepository<UserExtraInfo, Long> {
}
