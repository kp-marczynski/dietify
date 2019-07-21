package pl.marczynski.dietify.mealplans.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.mealplans.domain.MealDefinition} entity.
 */
public class MealDefinitionDTO implements Serializable {

    private Long id;

    /**
     * Daily ordinal number of meal
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Daily ordinal number of meal", required = true)
    private Integer ordinalNumber;

    /**
     * Id of MealType entity retrieved from recipes service
     */
    @NotNull
    @ApiModelProperty(value = "Id of MealType entity retrieved from recipes service", required = true)
    private Long mealTypeId;

    /**
     * Usual time of meal in 24h format: HH:mm
     */
    @NotNull
    @Pattern(regexp = "\\d{2}:\\d{2}")
    @ApiModelProperty(value = "Usual time of meal in 24h format: HH:mm", required = true)
    private String timeOfMeal;

    /**
     * Part of daily total energy expressed in percent. Sum of all values for one MealPlanProperty must be equal 100.
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Part of daily total energy expressed in percent. Sum of all values for one MealPlanProperty must be equal 100.", required = true)
    private Integer percentOfEnergy;


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

    public Long getMealTypeId() {
        return mealTypeId;
    }

    public void setMealTypeId(Long mealTypeId) {
        this.mealTypeId = mealTypeId;
    }

    public String getTimeOfMeal() {
        return timeOfMeal;
    }

    public void setTimeOfMeal(String timeOfMeal) {
        this.timeOfMeal = timeOfMeal;
    }

    public Integer getPercentOfEnergy() {
        return percentOfEnergy;
    }

    public void setPercentOfEnergy(Integer percentOfEnergy) {
        this.percentOfEnergy = percentOfEnergy;
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

        MealDefinitionDTO mealDefinitionDTO = (MealDefinitionDTO) o;
        if (mealDefinitionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealDefinitionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealDefinitionDTO{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", mealTypeId=" + getMealTypeId() +
            ", timeOfMeal='" + getTimeOfMeal() + "'" +
            ", percentOfEnergy=" + getPercentOfEnergy() +
            ", mealPlan=" + getMealPlanId() +
            "}";
    }
}
