package pl.marczynski.dietify.products.domain;

public class NutritionDataCreator {
    public static final Double DEFAULT_NUTRITION_VALUE = 0D;
    public static final Double UPDATED_NUTRITION_VALUE = 1D;

    public static NutritionData createNutritionData(NutritionDefinition nutritionDefinition) {
        NutritionData nutritionData = new NutritionData()
            .nutritionValue(DEFAULT_NUTRITION_VALUE);
        nutritionData.setNutritionDefinition(nutritionDefinition);
        return nutritionData;
    }
}
