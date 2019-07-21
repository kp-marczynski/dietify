package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.MealTypeTranslationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MealTypeTranslation} and its DTO {@link MealTypeTranslationDTO}.
 */
@Mapper(componentModel = "spring", uses = {MealTypeMapper.class})
public interface MealTypeTranslationMapper extends EntityMapper<MealTypeTranslationDTO, MealTypeTranslation> {

    @Mapping(source = "mealType.id", target = "mealTypeId")
    @Mapping(source = "mealType.name", target = "mealTypeName")
    MealTypeTranslationDTO toDto(MealTypeTranslation mealTypeTranslation);

    @Mapping(source = "mealTypeId", target = "mealType")
    MealTypeTranslation toEntity(MealTypeTranslationDTO mealTypeTranslationDTO);

    default MealTypeTranslation fromId(Long id) {
        if (id == null) {
            return null;
        }
        MealTypeTranslation mealTypeTranslation = new MealTypeTranslation();
        mealTypeTranslation.setId(id);
        return mealTypeTranslation;
    }
}
