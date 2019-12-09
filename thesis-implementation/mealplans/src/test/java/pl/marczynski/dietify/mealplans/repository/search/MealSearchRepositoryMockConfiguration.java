package pl.marczynski.dietify.mealplans.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link MealSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class MealSearchRepositoryMockConfiguration {

    @MockBean
    private MealSearchRepository mockMealSearchRepository;

}
