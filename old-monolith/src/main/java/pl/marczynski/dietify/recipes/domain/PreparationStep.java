package pl.marczynski.dietify.recipes.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A preparation step in recipe
 *
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A preparation step in recipe @author Krzysztof Marczyński")
@Entity
@Table(name = "preparation_step")
public class PreparationStep implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Ordinal number of preparation step
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Ordinal number of preparation step", required = true)
    @Column(name = "ordinal_number", nullable = false)
    private Integer ordinalNumber;

    /**
     * Short step description
     */
    @Size(min = 1)
    @ApiModelProperty(value = "Short step description")
    @Column(name = "step_description")
    private String stepDescription;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdinalNumber() {
        return ordinalNumber;
    }

    public PreparationStep ordinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
        return this;
    }

    public void setOrdinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    public String getStepDescription() {
        return stepDescription;
    }

    public PreparationStep stepDescription(String stepDescription) {
        this.stepDescription = stepDescription;
        return this;
    }

    public void setStepDescription(String stepDescription) {
        this.stepDescription = stepDescription;
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
        PreparationStep preparationStep = (PreparationStep) o;
        if (preparationStep.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), preparationStep.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PreparationStep{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", stepDescription='" + getStepDescription() + "'" +
            "}";
    }
}
