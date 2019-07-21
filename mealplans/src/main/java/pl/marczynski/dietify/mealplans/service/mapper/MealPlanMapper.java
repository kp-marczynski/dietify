package pl.marczynski.dietify.mealplans.service.mapper;

import pl.marczynski.dietify.mealplans.domain.*;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MealPlan} and its DTO {@link MealPlanDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MealPlanMapper extends EntityMapper<MealPlanDTO, MealPlan> {


    @Mapping(target = "days", ignore = true)
    @Mapping(target = "mealDefinitions", ignore = true)
    @Mapping(target = "tagsGoodFors", ignore = true)
    @Mapping(target = "tagsBadFors", ignore = true)
    MealPlan toEntity(MealPlanDTO mealPlanDTO);

    default MealPlan fromId(Long id) {
        if (id == null) {
            return null;
        }
        MealPlan mealPlan = new MealPlan();
        mealPlan.setId(id);
        return mealPlan;
    }
}
