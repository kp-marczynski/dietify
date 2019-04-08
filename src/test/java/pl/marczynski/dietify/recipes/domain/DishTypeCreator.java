package pl.marczynski.dietify.recipes.domain;

public class DishTypeCreator {
    private static final String DEFAULT_DESCRIPTION_POLISH = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_POLISH = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_ENGLISH = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_ENGLISH = "BBBBBBBBBB";

    public static DishType createEntity() {
        return new DishType()
            .descriptionPolish(DEFAULT_DESCRIPTION_POLISH)
            .descriptionEnglish(DEFAULT_DESCRIPTION_ENGLISH);
    }
}
