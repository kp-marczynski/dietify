package pl.marczynski.dietify.appointments.service.dto;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.appointments.domain.PatientCard} entity.
 */
public class PatientCardDTO implements Serializable {

    private Long id;

    /**
     * Date when patient registered to dietitian
     */
    @NotNull
    @ApiModelProperty(value = "Date when patient registered to dietitian", required = true)
    private LocalDate creationDate;

    /**
     * Dietitian to which patient has signed. Id of User entity retrieved from gateway service.
     */
    @NotNull
    @ApiModelProperty(value = "Dietitian to which patient has signed. Id of User entity retrieved from gateway service.", required = true)
    private Long dietitianId;

    /**
     * Patient of dietitian. Id of User entity retrieved from gateway service.
     */
    @NotNull
    @ApiModelProperty(value = "Patient of dietitian. Id of User entity retrieved from gateway service.", required = true)
    private Long patientId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PatientCardDTO patientCardDTO = (PatientCardDTO) o;
        if (patientCardDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patientCardDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PatientCardDTO{" +
            "id=" + getId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", dietitianId=" + getDietitianId() +
            ", patientId=" + getPatientId() +
            "}";
    }
}
