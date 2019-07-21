package pl.marczynski.dietify.mealplans.service.mapper;

import pl.marczynski.dietify.mealplans.domain.*;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanSuitableForDietDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MealPlanSuitableForDiet} and its DTO {@link MealPlanSuitableForDietDTO}.
 */
@Mapper(componentModel = "spring", uses = {MealPlanMapper.class})
public interface MealPlanSuitableForDietMapper extends EntityMapper<MealPlanSuitableForDietDTO, MealPlanSuitableForDiet> {

    @Mapping(source = "mealPlan.id", target = "mealPlanId")
    MealPlanSuitableForDietDTO toDto(MealPlanSuitableForDiet mealPlanSuitableForDiet);

    @Mapping(source = "mealPlanId", target = "mealPlan")
    MealPlanSuitableForDiet toEntity(MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO);

    default MealPlanSuitableForDiet fromId(Long id) {
        if (id == null) {
            return null;
        }
        MealPlanSuitableForDiet mealPlanSuitableForDiet = new MealPlanSuitableForDiet();
        mealPlanSuitableForDiet.setId(id);
        return mealPlanSuitableForDiet;
    }
}
