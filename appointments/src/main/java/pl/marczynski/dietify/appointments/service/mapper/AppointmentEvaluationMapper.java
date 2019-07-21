package pl.marczynski.dietify.appointments.service.mapper;

import pl.marczynski.dietify.appointments.domain.*;
import pl.marczynski.dietify.appointments.service.dto.AppointmentEvaluationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppointmentEvaluation} and its DTO {@link AppointmentEvaluationDTO}.
 */
@Mapper(componentModel = "spring", uses = {AppointmentMapper.class})
public interface AppointmentEvaluationMapper extends EntityMapper<AppointmentEvaluationDTO, AppointmentEvaluation> {

    @Mapping(source = "appointment.id", target = "appointmentId")
    AppointmentEvaluationDTO toDto(AppointmentEvaluation appointmentEvaluation);

    @Mapping(source = "appointmentId", target = "appointment")
    AppointmentEvaluation toEntity(AppointmentEvaluationDTO appointmentEvaluationDTO);

    default AppointmentEvaluation fromId(Long id) {
        if (id == null) {
            return null;
        }
        AppointmentEvaluation appointmentEvaluation = new AppointmentEvaluation();
        appointmentEvaluation.setId(id);
        return appointmentEvaluation;
    }
}
