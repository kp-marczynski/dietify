package pl.marczynski.dietify.products.domain;

public class NutritionDefinitionCreator {
    public static final String DEFAULT_TAGNAME = "AAAAAAAAAA";
    public static final String UPDATED_TAGNAME = "BBBBBBBBBB";

    public static final String DEFAULT_DESCRIPTION_POLISH = "AAAAAAAAAA";
    public static final String UPDATED_DESCRIPTION_POLISH = "BBBBBBBBBB";

    public static final String DEFAULT_DESCRIPTION_ENGLISH = "AAAAAAAAAA";
    public static final String UPDATED_DESCRIPTION_ENGLISH = "BBBBBBBBBB";

    public static final String DEFAULT_UNITS = "AAAAAAAAAA";
    public static final String UPDATED_UNITS = "BBBBBBBBBB";

    public static final Integer DEFAULT_DECIMAL_PLACES = 0;
    public static final Integer UPDATED_DECIMAL_PLACES = 1;

    public static NutritionDefinition createEntity() {
        NutritionDefinition nutritionDefinition = new NutritionDefinition()
            .tagname(DEFAULT_TAGNAME)
            .descriptionPolish(DEFAULT_DESCRIPTION_POLISH)
            .descriptionEnglish(DEFAULT_DESCRIPTION_ENGLISH)
            .units(DEFAULT_UNITS)
            .decimalPlaces(DEFAULT_DECIMAL_PLACES);
        return nutritionDefinition;
    }
}
