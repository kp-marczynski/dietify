package pl.marczynski.dietify.mealplans.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A MealPlanSuitableForDiet.
 */
@Entity
@Table(name = "meal_plan_suitable_for_diet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "mealplansuitablefordiet")
public class MealPlanSuitableForDiet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Id of applicable DietType entity retrieved from products service
     */
    @NotNull
    @Column(name = "diet_type_id", nullable = false)
    private Long dietTypeId;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("tagsGoodFors")
    private MealPlan mealPlan;

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

    public void setDietTypeId(Long dietTypeId) {
        this.dietTypeId = dietTypeId;
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
        if (!(o instanceof MealPlanSuitableForDiet)) {
            return false;
        }
        return id != null && id.equals(((MealPlanSuitableForDiet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MealPlanSuitableForDiet{" +
            "id=" + getId() +
            ", dietTypeId=" + getDietTypeId() +
            "}";
    }
}
