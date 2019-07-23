package pl.marczynski.dietify.products.utils;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import pl.marczynski.dietify.core.utils.ValidationResult;
import pl.marczynski.dietify.products.domain.NutritionData;
import pl.marczynski.dietify.products.domain.NutritionDataCreator;
import pl.marczynski.dietify.products.domain.NutritionDefinitionCreator;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class NutritionDataValidatorTest {

    private NutritionDataValidator nutritionDataValidator = new NutritionDataValidator();

    private NutritionData nutritionData;

    @Before
    public void setup() {
        nutritionData = NutritionDataCreator.createNutritionData(NutritionDefinitionCreator.createEntity());
    }

    @Test
    public void whenNutritionDataDefinitionIsNullThenProductValidationShouldFail() {
        //given
        nutritionData.setNutritionDefinition(null);

        //when
        ValidationResult result = nutritionDataValidator.validate(this.nutritionData);

        //then
        assertThat(result.getValidationProblem()).contains("Nutrition definition must be specified for nutrition data");
    }

    @Test
    public void whenNutritionDataValueIsNullThenProductValidationShouldFail() {
        //given
        nutritionData.setNutritionValue(null);

        //when
        ValidationResult result = nutritionDataValidator.validate(this.nutritionData);

        //then
        assertThat(result.getValidationProblem()).contains("Value must be specified for nutrition data");
    }

    @Test
    public void whenNutritionDataWeightSmallerThan0ThenProductValidationShouldFail() {
        //given
        nutritionData.setNutritionValue(-1.0);

        //when
        ValidationResult result = nutritionDataValidator.validate(this.nutritionData);

        //then
        assertThat(result.getValidationProblem()).contains("Value of nutrition data can not be less than 0");
    }


}
