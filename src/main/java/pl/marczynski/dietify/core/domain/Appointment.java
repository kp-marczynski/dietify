package pl.marczynski.dietify.core.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import pl.marczynski.dietify.core.domain.enumeration.AppointmentState;

/**
 * An appointment
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "An appointment @author Krzysztof Marczyński")
@Entity
@Table(name = "appointment")
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Date of the appointment
     */
    @NotNull
    @ApiModelProperty(value = "Date of the appointment", required = true)
    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    /**
     * Current appointment state
     */
    @ApiModelProperty(value = "Current appointment state")
    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_state")
    private AppointmentState appointmentState;

    /**
     * Meal plan designed for patient
     */
    @ApiModelProperty(value = "Meal plan designed for patient")
    @Column(name = "meal_plan_id")
    private Long mealPlanId;

    /**
     * General advice after appointment
     */
    @ApiModelProperty(value = "General advice after appointment")
    @Lob
    @Column(name = "general_advice")
    private String generalAdvice;

    /**
     * Body Measurments conducted on appointment
     */
    @ApiModelProperty(value = "Body Measurments conducted on appointment")
    @OneToOne
    @JoinColumn(unique = true)
    private BodyMeasurment bodyMeasurment;

    /**
     * PatientCard for which appointment was created
     */
    @ApiModelProperty(value = "PatientCard for which appointment was created")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("appointments")
    private PatientCard patientCard;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public Appointment appointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
        return this;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public AppointmentState getAppointmentState() {
        return appointmentState;
    }

    public Appointment appointmentState(AppointmentState appointmentState) {
        this.appointmentState = appointmentState;
        return this;
    }

    public void setAppointmentState(AppointmentState appointmentState) {
        this.appointmentState = appointmentState;
    }

    public Long getMealPlanId() {
        return mealPlanId;
    }

    public Appointment mealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
        return this;
    }

    public void setMealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
    }

    public String getGeneralAdvice() {
        return generalAdvice;
    }

    public Appointment generalAdvice(String generalAdvice) {
        this.generalAdvice = generalAdvice;
        return this;
    }

    public void setGeneralAdvice(String generalAdvice) {
        this.generalAdvice = generalAdvice;
    }

    public BodyMeasurment getBodyMeasurment() {
        return bodyMeasurment;
    }

    public Appointment bodyMeasurment(BodyMeasurment bodyMeasurment) {
        this.bodyMeasurment = bodyMeasurment;
        return this;
    }

    public void setBodyMeasurment(BodyMeasurment bodyMeasurment) {
        this.bodyMeasurment = bodyMeasurment;
    }

    public PatientCard getPatientCard() {
        return patientCard;
    }

    public Appointment patientCard(PatientCard patientCard) {
        this.patientCard = patientCard;
        return this;
    }

    public void setPatientCard(PatientCard patientCard) {
        this.patientCard = patientCard;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Appointment appointment = (Appointment) o;
        if (appointment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appointment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Appointment{" +
            "id=" + getId() +
            ", appointmentDate='" + getAppointmentDate() + "'" +
            ", appointmentState='" + getAppointmentState() + "'" +
            ", mealPlanId=" + getMealPlanId() +
            ", generalAdvice='" + getGeneralAdvice() + "'" +
            "}";
    }
}
