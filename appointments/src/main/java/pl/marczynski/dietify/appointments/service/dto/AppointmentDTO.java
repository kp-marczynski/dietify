package pl.marczynski.dietify.appointments.service.dto;
import io.swagger.annotations.ApiModelProperty;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import pl.marczynski.dietify.appointments.domain.enumeration.AppointmentState;

/**
 * A DTO for the {@link pl.marczynski.dietify.appointments.domain.Appointment} entity.
 */
public class AppointmentDTO implements Serializable {

    private Long id;

    /**
     * Date and time of the appointment
     */
    @NotNull
    @ApiModelProperty(value = "Date and time of the appointment", required = true)
    private Instant appointmentDate;

    /**
     * Current appointment state
     */
    @NotNull
    @ApiModelProperty(value = "Current appointment state", required = true)
    private AppointmentState appointmentState;

    /**
     * Meal plan designed for patient. Id of MealPlan entity retrieved from mealplans service
     */
    @ApiModelProperty(value = "Meal plan designed for patient. Id of MealPlan entity retrieved from mealplans service")
    private Long mealPlanId;

    /**
     * General advice after appointment
     */
    @ApiModelProperty(value = "General advice after appointment")
    @Lob
    private String generalAdvice;


    private Long patientCardId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Instant appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public AppointmentState getAppointmentState() {
        return appointmentState;
    }

    public void setAppointmentState(AppointmentState appointmentState) {
        this.appointmentState = appointmentState;
    }

    public Long getMealPlanId() {
        return mealPlanId;
    }

    public void setMealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
    }

    public String getGeneralAdvice() {
        return generalAdvice;
    }

    public void setGeneralAdvice(String generalAdvice) {
        this.generalAdvice = generalAdvice;
    }

    public Long getPatientCardId() {
        return patientCardId;
    }

    public void setPatientCardId(Long patientCardId) {
        this.patientCardId = patientCardId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AppointmentDTO appointmentDTO = (AppointmentDTO) o;
        if (appointmentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appointmentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AppointmentDTO{" +
            "id=" + getId() +
            ", appointmentDate='" + getAppointmentDate() + "'" +
            ", appointmentState='" + getAppointmentState() + "'" +
            ", mealPlanId=" + getMealPlanId() +
            ", generalAdvice='" + getGeneralAdvice() + "'" +
            ", patientCard=" + getPatientCardId() +
            "}";
    }
}
