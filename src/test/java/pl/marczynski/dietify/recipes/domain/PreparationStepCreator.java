package pl.marczynski.dietify.recipes.domain;

public class PreparationStepCreator {


    private static final Integer DEFAULT_ORDINAL_NUMBER = 1;
    private static final Integer UPDATED_ORDINAL_NUMBER = 2;

    private static final String DEFAULT_STEP_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_STEP_DESCRIPTION = "BBBBBBBBBB";

    public static PreparationStep createEntity() {
        return new PreparationStep()
            .ordinalNumber(DEFAULT_ORDINAL_NUMBER)
            .stepDescription(DEFAULT_STEP_DESCRIPTION);
    }
}
