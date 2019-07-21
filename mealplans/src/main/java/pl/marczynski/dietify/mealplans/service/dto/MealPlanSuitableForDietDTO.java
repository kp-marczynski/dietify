package pl.marczynski.dietify.mealplans.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet} entity.
 */
public class MealPlanSuitableForDietDTO implements Serializable {

    private Long id;

    /**
     * Id of applicable DietType entity retrieved from products service
     */
    @NotNull
    @ApiModelProperty(value = "Id of applicable DietType entity retrieved from products service", required = true)
    private Long dietTypeId;


    private Long mealPlanId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDietTypeId() {
        return dietTypeId;
    }

    public void setDietTypeId(Long dietTypeId) {
        this.dietTypeId = dietTypeId;
    }

    public Long getMealPlanId() {
        return mealPlanId;
    }

    public void setMealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO = (MealPlanSuitableForDietDTO) o;
        if (mealPlanSuitableForDietDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealPlanSuitableForDietDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealPlanSuitableForDietDTO{" +
            "id=" + getId() +
            ", dietTypeId=" + getDietTypeId() +
            ", mealPlan=" + getMealPlanId() +
            "}";
    }
}
