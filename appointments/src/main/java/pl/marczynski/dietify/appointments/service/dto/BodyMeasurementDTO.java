package pl.marczynski.dietify.appointments.service.dto;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.appointments.domain.BodyMeasurement} entity.
 */
public class BodyMeasurementDTO implements Serializable {

    private Long id;

    /**
     * Date of measurement completion
     */
    @NotNull
    @ApiModelProperty(value = "Date of measurement completion", required = true)
    private LocalDate completionDate;

    /**
     * Patient's height. Alongside with weight it is used to calculate BMI factor
     */
    @NotNull
    @ApiModelProperty(value = "Patient's height. Alongside with weight it is used to calculate BMI factor", required = true)
    private Integer height;

    /**
     * Patient's weight. Alongside with height it is used to calculate BMI factor
     */
    @NotNull
    @ApiModelProperty(value = "Patient's weight. Alongside with height it is used to calculate BMI factor", required = true)
    private Integer weight;

    /**
     * Patient's waist measure
     */
    @NotNull
    @ApiModelProperty(value = "Patient's waist measure", required = true)
    private Double waist;

    /**
     * Percent of fat tissue in patient's body. Norm for women: 16-20. Norm for men: 15-18
     */
    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    @ApiModelProperty(value = "Percent of fat tissue in patient's body. Norm for women: 16-20. Norm for men: 15-18")
    private Double percentOfFatTissue;

    /**
     * Percent of water in patient's body. Norm for women: 45-60. Norm for men: 50-65
     */
    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    @ApiModelProperty(value = "Percent of water in patient's body. Norm for women: 45-60. Norm for men: 50-65")
    private Double percentOfWater;

    /**
     * Mass of patient's muscle tissue in kilograms
     */
    @ApiModelProperty(value = "Mass of patient's muscle tissue in kilograms")
    private Double muscleMass;

    /**
     * Physical mark. Norm: 5
     */
    @ApiModelProperty(value = "Physical mark. Norm: 5")
    private Double physicalMark;

    /**
     * Level of calcium in patient's bones in kilograms. Norm: ~2.4kg
     */
    @ApiModelProperty(value = "Level of calcium in patient's bones in kilograms. Norm: ~2.4kg")
    private Double calciumInBones;

    /**
     * Basic metabolism in kcal
     */
    @ApiModelProperty(value = "Basic metabolism in kcal")
    private Integer basicMetabolism;

    /**
     * Metabolic age in years
     */
    @ApiModelProperty(value = "Metabolic age in years")
    private Double metabolicAge;

    /**
     * Level of visceral fat. Norm: 1-12
     */
    @ApiModelProperty(value = "Level of visceral fat. Norm: 1-12")
    private Double visceralFatLevel;


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

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Double getWaist() {
        return waist;
    }

    public void setWaist(Double waist) {
        this.waist = waist;
    }

    public Double getPercentOfFatTissue() {
        return percentOfFatTissue;
    }

    public void setPercentOfFatTissue(Double percentOfFatTissue) {
        this.percentOfFatTissue = percentOfFatTissue;
    }

    public Double getPercentOfWater() {
        return percentOfWater;
    }

    public void setPercentOfWater(Double percentOfWater) {
        this.percentOfWater = percentOfWater;
    }

    public Double getMuscleMass() {
        return muscleMass;
    }

    public void setMuscleMass(Double muscleMass) {
        this.muscleMass = muscleMass;
    }

    public Double getPhysicalMark() {
        return physicalMark;
    }

    public void setPhysicalMark(Double physicalMark) {
        this.physicalMark = physicalMark;
    }

    public Double getCalciumInBones() {
        return calciumInBones;
    }

    public void setCalciumInBones(Double calciumInBones) {
        this.calciumInBones = calciumInBones;
    }

    public Integer getBasicMetabolism() {
        return basicMetabolism;
    }

    public void setBasicMetabolism(Integer basicMetabolism) {
        this.basicMetabolism = basicMetabolism;
    }

    public Double getMetabolicAge() {
        return metabolicAge;
    }

    public void setMetabolicAge(Double metabolicAge) {
        this.metabolicAge = metabolicAge;
    }

    public Double getVisceralFatLevel() {
        return visceralFatLevel;
    }

    public void setVisceralFatLevel(Double visceralFatLevel) {
        this.visceralFatLevel = visceralFatLevel;
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

        BodyMeasurementDTO bodyMeasurementDTO = (BodyMeasurementDTO) o;
        if (bodyMeasurementDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bodyMeasurementDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BodyMeasurementDTO{" +
            "id=" + getId() +
            ", completionDate='" + getCompletionDate() + "'" +
            ", height=" + getHeight() +
            ", weight=" + getWeight() +
            ", waist=" + getWaist() +
            ", percentOfFatTissue=" + getPercentOfFatTissue() +
            ", percentOfWater=" + getPercentOfWater() +
            ", muscleMass=" + getMuscleMass() +
            ", physicalMark=" + getPhysicalMark() +
            ", calciumInBones=" + getCalciumInBones() +
            ", basicMetabolism=" + getBasicMetabolism() +
            ", metabolicAge=" + getMetabolicAge() +
            ", visceralFatLevel=" + getVisceralFatLevel() +
            ", appointment=" + getAppointmentId() +
            "}";
    }
}
