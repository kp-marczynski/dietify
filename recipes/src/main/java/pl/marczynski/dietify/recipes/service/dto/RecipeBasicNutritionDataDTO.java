package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.RecipeBasicNutritionData} entity.
 */
public class RecipeBasicNutritionDataDTO implements Serializable {

    private Long id;

    /**
     * Energy in kcal per 100 gram of recipe meal calculated from products added to recipe
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Energy in kcal per 100 gram of recipe meal calculated from products added to recipe", required = true)
    private Integer energy;

    /**
     * Protein in grams per 100 gram of recipe meal calculated from products added to recipe
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Protein in grams per 100 gram of recipe meal calculated from products added to recipe", required = true)
    private Integer protein;

    /**
     * Fat in grams per 100 gram of recipe meal calculated from products added to recipe
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Fat in grams per 100 gram of recipe meal calculated from products added to recipe", required = true)
    private Integer fat;

    /**
     * Carbohydrates in grams per 100 gram of recipe meal calculated from products added to recipe
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Carbohydrates in grams per 100 gram of recipe meal calculated from products added to recipe", required = true)
    private Integer carbohydrates;


    private Long recipeId;

    private String recipeName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getEnergy() {
        return energy;
    }

    public void setEnergy(Integer energy) {
        this.energy = energy;
    }

    public Integer getProtein() {
        return protein;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }

    public Integer getFat() {
        return fat;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public Integer getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Integer carbohydrates) {
        this.carbohydrates = carbohydrates;
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

        RecipeBasicNutritionDataDTO recipeBasicNutritionDataDTO = (RecipeBasicNutritionDataDTO) o;
        if (recipeBasicNutritionDataDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipeBasicNutritionDataDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RecipeBasicNutritionDataDTO{" +
            "id=" + getId() +
            ", energy=" + getEnergy() +
            ", protein=" + getProtein() +
            ", fat=" + getFat() +
            ", carbohydrates=" + getCarbohydrates() +
            ", recipe=" + getRecipeId() +
            ", recipe='" + getRecipeName() + "'" +
            "}";
    }
}
