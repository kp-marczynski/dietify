package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.Product} entity.
 */
public class ProductDTO implements Serializable {

    private Long id;

    /**
     * Specifying source if product is imported, preferably url address if possible
     */
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Specifying source if product is imported, preferably url address if possible")
    private String source;

    /**
     * Author of product if product created or edited manually. Id of User entity retrieved from gateway service
     */
    @ApiModelProperty(value = "Author of product if product created or edited manually. Id of User entity retrieved from gateway service")
    private Long authorId;

    /**
     * Short description of Product in a language of a product
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Short description of Product in a language of a product", required = true)
    private String description;

    /**
     * Flag specifying if product is final or editable
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if product is final or editable", required = true)
    private Boolean isFinal;

    /**
     * Flag specifying if product is verified. All products retrieved from external sources should be checked for eligibility to use and therefore initially this flag is set to false for these.
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if product is verified. All products retrieved from external sources should be checked for eligibility to use and therefore initially this flag is set to false for these.", required = true)
    private Boolean isVerified;

    /**
     * Language tag of a product as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language tag of a product as ISO_639-1 code", required = true)
    private String language;


    private Long subcategoryId;

    private String subcategoryDescription;

    private Set<DietTypeDTO> suitableDiets = new HashSet<>();

    private Set<DietTypeDTO> unsuitableDiets = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isIsFinal() {
        return isFinal;
    }

    public void setIsFinal(Boolean isFinal) {
        this.isFinal = isFinal;
    }

    public Boolean isIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Long getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(Long productSubcategoryId) {
        this.subcategoryId = productSubcategoryId;
    }

    public String getSubcategoryDescription() {
        return subcategoryDescription;
    }

    public void setSubcategoryDescription(String productSubcategoryDescription) {
        this.subcategoryDescription = productSubcategoryDescription;
    }

    public Set<DietTypeDTO> getSuitableDiets() {
        return suitableDiets;
    }

    public void setSuitableDiets(Set<DietTypeDTO> dietTypes) {
        this.suitableDiets = dietTypes;
    }

    public Set<DietTypeDTO> getUnsuitableDiets() {
        return unsuitableDiets;
    }

    public void setUnsuitableDiets(Set<DietTypeDTO> dietTypes) {
        this.unsuitableDiets = dietTypes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if (productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", source='" + getSource() + "'" +
            ", authorId=" + getAuthorId() +
            ", description='" + getDescription() + "'" +
            ", isFinal='" + isIsFinal() + "'" +
            ", isVerified='" + isIsVerified() + "'" +
            ", language='" + getLanguage() + "'" +
            ", subcategory=" + getSubcategoryId() +
            ", subcategory='" + getSubcategoryDescription() + "'" +
            "}";
    }
}
