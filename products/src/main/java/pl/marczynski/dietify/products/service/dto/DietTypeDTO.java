package pl.marczynski.dietify.products.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.products.domain.DietType} entity.
 */
public class DietTypeDTO implements Serializable {

    private Long id;

    /**
     * Short description of diet type in English
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Short description of diet type in English", required = true)
    private String name;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DietTypeDTO dietTypeDTO = (DietTypeDTO) o;
        if (dietTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dietTypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DietTypeDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
