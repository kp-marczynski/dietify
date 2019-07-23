package pl.marczynski.dietify.recipes.domain;

public class MealTypeCreator {

    private static final String DEFAULT_NAME_POLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_POLISH = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_ENGLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_ENGLISH = "BBBBBBBBBB";

    public static MealType createEntity() {
        return new MealType()
            .namePolish(DEFAULT_NAME_POLISH)
            .nameEnglish(DEFAULT_NAME_ENGLISH);
    }
}
