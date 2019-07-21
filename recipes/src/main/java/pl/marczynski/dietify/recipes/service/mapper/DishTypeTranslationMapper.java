package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.DishTypeTranslationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DishTypeTranslation} and its DTO {@link DishTypeTranslationDTO}.
 */
@Mapper(componentModel = "spring", uses = {DishTypeMapper.class})
public interface DishTypeTranslationMapper extends EntityMapper<DishTypeTranslationDTO, DishTypeTranslation> {

    @Mapping(source = "dishType.id", target = "dishTypeId")
    @Mapping(source = "dishType.description", target = "dishTypeDescription")
    DishTypeTranslationDTO toDto(DishTypeTranslation dishTypeTranslation);

    @Mapping(source = "dishTypeId", target = "dishType")
    DishTypeTranslation toEntity(DishTypeTranslationDTO dishTypeTranslationDTO);

    default DishTypeTranslation fromId(Long id) {
        if (id == null) {
            return null;
        }
        DishTypeTranslation dishTypeTranslation = new DishTypeTranslation();
        dishTypeTranslation.setId(id);
        return dishTypeTranslation;
    }
}
