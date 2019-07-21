package pl.marczynski.dietify.mealplans.service.mapper;

import pl.marczynski.dietify.mealplans.domain.*;
import pl.marczynski.dietify.mealplans.service.dto.MealDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Meal} and its DTO {@link MealDTO}.
 */
@Mapper(componentModel = "spring", uses = {MealPlanDayMapper.class})
public interface MealMapper extends EntityMapper<MealDTO, Meal> {

    @Mapping(source = "mealPlanDay.id", target = "mealPlanDayId")
    MealDTO toDto(Meal meal);

    @Mapping(source = "mealPlanDayId", target = "mealPlanDay")
    @Mapping(target = "mealRecipes", ignore = true)
    @Mapping(target = "mealProducts", ignore = true)
    Meal toEntity(MealDTO mealDTO);

    default Meal fromId(Long id) {
        if (id == null) {
            return null;
        }
        Meal meal = new Meal();
        meal.setId(id);
        return meal;
    }
}
