package pl.marczynski.dietify.products.utils;

import org.springframework.stereotype.Component;
import pl.marczynski.dietify.core.utils.ValidationResult;
import pl.marczynski.dietify.core.utils.Validator;
import pl.marczynski.dietify.products.domain.HouseholdMeasure;
import pl.marczynski.dietify.products.domain.NutritionData;
import pl.marczynski.dietify.products.domain.Product;

import java.util.Set;

@Component
public class ProductValidator implements Validator<Product> {
    private final NutritionDataValidator nutritionDataValidator;
    private final HouseholdMeasureValidator householdMeasureValidator;

    public ProductValidator(NutritionDataValidator nutritionDataValidator, HouseholdMeasureValidator householdMeasureValidator) {
        this.nutritionDataValidator = nutritionDataValidator;
        this.householdMeasureValidator = householdMeasureValidator;
    }

    @Override
    public ValidationResult validate(Product product) {
        return new ValidationResult()
            .validate(product.getLanguage() != null, "Product language must be specified")
            .validate(product.getDescription() != null, "Product description must be specified")
            .validate(product.getSubcategory() != null, "Product subcategory must be specified")
            .addValidationResult(validateNutritionsData(product.getNutritionData()))
            .addValidationResult(validateHouseholdMeasures(product.getHouseholdMeasures()));
    }

    private ValidationResult validateNutritionsData(Set<NutritionData> nutritionsData) {
        return nutritionsData.stream().map(nutritionDataValidator::validate).reduce(ValidationResult::addValidationResult).orElse(new ValidationResult());
    }

    private ValidationResult validateHouseholdMeasures(Set<HouseholdMeasure> householdMeasures) {
        return householdMeasures.stream().map(householdMeasureValidator::validate).reduce(ValidationResult::addValidationResult).orElse(new ValidationResult());
    }
}
