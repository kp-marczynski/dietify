package pl.marczynski.dietify.products.utils;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import pl.marczynski.dietify.core.domain.Language;
import pl.marczynski.dietify.core.domain.LanguageCreator;
import pl.marczynski.dietify.core.utils.ValidationResult;
import pl.marczynski.dietify.products.domain.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ProductValidatorTest {

    @Mock
    private NutritionDataValidator nutritionDataValidator;
    @Mock
    private HouseholdMeasureValidator householdMeasureValidator;
    @InjectMocks
    private ProductValidator productValidator;

    private Product product;

    @Before
    public void setup() {
        Language language = LanguageCreator.createEntity();
        ProductCategory productCategory = ProductCategoryCreator.createEntity();
        ProductSubcategory productSubcategory = ProductSubcategoryCreator.createEntity(productCategory);
        product = ProductCreator.createEntity(language, productSubcategory);

        when(nutritionDataValidator.validate(any())).thenReturn(new ValidationResult());
    }

    @Test
    public void whenLanguageIsNullThenProductValidationShouldFail() {
        //given
        this.product.setLanguage(null);

        //when
        ValidationResult result = productValidator.validate(this.product);

        //then
        assertThat(result.getValidationProblem()).contains("Product language must be specified");
    }

    @Test
    public void whenDescriptionIsNullThenProductValidationShouldFail() {
        //given
        this.product.setDescription(null);

        //when
        ValidationResult result = productValidator.validate(this.product);

        //then
        assertThat(result.getValidationProblem()).contains("Product description must be specified");
    }

    @Test
    public void whenSubcategoryIsNullThenProductValidationShouldFail() {
        //given
        this.product.setSubcategory(null);

        //when
        ValidationResult result = productValidator.validate(this.product);

        //then
        assertThat(result.getValidationProblem()).contains("Product subcategory must be specified");
    }
}
