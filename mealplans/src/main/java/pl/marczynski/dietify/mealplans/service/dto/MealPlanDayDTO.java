package pl.marczynski.dietify.mealplans.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.mealplans.domain.MealPlanDay} entity.
 */
public class MealPlanDayDTO implements Serializable {

    private Long id;

    /**
     * Ordinal number of day
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Ordinal number of day", required = true)
    private Integer ordinalNumber;


    private Long mealPlanId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
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

        MealPlanDayDTO mealPlanDayDTO = (MealPlanDayDTO) o;
        if (mealPlanDayDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealPlanDayDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealPlanDayDTO{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", mealPlan=" + getMealPlanId() +
            "}";
    }
}
