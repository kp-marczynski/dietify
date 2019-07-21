package pl.marczynski.dietify.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link LandingPageCardSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class LandingPageCardSearchRepositoryMockConfiguration {

    @MockBean
    private LandingPageCardSearchRepository mockLandingPageCardSearchRepository;

}
