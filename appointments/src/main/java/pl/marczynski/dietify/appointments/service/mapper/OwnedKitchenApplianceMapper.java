package pl.marczynski.dietify.appointments.service.mapper;

import pl.marczynski.dietify.appointments.domain.*;
import pl.marczynski.dietify.appointments.service.dto.OwnedKitchenApplianceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link OwnedKitchenAppliance} and its DTO {@link OwnedKitchenApplianceDTO}.
 */
@Mapper(componentModel = "spring", uses = {NutritionalInterviewMapper.class})
public interface OwnedKitchenApplianceMapper extends EntityMapper<OwnedKitchenApplianceDTO, OwnedKitchenAppliance> {

    @Mapping(source = "nutritionalInterview.id", target = "nutritionalInterviewId")
    OwnedKitchenApplianceDTO toDto(OwnedKitchenAppliance ownedKitchenAppliance);

    @Mapping(source = "nutritionalInterviewId", target = "nutritionalInterview")
    OwnedKitchenAppliance toEntity(OwnedKitchenApplianceDTO ownedKitchenApplianceDTO);

    default OwnedKitchenAppliance fromId(Long id) {
        if (id == null) {
            return null;
        }
        OwnedKitchenAppliance ownedKitchenAppliance = new OwnedKitchenAppliance();
        ownedKitchenAppliance.setId(id);
        return ownedKitchenAppliance;
    }
}
