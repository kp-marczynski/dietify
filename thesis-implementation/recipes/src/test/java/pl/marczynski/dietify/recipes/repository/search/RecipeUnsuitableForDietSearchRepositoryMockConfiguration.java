package pl.marczynski.dietify.recipes.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link RecipeUnsuitableForDietSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class RecipeUnsuitableForDietSearchRepositoryMockConfiguration {

    @MockBean
    private RecipeUnsuitableForDietSearchRepository mockRecipeUnsuitableForDietSearchRepository;

}
