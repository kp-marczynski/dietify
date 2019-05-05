package pl.marczynski.dietify.mealplans.domain;

public class MealDefinitionCreator {

    public static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    public static final Integer UPDATED_ORDINAL_NUMBER = 2;

    public static final Long DEFAULT_MEAL_TYPE_ID = 1L;
    public static final Long UPDATED_MEAL_TYPE_ID = 2L;

    public static final String DEFAULT_TIME_OF_MEAL = "99:88";
    public static final String UPDATED_TIME_OF_MEAL = "19:84";

    public static final Integer DEFAULT_PERCENT_OF_ENERGY = 0;
    public static final Integer UPDATED_PERCENT_OF_ENERGY = 1;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealDefinition createEntity() {
        return new MealDefinition()
            .ordinalNumber(DEFAULT_ORDINAL_NUMBER)
            .mealTypeId(DEFAULT_MEAL_TYPE_ID)
            .timeOfMeal(DEFAULT_TIME_OF_MEAL)
            .percentOfEnergy(DEFAULT_PERCENT_OF_ENERGY);
    }
}
