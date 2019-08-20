package pl.marczynski.dietify.appointments.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import pl.marczynski.dietify.appointments.domain.enumeration.AppointmentState;

/**
 * A Appointment.
 */
@Entity
@Table(name = "appointment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Date and time of the appointment
     */
    @NotNull
    @ApiModelProperty(value = "Date and time of the appointment", required = true)
    @Column(name = "appointment_date", nullable = false)
    private Instant appointmentDate;

    /**
     * Current appointment state
     */
    @NotNull
    @ApiModelProperty(value = "Current appointment state", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_state", nullable = false)
    private AppointmentState appointmentState;

    /**
     * General advice after appointment
     */
    @ApiModelProperty(value = "General advice after appointment")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "general_advice")
    private String generalAdvice;

    @OneToOne(optional = false, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(unique = true)
    private BodyMeasurement bodyMeasurement;

    @OneToOne(optional = false, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(unique = true)
    private NutritionalInterview nutritionalInterview;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "appointment_id", nullable = false)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AssignedMealPlan> mealPlans = new HashSet<>();

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

    public String getGeneralAdvice() {
        return generalAdvice;
    }

    public void setGeneralAdvice(String generalAdvice) {
        this.generalAdvice = generalAdvice;
    }

    public BodyMeasurement getBodyMeasurement() {
        return bodyMeasurement;
    }

    public void setBodyMeasurement(BodyMeasurement bodyMeasurement) {
        this.bodyMeasurement = bodyMeasurement;
    }

    public NutritionalInterview getNutritionalInterview() {
        return nutritionalInterview;
    }

    public void setNutritionalInterview(NutritionalInterview nutritionalInterview) {
        this.nutritionalInterview = nutritionalInterview;
    }

    public Set<AssignedMealPlan> getMealPlans() {
        return mealPlans;
    }

    public void setMealPlans(Set<AssignedMealPlan> assignedMealPlans) {
        this.mealPlans = assignedMealPlans;
    }

    public PatientCard getPatientCard() {
        return patientCard;
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
        if (!(o instanceof Appointment)) {
            return false;
        }
        return id != null && id.equals(((Appointment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Appointment{" +
            "id=" + getId() +
            ", appointmentDate='" + getAppointmentDate() + "'" +
            ", appointmentState='" + getAppointmentState() + "'" +
            ", generalAdvice='" + getGeneralAdvice() + "'" +
            "}";
    }
}
