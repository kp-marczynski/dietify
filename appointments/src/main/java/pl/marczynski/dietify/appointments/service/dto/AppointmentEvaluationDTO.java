package pl.marczynski.dietify.appointments.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;
import pl.marczynski.dietify.appointments.domain.enumeration.SatisfactionRate;

/**
 * A DTO for the {@link pl.marczynski.dietify.appointments.domain.AppointmentEvaluation} entity.
 */
public class AppointmentEvaluationDTO implements Serializable {

    private Long id;

    /**
     * Overall visit satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Overall visit satisfaction", required = true)
    private SatisfactionRate overallSatisfaction;

    /**
     * Dietitian service satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Dietitian service satisfaction", required = true)
    private SatisfactionRate dietitianServiceSatisfaction;

    /**
     * Overall meal plan satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Overall meal plan satisfaction", required = true)
    private SatisfactionRate mealPlanOverallSatisfaction;

    /**
     * Meals cost satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Meals cost satisfaction", required = true)
    private SatisfactionRate mealCostSatisfaction;

    /**
     * Meals preparation time satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Meals preparation time satisfaction", required = true)
    private SatisfactionRate mealPreparationTimeSatisfaction;

    /**
     * Meal complexity level satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Meal complexity level satisfaction", required = true)
    private SatisfactionRate mealComplexityLevelSatisfaction;

    /**
     * Meal tastefulness satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Meal tastefulness satisfaction", required = true)
    private SatisfactionRate mealTastefulnessSatisfaction;

    /**
     * Dietary result satisfaction
     */
    @NotNull
    @ApiModelProperty(value = "Dietary result satisfaction", required = true)
    private SatisfactionRate dietaryResultSatisfaction;

    /**
     * Optional comment to visit
     */
    @ApiModelProperty(value = "Optional comment to visit")
    @Lob
    private String comment;


    private Long appointmentId;

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

        AppointmentEvaluationDTO appointmentEvaluationDTO = (AppointmentEvaluationDTO) o;
        if (appointmentEvaluationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appointmentEvaluationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AppointmentEvaluationDTO{" +
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
            ", appointment=" + getAppointmentId() +
            "}";
    }
}
