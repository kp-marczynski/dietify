package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.DishTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DishType} and its DTO {@link DishTypeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DishTypeMapper extends EntityMapper<DishTypeDTO, DishType> {


    @Mapping(target = "translations", ignore = true)
    DishType toEntity(DishTypeDTO dishTypeDTO);

    default DishType fromId(Long id) {
        if (id == null) {
            return null;
        }
        DishType dishType = new DishType();
        dishType.setId(id);
        return dishType;
    }
}
