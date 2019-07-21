package pl.marczynski.dietify.mealplans.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link MealPlanSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class MealPlanSearchRepositoryMockConfiguration {

    @MockBean
    private MealPlanSearchRepository mockMealPlanSearchRepository;

}
