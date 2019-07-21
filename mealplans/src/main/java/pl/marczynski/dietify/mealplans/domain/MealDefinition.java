package pl.marczynski.dietify.mealplans.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A MealDefinition.
 */
@Entity
@Table(name = "meal_definition")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "mealdefinition")
public class MealDefinition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Daily ordinal number of meal
     */
    @NotNull
    @Min(value = 1)
    @Column(name = "ordinal_number", nullable = false)
    private Integer ordinalNumber;

    /**
     * Id of MealType entity retrieved from recipes service
     */
    @NotNull
    @Column(name = "meal_type_id", nullable = false)
    private Long mealTypeId;

    /**
     * Usual time of meal in 24h format: HH:mm
     */
    @NotNull
    @Pattern(regexp = "\\d{2}:\\d{2}")
    @Column(name = "time_of_meal", nullable = false)
    private String timeOfMeal;

    /**
     * Part of daily total energy expressed in percent. Sum of all values for one MealPlanProperty must be equal 100.
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "percent_of_energy", nullable = false)
    private Integer percentOfEnergy;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("mealDefinitions")
    private MealPlan mealPlan;

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

    public MealPlan getMealPlan() {
        return mealPlan;
    }

    public void setMealPlan(MealPlan mealPlan) {
        this.mealPlan = mealPlan;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MealDefinition)) {
            return false;
        }
        return id != null && id.equals(((MealDefinition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
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
