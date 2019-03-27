package pl.marczynski.dietify.products.utils;

import org.springframework.stereotype.Component;
import pl.marczynski.dietify.core.utils.ValidationResult;
import pl.marczynski.dietify.core.utils.Validator;
import pl.marczynski.dietify.products.domain.NutritionData;

@Component
public class NutritionDataValidator implements Validator<NutritionData> {
    @Override
    public ValidationResult validate(NutritionData nutritionData) {
        return new ValidationResult()
            .validate(nutritionData.getNutritionDefinition() != null, "Nutrition definition must be specified for nutrition data")
            .validate(nutritionData.getNutritionValue() != null, "Value must be specified for nutrition data")
            .validate(nutritionData.getNutritionValue() != null && nutritionData.getNutritionValue() >= 0, "Value of nutrition data can not be less than 0");
    }
}
