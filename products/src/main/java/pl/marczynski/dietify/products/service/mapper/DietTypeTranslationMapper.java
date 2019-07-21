package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.DietTypeTranslationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DietTypeTranslation} and its DTO {@link DietTypeTranslationDTO}.
 */
@Mapper(componentModel = "spring", uses = {DietTypeMapper.class})
public interface DietTypeTranslationMapper extends EntityMapper<DietTypeTranslationDTO, DietTypeTranslation> {

    @Mapping(source = "dietType.id", target = "dietTypeId")
    @Mapping(source = "dietType.name", target = "dietTypeName")
    DietTypeTranslationDTO toDto(DietTypeTranslation dietTypeTranslation);

    @Mapping(source = "dietTypeId", target = "dietType")
    DietTypeTranslation toEntity(DietTypeTranslationDTO dietTypeTranslationDTO);

    default DietTypeTranslation fromId(Long id) {
        if (id == null) {
            return null;
        }
        DietTypeTranslation dietTypeTranslation = new DietTypeTranslation();
        dietTypeTranslation.setId(id);
        return dietTypeTranslation;
    }
}
