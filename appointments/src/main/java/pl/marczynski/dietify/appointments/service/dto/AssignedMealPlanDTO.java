package pl.marczynski.dietify.appointments.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.appointments.domain.AssignedMealPlan} entity.
 */
public class AssignedMealPlanDTO implements Serializable {

    private Long id;

    /**
     * Id of assigned MealPlan entity retrieved from mealplans service
     */
    @NotNull
    @ApiModelProperty(value = "Id of assigned MealPlan entity retrieved from mealplans service", required = true)
    private Long mealPlanId;


    private Long appointmentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMealPlanId() {
        return mealPlanId;
    }

    public void setMealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AssignedMealPlanDTO assignedMealPlanDTO = (AssignedMealPlanDTO) o;
        if (assignedMealPlanDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignedMealPlanDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AssignedMealPlanDTO{" +
            "id=" + getId() +
            ", mealPlanId=" + getMealPlanId() +
            ", appointment=" + getAppointmentId() +
            "}";
    }
}
