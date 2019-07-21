package pl.marczynski.dietify.mealplans.service.mapper;

import pl.marczynski.dietify.mealplans.domain.*;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanDayDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MealPlanDay} and its DTO {@link MealPlanDayDTO}.
 */
@Mapper(componentModel = "spring", uses = {MealPlanMapper.class})
public interface MealPlanDayMapper extends EntityMapper<MealPlanDayDTO, MealPlanDay> {

    @Mapping(source = "mealPlan.id", target = "mealPlanId")
    MealPlanDayDTO toDto(MealPlanDay mealPlanDay);

    @Mapping(source = "mealPlanId", target = "mealPlan")
    @Mapping(target = "meals", ignore = true)
    MealPlanDay toEntity(MealPlanDayDTO mealPlanDayDTO);

    default MealPlanDay fromId(Long id) {
        if (id == null) {
            return null;
        }
        MealPlanDay mealPlanDay = new MealPlanDay();
        mealPlanDay.setId(id);
        return mealPlanDay;
    }
}
