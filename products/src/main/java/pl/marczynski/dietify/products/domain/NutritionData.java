package pl.marczynski.dietify.products.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A NutritionData.
 */
@Entity
@Table(name = "nutrition_data")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "nutritiondata")
public class NutritionData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Nutrition value in units specified in NutritionDefinition
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Nutrition value in units specified in NutritionDefinition", required = true)
    @Column(name = "nutrition_value", nullable = false)
    private Double nutritionValue;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("nutritionData")
    private NutritionDefinition nutritionDefinition;

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

    public void setNutritionValue(Double nutritionValue) {
        this.nutritionValue = nutritionValue;
    }

    public NutritionDefinition getNutritionDefinition() {
        return nutritionDefinition;
    }

    public void setNutritionDefinition(NutritionDefinition nutritionDefinition) {
        this.nutritionDefinition = nutritionDefinition;
    }

    public Product getProduct() {
        return product;
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
        if (!(o instanceof NutritionData)) {
            return false;
        }
        return id != null && id.equals(((NutritionData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NutritionData{" +
            "id=" + getId() +
            ", nutritionValue=" + getNutritionValue() +
            "}";
    }
}
