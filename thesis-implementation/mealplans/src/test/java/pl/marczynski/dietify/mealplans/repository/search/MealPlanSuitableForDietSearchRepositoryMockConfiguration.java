package pl.marczynski.dietify.mealplans.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link MealPlanSuitableForDietSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class MealPlanSuitableForDietSearchRepositoryMockConfiguration {

    @MockBean
    private MealPlanSuitableForDietSearchRepository mockMealPlanSuitableForDietSearchRepository;

}
