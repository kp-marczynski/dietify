package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.Recipe} entity.
 */
public class RecipeDTO implements Serializable {

    private Long id;

    /**
     * Name of recipe in language of recipe
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Name of recipe in language of recipe", required = true)
    private String name;

    /**
     * Average time needed for overall recipe preparation, defined in minutes
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Average time needed for overall recipe preparation, defined in minutes", required = true)
    private Integer preparationTimeMinutes;

    /**
     * Number of portions for which all quantities are specified
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Number of portions for which all quantities are specified", required = true)
    private Double numberOfPortions;

    /**
     * Optional image of recipe
     */
    
    @ApiModelProperty(value = "Optional image of recipe")
    @Lob
    private byte[] image;

    private String imageContentType;
    /**
     * Id of recipe's author. Id of User entity retrieved from gateway service
     */
    @NotNull
    @ApiModelProperty(value = "Id of recipe's author. Id of User entity retrieved from gateway service", required = true)
    private Long authorId;

    /**
     * Date of creation
     */
    @NotNull
    @ApiModelProperty(value = "Date of creation", required = true)
    private LocalDate creationDate;

    /**
     * Date of last edit
     */
    @NotNull
    @ApiModelProperty(value = "Date of last edit", required = true)
    private LocalDate lastEditDate;

    /**
     * Flag specifying if recipe should be visible in list of author's recipes
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if recipe should be visible in list of author's recipes", required = true)
    private Boolean isVisible;

    /**
     * Language tag of a recipe as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language tag of a recipe as ISO_639-1 code", required = true)
    private String language;

    /**
     * Total weight in grams of meal prepared from recipe
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Total weight in grams of meal prepared from recipe", required = true)
    private Double totalGramsWeight;


    private Long sourceRecipeId;

    private String sourceRecipeName;

    private Set<KitchenApplianceDTO> kitchenAppliances = new HashSet<>();

    private Set<DishTypeDTO> dishTypes = new HashSet<>();

    private Set<MealTypeDTO> mealTypes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPreparationTimeMinutes() {
        return preparationTimeMinutes;
    }

    public void setPreparationTimeMinutes(Integer preparationTimeMinutes) {
        this.preparationTimeMinutes = preparationTimeMinutes;
    }

    public Double getNumberOfPortions() {
        return numberOfPortions;
    }

    public void setNumberOfPortions(Double numberOfPortions) {
        this.numberOfPortions = numberOfPortions;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getLastEditDate() {
        return lastEditDate;
    }

    public void setLastEditDate(LocalDate lastEditDate) {
        this.lastEditDate = lastEditDate;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Double getTotalGramsWeight() {
        return totalGramsWeight;
    }

    public void setTotalGramsWeight(Double totalGramsWeight) {
        this.totalGramsWeight = totalGramsWeight;
    }

    public Long getSourceRecipeId() {
        return sourceRecipeId;
    }

    public void setSourceRecipeId(Long recipeId) {
        this.sourceRecipeId = recipeId;
    }

    public String getSourceRecipeName() {
        return sourceRecipeName;
    }

    public void setSourceRecipeName(String recipeName) {
        this.sourceRecipeName = recipeName;
    }

    public Set<KitchenApplianceDTO> getKitchenAppliances() {
        return kitchenAppliances;
    }

    public void setKitchenAppliances(Set<KitchenApplianceDTO> kitchenAppliances) {
        this.kitchenAppliances = kitchenAppliances;
    }

    public Set<DishTypeDTO> getDishTypes() {
        return dishTypes;
    }

    public void setDishTypes(Set<DishTypeDTO> dishTypes) {
        this.dishTypes = dishTypes;
    }

    public Set<MealTypeDTO> getMealTypes() {
        return mealTypes;
    }

    public void setMealTypes(Set<MealTypeDTO> mealTypes) {
        this.mealTypes = mealTypes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RecipeDTO recipeDTO = (RecipeDTO) o;
        if (recipeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RecipeDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", preparationTimeMinutes=" + getPreparationTimeMinutes() +
            ", numberOfPortions=" + getNumberOfPortions() +
            ", image='" + getImage() + "'" +
            ", authorId=" + getAuthorId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastEditDate='" + getLastEditDate() + "'" +
            ", isVisible='" + isIsVisible() + "'" +
            ", language='" + getLanguage() + "'" +
            ", totalGramsWeight=" + getTotalGramsWeight() +
            ", sourceRecipe=" + getSourceRecipeId() +
            ", sourceRecipe='" + getSourceRecipeName() + "'" +
            "}";
    }
}
