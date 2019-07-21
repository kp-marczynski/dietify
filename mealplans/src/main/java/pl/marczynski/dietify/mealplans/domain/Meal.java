package pl.marczynski.dietify.mealplans.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Meal.
 */
@Entity
@Table(name = "meal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "meal")
public class Meal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Ordinal number of meal
     */
    @NotNull
    @Min(value = 1)
    @Column(name = "ordinal_number", nullable = false)
    private Integer ordinalNumber;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("meals")
    private MealPlanDay mealPlanDay;

    @OneToMany(mappedBy = "meal")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealRecipe> mealRecipes = new HashSet<>();

    @OneToMany(mappedBy = "meal")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealProduct> mealProducts = new HashSet<>();

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

    public MealPlanDay getMealPlanDay() {
        return mealPlanDay;
    }

    public void setMealPlanDay(MealPlanDay mealPlanDay) {
        this.mealPlanDay = mealPlanDay;
    }

    public Set<MealRecipe> getMealRecipes() {
        return mealRecipes;
    }

    public void setMealRecipes(Set<MealRecipe> mealRecipes) {
        this.mealRecipes = mealRecipes;
    }

    public Set<MealProduct> getMealProducts() {
        return mealProducts;
    }

    public void setMealProducts(Set<MealProduct> mealProducts) {
        this.mealProducts = mealProducts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Meal)) {
            return false;
        }
        return id != null && id.equals(((Meal) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Meal{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            "}";
    }
}
