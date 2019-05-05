package pl.marczynski.dietify.mealplans.domain;

public class MealRecipeCreator {

    public static final Long DEFAULT_RECIPE_ID = 1L;
    public static final Long UPDATED_RECIPE_ID = 2L;

    public static final Integer DEFAULT_AMOUNT = 0;
    public static final Integer UPDATED_AMOUNT = 1;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealRecipe createEntity() {
        return new MealRecipe()
            .recipeId(DEFAULT_RECIPE_ID)
            .amount(DEFAULT_AMOUNT);
    }
}
