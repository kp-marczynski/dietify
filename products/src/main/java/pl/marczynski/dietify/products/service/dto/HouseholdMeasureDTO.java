package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.HouseholdMeasure} entity.
 */
public class HouseholdMeasureDTO implements Serializable {

    private Long id;

    /**
     * Short description of measure in language of a product, e.g. \"cup\" or \"tea spoon\"
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Short description of measure in language of a product, e.g. \"cup\" or \"tea spoon\"", required = true)
    private String description;

    /**
     * Grams weight of 1 unit of specified measure
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Grams weight of 1 unit of specified measure", required = true)
    private Double gramsWeight;

    /**
     * Flag specifying if measure is visible on presentation layer. By default it is initially set to false for data imported from external sources
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if measure is visible on presentation layer. By default it is initially set to false for data imported from external sources", required = true)
    private Boolean isVisible;


    private Long productId;

    private String productDescription;

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

        HouseholdMeasureDTO householdMeasureDTO = (HouseholdMeasureDTO) o;
        if (householdMeasureDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), householdMeasureDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HouseholdMeasureDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", gramsWeight=" + getGramsWeight() +
            ", isVisible='" + isIsVisible() + "'" +
            ", product=" + getProductId() +
            ", product='" + getProductDescription() + "'" +
            "}";
    }
}
