package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.DietTypeTranslation} entity.
 */
public class DietTypeTranslationDTO implements Serializable {

    private Long id;

    /**
     * Translated name of diet type
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Translated name of diet type", required = true)
    private String translation;

    /**
     * Language of translation as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language of translation as ISO_639-1 code", required = true)
    private String language;


    private Long dietTypeId;

    private String dietTypeName;

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

    public Long getDietTypeId() {
        return dietTypeId;
    }

    public void setDietTypeId(Long dietTypeId) {
        this.dietTypeId = dietTypeId;
    }

    public String getDietTypeName() {
        return dietTypeName;
    }

    public void setDietTypeName(String dietTypeName) {
        this.dietTypeName = dietTypeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DietTypeTranslationDTO dietTypeTranslationDTO = (DietTypeTranslationDTO) o;
        if (dietTypeTranslationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dietTypeTranslationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DietTypeTranslationDTO{" +
            "id=" + getId() +
            ", translation='" + getTranslation() + "'" +
            ", language='" + getLanguage() + "'" +
            ", dietType=" + getDietTypeId() +
            ", dietType='" + getDietTypeName() + "'" +
            "}";
    }
}
