package pl.marczynski.dietify.recipes.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A ProductPortion.
 */
@Entity
@Table(name = "product_portion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "productportion")
public class ProductPortion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Amount of product in household measure units. If household measure is null then amount is in grams
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Amount of product in household measure units. If household measure is null then amount is in grams", required = true)
    @Column(name = "amount", nullable = false)
    private Double amount;

    /**
     * Id of Product entity retrieved form products service
     */
    @NotNull
    @ApiModelProperty(value = "Id of Product entity retrieved form products service", required = true)
    @Column(name = "product_id", nullable = false)
    private Long productId;

    /**
     * Id of HouseholdMeasure entity retrieved from products service
     */
    @ApiModelProperty(value = "Id of HouseholdMeasure entity retrieved from products service")
    @Column(name = "household_measure_id")
    private Long householdMeasureId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
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

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductPortion)) {
            return false;
        }
        return id != null && id.equals(((ProductPortion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProductPortion{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", productId=" + getProductId() +
            ", householdMeasureId=" + getHouseholdMeasureId() +
            "}";
    }
}
