package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.ProductCategoryTranslation} entity.
 */
public class ProductCategoryTranslationDTO implements Serializable {

    private Long id;

    /**
     * Translated name of product category
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Translated name of product category", required = true)
    private String translation;

    /**
     * Language of translation as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language of translation as ISO_639-1 code", required = true)
    private String language;


    private Long productCategoryId;

    private String productCategoryDescription;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Long getProductCategoryId() {
        return productCategoryId;
    }

    public void setProductCategoryId(Long productCategoryId) {
        this.productCategoryId = productCategoryId;
    }

    public String getProductCategoryDescription() {
        return productCategoryDescription;
    }

    public void setProductCategoryDescription(String productCategoryDescription) {
        this.productCategoryDescription = productCategoryDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductCategoryTranslationDTO productCategoryTranslationDTO = (ProductCategoryTranslationDTO) o;
        if (productCategoryTranslationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productCategoryTranslationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductCategoryTranslationDTO{" +
            "id=" + getId() +
            ", translation='" + getTranslation() + "'" +
            ", language='" + getLanguage() + "'" +
            ", productCategory=" + getProductCategoryId() +
            ", productCategory='" + getProductCategoryDescription() + "'" +
            "}";
    }
}
