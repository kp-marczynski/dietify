package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.PreparationStep} entity.
 */
public class PreparationStepDTO implements Serializable {

    private Long id;

    /**
     * Ordinal number of preparation step
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Ordinal number of preparation step", required = true)
    private Integer ordinalNumber;

    /**
     * Preferably short step description
     */
    @ApiModelProperty(value = "Preferably short step description")
    @Lob
    private String stepDescription;


    private Long recipeSectionId;

    private String recipeSectionSectionName;

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

    public Long getRecipeSectionId() {
        return recipeSectionId;
    }

    public void setRecipeSectionId(Long recipeSectionId) {
        this.recipeSectionId = recipeSectionId;
    }

    public String getRecipeSectionSectionName() {
        return recipeSectionSectionName;
    }

    public void setRecipeSectionSectionName(String recipeSectionSectionName) {
        this.recipeSectionSectionName = recipeSectionSectionName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PreparationStepDTO preparationStepDTO = (PreparationStepDTO) o;
        if (preparationStepDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), preparationStepDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PreparationStepDTO{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", stepDescription='" + getStepDescription() + "'" +
            ", recipeSection=" + getRecipeSectionId() +
            ", recipeSection='" + getRecipeSectionSectionName() + "'" +
            "}";
    }
}
