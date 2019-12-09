package pl.marczynski.dietify.recipes.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link RecipeBasicNutritionDataSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class RecipeBasicNutritionDataSearchRepositoryMockConfiguration {

    @MockBean
    private RecipeBasicNutritionDataSearchRepository mockRecipeBasicNutritionDataSearchRepository;

}
