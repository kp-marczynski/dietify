package pl.marczynski.dietify.mealplans.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A MealRecipe.
 */
@Entity
@Table(name = "meal_recipe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "mealrecipe")
public class MealRecipe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Id of Recipe entity retrieved from recipes service
     */
    @NotNull
    @ApiModelProperty(value = "Id of Recipe entity retrieved from recipes service", required = true)
    @Column(name = "recipe_id", nullable = false)
    private Long recipeId;

    /**
     * Amount of recipe in grams
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Amount of recipe in grams", required = true)
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("mealRecipes")
    private Meal meal;

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

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MealRecipe)) {
            return false;
        }
        return id != null && id.equals(((MealRecipe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
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
