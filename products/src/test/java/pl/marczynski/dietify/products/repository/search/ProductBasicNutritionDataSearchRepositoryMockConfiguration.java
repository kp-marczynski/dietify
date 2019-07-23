package pl.marczynski.dietify.products.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ProductBasicNutritionDataSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ProductBasicNutritionDataSearchRepositoryMockConfiguration {

    @MockBean
    private ProductBasicNutritionDataSearchRepository mockProductBasicNutritionDataSearchRepository;

}
