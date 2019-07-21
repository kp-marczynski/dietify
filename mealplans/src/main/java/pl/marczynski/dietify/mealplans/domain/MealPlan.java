package pl.marczynski.dietify.mealplans.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
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
    @Column(name = "author_id", nullable = false)
    private Long authorId;

    /**
     * Creation date of the plan
     */
    @NotNull
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    /**
     * Plan name
     */
    @Size(min = 1, max = 255)
    @Column(name = "name", length = 255)
    private String name;

    /**
     * Flag specifying if meal plan is visible in author's list of meal plans
     */
    @NotNull
    @Column(name = "is_visible", nullable = false)
    private Boolean isVisible;

    /**
     * Flag specifying if meal plan is editable
     */
    @NotNull
    @Column(name = "is_locked", nullable = false)
    private Boolean isLocked;

    /**
     * Language tag of a meal plan as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @Column(name = "language", length = 2, nullable = false)
    private String language;

    /**
     * Number of days in plan
     */
    @NotNull
    @Min(value = 1)
    @Column(name = "number_of_days", nullable = false)
    private Integer numberOfDays;

    /**
     * Number of meals per day
     */
    @NotNull
    @Min(value = 1)
    @Column(name = "number_of_meals_per_day", nullable = false)
    private Integer numberOfMealsPerDay;

    /**
     * Amount of total energy per day in kcal
     */
    @NotNull
    @Min(value = 1)
    @Column(name = "total_daily_energy", nullable = false)
    private Integer totalDailyEnergy;

    /**
     * Percent of proteins in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "percent_of_protein", nullable = false)
    private Integer percentOfProtein;

    /**
     * Percent of fats in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "percent_of_fat", nullable = false)
    private Integer percentOfFat;

    /**
     * Percent of carbohydrates in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "percent_of_carbohydrates", nullable = false)
    private Integer percentOfCarbohydrates;

    @OneToMany(mappedBy = "mealPlan")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealPlanDay> days = new HashSet<>();

    @OneToMany(mappedBy = "mealPlan")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealDefinition> mealDefinitions = new HashSet<>();

    @OneToMany(mappedBy = "mealPlan")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealPlanSuitableForDiet> tagsGoodFors = new HashSet<>();

    @OneToMany(mappedBy = "mealPlan")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    public Boolean isIsLocked() {
        return isLocked;
    }

    public void setIsLocked(Boolean isLocked) {
        this.isLocked = isLocked;
    }

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

    public Set<MealPlanSuitableForDiet> getTagsGoodFors() {
        return tagsGoodFors;
    }

    public void setTagsGoodFors(Set<MealPlanSuitableForDiet> mealPlanSuitableForDiets) {
        this.tagsGoodFors = mealPlanSuitableForDiets;
    }

    public Set<MealPlanUnsuitableForDiet> getTagsBadFors() {
        return tagsBadFors;
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
            ", creationDate='" + getCreationDate() + "'" +
            ", name='" + getName() + "'" +
            ", isVisible='" + isIsVisible() + "'" +
            ", isLocked='" + isIsLocked() + "'" +
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
