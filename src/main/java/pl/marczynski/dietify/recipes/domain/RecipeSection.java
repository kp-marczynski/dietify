package pl.marczynski.dietify.recipes.domain;


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
 * A recipe section,
 * e.g. recipe for cheesecake might have 3 separate sections for dough, filling and topping.
 * First section might be unnamed.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A recipe section, e.g. recipe for cheesecake might have 3 separate sections for dough, filling and topping. First section might be unnamed. @author Krzysztof Marczyński")
@Entity
@Table(name = "recipe_section")
public class RecipeSection implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Name of recipe section
     */
    @Size(min = 1)
    @ApiModelProperty(value = "Name of recipe section")
    @Column(name = "section_name")
    private String sectionName;

    /**
     * Recipe to which recipe section is assigned
     */
    @ApiModelProperty(value = "Recipe to which recipe section is assigned")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("recipeSections")
    private Recipe recipe;

    /**
     * Collection of products portions
     */
    @ApiModelProperty(value = "Collection of products portions")
    @OneToMany(mappedBy = "recipeSection")
    private Set<ProductPortion> productPortions = new HashSet<>();
    /**
     * Collection of preparation steps
     */
    @ApiModelProperty(value = "Collection of preparation steps")
    @OneToMany(mappedBy = "recipeSection")
    private Set<PreparationStep> preparationSteps = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSectionName() {
        return sectionName;
    }

    public RecipeSection sectionName(String sectionName) {
        this.sectionName = sectionName;
        return this;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public RecipeSection recipe(Recipe recipe) {
        this.recipe = recipe;
        return this;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Set<ProductPortion> getProductPortions() {
        return productPortions;
    }

    public RecipeSection productPortions(Set<ProductPortion> productPortions) {
        this.productPortions = productPortions;
        return this;
    }

    public RecipeSection addProductPortions(ProductPortion productPortion) {
        this.productPortions.add(productPortion);
        productPortion.setRecipeSection(this);
        return this;
    }

    public RecipeSection removeProductPortions(ProductPortion productPortion) {
        this.productPortions.remove(productPortion);
        productPortion.setRecipeSection(null);
        return this;
    }

    public void setProductPortions(Set<ProductPortion> productPortions) {
        this.productPortions = productPortions;
    }

    public Set<PreparationStep> getPreparationSteps() {
        return preparationSteps;
    }

    public RecipeSection preparationSteps(Set<PreparationStep> preparationSteps) {
        this.preparationSteps = preparationSteps;
        return this;
    }

    public RecipeSection addPreparationSteps(PreparationStep preparationStep) {
        this.preparationSteps.add(preparationStep);
        preparationStep.setRecipeSection(this);
        return this;
    }

    public RecipeSection removePreparationSteps(PreparationStep preparationStep) {
        this.preparationSteps.remove(preparationStep);
        preparationStep.setRecipeSection(null);
        return this;
    }

    public void setPreparationSteps(Set<PreparationStep> preparationSteps) {
        this.preparationSteps = preparationSteps;
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
        RecipeSection recipeSection = (RecipeSection) o;
        if (recipeSection.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipeSection.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RecipeSection{" +
            "id=" + getId() +
            ", sectionName='" + getSectionName() + "'" +
            "}";
    }
}
