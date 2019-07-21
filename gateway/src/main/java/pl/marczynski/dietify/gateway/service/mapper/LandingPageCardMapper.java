package pl.marczynski.dietify.gateway.service.mapper;

import pl.marczynski.dietify.gateway.domain.*;
import pl.marczynski.dietify.gateway.service.dto.LandingPageCardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link LandingPageCard} and its DTO {@link LandingPageCardDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LandingPageCardMapper extends EntityMapper<LandingPageCardDTO, LandingPageCard> {



    default LandingPageCard fromId(Long id) {
        if (id == null) {
            return null;
        }
        LandingPageCard landingPageCard = new LandingPageCard();
        landingPageCard.setId(id);
        return landingPageCard;
    }
}
