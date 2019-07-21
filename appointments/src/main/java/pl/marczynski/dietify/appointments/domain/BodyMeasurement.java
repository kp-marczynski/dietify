package pl.marczynski.dietify.appointments.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A BodyMeasurement.
 */
@Entity
@Table(name = "body_measurement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BodyMeasurement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Date of measurement completion
     */
    @NotNull
    @Column(name = "completion_date", nullable = false)
    private LocalDate completionDate;

    /**
     * Patient's height. Alongside with weight it is used to calculate BMI factor
     */
    @NotNull
    @Column(name = "height", nullable = false)
    private Integer height;

    /**
     * Patient's weight. Alongside with height it is used to calculate BMI factor
     */
    @NotNull
    @Column(name = "weight", nullable = false)
    private Integer weight;

    /**
     * Patient's waist measure
     */
    @NotNull
    @Column(name = "waist", nullable = false)
    private Double waist;

    /**
     * Percent of fat tissue in patient's body. Norm for women: 16-20. Norm for men: 15-18
     */
    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    @Column(name = "percent_of_fat_tissue")
    private Double percentOfFatTissue;

    /**
     * Percent of water in patient's body. Norm for women: 45-60. Norm for men: 50-65
     */
    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    @Column(name = "percent_of_water")
    private Double percentOfWater;

    /**
     * Mass of patient's muscle tissue in kilograms
     */
    @Column(name = "muscle_mass")
    private Double muscleMass;

    /**
     * Physical mark. Norm: 5
     */
    @Column(name = "physical_mark")
    private Double physicalMark;

    /**
     * Level of calcium in patient's bones in kilograms. Norm: ~2.4kg
     */
    @Column(name = "calcium_in_bones")
    private Double calciumInBones;

    /**
     * Basic metabolism in kcal
     */
    @Column(name = "basic_metabolism")
    private Integer basicMetabolism;

    /**
     * Metabolic age in years
     */
    @Column(name = "metabolic_age")
    private Double metabolicAge;

    /**
     * Level of visceral fat. Norm: 1-12
     */
    @Column(name = "visceral_fat_level")
    private Double visceralFatLevel;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
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
        if (!(o instanceof BodyMeasurement)) {
            return false;
        }
        return id != null && id.equals(((BodyMeasurement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "BodyMeasurement{" +
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
