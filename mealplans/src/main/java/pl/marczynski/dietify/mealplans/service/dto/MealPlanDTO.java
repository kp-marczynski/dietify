package pl.marczynski.dietify.mealplans.service.dto;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.mealplans.domain.MealPlan} entity.
 */
public class MealPlanDTO implements Serializable {

    private Long id;

    /**
     * Id of author of the plan
     */
    @NotNull
    @ApiModelProperty(value = "Id of author of the plan", required = true)
    private Long authorId;

    /**
     * Creation date of the plan
     */
    @NotNull
    @ApiModelProperty(value = "Creation date of the plan", required = true)
    private LocalDate creationDate;

    /**
     * Plan name
     */
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Plan name")
    private String name;

    /**
     * Flag specifying if meal plan is visible in author's list of meal plans
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if meal plan is visible in author's list of meal plans", required = true)
    private Boolean isVisible;

    /**
     * Flag specifying if meal plan is editable
     */
    @NotNull
    @ApiModelProperty(value = "Flag specifying if meal plan is editable", required = true)
    private Boolean isLocked;

    /**
     * Language tag of a meal plan as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language tag of a meal plan as ISO_639-1 code", required = true)
    private String language;

    /**
     * Number of days in plan
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Number of days in plan", required = true)
    private Integer numberOfDays;

    /**
     * Number of meals per day
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Number of meals per day", required = true)
    private Integer numberOfMealsPerDay;

    /**
     * Amount of total energy per day in kcal
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Amount of total energy per day in kcal", required = true)
    private Integer totalDailyEnergy;

    /**
     * Percent of proteins in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Percent of proteins in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100", required = true)
    private Integer percentOfProtein;

    /**
     * Percent of fats in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Percent of fats in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100", required = true)
    private Integer percentOfFat;

    /**
     * Percent of carbohydrates in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Percent of carbohydrates in total daily energy. Sum of percents of protein, fat and carbohydrates must not be larger than 100", required = true)
    private Integer percentOfCarbohydrates;


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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MealPlanDTO mealPlanDTO = (MealPlanDTO) o;
        if (mealPlanDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealPlanDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealPlanDTO{" +
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
