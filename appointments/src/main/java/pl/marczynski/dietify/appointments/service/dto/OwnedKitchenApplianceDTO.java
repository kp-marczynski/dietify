package pl.marczynski.dietify.appointments.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.appointments.domain.OwnedKitchenAppliance} entity.
 */
public class OwnedKitchenApplianceDTO implements Serializable {

    private Long id;

    /**
     * Id of KitchenAppliance entity retrieved from recipes service
     */
    @NotNull
    @ApiModelProperty(value = "Id of KitchenAppliance entity retrieved from recipes service", required = true)
    private Long kitchenApplianceId;


    private Long nutritionalInterviewId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getKitchenApplianceId() {
        return kitchenApplianceId;
    }

    public void setKitchenApplianceId(Long kitchenApplianceId) {
        this.kitchenApplianceId = kitchenApplianceId;
    }

    public Long getNutritionalInterviewId() {
        return nutritionalInterviewId;
    }

    public void setNutritionalInterviewId(Long nutritionalInterviewId) {
        this.nutritionalInterviewId = nutritionalInterviewId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OwnedKitchenApplianceDTO ownedKitchenApplianceDTO = (OwnedKitchenApplianceDTO) o;
        if (ownedKitchenApplianceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ownedKitchenApplianceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OwnedKitchenApplianceDTO{" +
            "id=" + getId() +
            ", kitchenApplianceId=" + getKitchenApplianceId() +
            ", nutritionalInterview=" + getNutritionalInterviewId() +
            "}";
    }
}
