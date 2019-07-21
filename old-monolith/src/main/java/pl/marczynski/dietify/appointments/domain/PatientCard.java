package pl.marczynski.dietify.appointments.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Patient's card
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A Patient's card @author Krzysztof Marczyński")
@Entity
@Table(name = "patient_card")
public class PatientCard implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    /**
     * Patient for whom card was created
     */
    @ApiModelProperty(value = "Patient for whom card was created")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("patientCards")
    private Patient patient;

    /**
     * Dietetician responsible for patient's card
     */
    @ApiModelProperty(value = "Dietetician responsible for patient's card")
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("patientcards")
    private Dietetician dietetician;

    /**
     * Collection of appointments
     */
    @ApiModelProperty(value = "Collection of appointments")
    @OneToMany(mappedBy = "patientCard")
    private Set<Appointment> appointments = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public PatientCard creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Patient getPatient() {
        return patient;
    }

    public PatientCard patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Dietetician getDietetician() {
        return dietetician;
    }

    public PatientCard dietetician(Dietetician dietetician) {
        this.dietetician = dietetician;
        return this;
    }

    public void setDietetician(Dietetician dietetician) {
        this.dietetician = dietetician;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public PatientCard appointments(Set<Appointment> appointments) {
        this.appointments = appointments;
        return this;
    }

    public PatientCard addAppointments(Appointment appointment) {
        this.appointments.add(appointment);
        appointment.setPatientCard(this);
        return this;
    }

    public PatientCard removeAppointments(Appointment appointment) {
        this.appointments.remove(appointment);
        appointment.setPatientCard(null);
        return this;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
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
        PatientCard patientCard = (PatientCard) o;
        if (patientCard.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patientCard.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PatientCard{" +
            "id=" + getId() +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
