package pl.marczynski.dietify.mealplans.service.mapper;

import pl.marczynski.dietify.mealplans.domain.*;
import pl.marczynski.dietify.mealplans.service.dto.MealDefinitionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MealDefinition} and its DTO {@link MealDefinitionDTO}.
 */
@Mapper(componentModel = "spring", uses = {MealPlanMapper.class})
public interface MealDefinitionMapper extends EntityMapper<MealDefinitionDTO, MealDefinition> {

    @Mapping(source = "mealPlan.id", target = "mealPlanId")
    MealDefinitionDTO toDto(MealDefinition mealDefinition);

    @Mapping(source = "mealPlanId", target = "mealPlan")
    MealDefinition toEntity(MealDefinitionDTO mealDefinitionDTO);

    default MealDefinition fromId(Long id) {
        if (id == null) {
            return null;
        }
        MealDefinition mealDefinition = new MealDefinition();
        mealDefinition.setId(id);
        return mealDefinition;
    }
}
