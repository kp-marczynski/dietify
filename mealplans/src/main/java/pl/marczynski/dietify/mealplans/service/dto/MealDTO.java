package pl.marczynski.dietify.mealplans.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.mealplans.domain.Meal} entity.
 */
public class MealDTO implements Serializable {

    private Long id;

    /**
     * Ordinal number of meal
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Ordinal number of meal", required = true)
    private Integer ordinalNumber;


    private Long mealPlanDayId;

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

    public Long getMealPlanDayId() {
        return mealPlanDayId;
    }

    public void setMealPlanDayId(Long mealPlanDayId) {
        this.mealPlanDayId = mealPlanDayId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MealDTO mealDTO = (MealDTO) o;
        if (mealDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealDTO{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", mealPlanDay=" + getMealPlanDayId() +
            "}";
    }
}
