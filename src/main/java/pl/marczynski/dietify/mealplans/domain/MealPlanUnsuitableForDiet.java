package pl.marczynski.dietify.mealplans.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A tag specifying cases in which MealPlan should not be used,
 * e.g. vegetarian should mean it is bad for vegetarians.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A tag specifying cases in which MealPlan should not be used, e.g. vegetarian should mean it is bad for vegetarians. @author Krzysztof Marczyński")
@Entity
@Table(name = "meal_plan_unsuitable_for_diet")
public class MealPlanUnsuitableForDiet implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Id of applicaple Tag entity retrieved from products service
     */
    @NotNull
    @ApiModelProperty(value = "Id of applicaple Tag entity retrieved from products service", required = true)
    @Column(name = "diet_type_id", nullable = false)
    private Long dietTypeId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDietTypeId() {
        return dietTypeId;
    }

    public MealPlanUnsuitableForDiet dietTypeId(Long dietTypeId) {
        this.dietTypeId = dietTypeId;
        return this;
    }

    public void setDietTypeId(Long dietTypeId) {
        this.dietTypeId = dietTypeId;
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
        MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet = (MealPlanUnsuitableForDiet) o;
        if (mealPlanUnsuitableForDiet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealPlanUnsuitableForDiet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealPlanUnsuitableForDiet{" +
            "id=" + getId() +
            ", dietTypeId=" + getDietTypeId() +
            "}";
    }
}
