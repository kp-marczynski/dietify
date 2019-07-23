package pl.marczynski.dietify.products.utils;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import pl.marczynski.dietify.core.utils.ValidationResult;
import pl.marczynski.dietify.products.domain.HouseholdMeasure;
import pl.marczynski.dietify.products.domain.HouseholdMeasureCreator;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class HouseholdMeasureValidatorTest {

    private HouseholdMeasureValidator householdMeasureValidator = new HouseholdMeasureValidator();

    private HouseholdMeasure householdMeasure;

    @Before
    public void setup() {
        householdMeasure = HouseholdMeasureCreator.createHouseHoldMeasure();
    }

    @Test
    public void whenHouseholdMeasureDescriptionIsNullThenProductValidationShouldFail() {
        //given
        householdMeasure.setDescription(null);

        //when
        ValidationResult result = householdMeasureValidator.validate(this.householdMeasure);

        //then
        assertThat(result.getValidationProblem()).contains("Description must be specified for household measure");
    }

    @Test
    public void whenHouseholdMeasureWeightIsNullThenProductValidationShouldFail() {
        //given
        householdMeasure.setGramsWeight(null);

        //when
        ValidationResult result = householdMeasureValidator.validate(this.householdMeasure);

        //then
        assertThat(result.getValidationProblem()).contains("Grams weight must be specified for household measure");
    }

    @Test
    public void whenHouseholdMeasureWeightSmallerThan0ThenProductValidationShouldFail() {
        //given
        householdMeasure.setGramsWeight(-1.0);

        //when
        ValidationResult result = householdMeasureValidator.validate(this.householdMeasure);

        //then
        assertThat(result.getValidationProblem()).contains("Grams weight of household measure can not be less or equal 0");
    }

    @Test
    public void whenHouseholdMeasureWeightEquals0ThenProductValidationShouldFail() {
        //given
        householdMeasure.setGramsWeight(0.0);

        //when
        ValidationResult result = householdMeasureValidator.validate(this.householdMeasure);

        //then
        assertThat(result.getValidationProblem()).contains("Grams weight of household measure can not be less or equal 0");
    }
}
