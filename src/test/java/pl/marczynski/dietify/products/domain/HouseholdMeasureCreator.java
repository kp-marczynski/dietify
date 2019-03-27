package pl.marczynski.dietify.products.domain;

public class HouseholdMeasureCreator {

    public static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    public static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    public static final Double DEFAULT_GRAMS_WEIGHT = 0D;
    public static final Double UPDATED_GRAMS_WEIGHT = 1D;

    public static final Boolean DEFAULT_IS_VISIBLE = false;
    public static final Boolean UPDATED_IS_VISIBLE = true;


    public static HouseholdMeasure createHouseHoldMeasure() {
        return new HouseholdMeasure()
            .description(DEFAULT_DESCRIPTION)
            .gramsWeight(DEFAULT_GRAMS_WEIGHT)
            .isVisible(DEFAULT_IS_VISIBLE);
    }
}
