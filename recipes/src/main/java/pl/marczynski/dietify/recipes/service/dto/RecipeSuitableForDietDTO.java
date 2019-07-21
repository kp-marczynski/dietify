package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.RecipeSuitableForDiet} entity.
 */
public class RecipeSuitableForDietDTO implements Serializable {

    private Long id;

    /**
     * Id of applicable DietType entity retrieved from products service
     */
    @NotNull
    @ApiModelProperty(value = "Id of applicable DietType entity retrieved from products service", required = true)
    private Long dietTypeId;


    private Long recipeId;

    private String recipeName;

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

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RecipeSuitableForDietDTO recipeSuitableForDietDTO = (RecipeSuitableForDietDTO) o;
        if (recipeSuitableForDietDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipeSuitableForDietDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RecipeSuitableForDietDTO{" +
            "id=" + getId() +
            ", dietTypeId=" + getDietTypeId() +
            ", recipe=" + getRecipeId() +
            ", recipe='" + getRecipeName() + "'" +
            "}";
    }
}
