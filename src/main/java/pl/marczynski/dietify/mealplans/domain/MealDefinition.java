package pl.marczynski.dietify.mealplans.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Meal Definition used for specifying basic properties of each daily meal
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A Meal Definition used for specifying basic properties of each daily meal @author Krzysztof Marczyński")
@Entity
@Table(name = "meal_definition")
public class MealDefinition implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Daily ordinal number of meal
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Daily ordinal number of meal", required = true)
    @Column(name = "ordinal_number", nullable = false)
    private Integer ordinalNumber;

    /**
     * Id of meal type retrieved from recipes service
     */
    @NotNull
    @ApiModelProperty(value = "Id of meal type retrieved from recipes service", required = true)
    @Column(name = "meal_type_id", nullable = false)
    private Long mealTypeId;

    /**
     * Usual time of meal in 24h format: HH:mm
     */
    @NotNull
    @Pattern(regexp = "\\d{2}:\\d{2}")
    @ApiModelProperty(value = "Usual time of meal in 24h format: HH:mm", required = true)
    @Column(name = "time_of_meal", nullable = false)
    private String timeOfMeal;

    /**
     * Part of daily total energy expressed in percent.
     * Sum of all values for one MealPlanProperty must be equal 100.
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Part of daily total energy expressed in percent. Sum of all values for one MealPlanProperty must be equal 100.", required = true)
    @Column(name = "percent_of_energy", nullable = false)
    private Integer percentOfEnergy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdinalNumber() {
        return ordinalNumber;
    }

    public MealDefinition ordinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
        return this;
    }

    public void setOrdinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    public Long getMealTypeId() {
        return mealTypeId;
    }

    public MealDefinition mealTypeId(Long mealTypeId) {
        this.mealTypeId = mealTypeId;
        return this;
    }

    public void setMealTypeId(Long mealTypeId) {
        this.mealTypeId = mealTypeId;
    }

    public String getTimeOfMeal() {
        return timeOfMeal;
    }

    public MealDefinition timeOfMeal(String timeOfMeal) {
        this.timeOfMeal = timeOfMeal;
        return this;
    }

    public void setTimeOfMeal(String timeOfMeal) {
        this.timeOfMeal = timeOfMeal;
    }

    public Integer getPercentOfEnergy() {
        return percentOfEnergy;
    }

    public MealDefinition percentOfEnergy(Integer percentOfEnergy) {
        this.percentOfEnergy = percentOfEnergy;
        return this;
    }

    public void setPercentOfEnergy(Integer percentOfEnergy) {
        this.percentOfEnergy = percentOfEnergy;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MealDefinition mealDefinition = (MealDefinition) o;
        if (mealDefinition.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealDefinition.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealDefinition{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", mealTypeId=" + getMealTypeId() +
            ", timeOfMeal='" + getTimeOfMeal() + "'" +
            ", percentOfEnergy=" + getPercentOfEnergy() +
            "}";
    }
}
