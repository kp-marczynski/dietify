package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.DishType} entity.
 */
public class DishTypeDTO implements Serializable {

    private Long id;

    /**
     * English description of dish type
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "English description of dish type", required = true)
    private String description;


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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DishTypeDTO dishTypeDTO = (DishTypeDTO) o;
        if (dishTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dishTypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DishTypeDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
