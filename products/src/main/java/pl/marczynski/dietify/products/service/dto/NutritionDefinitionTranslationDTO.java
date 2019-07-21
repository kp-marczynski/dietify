package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.NutritionDefinitionTranslation} entity.
 */
public class NutritionDefinitionTranslationDTO implements Serializable {

    private Long id;

    /**
     * Translated description of nutrition definition
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Translated description of nutrition definition", required = true)
    private String translation;

    /**
     * Language of translation as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language of translation as ISO_639-1 code", required = true)
    private String language;


    private Long nutritionDefinitionsId;

    private String nutritionDefinitionsTag;

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

    public Long getNutritionDefinitionsId() {
        return nutritionDefinitionsId;
    }

    public void setNutritionDefinitionsId(Long nutritionDefinitionId) {
        this.nutritionDefinitionsId = nutritionDefinitionId;
    }

    public String getNutritionDefinitionsTag() {
        return nutritionDefinitionsTag;
    }

    public void setNutritionDefinitionsTag(String nutritionDefinitionTag) {
        this.nutritionDefinitionsTag = nutritionDefinitionTag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NutritionDefinitionTranslationDTO nutritionDefinitionTranslationDTO = (NutritionDefinitionTranslationDTO) o;
        if (nutritionDefinitionTranslationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nutritionDefinitionTranslationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NutritionDefinitionTranslationDTO{" +
            "id=" + getId() +
            ", translation='" + getTranslation() + "'" +
            ", language='" + getLanguage() + "'" +
            ", nutritionDefinitions=" + getNutritionDefinitionsId() +
            ", nutritionDefinitions='" + getNutritionDefinitionsTag() + "'" +
            "}";
    }
}
