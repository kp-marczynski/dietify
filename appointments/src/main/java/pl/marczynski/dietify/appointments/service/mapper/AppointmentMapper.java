package pl.marczynski.dietify.appointments.service.mapper;

import pl.marczynski.dietify.appointments.domain.*;
import pl.marczynski.dietify.appointments.service.dto.AppointmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Appointment} and its DTO {@link AppointmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {PatientCardMapper.class})
public interface AppointmentMapper extends EntityMapper<AppointmentDTO, Appointment> {

    @Mapping(source = "patientCard.id", target = "patientCardId")
    AppointmentDTO toDto(Appointment appointment);

    @Mapping(source = "patientCardId", target = "patientCard")
    @Mapping(target = "bodyMeasurement", ignore = true)
    @Mapping(target = "nutritionalInterview", ignore = true)
    @Mapping(target = "mealPlans", ignore = true)
    Appointment toEntity(AppointmentDTO appointmentDTO);

    default Appointment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Appointment appointment = new Appointment();
        appointment.setId(id);
        return appointment;
    }
}
