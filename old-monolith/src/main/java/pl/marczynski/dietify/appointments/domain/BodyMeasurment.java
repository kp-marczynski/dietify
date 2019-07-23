package pl.marczynski.dietify.appointments.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A body measurment
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A body measurment @author Krzysztof Marczyński")
@Entity
@Table(name = "body_measurment")
public class BodyMeasurment implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Date of measurment completion
     */
    @NotNull
    @ApiModelProperty(value = "Date of measurment completion", required = true)
    @Column(name = "completion_date", nullable = false)
    private LocalDate completionDate;

    /**
     * Patient's height
     * Alongside with weight it is used to calculate BMI factor
     */
    @NotNull
    @ApiModelProperty(value = "Patient's height Alongside with weight it is used to calculate BMI factor", required = true)
    @Column(name = "height", nullable = false)
    private Integer height;

    /**
     * Patient's weight
     * Alongside with height it is used to calculate BMI factor
     */
    @NotNull
    @ApiModelProperty(value = "Patient's weight Alongside with height it is used to calculate BMI factor", required = true)
    @Column(name = "weight", nullable = false)
    private Integer weight;

    /**
     * Patient's waist measure
     */
    @NotNull
    @ApiModelProperty(value = "Patient's waist measure", required = true)
    @Column(name = "waist", nullable = false)
    private Double waist;

    /**
     * Percent of fat tissue in patient's body
     * Norm for women: 16-20
     * Norm for men: 15-18
     */
    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    @ApiModelProperty(value = "Percent of fat tissue in patient's body Norm for women: 16-20 Norm for men: 15-18")
    @Column(name = "percent_of_fat_tissue")
    private Double percentOfFatTissue;

    /**
     * Percent of water in patient's body
     * Norm for women: 45-60
     * Norm for men: 50-65
     */
    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    @ApiModelProperty(value = "Percent of water in patient's body Norm for women: 45-60 Norm for men: 50-65")
    @Column(name = "percent_of_water")
    private Double percentOfWater;

    /**
     * Mass of patient's muscle tissue in kilograms
     */
    @ApiModelProperty(value = "Mass of patient's muscle tissue in kilograms")
    @Column(name = "muscle_mass")
    private Double muscleMass;

    /**
     * Physical mark
     * Norm: 5
     */
    @ApiModelProperty(value = "Physical mark Norm: 5")
    @Column(name = "physical_mark")
    private Double physicalMark;

    /**
     * Level of calcium in patient's bones in kilograms
     * Norm: ~2.4kg
     */
    @ApiModelProperty(value = "Level of calcium in patient's bones in kilograms Norm: ~2.4kg")
    @Column(name = "calcium_in_bones")
    private Double calciumInBones;

    /**
     * Basic metabolism in kcal
     */
    @ApiModelProperty(value = "Basic metabolism in kcal")
    @Column(name = "basic_metabolism")
    private Integer basicMetabolism;

    /**
     * Metabolic age in years
     */
    @ApiModelProperty(value = "Metabolic age in years")
    @Column(name = "metabolic_age")
    private Double metabolicAge;

    /**
     * Level of visceral fat
     * Norm: 1-12
     */
    @ApiModelProperty(value = "Level of visceral fat Norm: 1-12")
    @Column(name = "visceral_fat_level")
    private Double visceralFatLevel;

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

    public BodyMeasurment completionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
        return this;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }

    public Integer getHeight() {
        return height;
    }

    public BodyMeasurment height(Integer height) {
        this.height = height;
        return this;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public BodyMeasurment weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Double getWaist() {
        return waist;
    }

    public BodyMeasurment waist(Double waist) {
        this.waist = waist;
        return this;
    }

    public void setWaist(Double waist) {
        this.waist = waist;
    }

    public Double getPercentOfFatTissue() {
        return percentOfFatTissue;
    }

    public BodyMeasurment percentOfFatTissue(Double percentOfFatTissue) {
        this.percentOfFatTissue = percentOfFatTissue;
        return this;
    }

    public void setPercentOfFatTissue(Double percentOfFatTissue) {
        this.percentOfFatTissue = percentOfFatTissue;
    }

    public Double getPercentOfWater() {
        return percentOfWater;
    }

    public BodyMeasurment percentOfWater(Double percentOfWater) {
        this.percentOfWater = percentOfWater;
        return this;
    }

    public void setPercentOfWater(Double percentOfWater) {
        this.percentOfWater = percentOfWater;
    }

    public Double getMuscleMass() {
        return muscleMass;
    }

    public BodyMeasurment muscleMass(Double muscleMass) {
        this.muscleMass = muscleMass;
        return this;
    }

    public void setMuscleMass(Double muscleMass) {
        this.muscleMass = muscleMass;
    }

    public Double getPhysicalMark() {
        return physicalMark;
    }

    public BodyMeasurment physicalMark(Double physicalMark) {
        this.physicalMark = physicalMark;
        return this;
    }

    public void setPhysicalMark(Double physicalMark) {
        this.physicalMark = physicalMark;
    }

    public Double getCalciumInBones() {
        return calciumInBones;
    }

    public BodyMeasurment calciumInBones(Double calciumInBones) {
        this.calciumInBones = calciumInBones;
        return this;
    }

    public void setCalciumInBones(Double calciumInBones) {
        this.calciumInBones = calciumInBones;
    }

    public Integer getBasicMetabolism() {
        return basicMetabolism;
    }

    public BodyMeasurment basicMetabolism(Integer basicMetabolism) {
        this.basicMetabolism = basicMetabolism;
        return this;
    }

    public void setBasicMetabolism(Integer basicMetabolism) {
        this.basicMetabolism = basicMetabolism;
    }

    public Double getMetabolicAge() {
        return metabolicAge;
    }

    public BodyMeasurment metabolicAge(Double metabolicAge) {
        this.metabolicAge = metabolicAge;
        return this;
    }

    public void setMetabolicAge(Double metabolicAge) {
        this.metabolicAge = metabolicAge;
    }

    public Double getVisceralFatLevel() {
        return visceralFatLevel;
    }

    public BodyMeasurment visceralFatLevel(Double visceralFatLevel) {
        this.visceralFatLevel = visceralFatLevel;
        return this;
    }

    public void setVisceralFatLevel(Double visceralFatLevel) {
        this.visceralFatLevel = visceralFatLevel;
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
        BodyMeasurment bodyMeasurment = (BodyMeasurment) o;
        if (bodyMeasurment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bodyMeasurment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BodyMeasurment{" +
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
            "}";
    }
}
