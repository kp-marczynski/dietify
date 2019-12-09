package pl.marczynski.dietify.products.domain;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A ProductBasicNutritionData.
 */
@Entity
@Table(name = "product_basic_nutrition_data")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "productbasicnutritiondata")
public class ProductBasicNutritionData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Energy in kcal per 100 gram of product
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Energy in kcal per 100 gram of product", required = true)
    @Column(name = "energy", nullable = false)
    private Double energy;

    /**
     * Protein in grams per 100 gram of product
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Protein in grams per 100 gram of product", required = true)
    @Column(name = "protein", nullable = false)
    private Double protein;

    /**
     * Fat in grams per 100 gram of product
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Fat in grams per 100 gram of product", required = true)
    @Column(name = "fat", nullable = false)
    private Double fat;

    /**
     * Carbohydrates in grams per 100 gram of product
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Carbohydrates in grams per 100 gram of product", required = true)
    @Column(name = "carbohydrates", nullable = false)
    private Double carbohydrates;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getEnergy() {
        return energy;
    }

    public void setEnergy(Double energy) {
        this.energy = energy;
    }

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public Double getFat() {
        return fat;
    }

    public void setFat(Double fat) {
        this.fat = fat;
    }

    public Double getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductBasicNutritionData)) {
            return false;
        }
        return id != null && id.equals(((ProductBasicNutritionData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProductBasicNutritionData{" +
            "id=" + getId() +
            ", energy=" + getEnergy() +
            ", protein=" + getProtein() +
            ", fat=" + getFat() +
            ", carbohydrates=" + getCarbohydrates() +
            "}";
    }
}
