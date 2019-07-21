package pl.marczynski.dietify.appointments.service.dto;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import pl.marczynski.dietify.appointments.domain.enumeration.PhysicalActivity;
import pl.marczynski.dietify.appointments.domain.enumeration.JobType;

/**
 * A DTO for the {@link pl.marczynski.dietify.appointments.domain.NutritionalInterview} entity.
 */
public class NutritionalInterviewDTO implements Serializable {

    private Long id;

    /**
     * Date of interview completion
     */
    @NotNull
    @ApiModelProperty(value = "Date of interview completion", required = true)
    private LocalDate completionDate;

    /**
     * Patient's target weight in kilograms
     */
    @NotNull
    @ApiModelProperty(value = "Patient's target weight in kilograms", required = true)
    private Integer targetWeight;

    /**
     * Advice purpose summarising what patient wish to accomplish with diet
     */
    
    @ApiModelProperty(value = "Advice purpose summarising what patient wish to accomplish with diet", required = true)
    @Lob
    private String advicePurpose;

    /**
     * Patient's usual daily activity level
     */
    @NotNull
    @ApiModelProperty(value = "Patient's usual daily activity level", required = true)
    private PhysicalActivity physicalActivity;

    /**
     * Patient's diseases
     */
    @ApiModelProperty(value = "Patient's diseases")
    @Lob
    private String diseases;

    /**
     * Patient's medicines
     */
    @ApiModelProperty(value = "Patient's medicines")
    @Lob
    private String medicines;

    /**
     * Patient's job type
     */
    @ApiModelProperty(value = "Patient's job type")
    private JobType jobType;

    /**
     * Food products that patient likes
     */
    @ApiModelProperty(value = "Food products that patient likes")
    @Lob
    private String likedProducts;

    /**
     * Food products that patient dislikes
     */
    @ApiModelProperty(value = "Food products that patient dislikes")
    @Lob
    private String dislikedProducts;

    /**
     * Food products that patient is allergic to
     */
    @ApiModelProperty(value = "Food products that patient is allergic to")
    @Lob
    private String foodAllergies;

    /**
     * Patient's food intolerances
     */
    @ApiModelProperty(value = "Patient's food intolerances")
    @Lob
    private String foodIntolerances;


    private Long appointmentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }

    public Integer getTargetWeight() {
        return targetWeight;
    }

    public void setTargetWeight(Integer targetWeight) {
        this.targetWeight = targetWeight;
    }

    public String getAdvicePurpose() {
        return advicePurpose;
    }

    public void setAdvicePurpose(String advicePurpose) {
        this.advicePurpose = advicePurpose;
    }

    public PhysicalActivity getPhysicalActivity() {
        return physicalActivity;
    }

    public void setPhysicalActivity(PhysicalActivity physicalActivity) {
        this.physicalActivity = physicalActivity;
    }

    public String getDiseases() {
        return diseases;
    }

    public void setDiseases(String diseases) {
        this.diseases = diseases;
    }

    public String getMedicines() {
        return medicines;
    }

    public void setMedicines(String medicines) {
        this.medicines = medicines;
    }

    public JobType getJobType() {
        return jobType;
    }

    public void setJobType(JobType jobType) {
        this.jobType = jobType;
    }

    public String getLikedProducts() {
        return likedProducts;
    }

    public void setLikedProducts(String likedProducts) {
        this.likedProducts = likedProducts;
    }

    public String getDislikedProducts() {
        return dislikedProducts;
    }

    public void setDislikedProducts(String dislikedProducts) {
        this.dislikedProducts = dislikedProducts;
    }

    public String getFoodAllergies() {
        return foodAllergies;
    }

    public void setFoodAllergies(String foodAllergies) {
        this.foodAllergies = foodAllergies;
    }

    public String getFoodIntolerances() {
        return foodIntolerances;
    }

    public void setFoodIntolerances(String foodIntolerances) {
        this.foodIntolerances = foodIntolerances;
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

        NutritionalInterviewDTO nutritionalInterviewDTO = (NutritionalInterviewDTO) o;
        if (nutritionalInterviewDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nutritionalInterviewDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NutritionalInterviewDTO{" +
            "id=" + getId() +
            ", completionDate='" + getCompletionDate() + "'" +
            ", targetWeight=" + getTargetWeight() +
            ", advicePurpose='" + getAdvicePurpose() + "'" +
            ", physicalActivity='" + getPhysicalActivity() + "'" +
            ", diseases='" + getDiseases() + "'" +
            ", medicines='" + getMedicines() + "'" +
            ", jobType='" + getJobType() + "'" +
            ", likedProducts='" + getLikedProducts() + "'" +
            ", dislikedProducts='" + getDislikedProducts() + "'" +
            ", foodAllergies='" + getFoodAllergies() + "'" +
            ", foodIntolerances='" + getFoodIntolerances() + "'" +
            ", appointment=" + getAppointmentId() +
            "}";
    }
}
