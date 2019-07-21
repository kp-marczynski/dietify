package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.MealTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MealType} and its DTO {@link MealTypeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MealTypeMapper extends EntityMapper<MealTypeDTO, MealType> {


    @Mapping(target = "translations", ignore = true)
    MealType toEntity(MealTypeDTO mealTypeDTO);

    default MealType fromId(Long id) {
        if (id == null) {
            return null;
        }
        MealType mealType = new MealType();
        mealType.setId(id);
        return mealType;
    }
}
