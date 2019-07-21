package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.DishTypeTranslation} entity.
 */
public class DishTypeTranslationDTO implements Serializable {

    private Long id;

    /**
     * Translated name of dish type
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Translated name of dish type", required = true)
    private String translation;

    /**
     * Language of translation as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language of translation as ISO_639-1 code", required = true)
    private String language;


    private Long dishTypeId;

    private String dishTypeDescription;

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

    public Long getDishTypeId() {
        return dishTypeId;
    }

    public void setDishTypeId(Long dishTypeId) {
        this.dishTypeId = dishTypeId;
    }

    public String getDishTypeDescription() {
        return dishTypeDescription;
    }

    public void setDishTypeDescription(String dishTypeDescription) {
        this.dishTypeDescription = dishTypeDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DishTypeTranslationDTO dishTypeTranslationDTO = (DishTypeTranslationDTO) o;
        if (dishTypeTranslationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dishTypeTranslationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DishTypeTranslationDTO{" +
            "id=" + getId() +
            ", translation='" + getTranslation() + "'" +
            ", language='" + getLanguage() + "'" +
            ", dishType=" + getDishTypeId() +
            ", dishType='" + getDishTypeDescription() + "'" +
            "}";
    }
}
