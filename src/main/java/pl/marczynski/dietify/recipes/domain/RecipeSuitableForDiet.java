package pl.marczynski.dietify.recipes.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A tag specifying cases in which Recipe might be positivly used,
 * e.g. vegetarian should mean it is good for vegetarians.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A tag specifying cases in which Recipe might be positivly used, e.g. vegetarian should mean it is good for vegetarians. @author Krzysztof Marczyński")
@Entity
@Table(name = "recipe_suitable_for_diet")
public class RecipeSuitableForDiet implements Serializable {

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

    /**
     * Recipe to which tag is assigned
     */
    @ApiModelProperty(value = "Recipe to which tag is assigned")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("suitableForDiets")
    private Recipe recipe;

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

    public RecipeSuitableForDiet dietTypeId(Long dietTypeId) {
        this.dietTypeId = dietTypeId;
        return this;
    }

    public void setDietTypeId(Long dietTypeId) {
        this.dietTypeId = dietTypeId;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public RecipeSuitableForDiet recipe(Recipe recipe) {
        this.recipe = recipe;
        return this;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
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
        RecipeSuitableForDiet recipeSuitableForDiet = (RecipeSuitableForDiet) o;
        if (recipeSuitableForDiet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipeSuitableForDiet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RecipeSuitableForDiet{" +
            "id=" + getId() +
            ", dietTypeId=" + getDietTypeId() +
            "}";
    }
}
