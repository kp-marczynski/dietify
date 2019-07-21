package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.ProductPortion} entity.
 */
public class ProductPortionDTO implements Serializable {

    private Long id;

    /**
     * Amount of product in household measure units. If household measure is null then amount is in grams
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Amount of product in household measure units. If household measure is null then amount is in grams", required = true)
    private Double amount;

    /**
     * Id of Product entity retrieved form products service
     */
    @NotNull
    @ApiModelProperty(value = "Id of Product entity retrieved form products service", required = true)
    private Long productId;

    /**
     * Id of HouseholdMeasure entity retrieved from products service
     */
    @ApiModelProperty(value = "Id of HouseholdMeasure entity retrieved from products service")
    private Long householdMeasureId;


    private Long recipeSectionId;

    private String recipeSectionSectionName;

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

        ProductPortionDTO productPortionDTO = (ProductPortionDTO) o;
        if (productPortionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productPortionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductPortionDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", productId=" + getProductId() +
            ", householdMeasureId=" + getHouseholdMeasureId() +
            ", recipeSection=" + getRecipeSectionId() +
            ", recipeSection='" + getRecipeSectionSectionName() + "'" +
            "}";
    }
}
