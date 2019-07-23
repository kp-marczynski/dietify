package pl.marczynski.dietify.recipes.repository.search;

import pl.marczynski.dietify.recipes.domain.PreparationStep;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link PreparationStep} entity.
 */
public interface PreparationStepSearchRepository extends ElasticsearchRepository<PreparationStep, Long> {
}
