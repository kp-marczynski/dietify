package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.ProductBasicNutritionData} entity.
 */
public class ProductBasicNutritionDataDTO implements Serializable {

    private Long id;

    /**
     * Energy in kcal per 100 gram of product
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Energy in kcal per 100 gram of product", required = true)
    private Integer energy;

    /**
     * Protein in grams per 100 gram of product
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Protein in grams per 100 gram of product", required = true)
    private Integer protein;

    /**
     * Fat in grams per 100 gram of product
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Fat in grams per 100 gram of product", required = true)
    private Integer fat;

    /**
     * Carbohydrates in grams per 100 gram of product
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Carbohydrates in grams per 100 gram of product", required = true)
    private Integer carbohydrates;


    private Long productId;

    private String productDescription;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getEnergy() {
        return energy;
    }

    public void setEnergy(Integer energy) {
        this.energy = energy;
    }

    public Integer getProtein() {
        return protein;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }

    public Integer getFat() {
        return fat;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public Integer getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Integer carbohydrates) {
        this.carbohydrates = carbohydrates;
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

        ProductBasicNutritionDataDTO productBasicNutritionDataDTO = (ProductBasicNutritionDataDTO) o;
        if (productBasicNutritionDataDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productBasicNutritionDataDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductBasicNutritionDataDTO{" +
            "id=" + getId() +
            ", energy=" + getEnergy() +
            ", protein=" + getProtein() +
            ", fat=" + getFat() +
            ", carbohydrates=" + getCarbohydrates() +
            ", product=" + getProductId() +
            ", product='" + getProductDescription() + "'" +
            "}";
    }
}
