package pl.marczynski.dietify.mealplans.domain;

public class MealProductCreator {

    public static final Long DEFAULT_PRODUCT_ID = 1L;
    public static final Long UPDATED_PRODUCT_ID = 2L;

    public static final Long DEFAULT_HOUSEHOLD_MEASURE_ID = 1L;
    public static final Long UPDATED_HOUSEHOLD_MEASURE_ID = 2L;

    public static final Double DEFAULT_AMOUNT = 0D;
    public static final Double UPDATED_AMOUNT = 1D;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealProduct createEntity() {
        return new MealProduct()
            .productId(DEFAULT_PRODUCT_ID)
            .householdMeasureId(DEFAULT_HOUSEHOLD_MEASURE_ID)
            .amount(DEFAULT_AMOUNT);
    }
}
