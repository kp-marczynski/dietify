package pl.marczynski.dietify.core.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A main category of product.
 * Data initially retrieved form USDA Standard Reference database.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A main category of product. Data initially retrieved form USDA Standard Reference database. @author Krzysztof Marczyński")
@Entity
@Table(name = "product_category")
public class ProductCategory implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Short description of Category in Polish
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short description of Category in Polish", required = true)
    @Column(name = "description_polish", nullable = false)
    private String descriptionPolish;

    /**
     * Short description of Category in English
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short description of Category in English", required = true)
    @Column(name = "description_english", nullable = false)
    private String descriptionEnglish;

    /**
     * Collection of child subcategories
     */
    @ApiModelProperty(value = "Collection of child subcategories")
    @OneToMany(mappedBy = "category")
    private Set<ProductSubcategory> subcategories = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescriptionPolish() {
        return descriptionPolish;
    }

    public ProductCategory descriptionPolish(String descriptionPolish) {
        this.descriptionPolish = descriptionPolish;
        return this;
    }

    public void setDescriptionPolish(String descriptionPolish) {
        this.descriptionPolish = descriptionPolish;
    }

    public String getDescriptionEnglish() {
        return descriptionEnglish;
    }

    public ProductCategory descriptionEnglish(String descriptionEnglish) {
        this.descriptionEnglish = descriptionEnglish;
        return this;
    }

    public void setDescriptionEnglish(String descriptionEnglish) {
        this.descriptionEnglish = descriptionEnglish;
    }

    public Set<ProductSubcategory> getSubcategories() {
        return subcategories;
    }

    public ProductCategory subcategories(Set<ProductSubcategory> productSubcategories) {
        this.subcategories = productSubcategories;
        return this;
    }

    public ProductCategory addSubcategories(ProductSubcategory productSubcategory) {
        this.subcategories.add(productSubcategory);
        productSubcategory.setCategory(this);
        return this;
    }

    public ProductCategory removeSubcategories(ProductSubcategory productSubcategory) {
        this.subcategories.remove(productSubcategory);
        productSubcategory.setCategory(null);
        return this;
    }

    public void setSubcategories(Set<ProductSubcategory> productSubcategories) {
        this.subcategories = productSubcategories;
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
        ProductCategory productCategory = (ProductCategory) o;
        if (productCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductCategory{" +
            "id=" + getId() +
            ", descriptionPolish='" + getDescriptionPolish() + "'" +
            ", descriptionEnglish='" + getDescriptionEnglish() + "'" +
            "}";
    }
}
