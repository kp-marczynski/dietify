package pl.marczynski.dietify.recipes.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.recipes.domain.KitchenAppliance} entity.
 */
public class KitchenApplianceDTO implements Serializable {

    private Long id;

    /**
     * English name of kitchen appliance
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "English name of kitchen appliance", required = true)
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

        KitchenApplianceDTO kitchenApplianceDTO = (KitchenApplianceDTO) o;
        if (kitchenApplianceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), kitchenApplianceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KitchenApplianceDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
