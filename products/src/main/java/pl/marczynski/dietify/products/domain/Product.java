package pl.marczynski.dietify.products.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Specifying source if product is imported, preferably url address if possible
     */
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Specifying source if product is imported, preferably url address if possible")
    @Column(name = "source", length = 255)
    private String source;

    /**
     * Author of product if product created or edited manually. Id of User entity retrieved from gateway service
     */
    @ApiModelProperty(value = "Author of product if product created or edited manually. Id of User entity retrieved from gateway service")
    @Column(name = "author_id")
    private Long authorId;

    /**
     * Short description of Product in a language of a product
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Short description of Product in a language of a product", required = true)
    @Column(name = "description", length = 255, nullable = false)
    private String description;

    /**
     * Flag specifying if product is final or editable
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if product is final or editable", required = true)
    @Column(name = "is_final", nullable = false)
    private Boolean isFinal;

//    /**
//     * Flag specifying if product is verified. All products retrieved from external sources should be checked for eligibility to use and therefore initially this flag is set to false for these.
//     */
//    @NotNull
//    @ApiModelProperty(value = "Flag specifying if product is verified. All products retrieved from external sources should be checked for eligibility to use and therefore initially this flag is set to false for these.", required = true)
//    @Column(name = "is_verified", nullable = false)
//    private Boolean isVerified;

    /**
     * Timestamp of creation
     */
    @ApiModelProperty(value = "Timestamp of creation")
    @Column(name = "creation_timestamp")
    private Instant creationTimestamp;

    /**
     * Timestamp of last edit
     */
    @ApiModelProperty(value = "Timestamp of last edit")
    @Column(name = "last_edit_timestamp")
    private Instant lastEditTimestamp;

    /**
     * Language tag of a product as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language tag of a product as ISO_639-1 code", required = true)
    @Column(name = "language", length = 2, nullable = false)
    private String language;

    @OneToOne(optional = false, cascade = CascadeType.ALL, orphanRemoval = true)
    @NotNull
    @JoinColumn(unique = true)
    private ProductBasicNutritionData basicNutritionData;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "product_id", nullable = false)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<NutritionData> nutritionData = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "product_id", nullable = false)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HouseholdMeasure> householdMeasures = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("products")
    private ProductSubcategory subcategory;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_suitable_diets",
               joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "suitable_diets_id", referencedColumnName = "id"))
    private Set<DietType> suitableDiets = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_unsuitable_diets",
               joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "unsuitable_diets_id", referencedColumnName = "id"))
    private Set<DietType> unsuitableDiets = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getFinal() {
        return isFinal;
    }

    public void setFinal(Boolean aFinal) {
        isFinal = aFinal;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isIsFinal() {
        return isFinal;
    }

    public void setIsFinal(Boolean isFinal) {
        this.isFinal = isFinal;
    }

//    public Boolean isIsVerified() {
//        return isVerified;
//    }
//
//    public void setIsVerified(Boolean isVerified) {
//        this.isVerified = isVerified;
//    }

    public Instant getCreationTimestamp() {
        return creationTimestamp;
    }

    public void setCreationTimestamp(Instant creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }

    public Instant getLastEditTimestamp() {
        return lastEditTimestamp;
    }

    public void setLastEditTimestamp(Instant lastEditTimestamp) {
        this.lastEditTimestamp = lastEditTimestamp;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public ProductBasicNutritionData getBasicNutritionData() {
        return basicNutritionData;
    }

    public void setBasicNutritionData(ProductBasicNutritionData productBasicNutritionData) {
        this.basicNutritionData = productBasicNutritionData;
    }

    public Set<NutritionData> getNutritionData() {
        return nutritionData;
    }

    public void setNutritionData(Set<NutritionData> nutritionData) {
        this.nutritionData = nutritionData;
    }

    public Set<HouseholdMeasure> getHouseholdMeasures() {
        return householdMeasures;
    }

    public void setHouseholdMeasures(Set<HouseholdMeasure> householdMeasures) {
        this.householdMeasures = householdMeasures;
    }

    public ProductSubcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(ProductSubcategory productSubcategory) {
        this.subcategory = productSubcategory;
    }

    public Set<DietType> getSuitableDiets() {
        return suitableDiets;
    }

    public void setSuitableDiets(Set<DietType> dietTypes) {
        this.suitableDiets = dietTypes;
    }

    public Set<DietType> getUnsuitableDiets() {
        return unsuitableDiets;
    }

    public void setUnsuitableDiets(Set<DietType> dietTypes) {
        this.unsuitableDiets = dietTypes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", source='" + getSource() + "'" +
            ", authorId=" + getAuthorId() +
            ", description='" + getDescription() + "'" +
            ", isFinal='" + isIsFinal() + "'" +
//            ", isVerified='" + isIsVerified() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
