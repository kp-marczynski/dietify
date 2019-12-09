package pl.marczynski.dietify.products.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link NutritionDefinitionSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class NutritionDefinitionSearchRepositoryMockConfiguration {

    @MockBean
    private NutritionDefinitionSearchRepository mockNutritionDefinitionSearchRepository;

}
