package pl.marczynski.dietify.mealplans.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Recipe assigned to a meal
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A Recipe assigned to a meal @author Krzysztof Marczyński")
@Entity
@Table(name = "meal_recipe")
public class MealRecipe implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Id of recipe retrieved from recipes service
     */
    @NotNull
    @ApiModelProperty(value = "Id of recipe retrieved from recipes service", required = true)
    @Column(name = "recipe_id", nullable = false)
    private Long recipeId;

    /**
     * Amount of Recipe in grams
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Amount of Recipe in grams", required = true)
    @Column(name = "amount", nullable = false)
    private Integer amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public MealRecipe recipeId(Long recipeId) {
        this.recipeId = recipeId;
        return this;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public Integer getAmount() {
        return amount;
    }

    public MealRecipe amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
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
        MealRecipe mealRecipe = (MealRecipe) o;
        if (mealRecipe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealRecipe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealRecipe{" +
            "id=" + getId() +
            ", recipeId=" + getRecipeId() +
            ", amount=" + getAmount() +
            "}";
    }
}
