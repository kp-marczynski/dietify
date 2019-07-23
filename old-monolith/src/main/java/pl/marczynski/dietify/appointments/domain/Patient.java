package pl.marczynski.dietify.appointments.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import pl.marczynski.dietify.appointments.domain.enumeration.Gender;

/**
 * A user with patient role
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A user with patient role @author Krzysztof Marczyński")
@Entity
@Table(name = "patient")
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Id of user
     */
    @NotNull
    @ApiModelProperty(value = "Id of user", required = true)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * Gender of patient
     */
    @NotNull
    @ApiModelProperty(value = "Gender of patient", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    /**
     * Date of birth of patient
     */
    @NotNull
    @ApiModelProperty(value = "Date of birth of patient", required = true)
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    /**
     * Patient's preferable language
     */
    @NotNull
    @ApiModelProperty(value = "Patient's preferable language", required = true)
    @Column(name = "preferable_language_id", nullable = false)
    private Long preferableLanguageId;

    /**
     * Collection of patient's cards
     */
    @ApiModelProperty(value = "Collection of patient's cards")
    @OneToMany(mappedBy = "patient")
    private Set<PatientCard> patientCards = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public Patient userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Gender getGender() {
        return gender;
    }

    public Patient gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Patient dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Long getPreferableLanguageId() {
        return preferableLanguageId;
    }

    public Patient preferableLanguageId(Long preferableLanguageId) {
        this.preferableLanguageId = preferableLanguageId;
        return this;
    }

    public void setPreferableLanguageId(Long preferableLanguageId) {
        this.preferableLanguageId = preferableLanguageId;
    }

    public Set<PatientCard> getPatientCards() {
        return patientCards;
    }

    public Patient patientCards(Set<PatientCard> patientCards) {
        this.patientCards = patientCards;
        return this;
    }

    public Patient addPatientCards(PatientCard patientCard) {
        this.patientCards.add(patientCard);
        patientCard.setPatient(this);
        return this;
    }

    public Patient removePatientCards(PatientCard patientCard) {
        this.patientCards.remove(patientCard);
        patientCard.setPatient(null);
        return this;
    }

    public void setPatientCards(Set<PatientCard> patientCards) {
        this.patientCards = patientCards;
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
        Patient patient = (Patient) o;
        if (patient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", gender='" + getGender() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", preferableLanguageId=" + getPreferableLanguageId() +
            "}";
    }
}
