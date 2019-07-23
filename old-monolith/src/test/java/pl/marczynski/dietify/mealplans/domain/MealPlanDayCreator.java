package pl.marczynski.dietify.mealplans.domain;

public class MealPlanDayCreator {

    public static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    public static final Integer UPDATED_ORDINAL_NUMBER = 2;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealPlanDay createEntity(Meal meal) {
        MealPlanDay mealPlanDay = new MealPlanDay()
            .ordinalNumber(DEFAULT_ORDINAL_NUMBER);

        // Add required entity
        mealPlanDay.getMeals().add(meal);
        return mealPlanDay;
    }

    public static MealPlanDay createEntity() {
        return createEntity(MealCreator.createEntity());
    }
}
