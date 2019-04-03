package pl.marczynski.dietify.recipes.domain;

public class ProductPortionCreator {

    private static final Double DEFAULT_AMOUNT = 0D;
    private static final Double UPDATED_AMOUNT = 1D;

    private static final Long DEFAULT_PRODUCT_ID = 1L;
    private static final Long UPDATED_PRODUCT_ID = 2L;

    private static final Long DEFAULT_HOUSEHOLD_MEASURE_ID = 1L;
    private static final Long UPDATED_HOUSEHOLD_MEASURE_ID = 2L;

    public static ProductPortion createEntity() {
        return new ProductPortion()
            .amount(DEFAULT_AMOUNT)
            .productId(DEFAULT_PRODUCT_ID)
            .householdMeasureId(DEFAULT_HOUSEHOLD_MEASURE_ID);
    }
}
