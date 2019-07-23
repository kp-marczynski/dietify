package pl.marczynski.dietify.recipes.domain;

public class KitchenApplianceCreator {
    private static final String DEFAULT_NAME_POLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_POLISH = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_ENGLISH = "AAAAAAAAAA";
    private static final String UPDATED_NAME_ENGLISH = "BBBBBBBBBB";

    public static KitchenAppliance createEntity() {
        return new KitchenAppliance()
            .namePolish(DEFAULT_NAME_POLISH)
            .nameEnglish(DEFAULT_NAME_ENGLISH);
    }
}
