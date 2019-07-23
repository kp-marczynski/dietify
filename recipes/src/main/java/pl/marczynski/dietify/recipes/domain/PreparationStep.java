package pl.marczynski.dietify.recipes.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A PreparationStep.
 */
@Entity
@Table(name = "preparation_step")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "preparationstep")
public class PreparationStep implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
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
     * Preferably short step description
     */
    @ApiModelProperty(value = "Preferably short step description")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "step_description")
    private String stepDescription;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("preparationSteps")
    private RecipeSection recipeSection;

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

    public void setOrdinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    public String getStepDescription() {
        return stepDescription;
    }

    public void setStepDescription(String stepDescription) {
        this.stepDescription = stepDescription;
    }

    public RecipeSection getRecipeSection() {
        return recipeSection;
    }

    public void setRecipeSection(RecipeSection recipeSection) {
        this.recipeSection = recipeSection;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PreparationStep)) {
            return false;
        }
        return id != null && id.equals(((PreparationStep) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
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
