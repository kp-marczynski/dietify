package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.KitchenApplianceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link KitchenAppliance} and its DTO {@link KitchenApplianceDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface KitchenApplianceMapper extends EntityMapper<KitchenApplianceDTO, KitchenAppliance> {


    @Mapping(target = "translations", ignore = true)
    KitchenAppliance toEntity(KitchenApplianceDTO kitchenApplianceDTO);

    default KitchenAppliance fromId(Long id) {
        if (id == null) {
            return null;
        }
        KitchenAppliance kitchenAppliance = new KitchenAppliance();
        kitchenAppliance.setId(id);
        return kitchenAppliance;
    }
}
