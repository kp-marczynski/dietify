package pl.marczynski.dietify.appointments.service.mapper;

import pl.marczynski.dietify.appointments.domain.*;
import pl.marczynski.dietify.appointments.service.dto.NutritionalInterviewDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link NutritionalInterview} and its DTO {@link NutritionalInterviewDTO}.
 */
@Mapper(componentModel = "spring", uses = {AppointmentMapper.class})
public interface NutritionalInterviewMapper extends EntityMapper<NutritionalInterviewDTO, NutritionalInterview> {

    @Mapping(source = "appointment.id", target = "appointmentId")
    NutritionalInterviewDTO toDto(NutritionalInterview nutritionalInterview);

    @Mapping(source = "appointmentId", target = "appointment")
    @Mapping(target = "ownedKitchenAppliances", ignore = true)
    @Mapping(target = "customQuestions", ignore = true)
    NutritionalInterview toEntity(NutritionalInterviewDTO nutritionalInterviewDTO);

    default NutritionalInterview fromId(Long id) {
        if (id == null) {
            return null;
        }
        NutritionalInterview nutritionalInterview = new NutritionalInterview();
        nutritionalInterview.setId(id);
        return nutritionalInterview;
    }
}
