package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.NutritionDefinition} entity.
 */
public class NutritionDefinitionDTO implements Serializable {

    private Long id;

    /**
     * Short tag name of nutrient
     */
    @NotNull
    @Size(min = 1, max = 20)
    @ApiModelProperty(value = "Short tag name of nutrient", required = true)
    private String tag;

    /**
     * Short description of nutrient in English
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Short description of nutrient in English", required = true)
    private String description;

    /**
     * Unit used for nutrient measurement, e.g. \"g\", \"kcal\", \"ml\"
     */
    @NotNull
    @Size(min = 1, max = 10)
    @ApiModelProperty(value = "Unit used for nutrient measurement, e.g. \"g\", \"kcal\", \"ml\"", required = true)
    private String units;

    /**
     * Decimal places to which nutrient value should be rounded
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Decimal places to which nutrient value should be rounded", required = true)
    private Integer decimalPlaces;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public Integer getDecimalPlaces() {
        return decimalPlaces;
    }

    public void setDecimalPlaces(Integer decimalPlaces) {
        this.decimalPlaces = decimalPlaces;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NutritionDefinitionDTO nutritionDefinitionDTO = (NutritionDefinitionDTO) o;
        if (nutritionDefinitionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nutritionDefinitionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NutritionDefinitionDTO{" +
            "id=" + getId() +
            ", tag='" + getTag() + "'" +
            ", description='" + getDescription() + "'" +
            ", units='" + getUnits() + "'" +
            ", decimalPlaces=" + getDecimalPlaces() +
            "}";
    }
}
