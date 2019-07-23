package pl.marczynski.dietify.products.utils;

import org.springframework.stereotype.Component;
import pl.marczynski.dietify.core.utils.ValidationResult;
import pl.marczynski.dietify.core.utils.Validator;
import pl.marczynski.dietify.products.domain.HouseholdMeasure;
import pl.marczynski.dietify.products.domain.NutritionData;

@Component
public class HouseholdMeasureValidator implements Validator<HouseholdMeasure> {
    @Override
    public ValidationResult validate(HouseholdMeasure householdMeasure) {
        return new ValidationResult()
            .validate(householdMeasure.getGramsWeight() != null, "Grams weight must be specified for household measure")
            .validate(householdMeasure.getDescription() != null, "Description must be specified for household measure")
            .validate(householdMeasure.getGramsWeight() != null && householdMeasure.getGramsWeight() > 0, "Grams weight of household measure can not be less or equal 0");
    }
}
