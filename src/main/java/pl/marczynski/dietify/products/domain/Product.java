package pl.marczynski.dietify.products.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import pl.marczynski.dietify.core.domain.Language;
import pl.marczynski.dietify.core.domain.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A food product.
 * Data initially retrieved form USDA Standard Reference database.
 *
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A food product. Data initially retrieved form USDA Standard Reference database. @author Krzysztof Marczyński")
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Specifying source if product is imported, prefarably url address if possible
     */
    @ApiModelProperty(value = "Specifying source if product is imported, prefarably url address if possible")
    @Column(name = "source")
    private String source;

    /**
     * Short description of Product
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short description of Product", required = true)
    @Column(name = "description", nullable = false)
    private String description;

    /**
     * Flag specifying if product is final or editable
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if product is final or editable", required = true)
    @Column(name = "is_final", nullable = false)
    private Boolean isFinal;

    /**
     * Flag specifying if product is verified
     * All products retrieved from external sources should be checked for eligibility to use & therfore intially this flag is set to false for these.
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if product is verified All products retrieved from external sources should be checked for eligibility to use & therfore intially this flag is set to false for these.", required = true)
    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified;

    /**
     * Language in which product is defined
     */
    @ApiModelProperty(value = "Language in which product is defined")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("products")
    private Language language;

    /**
     * Subcategory of the product
     */
    @ApiModelProperty(value = "Subcategory of the product")
    @ManyToOne
    @JsonIgnoreProperties("products")
    @NotNull
    private ProductSubcategory subcategory;

    /**
     * Author of the product
     */
    @ApiModelProperty(value = "Author of the product")
    @ManyToOne
    @JsonIgnoreProperties("products")
    private User author;

    /**
     * Specyigying for which diet types product is suitable
     */
    @ApiModelProperty(value = "Specyigying for which diet types product is suitable")
    @ManyToMany
    @JoinTable(name = "product_suitable_diets",
        joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "suitable_diets_id", referencedColumnName = "id"))
    private Set<DietType> suitableDiets = new HashSet<>();

    /**
     * Specyigying for which diet types product is not suitable
     */
    @ApiModelProperty(value = "Specyigying for which diet types product is not suitable")
    @ManyToMany
    @JoinTable(name = "product_unsuitable_diets",
        joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "unsuitable_diets_id", referencedColumnName = "id"))
    private Set<DietType> unsuitableDiets = new HashSet<>();

    /**
     * Collection of product's nutrition data
     */
    @ApiModelProperty(value = "Collection of product's nutrition data")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "product_id", nullable = false)
    private Set<NutritionData> nutritionData = new HashSet<>();
    /**
     * Collection of household measure defined for product
     */
    @ApiModelProperty(value = "Collection of household measure defined for product")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "product_id", nullable = false)
    private Set<HouseholdMeasure> householdMeasures = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSource() {
        return source;
    }

    public Product source(String source) {
        this.source = source;
        return this;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isIsFinal() {
        return isFinal;
    }

    public Product isFinal(Boolean isFinal) {
        this.isFinal = isFinal;
        return this;
    }

    public void setIsFinal(Boolean isFinal) {
        this.isFinal = isFinal;
    }

    public Boolean isIsVerified() {
        return isVerified;
    }

    public Product isVerified(Boolean isVerified) {
        this.isVerified = isVerified;
        return this;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public Language getLanguage() {
        return language;
    }

    public Product language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public ProductSubcategory getSubcategory() {
        return subcategory;
    }

    public Product subcategory(ProductSubcategory productSubcategory) {
        this.subcategory = productSubcategory;
        return this;
    }

    public void setSubcategory(ProductSubcategory productSubcategory) {
        this.subcategory = productSubcategory;
    }

    public User getAuthor() {
        return author;
    }

    public Product author(User user) {
        this.author = user;
        return this;
    }

    public void setAuthor(User user) {
        this.author = user;
    }

    public Set<DietType> getSuitableDiets() {
        return suitableDiets;
    }

    public Product suitableDiets(Set<DietType> dietTypes) {
        this.suitableDiets = dietTypes;
        return this;
    }

    public Product addSuitableDiets(DietType dietType) {
        this.suitableDiets.add(dietType);
        return this;
    }

    public Product removeSuitableDiets(DietType dietType) {
        this.suitableDiets.remove(dietType);
        return this;
    }

    public void setSuitableDiets(Set<DietType> dietTypes) {
        this.suitableDiets = dietTypes;
    }

    public Set<DietType> getUnsuitableDiets() {
        return unsuitableDiets;
    }

    public Product unsuitableDiets(Set<DietType> dietTypes) {
        this.unsuitableDiets = dietTypes;
        return this;
    }

    public Product addUnsuitableDiets(DietType dietType) {
        this.unsuitableDiets.add(dietType);
        return this;
    }

    public Product removeUnsuitableDiets(DietType dietType) {
        this.unsuitableDiets.remove(dietType);
        return this;
    }

    public void setUnsuitableDiets(Set<DietType> dietTypes) {
        this.unsuitableDiets = dietTypes;
    }

    public Set<NutritionData> getNutritionData() {
        return nutritionData;
    }

    public Product nutritionData(Set<NutritionData> nutritionData) {
        this.nutritionData = nutritionData;
        return this;
    }

    public Product addNutritionData(NutritionData nutritionData) {
        this.nutritionData.add(nutritionData);
        return this;
    }

    public Product removeNutritionData(NutritionData nutritionData) {
        this.nutritionData.remove(nutritionData);
        return this;
    }

    public void setNutritionData(Set<NutritionData> nutritionData) {
        this.nutritionData = nutritionData;
    }

    public Set<HouseholdMeasure> getHouseholdMeasures() {
        return householdMeasures;
    }

    public Product householdMeasures(Set<HouseholdMeasure> householdMeasures) {
        this.householdMeasures = householdMeasures;
        return this;
    }

    public Product addHouseholdMeasures(HouseholdMeasure householdMeasure) {
        this.householdMeasures.add(householdMeasure);
        return this;
    }

    public Product removeHouseholdMeasures(HouseholdMeasure householdMeasure) {
        this.householdMeasures.remove(householdMeasure);
        return this;
    }

    public void setHouseholdMeasures(Set<HouseholdMeasure> householdMeasures) {
        this.householdMeasures = householdMeasures;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", source='" + getSource() + "'" +
            ", description='" + getDescription() + "'" +
            ", isFinal='" + isIsFinal() + "'" +
            ", isVerified='" + isIsVerified() + "'" +
            "}";
    }
}
