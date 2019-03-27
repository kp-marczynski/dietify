package pl.marczynski.dietify.products.domain;

public class DietTypeCreator {
    public static final String DEFAULT_NAME_POLISH = "AAAAAAAAAA";
    public static final String UPDATED_NAME_POLISH = "BBBBBBBBBB";

    public static final String DEFAULT_NAME_ENGLISH = "AAAAAAAAAA";
    public static final String UPDATED_NAME_ENGLISH = "BBBBBBBBBB";

    public static DietType createEntity() {
        return new DietType()
            .namePolish(DEFAULT_NAME_POLISH)
            .nameEnglish(DEFAULT_NAME_ENGLISH);
    }
}
