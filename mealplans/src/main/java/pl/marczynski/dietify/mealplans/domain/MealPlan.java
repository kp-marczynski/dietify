package pl.marczynski.dietify.mealplans.domain;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A MealPlan.
 */
@Entity
@Table(name = "meal_plan")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "mealplan")
public class MealPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Id of author of the plan
     */
    @NotNull
    @ApiModelProperty(value = "Id of author of the plan", required = true)
    @Column(name = "author_id", nullable = false)
    private Long authorId;

//    /**
//     * Creation date of the plan
//     */
//    @ApiModelProperty(value = "Creation date of the plan", required = true)
//    @Column(name = "creation_date", nullable = false)
//    private Instant creationDate;

    /**
     * Timestamp of creation
     */
    @ApiModelProperty(value = "Timestamp of creation")
    @Column(name = "creation_timestamp")
    private Instant creationTimestamp;

    /**
     * Timestamp of last edit
     */
    @ApiModelProperty(value = "Timestamp of last edit")
    @Column(name = "last_edit_timestamp")
    private Instant lastEditTimestamp;

    /**
     * Plan name
     */
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Plan name")
    @Column(name = "name", length = 255)
    private String name;

//    /**
//     * Flag specifying if meal plan is visible in author's list of meal plans
//     */
//    @NotNull
//    @ApiModelProperty(value = "Flag specifying if meal plan is visible in author's list of meal plans", required = true)
//    @Column(name = "is_visible", nullable = false)
//    private Boolean isVisible;
//
//    /**
//     * Flag specifying if meal plan is editable
//     */
//    @NotNull
//    @ApiModelProperty(value = "Flag specifying if meal plan is editable", required = true)
//    @Column(name = "is_locked", nullable = false)
//    private Boolean isLocked;

    /**
     * Language tag of a meal plan as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language tag of a meal plan as ISO_639-1 code", required = true)
    @Column(name = "language", length = 2, nullable = false)
    private String language;

    /**
     * Number of days in plan
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Number of days in plan", required = true)
    @Column(name = "number_of_days", nullable = false)
    private Integer numberOfDays;

    /**
     * Number of meals per day
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Number of meals per day", required = true)
    @Column(name = "number_of_meals_per_day", nullable = false)
    private Integer numberOfMealsPerDay;

    /**
     * Amount of total energy per day in kcal
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Amount of total energy per day in kcal", required = true)
    @Column(name = "total_daily_energy", nullable = false)
    private Integer totalDailyEnergy;

    /**
     * Percent of proteins in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Percent of proteins in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100", required = true)
    @Column(name = "percent_of_protein", nullable = false)
    private Integer percentOfProtein;

    /**
     * Percent of fats in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Percent of fats in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100", required = true)
    @Column(name = "percent_of_fat", nullable = false)
    private Integer percentOfFat;

    /**
     * Percent of carbohydrates in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Percent of carbohydrates in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100", required = true)
    @Column(name = "percent_of_carbohydrates", nullable = false)
    private Integer percentOfCarbohydrates;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealPlanDay> days = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealDefinition> mealDefinitions = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealPlanSuitableForDiet> suitableForDiets = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealPlanUnsuitableForDiet> unsuitableForDiets = new HashSet<>();

    /**
     * Flag specifying if recipe is final or editable
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if product is final or editable", required = true)
    @Column(name = "is_final", nullable = false)
    private Boolean isFinal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

//    public Instant getCreationDate() {
//        return creationDate;
//    }
//
//    public void setCreationDate(Instant creationDate) {
//        this.creationDate = creationDate;
//    }

    public Instant getCreationTimestamp() {
        return creationTimestamp;
    }

    public void setCreationTimestamp(Instant creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }

    public Instant getLastEditTimestamp() {
        return lastEditTimestamp;
    }

    public void setLastEditTimestamp(Instant lastEditTimestamp) {
        this.lastEditTimestamp = lastEditTimestamp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    public Boolean isIsVisible() {
//        return isVisible;
//    }
//
//    public void setIsVisible(Boolean isVisible) {
//        this.isVisible = isVisible;
//    }
//
//    public Boolean isIsLocked() {
//        return isLocked;
//    }
//
//    public void setIsLocked(Boolean isLocked) {
//        this.isLocked = isLocked;
//    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getNumberOfDays() {
        return numberOfDays;
    }

    public void setNumberOfDays(Integer numberOfDays) {
        this.numberOfDays = numberOfDays;
    }

    public Integer getNumberOfMealsPerDay() {
        return numberOfMealsPerDay;
    }

    public void setNumberOfMealsPerDay(Integer numberOfMealsPerDay) {
        this.numberOfMealsPerDay = numberOfMealsPerDay;
    }

    public Integer getTotalDailyEnergy() {
        return totalDailyEnergy;
    }

    public void setTotalDailyEnergy(Integer totalDailyEnergy) {
        this.totalDailyEnergy = totalDailyEnergy;
    }

    public Integer getPercentOfProtein() {
        return percentOfProtein;
    }

    public void setPercentOfProtein(Integer percentOfProtein) {
        this.percentOfProtein = percentOfProtein;
    }

    public Integer getPercentOfFat() {
        return percentOfFat;
    }

    public void setPercentOfFat(Integer percentOfFat) {
        this.percentOfFat = percentOfFat;
    }

    public Integer getPercentOfCarbohydrates() {
        return percentOfCarbohydrates;
    }

    public void setPercentOfCarbohydrates(Integer percentOfCarbohydrates) {
        this.percentOfCarbohydrates = percentOfCarbohydrates;
    }

    public Boolean isIsFinal() {
        return isFinal;
    }

    public void setIsFinal(Boolean isFinal) {
        this.isFinal = isFinal;
    }

    public Set<MealPlanDay> getDays() {
        return days;
    }

    public void setDays(Set<MealPlanDay> mealPlanDays) {
        this.days = mealPlanDays;
    }

    public Set<MealDefinition> getMealDefinitions() {
        return mealDefinitions;
    }

    public void setMealDefinitions(Set<MealDefinition> mealDefinitions) {
        this.mealDefinitions = mealDefinitions;
    }

    public Set<MealPlanSuitableForDiet> getSuitableForDiets() {
        return suitableForDiets;
    }

    public void setSuitableForDiets(Set<MealPlanSuitableForDiet> mealPlanSuitableForDiets) {
        this.suitableForDiets = mealPlanSuitableForDiets;
    }

    public Set<MealPlanUnsuitableForDiet> getUnsuitableForDiets() {
        return unsuitableForDiets;
    }

    public void setUnsuitableForDiets(Set<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDiets) {
        this.unsuitableForDiets = mealPlanUnsuitableForDiets;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MealPlan)) {
            return false;
        }
        return id != null && id.equals(((MealPlan) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MealPlan{" +
            "id=" + getId() +
            ", authorId=" + getAuthorId() +
//            ", creationDate='" + getCreationDate() + "'" +
            ", name='" + getName() + "'" +
//            ", isVisible='" + isIsVisible() + "'" +
//            ", isLocked='" + isIsLocked() + "'" +
            ", language='" + getLanguage() + "'" +
            ", numberOfDays=" + getNumberOfDays() +
            ", numberOfMealsPerDay=" + getNumberOfMealsPerDay() +
            ", totalDailyEnergy=" + getTotalDailyEnergy() +
            ", percentOfProtein=" + getPercentOfProtein() +
            ", percentOfFat=" + getPercentOfFat() +
            ", percentOfCarbohydrates=" + getPercentOfCarbohydrates() +
            "}";
    }
}
