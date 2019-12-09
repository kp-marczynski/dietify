package pl.marczynski.dietify.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link UserExtraInfoSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class UserExtraInfoSearchRepositoryMockConfiguration {

    @MockBean
    private UserExtraInfoSearchRepository mockUserExtraInfoSearchRepository;

}
