package pl.marczynski.dietify.appointments.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A user with dietetician role
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A user with dietetician role @author Krzysztof Marczyński")
@Entity
@Table(name = "dietetician")
public class Dietetician implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Id of user
     */
    @ApiModelProperty(value = "Id of user")
    @Column(name = "user_id")
    private Long userId;

    /**
     * Collection of patient's cards assigned to dietetician
     */
    @ApiModelProperty(value = "Collection of patient's cards assigned to dietetician")
    @OneToMany(mappedBy = "dietetician")
    private Set<PatientCard> patientcards = new HashSet<>();
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

    public Dietetician userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Set<PatientCard> getPatientcards() {
        return patientcards;
    }

    public Dietetician patientcards(Set<PatientCard> patientCards) {
        this.patientcards = patientCards;
        return this;
    }

    public Dietetician addPatientcards(PatientCard patientCard) {
        this.patientcards.add(patientCard);
        patientCard.setDietetician(this);
        return this;
    }

    public Dietetician removePatientcards(PatientCard patientCard) {
        this.patientcards.remove(patientCard);
        patientCard.setDietetician(null);
        return this;
    }

    public void setPatientcards(Set<PatientCard> patientCards) {
        this.patientcards = patientCards;
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
        Dietetician dietetician = (Dietetician) o;
        if (dietetician.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dietetician.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Dietetician{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            "}";
    }
}
