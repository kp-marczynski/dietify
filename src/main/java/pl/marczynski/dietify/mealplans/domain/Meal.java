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
 * A Meal.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A Meal. @author Krzysztof Marczyński")
@Entity
@Table(name = "meal")
public class Meal implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Ordinal number of meal
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Ordinal number of meal", required = true)
    @Column(name = "ordinal_number", nullable = false)
    private Integer ordinalNumber;

    /**
     * Day of meal
     */
    @ApiModelProperty(value = "Day of meal")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("meals")
    private MealPlanDay day;

    /**
     * Collection of recipes in meal
     */
    @ApiModelProperty(value = "Collection of recipes in meal")
    @OneToMany(mappedBy = "meal")
    private Set<MealRecipe> mealRecipes = new HashSet<>();
    /**
     * Collection of products in meal
     */
    @ApiModelProperty(value = "Collection of products in meal")
    @OneToMany(mappedBy = "meal")
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

    public Meal ordinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
        return this;
    }

    public void setOrdinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    public MealPlanDay getDay() {
        return day;
    }

    public Meal day(MealPlanDay mealPlanDay) {
        this.day = mealPlanDay;
        return this;
    }

    public void setDay(MealPlanDay mealPlanDay) {
        this.day = mealPlanDay;
    }

    public Set<MealRecipe> getMealRecipes() {
        return mealRecipes;
    }

    public Meal mealRecipes(Set<MealRecipe> mealRecipes) {
        this.mealRecipes = mealRecipes;
        return this;
    }

    public Meal addMealRecipes(MealRecipe mealRecipe) {
        this.mealRecipes.add(mealRecipe);
        mealRecipe.setMeal(this);
        return this;
    }

    public Meal removeMealRecipes(MealRecipe mealRecipe) {
        this.mealRecipes.remove(mealRecipe);
        mealRecipe.setMeal(null);
        return this;
    }

    public void setMealRecipes(Set<MealRecipe> mealRecipes) {
        this.mealRecipes = mealRecipes;
    }

    public Set<MealProduct> getMealProducts() {
        return mealProducts;
    }

    public Meal mealProducts(Set<MealProduct> mealProducts) {
        this.mealProducts = mealProducts;
        return this;
    }

    public Meal addMealProducts(MealProduct mealProduct) {
        this.mealProducts.add(mealProduct);
        mealProduct.setMeal(this);
        return this;
    }

    public Meal removeMealProducts(MealProduct mealProduct) {
        this.mealProducts.remove(mealProduct);
        mealProduct.setMeal(null);
        return this;
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Meal meal = (Meal) o;
        if (meal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), meal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Meal{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            "}";
    }
}
