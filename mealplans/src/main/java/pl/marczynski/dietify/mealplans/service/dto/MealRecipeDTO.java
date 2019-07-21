package pl.marczynski.dietify.mealplans.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.mealplans.domain.MealRecipe} entity.
 */
public class MealRecipeDTO implements Serializable {

    private Long id;

    /**
     * Id of Recipe entity retrieved from recipes service
     */
    @NotNull
    @ApiModelProperty(value = "Id of Recipe entity retrieved from recipes service", required = true)
    private Long recipeId;

    /**
     * Amount of recipe in grams
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Amount of recipe in grams", required = true)
    private Integer amount;


    private Long mealId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MealRecipeDTO mealRecipeDTO = (MealRecipeDTO) o;
        if (mealRecipeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealRecipeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealRecipeDTO{" +
            "id=" + getId() +
            ", recipeId=" + getRecipeId() +
            ", amount=" + getAmount() +
            ", meal=" + getMealId() +
            "}";
    }
}
