package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.KitchenApplianceTranslation} entity.
 */
public class KitchenApplianceTranslationDTO implements Serializable {

    private Long id;

    /**
     * Translated name of kitchen appliance
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Translated name of kitchen appliance", required = true)
    private String translation;

    /**
     * Language of translation as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language of translation as ISO_639-1 code", required = true)
    private String language;


    private Long kitchenApplianceId;

    private String kitchenApplianceName;

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

    public Long getKitchenApplianceId() {
        return kitchenApplianceId;
    }

    public void setKitchenApplianceId(Long kitchenApplianceId) {
        this.kitchenApplianceId = kitchenApplianceId;
    }

    public String getKitchenApplianceName() {
        return kitchenApplianceName;
    }

    public void setKitchenApplianceName(String kitchenApplianceName) {
        this.kitchenApplianceName = kitchenApplianceName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO = (KitchenApplianceTranslationDTO) o;
        if (kitchenApplianceTranslationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), kitchenApplianceTranslationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KitchenApplianceTranslationDTO{" +
            "id=" + getId() +
            ", translation='" + getTranslation() + "'" +
            ", language='" + getLanguage() + "'" +
            ", kitchenAppliance=" + getKitchenApplianceId() +
            ", kitchenAppliance='" + getKitchenApplianceName() + "'" +
            "}";
    }
}
