package pl.marczynski.dietify.recipes.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Recipe.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A Recipe. @author Krzysztof Marczyński")
@Entity
@Table(name = "recipe")
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Name of Recipe
     */
    @Size(min = 1)
    @ApiModelProperty(value = "Name of Recipe")
    @Column(name = "name")
    private String name;

    /**
     * Avarege time needed for overall recipe preparation, defined in minutes
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Avarege time needed for overall recipe preparation, defined in minutes", required = true)
    @Column(name = "preparation_time_minutes", nullable = false)
    private Integer preparationTimeMinutes;

    /**
     * Number of portions for which all quantities are specified
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Number of portions for which all quantities are specified", required = true)
    @Column(name = "number_of_portions", nullable = false)
    private Double numberOfPortions;

    /**
     * Optional image of recipe
     */
    @ApiModelProperty(value = "Optional image of recipe")
    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    /**
     * Id of recipe's author
     */
    @NotNull
    @ApiModelProperty(value = "Id of recipe's author", required = true)
    @Column(name = "author_id", nullable = false)
    private Long authorId;

    /**
     * Date of creation
     */
    @NotNull
    @ApiModelProperty(value = "Date of creation", required = true)
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    /**
     * Date of last edit
     */
    @NotNull
    @ApiModelProperty(value = "Date of last edit", required = true)
    @Column(name = "last_edit_date", nullable = false)
    private LocalDate lastEditDate;

    /**
     * Flag specifying if recipe should be visible in list of author's recipes
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if recipe should be visible in list of author's recipes", required = true)
    @Column(name = "is_visible", nullable = false)
    private Boolean isVisible;

    /**
     * Flag specifying if recipe is enabled for edition
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if recipe is enabled for edition", required = true)
    @Column(name = "is_locked", nullable = false)
    private Boolean isLocked;

    /**
     * language of the recipe
     */
    @ApiModelProperty(value = "language of the recipe")
    @Column(name = "language_id")
    private Long languageId;

    /**
     * Recipe from which copy was created
     */
    @ApiModelProperty(value = "Recipe from which copy was created")
    @ManyToOne
    @JsonIgnoreProperties("recipes")
    private Recipe sourceRecipe;

    /**
     * Collection of kitchen appliances needed for recipe preparation
     */
    @ApiModelProperty(value = "Collection of kitchen appliances needed for recipe preparation")
    @ManyToMany
    @JoinTable(name = "recipe_kitchen_appliances",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "kitchen_appliances_id", referencedColumnName = "id"))
    private Set<KitchenAppliance> kitchenAppliances = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "recipe_dish_type",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "dish_type_id", referencedColumnName = "id"))
    private Set<DishType> dishTypes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "recipe_meal_type",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "meal_type_id", referencedColumnName = "id"))
    private Set<MealType> mealTypes = new HashSet<>();

    /**
     * Collection of recipe sections
     */
    @ApiModelProperty(value = "Collection of recipe sections")
    @OneToMany(mappedBy = "recipe")
    private Set<RecipeSection> recipeSections = new HashSet<>();
    /**
     * Collection of tags specifying for which cases recipe might be used
     */
    @ApiModelProperty(value = "Collection of tags specifying for which cases recipe might be used")
    @OneToMany(mappedBy = "recipe")
    private Set<RecipeSuitableForDiet> suitableForDiets = new HashSet<>();
    /**
     * Collection of tags specifying for which cases recipe should not be used
     */
    @ApiModelProperty(value = "Collection of tags specifying for which cases recipe should not be used")
    @OneToMany(mappedBy = "recipe")
    private Set<RecipeUnsuitableForDiet> unsuitableForDiets = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Recipe name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPreparationTimeMinutes() {
        return preparationTimeMinutes;
    }

    public Recipe preparationTimeMinutes(Integer preparationTimeMinutes) {
        this.preparationTimeMinutes = preparationTimeMinutes;
        return this;
    }

    public void setPreparationTimeMinutes(Integer preparationTimeMinutes) {
        this.preparationTimeMinutes = preparationTimeMinutes;
    }

    public Double getNumberOfPortions() {
        return numberOfPortions;
    }

    public Recipe numberOfPortions(Double numberOfPortions) {
        this.numberOfPortions = numberOfPortions;
        return this;
    }

    public void setNumberOfPortions(Double numberOfPortions) {
        this.numberOfPortions = numberOfPortions;
    }

    public byte[] getImage() {
        return image;
    }

    public Recipe image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Recipe imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public Recipe authorId(Long authorId) {
        this.authorId = authorId;
        return this;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public Recipe creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getLastEditDate() {
        return lastEditDate;
    }

    public Recipe lastEditDate(LocalDate lastEditDate) {
        this.lastEditDate = lastEditDate;
        return this;
    }

    public void setLastEditDate(LocalDate lastEditDate) {
        this.lastEditDate = lastEditDate;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public Recipe isVisible(Boolean isVisible) {
        this.isVisible = isVisible;
        return this;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    public Boolean isIsLocked() {
        return isLocked;
    }

    public Recipe isLocked(Boolean isLocked) {
        this.isLocked = isLocked;
        return this;
    }

    public void setIsLocked(Boolean isLocked) {
        this.isLocked = isLocked;
    }

    public Long getLanguageId() {
        return languageId;
    }

    public Recipe languageId(Long languageId) {
        this.languageId = languageId;
        return this;
    }

    public void setLanguageId(Long languageId) {
        this.languageId = languageId;
    }

    public Recipe getSourceRecipe() {
        return sourceRecipe;
    }

    public Recipe sourceRecipe(Recipe recipe) {
        this.sourceRecipe = recipe;
        return this;
    }

    public void setSourceRecipe(Recipe recipe) {
        this.sourceRecipe = recipe;
    }

    public Set<KitchenAppliance> getKitchenAppliances() {
        return kitchenAppliances;
    }

    public Recipe kitchenAppliances(Set<KitchenAppliance> kitchenAppliances) {
        this.kitchenAppliances = kitchenAppliances;
        return this;
    }

    public Recipe addKitchenAppliances(KitchenAppliance kitchenAppliance) {
        this.kitchenAppliances.add(kitchenAppliance);
        return this;
    }

    public Recipe removeKitchenAppliances(KitchenAppliance kitchenAppliance) {
        this.kitchenAppliances.remove(kitchenAppliance);
        return this;
    }

    public void setKitchenAppliances(Set<KitchenAppliance> kitchenAppliances) {
        this.kitchenAppliances = kitchenAppliances;
    }

    public Set<DishType> getDishTypes() {
        return dishTypes;
    }

    public Recipe dishTypes(Set<DishType> dishTypes) {
        this.dishTypes = dishTypes;
        return this;
    }

    public Recipe addDishType(DishType dishType) {
        this.dishTypes.add(dishType);
        return this;
    }

    public Recipe removeDishType(DishType dishType) {
        this.dishTypes.remove(dishType);
        return this;
    }

    public void setDishTypes(Set<DishType> dishTypes) {
        this.dishTypes = dishTypes;
    }

    public Set<MealType> getMealTypes() {
        return mealTypes;
    }

    public Recipe mealTypes(Set<MealType> mealTypes) {
        this.mealTypes = mealTypes;
        return this;
    }

    public Recipe addMealType(MealType mealType) {
        this.mealTypes.add(mealType);
        return this;
    }

    public Recipe removeMealType(MealType mealType) {
        this.mealTypes.remove(mealType);
        return this;
    }

    public void setMealTypes(Set<MealType> mealTypes) {
        this.mealTypes = mealTypes;
    }

    public Set<RecipeSection> getRecipeSections() {
        return recipeSections;
    }

    public Recipe recipeSections(Set<RecipeSection> recipeSections) {
        this.recipeSections = recipeSections;
        return this;
    }

    public Recipe addRecipeSections(RecipeSection recipeSection) {
        this.recipeSections.add(recipeSection);
        recipeSection.setRecipe(this);
        return this;
    }

    public Recipe removeRecipeSections(RecipeSection recipeSection) {
        this.recipeSections.remove(recipeSection);
        recipeSection.setRecipe(null);
        return this;
    }

    public void setRecipeSections(Set<RecipeSection> recipeSections) {
        this.recipeSections = recipeSections;
    }

    public Set<RecipeSuitableForDiet> getSuitableForDiets() {
        return suitableForDiets;
    }

    public Recipe suitableForDiets(Set<RecipeSuitableForDiet> recipeSuitableForDiets) {
        this.suitableForDiets = recipeSuitableForDiets;
        return this;
    }

    public Recipe addSuitableForDiets(RecipeSuitableForDiet recipeSuitableForDiet) {
        this.suitableForDiets.add(recipeSuitableForDiet);
        recipeSuitableForDiet.setRecipe(this);
        return this;
    }

    public Recipe removeSuitableForDiets(RecipeSuitableForDiet recipeSuitableForDiet) {
        this.suitableForDiets.remove(recipeSuitableForDiet);
        recipeSuitableForDiet.setRecipe(null);
        return this;
    }

    public void setSuitableForDiets(Set<RecipeSuitableForDiet> recipeSuitableForDiets) {
        this.suitableForDiets = recipeSuitableForDiets;
    }

    public Set<RecipeUnsuitableForDiet> getUnsuitableForDiets() {
        return unsuitableForDiets;
    }

    public Recipe unsuitableForDiets(Set<RecipeUnsuitableForDiet> recipeUnsuitableForDiets) {
        this.unsuitableForDiets = recipeUnsuitableForDiets;
        return this;
    }

    public Recipe addUnsuitableForDiets(RecipeUnsuitableForDiet recipeUnsuitableForDiet) {
        this.unsuitableForDiets.add(recipeUnsuitableForDiet);
        recipeUnsuitableForDiet.setRecipe(this);
        return this;
    }

    public Recipe removeUnsuitableForDiets(RecipeUnsuitableForDiet recipeUnsuitableForDiet) {
        this.unsuitableForDiets.remove(recipeUnsuitableForDiet);
        recipeUnsuitableForDiet.setRecipe(null);
        return this;
    }

    public void setUnsuitableForDiets(Set<RecipeUnsuitableForDiet> recipeUnsuitableForDiets) {
        this.unsuitableForDiets = recipeUnsuitableForDiets;
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
        Recipe recipe = (Recipe) o;
        if (recipe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Recipe{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", preparationTimeMinutes=" + getPreparationTimeMinutes() +
            ", numberOfPortions=" + getNumberOfPortions() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", authorId=" + getAuthorId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastEditDate='" + getLastEditDate() + "'" +
            ", isVisible='" + isIsVisible() + "'" +
            ", isLocked='" + isIsLocked() + "'" +
            ", languageId=" + getLanguageId() +
            "}";
    }
}
