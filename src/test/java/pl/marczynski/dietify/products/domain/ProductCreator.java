package pl.marczynski.dietify.products.domain;

import pl.marczynski.dietify.core.domain.Language;
import pl.marczynski.dietify.core.domain.LanguageCreator;

import javax.persistence.EntityManager;

public class ProductCreator {
    public static final String DEFAULT_SOURCE = "AAAAAAAAAA";
    public static final String UPDATED_SOURCE = "BBBBBBBBBB";

    public static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    public static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    public static final Boolean DEFAULT_IS_FINAL = false;
    public static final Boolean UPDATED_IS_FINAL = true;

    public static final Boolean DEFAULT_IS_VERIFIED = false;
    public static final Boolean UPDATED_IS_VERIFIED = true;

    public static final Long FIRST_ID = 1L;
    public static final Long SECOND_ID = 2L;

    public static Product createEntity(EntityManager em) {
        Product product = new Product()
            .source(DEFAULT_SOURCE)
            .description(DEFAULT_DESCRIPTION)
            .isFinal(DEFAULT_IS_FINAL)
            .isVerified(DEFAULT_IS_VERIFIED);
        // Add required entity
        Language language = LanguageCreator.createEntity();
        em.persist(language);
        em.flush();
        product.setLanguage(language);
        return product;
    }

    public static Product createEntity(Language language) {
        Product product = new Product()
            .source(DEFAULT_SOURCE)
            .description(DEFAULT_DESCRIPTION)
            .isFinal(DEFAULT_IS_FINAL)
            .isVerified(DEFAULT_IS_VERIFIED);
        product.setLanguage(language);
        return product;
    }
}
