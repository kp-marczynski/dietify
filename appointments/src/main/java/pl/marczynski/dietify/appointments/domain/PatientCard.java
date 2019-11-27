package pl.marczynski.dietify.appointments.domain;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import pl.marczynski.dietify.appointments.domain.enumeration.Gender;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A PatientCard.
 */
@Entity
@Table(name = "patient_card")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PatientCard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Date when patient registered to dietitian
     */
    @NotNull
    @ApiModelProperty(value = "Date when patient registered to dietitian", required = true)
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    /**
     * Dietitian to which patient has signed. Id of User entity retrieved from gateway service.
     */
    @NotNull
    @ApiModelProperty(value = "Dietitian to which patient has signed. Id of User entity retrieved from gateway service.", required = true)
    @Column(name = "dietitian_id", nullable = false)
    private Long dietitianId;

    /**
     * Patient of dietitian. Id of User entity retrieved from gateway service.
     */
    @NotNull
    @ApiModelProperty(value = "Patient of dietitian. Id of User entity retrieved from gateway service.")
    @Column(name = "patient_id")
    private Long patientId;

    @Size(max = 50)
    @Column(name = "patient_last_name", length = 50)
    private String patientLastName;

    @Size(max = 50)
    @Column(name = "patient_first_name", length = 50)
    private String patientFirstName;

    /**
     * Gender
     */
    @ApiModelProperty(value = "Gender")
    @Enumerated(EnumType.STRING)
    @Column(name = "patient_gender")
    private Gender patientGender;

    @Email
    @Size(min = 5, max = 254)
    @Column(name = "patient_email")
    private String patientEmail;

    /**
     * Phone number. Preferably in format (+00) 000-000-000
     */
    @Size(min = 1, max = 50)
    @ApiModelProperty(value = "Phone number. Preferably in format (+00) 000-000-000")
    @Column(name = "patient_phone", length = 50)
    private String patientPhone;

    /**
     * Date of birth
     */
    @ApiModelProperty(value = "Date of birth")
    @Column(name = "patient_date_of_birth")
    private LocalDate patientDateOfBirth;

    /**
     * Short personal description
     */
    @ApiModelProperty(value = "Short personal description")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "additional_patient_info")
    private String additionalPatientInfo;

    @OneToMany(mappedBy = "patientCard")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Appointment> appointments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatientLastName() {
        return patientLastName;
    }

    public void setPatientLastName(String patientLastName) {
        this.patientLastName = patientLastName;
    }

    public String getPatientFirstName() {
        return patientFirstName;
    }

    public void setPatientFirstName(String patientFirstName) {
        this.patientFirstName = patientFirstName;
    }

    public Gender getPatientGender() {
        return patientGender;
    }

    public void setPatientGender(Gender patientGender) {
        this.patientGender = patientGender;
    }

    public String getPatientEmail() {
        return patientEmail;
    }

    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }

    public String getPatientPhone() {
        return patientPhone;
    }

    public void setPatientPhone(String patientPhone) {
        this.patientPhone = patientPhone;
    }

    public LocalDate getPatientDateOfBirth() {
        return patientDateOfBirth;
    }

    public void setPatientDateOfBirth(LocalDate patientDateOfBirth) {
        this.patientDateOfBirth = patientDateOfBirth;
    }

    public String getAdditionalPatientInfo() {
        return additionalPatientInfo;
    }

    public void setAdditionalPatientInfo(String additionalPatientInfo) {
        this.additionalPatientInfo = additionalPatientInfo;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Long getDietitianId() {
        return dietitianId;
    }

    public void setDietitianId(Long dietitianId) {
        this.dietitianId = dietitianId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
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
        if (!(o instanceof PatientCard)) {
            return false;
        }
        return id != null && id.equals(((PatientCard) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PatientCard{" +
            "id=" + getId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", dietitianId=" + getDietitianId() +
            ", patientId=" + getPatientId() +
            "}";
    }
}
