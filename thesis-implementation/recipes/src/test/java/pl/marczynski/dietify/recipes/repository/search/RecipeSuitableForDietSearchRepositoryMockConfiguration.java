package pl.marczynski.dietify.recipes.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link RecipeSuitableForDietSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class RecipeSuitableForDietSearchRepositoryMockConfiguration {

    @MockBean
    private RecipeSuitableForDietSearchRepository mockRecipeSuitableForDietSearchRepository;

}
