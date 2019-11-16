package pl.marczynski.dietify.recipes.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Recipe.
 */
@Entity
@Table(name = "recipe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "recipe")
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Name of recipe in language of recipe
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Name of recipe in language of recipe", required = true)
    @Column(name = "name", length = 255, nullable = false)
    private String name;

    /**
     * Average time needed for overall recipe preparation, defined in minutes
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Average time needed for overall recipe preparation, defined in minutes", required = true)
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
     * Id of recipe's author. Id of User entity retrieved from gateway service
     */
    @NotNull
    @ApiModelProperty(value = "Id of recipe's author. Id of User entity retrieved from gateway service", required = true)
    @Column(name = "author_id", nullable = false)
    private Long authorId;

    /**
     * Date of creation
     */
    @ApiModelProperty(value = "Date of creation", required = true)
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    /**
     * Date of last edit
     */
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
     * Language tag of a recipe as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language tag of a recipe as ISO_639-1 code", required = true)
    @Column(name = "language", length = 2, nullable = false)
    private String language;

    /**
     * Total weight in grams of meal prepared from recipe
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Total weight in grams of meal prepared from recipe", required = true)
    @Column(name = "total_grams_weight", nullable = false)
    private Double totalGramsWeight;

    @OneToOne(optional = false, cascade = CascadeType.ALL, orphanRemoval = true)
    @NotNull
    @JoinColumn(unique = true)
    private RecipeBasicNutritionData basicNutritionData;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "recipe_id", nullable = false)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RecipeSection> recipeSections = new HashSet<>();

    @OneToMany(mappedBy = "recipe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RecipeSuitableForDiet> suitableForDiets = new HashSet<>();

    @OneToMany(mappedBy = "recipe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RecipeUnsuitableForDiet> unsuitableForDiets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("recipes")
    private Recipe sourceRecipe;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "recipe_kitchen_appliances",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "kitchen_appliances_id", referencedColumnName = "id"))
    private Set<KitchenAppliance> kitchenAppliances = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "recipe_dish_types",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "dish_types_id", referencedColumnName = "id"))
    private Set<DishType> dishTypes = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "recipe_meal_types",
               joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "meal_types_id", referencedColumnName = "id"))
    private Set<MealType> mealTypes = new HashSet<>();

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

    public RecipeBasicNutritionData getBasicNutritionData() {
        return basicNutritionData;
    }

    public void setBasicNutritionData(RecipeBasicNutritionData recipeBasicNutritionData) {
        this.basicNutritionData = recipeBasicNutritionData;
    }

    public Set<RecipeSection> getRecipeSections() {
        return recipeSections;
    }

    public void setRecipeSections(Set<RecipeSection> recipeSections) {
        this.recipeSections = recipeSections;
    }

    public Set<RecipeSuitableForDiet> getSuitableForDiets() {
        return suitableForDiets;
    }

    public void setSuitableForDiets(Set<RecipeSuitableForDiet> recipeSuitableForDiets) {
        this.suitableForDiets = recipeSuitableForDiets;
    }

    public Set<RecipeUnsuitableForDiet> getUnsuitableForDiets() {
        return unsuitableForDiets;
    }

    public void setUnsuitableForDiets(Set<RecipeUnsuitableForDiet> recipeUnsuitableForDiets) {
        this.unsuitableForDiets = recipeUnsuitableForDiets;
    }

    public Recipe getSourceRecipe() {
        return sourceRecipe;
    }

    public void setSourceRecipe(Recipe recipe) {
        this.sourceRecipe = recipe;
    }

    public Set<KitchenAppliance> getKitchenAppliances() {
        return kitchenAppliances;
    }

    public void setKitchenAppliances(Set<KitchenAppliance> kitchenAppliances) {
        this.kitchenAppliances = kitchenAppliances;
    }

    public Set<DishType> getDishTypes() {
        return dishTypes;
    }

    public void setDishTypes(Set<DishType> dishTypes) {
        this.dishTypes = dishTypes;
    }

    public Set<MealType> getMealTypes() {
        return mealTypes;
    }

    public void setMealTypes(Set<MealType> mealTypes) {
        this.mealTypes = mealTypes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Recipe)) {
            return false;
        }
        return id != null && id.equals(((Recipe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
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
            ", language='" + getLanguage() + "'" +
            ", totalGramsWeight=" + getTotalGramsWeight() +
            "}";
    }
}
