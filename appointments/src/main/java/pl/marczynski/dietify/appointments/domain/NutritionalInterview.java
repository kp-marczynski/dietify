package pl.marczynski.dietify.appointments.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import pl.marczynski.dietify.appointments.domain.enumeration.PhysicalActivity;

import pl.marczynski.dietify.appointments.domain.enumeration.JobType;

/**
 * A NutritionalInterview.
 */
@Entity
@Table(name = "nutritional_interview")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NutritionalInterview implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Date of interview completion
     */
    @NotNull
    @ApiModelProperty(value = "Date of interview completion", required = true)
    @Column(name = "completion_date", nullable = false)
    private LocalDate completionDate;

    /**
     * Patient's target weight in kilograms
     */
    @NotNull
    @ApiModelProperty(value = "Patient's target weight in kilograms", required = true)
    @Column(name = "target_weight", nullable = false)
    private Integer targetWeight;

    /**
     * Advice purpose summarising what patient wish to accomplish with diet
     */
    
    @ApiModelProperty(value = "Advice purpose summarising what patient wish to accomplish with diet", required = true)
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "advice_purpose", nullable = false)
    private String advicePurpose;

    /**
     * Patient's usual daily activity level
     */
    @NotNull
    @ApiModelProperty(value = "Patient's usual daily activity level", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "physical_activity", nullable = false)
    private PhysicalActivity physicalActivity;

    /**
     * Patient's diseases
     */
    @ApiModelProperty(value = "Patient's diseases")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "diseases")
    private String diseases;

    /**
     * Patient's medicines
     */
    @ApiModelProperty(value = "Patient's medicines")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "medicines")
    private String medicines;

    /**
     * Patient's job type
     */
    @ApiModelProperty(value = "Patient's job type")
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type")
    private JobType jobType;

    /**
     * Food products that patient likes
     */
    @ApiModelProperty(value = "Food products that patient likes")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "liked_products")
    private String likedProducts;

    /**
     * Food products that patient dislikes
     */
    @ApiModelProperty(value = "Food products that patient dislikes")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "disliked_products")
    private String dislikedProducts;

    /**
     * Food products that patient is allergic to
     */
    @ApiModelProperty(value = "Food products that patient is allergic to")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "food_allergies")
    private String foodAllergies;

    /**
     * Patient's food intolerances
     */
    @ApiModelProperty(value = "Patient's food intolerances")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "food_intolerances")
    private String foodIntolerances;

    @OneToMany(mappedBy = "nutritionalInterview")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OwnedKitchenAppliance> ownedKitchenAppliances = new HashSet<>();

    @OneToMany(mappedBy = "nutritionalInterview")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CustomNutritionalInterviewQuestion> customQuestions = new HashSet<>();

    @OneToOne(mappedBy = "nutritionalInterview")
    @JsonIgnore
    private Appointment appointment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
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

    public Set<OwnedKitchenAppliance> getOwnedKitchenAppliances() {
        return ownedKitchenAppliances;
    }

    public void setOwnedKitchenAppliances(Set<OwnedKitchenAppliance> ownedKitchenAppliances) {
        this.ownedKitchenAppliances = ownedKitchenAppliances;
    }

    public Set<CustomNutritionalInterviewQuestion> getCustomQuestions() {
        return customQuestions;
    }

    public void setCustomQuestions(Set<CustomNutritionalInterviewQuestion> customNutritionalInterviewQuestions) {
        this.customQuestions = customNutritionalInterviewQuestions;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NutritionalInterview)) {
            return false;
        }
        return id != null && id.equals(((NutritionalInterview) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NutritionalInterview{" +
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
            "}";
    }
}
