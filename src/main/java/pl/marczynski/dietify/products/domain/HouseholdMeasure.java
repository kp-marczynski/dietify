package pl.marczynski.dietify.products.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A household measures of product with weight in grams.
 * Data initially retrieved form USDA Standard Reference database.
 *
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A household measures of product with weight in grams. Data initially retrieved form USDA Standard Reference database. @author Krzysztof Marczyński")
@Entity
@Table(name = "household_measure")
public class HouseholdMeasure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Short description of measure, e.g. \"cup\" or \"tea spoon\"
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short description of measure, e.g. \"cup\" or \"tea spoon\"", required = true)
    @Column(name = "description", nullable = false)
    private String description;

    /**
     * Grams weight of 1 unit of specified measure
     */
    @NotNull
    @DecimalMin(value = "0.00001")
    @ApiModelProperty(value = "Grams weight of 1 unit of specified measure", required = true)
    @Column(name = "grams_weight", nullable = false)
    private Double gramsWeight;

    /**
     * Flag specifying if measure is visible on presentation layer.
     * By default it is inittially set to false for data imported from external sources
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if measure is visible on presentation layer. By default it is inittially set to false for data imported from external sources", required = true)
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

    public HouseholdMeasure description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getGramsWeight() {
        return gramsWeight;
    }

    public HouseholdMeasure gramsWeight(Double gramsWeight) {
        this.gramsWeight = gramsWeight;
        return this;
    }

    public void setGramsWeight(Double gramsWeight) {
        this.gramsWeight = gramsWeight;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public HouseholdMeasure isVisible(Boolean isVisible) {
        this.isVisible = isVisible;
        return this;
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        HouseholdMeasure householdMeasure = (HouseholdMeasure) o;
        if (householdMeasure.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), householdMeasure.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
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
