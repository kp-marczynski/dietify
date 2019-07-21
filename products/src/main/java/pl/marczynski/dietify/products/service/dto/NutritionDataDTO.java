package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.NutritionData} entity.
 */
public class NutritionDataDTO implements Serializable {

    private Long id;

    /**
     * Nutrition value in units specified in NutritionDefinition
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Nutrition value in units specified in NutritionDefinition", required = true)
    private Double nutritionValue;


    private Long nutritionDefinitionId;

    private String nutritionDefinitionTag;

    private Long productId;

    private String productDescription;

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

    public Long getNutritionDefinitionId() {
        return nutritionDefinitionId;
    }

    public void setNutritionDefinitionId(Long nutritionDefinitionId) {
        this.nutritionDefinitionId = nutritionDefinitionId;
    }

    public String getNutritionDefinitionTag() {
        return nutritionDefinitionTag;
    }

    public void setNutritionDefinitionTag(String nutritionDefinitionTag) {
        this.nutritionDefinitionTag = nutritionDefinitionTag;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NutritionDataDTO nutritionDataDTO = (NutritionDataDTO) o;
        if (nutritionDataDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nutritionDataDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NutritionDataDTO{" +
            "id=" + getId() +
            ", nutritionValue=" + getNutritionValue() +
            ", nutritionDefinition=" + getNutritionDefinitionId() +
            ", nutritionDefinition='" + getNutritionDefinitionTag() + "'" +
            ", product=" + getProductId() +
            ", product='" + getProductDescription() + "'" +
            "}";
    }
}
