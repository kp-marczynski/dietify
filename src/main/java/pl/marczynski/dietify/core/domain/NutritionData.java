package pl.marczynski.dietify.core.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A value of nutrition definition for concrete Product.
 * Data initially retrieved form USDA Standard Reference database.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A value of nutrition definition for concrete Product. Data initially retrieved form USDA Standard Reference database. @author Krzysztof Marczyński")
@Entity
@Table(name = "nutrition_data")
public class NutritionData implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nutrition value in units specified in NutritionDefinition
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Nutrition value in units specified in NutritionDefinition", required = true)
    @Column(name = "nutrition_value", nullable = false)
    private Double nutritionValue;

    /**
     * Nutrition Definition for nutrition data
     */
    @ApiModelProperty(value = "Nutrition Definition for nutrition data")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("nutritionData")
    private NutritionDefinition nutritionDefinition;

    /**
     * Product for which data is specifed
     */
    @ApiModelProperty(value = "Product for which data is specifed")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("nutritionData")
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getNutritionValue() {
        return nutritionValue;
    }

    public NutritionData nutritionValue(Double nutritionValue) {
        this.nutritionValue = nutritionValue;
        return this;
    }

    public void setNutritionValue(Double nutritionValue) {
        this.nutritionValue = nutritionValue;
    }

    public NutritionDefinition getNutritionDefinition() {
        return nutritionDefinition;
    }

    public NutritionData nutritionDefinition(NutritionDefinition nutritionDefinition) {
        this.nutritionDefinition = nutritionDefinition;
        return this;
    }

    public void setNutritionDefinition(NutritionDefinition nutritionDefinition) {
        this.nutritionDefinition = nutritionDefinition;
    }

    public Product getProduct() {
        return product;
    }

    public NutritionData product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
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
        NutritionData nutritionData = (NutritionData) o;
        if (nutritionData.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nutritionData.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NutritionData{" +
            "id=" + getId() +
            ", nutritionValue=" + getNutritionValue() +
            "}";
    }
}
