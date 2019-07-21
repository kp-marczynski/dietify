package pl.marczynski.dietify.mealplans.service.mapper;

import pl.marczynski.dietify.mealplans.domain.*;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanUnsuitableForDietDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MealPlanUnsuitableForDiet} and its DTO {@link MealPlanUnsuitableForDietDTO}.
 */
@Mapper(componentModel = "spring", uses = {MealPlanMapper.class})
public interface MealPlanUnsuitableForDietMapper extends EntityMapper<MealPlanUnsuitableForDietDTO, MealPlanUnsuitableForDiet> {

    @Mapping(source = "mealPlan.id", target = "mealPlanId")
    MealPlanUnsuitableForDietDTO toDto(MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet);

    @Mapping(source = "mealPlanId", target = "mealPlan")
    MealPlanUnsuitableForDiet toEntity(MealPlanUnsuitableForDietDTO mealPlanUnsuitableForDietDTO);

    default MealPlanUnsuitableForDiet fromId(Long id) {
        if (id == null) {
            return null;
        }
        MealPlanUnsuitableForDiet mealPlanUnsuitableForDiet = new MealPlanUnsuitableForDiet();
        mealPlanUnsuitableForDiet.setId(id);
        return mealPlanUnsuitableForDiet;
    }
}
