package pl.marczynski.dietify.products.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A HouseholdMeasure.
 */
@Entity
@Table(name = "household_measure")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "householdmeasure")
public class HouseholdMeasure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Short description of measure in language of a product, e.g. \"cup\" or \"tea spoon\"
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Short description of measure in language of a product, e.g. \"cup\" or \"tea spoon\"", required = true)
    @Column(name = "description", length = 255, nullable = false)
    private String description;

    /**
     * Grams weight of 1 unit of specified measure
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Grams weight of 1 unit of specified measure", required = true)
    @Column(name = "grams_weight", nullable = false)
    private Double gramsWeight;

    /**
     * Flag specifying if measure is visible on presentation layer. By default it is initially set to false for data imported from external sources
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if measure is visible on presentation layer. By default it is initially set to false for data imported from external sources", required = true)
    @Column(name = "is_visible", nullable = false)
    private Boolean isVisible;

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

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getGramsWeight() {
        return gramsWeight;
    }

    public void setGramsWeight(Double gramsWeight) {
        this.gramsWeight = gramsWeight;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HouseholdMeasure)) {
            return false;
        }
        return id != null && id.equals(((HouseholdMeasure) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "HouseholdMeasure{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", gramsWeight=" + getGramsWeight() +
            ", isVisible='" + isIsVisible() + "'" +
            "}";
    }
}
