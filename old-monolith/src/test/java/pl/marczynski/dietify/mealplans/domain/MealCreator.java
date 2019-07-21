package pl.marczynski.dietify.mealplans.domain;

import java.util.Collections;

public class MealCreator {

    public static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    public static final Integer UPDATED_ORDINAL_NUMBER = 2;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Meal createEntity(MealProduct mealProduct, MealRecipe mealRecipe) {
        Meal meal = new Meal()
            .ordinalNumber(DEFAULT_ORDINAL_NUMBER);
        meal.getMealProducts().add(mealProduct);
        meal.getMealRecipes().add(mealRecipe);
        return meal;
    }

    public static Meal createEntity() {
        return createEntity(MealProductCreator.createEntity(), MealRecipeCreator.createEntity());
    }
}
