package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.RecipeSection} entity.
 */
public class RecipeSectionDTO implements Serializable {

    private Long id;

    /**
     * Name of recipe section in language of a recipe
     */
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Name of recipe section in language of a recipe")
    private String sectionName;


    private Long recipeId;

    private String recipeName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
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

        RecipeSectionDTO recipeSectionDTO = (RecipeSectionDTO) o;
        if (recipeSectionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipeSectionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RecipeSectionDTO{" +
            "id=" + getId() +
            ", sectionName='" + getSectionName() + "'" +
            ", recipe=" + getRecipeId() +
            ", recipe='" + getRecipeName() + "'" +
            "}";
    }
}
