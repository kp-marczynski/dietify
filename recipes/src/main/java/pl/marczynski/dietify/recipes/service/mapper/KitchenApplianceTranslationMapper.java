package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.KitchenApplianceTranslationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link KitchenApplianceTranslation} and its DTO {@link KitchenApplianceTranslationDTO}.
 */
@Mapper(componentModel = "spring", uses = {KitchenApplianceMapper.class})
public interface KitchenApplianceTranslationMapper extends EntityMapper<KitchenApplianceTranslationDTO, KitchenApplianceTranslation> {

    @Mapping(source = "kitchenAppliance.id", target = "kitchenApplianceId")
    @Mapping(source = "kitchenAppliance.name", target = "kitchenApplianceName")
    KitchenApplianceTranslationDTO toDto(KitchenApplianceTranslation kitchenApplianceTranslation);

    @Mapping(source = "kitchenApplianceId", target = "kitchenAppliance")
    KitchenApplianceTranslation toEntity(KitchenApplianceTranslationDTO kitchenApplianceTranslationDTO);

    default KitchenApplianceTranslation fromId(Long id) {
        if (id == null) {
            return null;
        }
        KitchenApplianceTranslation kitchenApplianceTranslation = new KitchenApplianceTranslation();
        kitchenApplianceTranslation.setId(id);
        return kitchenApplianceTranslation;
    }
}
