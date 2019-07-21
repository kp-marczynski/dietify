package pl.marczynski.dietify.products.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A subcategory of product.
 * Data initially retrieved form USDA Standard Reference database.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A subcategory of product. Data initially retrieved form USDA Standard Reference database. @author Krzysztof Marczyński")
@Entity
@Table(name = "product_subcategory")
public class ProductSubcategory implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Short description of Subcategory
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short description of Subcategory", required = true)
    @Column(name = "description", nullable = false)
    private String description;

    /**
     * Parent category of subcategory
     */
    @ApiModelProperty(value = "Parent category of subcategory")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("subcategories")
    private ProductCategory category;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public ProductSubcategory description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public ProductSubcategory category(ProductCategory productCategory) {
        this.category = productCategory;
        return this;
    }

    public void setCategory(ProductCategory productCategory) {
        this.category = productCategory;
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
        ProductSubcategory productSubcategory = (ProductSubcategory) o;
        if (productSubcategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productSubcategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductSubcategory{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
