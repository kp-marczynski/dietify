package pl.marczynski.dietify.mealplans.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Product assigned to a meal
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A Product assigned to a meal @author Krzysztof Marczyński")
@Entity
@Table(name = "meal_product")
public class MealProduct implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Id of product retrieved from Products service
     */
    @NotNull
    @ApiModelProperty(value = "Id of product retrieved from Products service", required = true)
    @Column(name = "product_id", nullable = false)
    private Long productId;

    /**
     * Id of household measure retrieved from Products service
     */
    @ApiModelProperty(value = "Id of household measure retrieved from Products service")
    @Column(name = "household_measure_id")
    private Long householdMeasureId;

    /**
     * Amount of Product in household measure units
     * If household measure is null then amount is in grams.
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Amount of Product in household measure units If household measure is null then amount is in grams.", required = true)
    @Column(name = "amount", nullable = false)
    private Double amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public MealProduct productId(Long productId) {
        this.productId = productId;
        return this;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getHouseholdMeasureId() {
        return householdMeasureId;
    }

    public MealProduct householdMeasureId(Long householdMeasureId) {
        this.householdMeasureId = householdMeasureId;
        return this;
    }

    public void setHouseholdMeasureId(Long householdMeasureId) {
        this.householdMeasureId = householdMeasureId;
    }

    public Double getAmount() {
        return amount;
    }

    public MealProduct amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
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
        MealProduct mealProduct = (MealProduct) o;
        if (mealProduct.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealProduct.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealProduct{" +
            "id=" + getId() +
            ", productId=" + getProductId() +
            ", householdMeasureId=" + getHouseholdMeasureId() +
            ", amount=" + getAmount() +
            "}";
    }
}
