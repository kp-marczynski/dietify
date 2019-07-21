package pl.marczynski.dietify.appointments.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A AssignedMealPlan.
 */
@Entity
@Table(name = "assigned_meal_plan")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AssignedMealPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Id of assigned MealPlan entity retrieved from mealplans service
     */
    @NotNull
    @Column(name = "meal_plan_id", nullable = false)
    private Long mealPlanId;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("mealPlans")
    private Appointment appointment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMealPlanId() {
        return mealPlanId;
    }

    public void setMealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
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
        if (!(o instanceof AssignedMealPlan)) {
            return false;
        }
        return id != null && id.equals(((AssignedMealPlan) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AssignedMealPlan{" +
            "id=" + getId() +
            ", mealPlanId=" + getMealPlanId() +
            "}";
    }
}
