package pl.marczynski.dietify.mealplans.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Day.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A Day. @author Krzysztof Marczyński")
@Entity
@Table(name = "meal_plan_day")
public class MealPlanDay implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Ordinal number of day
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Ordinal number of day", required = true)
    @Column(name = "ordinal_number", nullable = false)
    private Integer ordinalNumber;

    /**
     * MealPlan to which day is assigned
     */
    @ApiModelProperty(value = "MealPlan to which day is assigned")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("days")
    private MealPlan mealPlan;

    /**
     * Meals in day
     */
    @ApiModelProperty(value = "Meals in day")
    @OneToMany(mappedBy = "day")
    private Set<Meal> meals = new HashSet<>();
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

    public MealPlanDay ordinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
        return this;
    }

    public void setOrdinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    public MealPlan getMealPlan() {
        return mealPlan;
    }

    public MealPlanDay mealPlan(MealPlan mealPlan) {
        this.mealPlan = mealPlan;
        return this;
    }

    public void setMealPlan(MealPlan mealPlan) {
        this.mealPlan = mealPlan;
    }

    public Set<Meal> getMeals() {
        return meals;
    }

    public MealPlanDay meals(Set<Meal> meals) {
        this.meals = meals;
        return this;
    }

    public MealPlanDay addMeals(Meal meal) {
        this.meals.add(meal);
        meal.setDay(this);
        return this;
    }

    public MealPlanDay removeMeals(Meal meal) {
        this.meals.remove(meal);
        meal.setDay(null);
        return this;
    }

    public void setMeals(Set<Meal> meals) {
        this.meals = meals;
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
        MealPlanDay mealPlanDay = (MealPlanDay) o;
        if (mealPlanDay.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealPlanDay.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealPlanDay{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            "}";
    }
}
