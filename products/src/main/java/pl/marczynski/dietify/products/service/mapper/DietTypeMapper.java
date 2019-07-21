package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.DietTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DietType} and its DTO {@link DietTypeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DietTypeMapper extends EntityMapper<DietTypeDTO, DietType> {


    @Mapping(target = "translations", ignore = true)
    DietType toEntity(DietTypeDTO dietTypeDTO);

    default DietType fromId(Long id) {
        if (id == null) {
            return null;
        }
        DietType dietType = new DietType();
        dietType.setId(id);
        return dietType;
    }
}
