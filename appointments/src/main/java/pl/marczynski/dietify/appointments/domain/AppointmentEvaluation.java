package pl.marczynski.dietify.appointments.domain;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;

/**
 * A AppointmentEvaluation.
 */
@Entity
@Table(name = "appointment_evaluation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AppointmentEvaluation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Overall visit satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Overall visit satisfaction", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "overall_satisfaction", nullable = false)
    private SatisfactionRate overallSatisfaction;

    /**
     * Dietitian service satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Dietitian service satisfaction", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "dietitian_service_satisfaction", nullable = false)
    private SatisfactionRate dietitianServiceSatisfaction;

    /**
     * Overall meal plan satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Overall meal plan satisfaction", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "meal_plan_overall_satisfaction", nullable = false)
    private SatisfactionRate mealPlanOverallSatisfaction;

    /**
     * Meals cost satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Meals cost satisfaction", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "meal_cost_satisfaction", nullable = false)
    private SatisfactionRate mealCostSatisfaction;

    /**
     * Meals preparation time satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Meals preparation time satisfaction", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "meal_preparation_time_satisfaction", nullable = false)
    private SatisfactionRate mealPreparationTimeSatisfaction;

    /**
     * Meal complexity level satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Meal complexity level satisfaction", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "meal_complexity_level_satisfaction", nullable = false)
    private SatisfactionRate mealComplexityLevelSatisfaction;

    /**
     * Meal tastefulness satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Meal tastefulness satisfaction", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "meal_tastefulness_satisfaction", nullable = false)
    private SatisfactionRate mealTastefulnessSatisfaction;

    /**
     * Dietary result satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Dietary result satisfaction", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "dietary_result_satisfaction", nullable = false)
    private SatisfactionRate dietaryResultSatisfaction;

    /**
     * Optional comment to visit
     */
    @ApiModelProperty(value = "Optional comment to visit")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "comment")
    private String comment;

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

    public SatisfactionRate getOverallSatisfaction() {
        return overallSatisfaction;
    }

    public void setOverallSatisfaction(SatisfactionRate overallSatisfaction) {
        this.overallSatisfaction = overallSatisfaction;
    }

    public SatisfactionRate getDietitianServiceSatisfaction() {
        return dietitianServiceSatisfaction;
    }

    public void setDietitianServiceSatisfaction(SatisfactionRate dietitianServiceSatisfaction) {
        this.dietitianServiceSatisfaction = dietitianServiceSatisfaction;
    }

    public SatisfactionRate getMealPlanOverallSatisfaction() {
        return mealPlanOverallSatisfaction;
    }

    public void setMealPlanOverallSatisfaction(SatisfactionRate mealPlanOverallSatisfaction) {
        this.mealPlanOverallSatisfaction = mealPlanOverallSatisfaction;
    }

    public SatisfactionRate getMealCostSatisfaction() {
        return mealCostSatisfaction;
    }

    public void setMealCostSatisfaction(SatisfactionRate mealCostSatisfaction) {
        this.mealCostSatisfaction = mealCostSatisfaction;
    }

    public SatisfactionRate getMealPreparationTimeSatisfaction() {
        return mealPreparationTimeSatisfaction;
    }

    public void setMealPreparationTimeSatisfaction(SatisfactionRate mealPreparationTimeSatisfaction) {
        this.mealPreparationTimeSatisfaction = mealPreparationTimeSatisfaction;
    }

    public SatisfactionRate getMealComplexityLevelSatisfaction() {
        return mealComplexityLevelSatisfaction;
    }

    public void setMealComplexityLevelSatisfaction(SatisfactionRate mealComplexityLevelSatisfaction) {
        this.mealComplexityLevelSatisfaction = mealComplexityLevelSatisfaction;
    }

    public SatisfactionRate getMealTastefulnessSatisfaction() {
        return mealTastefulnessSatisfaction;
    }

    public void setMealTastefulnessSatisfaction(SatisfactionRate mealTastefulnessSatisfaction) {
        this.mealTastefulnessSatisfaction = mealTastefulnessSatisfaction;
    }

    public SatisfactionRate getDietaryResultSatisfaction() {
        return dietaryResultSatisfaction;
    }

    public void setDietaryResultSatisfaction(SatisfactionRate dietaryResultSatisfaction) {
        this.dietaryResultSatisfaction = dietaryResultSatisfaction;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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
        if (!(o instanceof AppointmentEvaluation)) {
            return false;
        }
        return id != null && id.equals(((AppointmentEvaluation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AppointmentEvaluation{" +
            "id=" + getId() +
            ", overallSatisfaction='" + getOverallSatisfaction() + "'" +
            ", dietitianServiceSatisfaction='" + getDietitianServiceSatisfaction() + "'" +
            ", mealPlanOverallSatisfaction='" + getMealPlanOverallSatisfaction() + "'" +
            ", mealCostSatisfaction='" + getMealCostSatisfaction() + "'" +
            ", mealPreparationTimeSatisfaction='" + getMealPreparationTimeSatisfaction() + "'" +
            ", mealComplexityLevelSatisfaction='" + getMealComplexityLevelSatisfaction() + "'" +
            ", mealTastefulnessSatisfaction='" + getMealTastefulnessSatisfaction() + "'" +
            ", dietaryResultSatisfaction='" + getDietaryResultSatisfaction() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
