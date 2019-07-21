package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.ProductSubcategory} entity.
 */
public class ProductSubcategoryDTO implements Serializable {

    private Long id;

    /**
     * Short description of subcategory in language of a product
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Short description of subcategory in language of a product", required = true)
    private String description;


    private Long categoryId;

    private String categoryDescription;

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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long productCategoryId) {
        this.categoryId = productCategoryId;
    }

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public void setCategoryDescription(String productCategoryDescription) {
        this.categoryDescription = productCategoryDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductSubcategoryDTO productSubcategoryDTO = (ProductSubcategoryDTO) o;
        if (productSubcategoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productSubcategoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductSubcategoryDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", category=" + getCategoryId() +
            ", category='" + getCategoryDescription() + "'" +
            "}";
    }
}
