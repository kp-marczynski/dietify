package pl.marczynski.dietify.mealplans.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A MealProduct.
 */
@Entity
@Table(name = "meal_product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "mealproduct")
public class MealProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Id of Product entity retrieved from Products service
     */
    @NotNull
    @ApiModelProperty(value = "Id of Product entity retrieved from Products service", required = true)
    @Column(name = "product_id", nullable = false)
    private Long productId;

    /**
     * Id of HouseholdMeasure entity retrieved from Products service
     */
    @ApiModelProperty(value = "Id of HouseholdMeasure entity retrieved from Products service")
    @Column(name = "household_measure_id")
    private Long householdMeasureId;

    /**
     * Amount of Product in household measure units. If household measure is null then amount is in grams.
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Amount of Product in household measure units. If household measure is null then amount is in grams.", required = true)
    @Column(name = "amount", nullable = false)
    private Double amount;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("mealProducts")
    private Meal meal;

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

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getHouseholdMeasureId() {
        return householdMeasureId;
    }

    public void setHouseholdMeasureId(Long householdMeasureId) {
        this.householdMeasureId = householdMeasureId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MealProduct)) {
            return false;
        }
        return id != null && id.equals(((MealProduct) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
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
