package pl.marczynski.dietify.mealplans.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Meal plan.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A Meal plan. @author Krzysztof Marczyński")
@Entity
@Table(name = "meal_plan")
public class MealPlan implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Id of author of the plan
     */
    @NotNull
    @ApiModelProperty(value = "Id of author of the plan", required = true)
    @Column(name = "author_id", nullable = false)
    private Long authorId;

    /**
     * Creation date of the plan
     */
    @NotNull
    @ApiModelProperty(value = "Creation date of the plan", required = true)
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    /**
     * Plan name
     */
    @Size(min = 1)
    @ApiModelProperty(value = "Plan name")
    @Column(name = "name")
    private String name;

    /**
     * Flag specifying if meal plan is visible in author's list of meal plans
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if meal plan is visible in author's list of meal plans", required = true)
    @Column(name = "is_visible", nullable = false)
    private Boolean isVisible;

    /**
     * Flag specifying if meal plan is editable
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if meal plan is editable", required = true)
    @Column(name = "is_locked", nullable = false)
    private Boolean isLocked;

    /**
     * Language of meal plan
     */
    @NotNull
    @ApiModelProperty(value = "Language of meal plan", required = true)
    @Column(name = "language_id", nullable = false)
    private Long languageId;

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
    @Column(name = "total_daily_energy_kcal", nullable = false)
    private Integer totalDailyEnergyKcal;

    /**
     * Percent of proteins in total daily energy.
     * Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Percent of proteins in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100", required = true)
    @Column(name = "percent_of_protein", nullable = false)
    private Integer percentOfProtein;

    /**
     * Percent of fats in total daily energy.
     * Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Percent of fats in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100", required = true)
    @Column(name = "percent_of_fat", nullable = false)
    private Integer percentOfFat;

    /**
     * Percent of carbohydrates in total daily energy.
     * Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Percent of carbohydrates in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100", required = true)
    @Column(name = "percent_of_carbohydrates", nullable = false)
    private Integer percentOfCarbohydrates;

    /**
     * Planned days
     */
    @ApiModelProperty(value = "Planned days")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    private Set<MealPlanDay> days = new HashSet<>();
    /**
     * Definitions of daily meals
     */
    @ApiModelProperty(value = "Definitions of daily meals")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    private Set<MealDefinition> mealDefinitions = new HashSet<>();
    /**
     * Collection of tags specifying for which cases recipe might be used
     */
    @ApiModelProperty(value = "Collection of tags specifying for which cases recipe might be used")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    private Set<MealPlanSuitableForDiet> tagsGoodFors = new HashSet<>();
    /**
     * Collection of tags specifying for which cases recipe should not be used
     */
    @ApiModelProperty(value = "Collection of tags specifying for which cases recipe should not be used")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    private Set<MealPlanUnsuitableForDiet> tagsBadFors = new HashSet<>();
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

    public MealPlan authorId(Long authorId) {
        this.authorId = authorId;
        return this;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public MealPlan creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getName() {
        return name;
    }

    public MealPlan name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public MealPlan isVisible(Boolean isVisible) {
        this.isVisible = isVisible;
        return this;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    public Boolean isIsLocked() {
        return isLocked;
    }

    public MealPlan isLocked(Boolean isLocked) {
        this.isLocked = isLocked;
        return this;
    }

    public void setIsLocked(Boolean isLocked) {
        this.isLocked = isLocked;
    }

    public Long getLanguageId() {
        return languageId;
    }

    public MealPlan languageId(Long languageId) {
        this.languageId = languageId;
        return this;
    }

    public void setLanguageId(Long languageId) {
        this.languageId = languageId;
    }

    public Integer getNumberOfDays() {
        return numberOfDays;
    }

    public MealPlan numberOfDays(Integer numberOfDays) {
        this.numberOfDays = numberOfDays;
        return this;
    }

    public void setNumberOfDays(Integer numberOfDays) {
        this.numberOfDays = numberOfDays;
    }

    public Integer getNumberOfMealsPerDay() {
        return numberOfMealsPerDay;
    }

    public MealPlan numberOfMealsPerDay(Integer numberOfMealsPerDay) {
        this.numberOfMealsPerDay = numberOfMealsPerDay;
        return this;
    }

    public void setNumberOfMealsPerDay(Integer numberOfMealsPerDay) {
        this.numberOfMealsPerDay = numberOfMealsPerDay;
    }

    public Integer getTotalDailyEnergyKcal() {
        return totalDailyEnergyKcal;
    }

    public MealPlan totalDailyEnergyKcal(Integer totalDailyEnergyKcal) {
        this.totalDailyEnergyKcal = totalDailyEnergyKcal;
        return this;
    }

    public void setTotalDailyEnergyKcal(Integer totalDailyEnergyKcal) {
        this.totalDailyEnergyKcal = totalDailyEnergyKcal;
    }

    public Integer getPercentOfProtein() {
        return percentOfProtein;
    }

    public MealPlan percentOfProtein(Integer percentOfProtein) {
        this.percentOfProtein = percentOfProtein;
        return this;
    }

    public void setPercentOfProtein(Integer percentOfProtein) {
        this.percentOfProtein = percentOfProtein;
    }

    public Integer getPercentOfFat() {
        return percentOfFat;
    }

    public MealPlan percentOfFat(Integer percentOfFat) {
        this.percentOfFat = percentOfFat;
        return this;
    }

    public void setPercentOfFat(Integer percentOfFat) {
        this.percentOfFat = percentOfFat;
    }

    public Integer getPercentOfCarbohydrates() {
        return percentOfCarbohydrates;
    }

    public MealPlan percentOfCarbohydrates(Integer percentOfCarbohydrates) {
        this.percentOfCarbohydrates = percentOfCarbohydrates;
        return this;
    }

    public void setPercentOfCarbohydrates(Integer percentOfCarbohydrates) {
        this.percentOfCarbohydrates = percentOfCarbohydrates;
    }

    public Set<MealPlanDay> getDays() {
        return days;
    }

    public MealPlan days(Set<MealPlanDay> mealPlanDays) {
        this.days = mealPlanDays;
        return this;
    }

    public MealPlan addDays(MealPlanDay mealPlanDay) {
        this.days.add(mealPlanDay);
        return this;
    }

    public MealPlan removeDays(MealPlanDay mealPlanDay) {
        this.days.remove(mealPlanDay);
        return this;
    }

    public void setDays(Set<MealPlanDay> mealPlanDays) {
        this.days = mealPlanDays;
    }

    public Set<MealDefinition> getMealDefinitions() {
        return mealDefinitions;
    }

    public MealPlan mealDefinitions(Set<MealDefinition> mealDefinitions) {
        this.mealDefinitions = mealDefinitions;
        return this;
    }

    public MealPlan addMealDefinitions(MealDefinition mealDefinition) {
        this.mealDefinitions.add(mealDefinition);
        return this;
    }

    public MealPlan removeMealDefinitions(MealDefinition mealDefinition) {
        this.mealDefinitions.remove(mealDefinition);
        return this;
    }

    public void setMealDefinitions(Set<MealDefinition> mealDefinitions) {
        this.mealDefinitions = mealDefinitions;
    }

    public Set<MealPlanSuitableForDiet> getTagsGoodFors() {
        return tagsGoodFors;
    }

    public MealPlan tagsGoodFors(Set<MealPlanSuitableForDiet> mealPlanSuitableForDiets) {
        this.tagsGoodFors = mealPlanSuitableForDiets;
        return this;
    }

    public MealPlan addTagsGoodFor(MealPlanSuitableForDiet mealPlanSuitableForDiet) {
        this.tagsGoodFors.add(mealPlanSuitableForDiet);
        return this;
    }

    public MealPlan removeTagsGoodFor(MealPlanSuitableForDiet mealPlanSuitableForDiet) {
        this.tagsGoodFors.remove(mealPlanSuitableForDiet);
        return this;
    }

    public void setTagsGoodFors(Set<MealPlanSuitableForDiet> mealPlanSuitableForDiets) {
        this.tagsGoodFors = mealPlanSuitableForDiets;
    }

    public Set<MealPlanUnsuitableForDiet> getTagsBadFors() {
        return tagsBadFors;
    }

    public MealPlan tagsBadFors(Set<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDiets) {
        this.tagsBadFors = mealPlanUnsuitableForDiets;
        return this;
    }

    public MealPlan addTagsBadFor(MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet) {
        this.tagsBadFors.add(mealPlanUnsuitableForDiet);
        return this;
    }

    public MealPlan removeTagsBadFor(MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet) {
        this.tagsBadFors.remove(mealPlanUnsuitableForDiet);
        return this;
    }

    public void setTagsBadFors(Set<MealPlanUnsuitableForDiet> mealPlanUnsuitableForDiets) {
        this.tagsBadFors = mealPlanUnsuitableForDiets;
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
        MealPlan mealPlan = (MealPlan) o;
        if (mealPlan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealPlan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealPlan{" +
            "id=" + getId() +
            ", authorId=" + getAuthorId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", name='" + getName() + "'" +
            ", isVisible='" + isIsVisible() + "'" +
            ", isLocked='" + isIsLocked() + "'" +
            ", languageId=" + getLanguageId() +
            ", numberOfDays=" + getNumberOfDays() +
            ", numberOfMealsPerDay=" + getNumberOfMealsPerDay() +
            ", totalDailyEnergyKcal=" + getTotalDailyEnergyKcal() +
            ", percentOfProtein=" + getPercentOfProtein() +
            ", percentOfFat=" + getPercentOfFat() +
            ", percentOfCarbohydrates=" + getPercentOfCarbohydrates() +
            "}";
    }
}
