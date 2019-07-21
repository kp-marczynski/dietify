package pl.marczynski.dietify.mealplans.domain;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;

public class MealPlanCreator {

    public static final Long DEFAULT_AUTHOR_ID = 1L;
    public static final Long UPDATED_AUTHOR_ID = 2L;

    public static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    public static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    public static final String DEFAULT_NAME = "AAAAAAAAAA";
    public static final String UPDATED_NAME = "BBBBBBBBBB";

    public static final Boolean DEFAULT_IS_VISIBLE = false;
    public static final Boolean UPDATED_IS_VISIBLE = true;

    public static final Boolean DEFAULT_IS_LOCKED = false;
    public static final Boolean UPDATED_IS_LOCKED = true;

    public static final Long DEFAULT_LANGUAGE_ID = 1L;
    public static final Long UPDATED_LANGUAGE_ID = 2L;

    public static final Integer DEFAULT_NUMBER_OF_DAYS = 1;
    public static final Integer UPDATED_NUMBER_OF_DAYS = 2;

    public static final Integer DEFAULT_NUMBER_OF_MEALS_PER_DAY = 1;
    public static final Integer UPDATED_NUMBER_OF_MEALS_PER_DAY = 2;

    public static final Integer DEFAULT_TOTAL_DAILY_ENERGY_KCAL = 1;
    public static final Integer UPDATED_TOTAL_DAILY_ENERGY_KCAL = 2;

    public static final Integer DEFAULT_PERCENT_OF_PROTEIN = 0;
    public static final Integer UPDATED_PERCENT_OF_PROTEIN = 1;

    public static final Integer DEFAULT_PERCENT_OF_FAT = 0;
    public static final Integer UPDATED_PERCENT_OF_FAT = 1;

    public static final Integer DEFAULT_PERCENT_OF_CARBOHYDRATES = 0;
    public static final Integer UPDATED_PERCENT_OF_CARBOHYDRATES = 1;
    
    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealPlan createEntity(MealPlanDay mealPlanDay, MealDefinition mealDefinition) {
        MealPlan mealPlan = new MealPlan()
            .authorId(DEFAULT_AUTHOR_ID)
            .creationDate(DEFAULT_CREATION_DATE)
            .name(DEFAULT_NAME)
            .isVisible(DEFAULT_IS_VISIBLE)
            .isLocked(DEFAULT_IS_LOCKED)
            .languageId(DEFAULT_LANGUAGE_ID)
            .numberOfDays(DEFAULT_NUMBER_OF_DAYS)
            .numberOfMealsPerDay(DEFAULT_NUMBER_OF_MEALS_PER_DAY)
            .totalDailyEnergyKcal(DEFAULT_TOTAL_DAILY_ENERGY_KCAL)
            .percentOfProtein(DEFAULT_PERCENT_OF_PROTEIN)
            .percentOfFat(DEFAULT_PERCENT_OF_FAT)
            .percentOfCarbohydrates(DEFAULT_PERCENT_OF_CARBOHYDRATES);
        // Add required entity
        mealPlan.getDays().add(mealPlanDay);
        // Add required entity
        mealPlan.getMealDefinitions().add(mealDefinition);
        return mealPlan;
    }

    public static MealPlan createEntity() {
        return createEntity(MealPlanDayCreator.createEntity(),MealDefinitionCreator.createEntity());
    }
}
