package pl.marczynski.dietify.appointments.service.mapper;

import pl.marczynski.dietify.appointments.domain.*;
import pl.marczynski.dietify.appointments.service.dto.PatientCardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PatientCard} and its DTO {@link PatientCardDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PatientCardMapper extends EntityMapper<PatientCardDTO, PatientCard> {


    @Mapping(target = "appointments", ignore = true)
    PatientCard toEntity(PatientCardDTO patientCardDTO);

    default PatientCard fromId(Long id) {
        if (id == null) {
            return null;
        }
        PatientCard patientCard = new PatientCard();
        patientCard.setId(id);
        return patientCard;
    }
}
