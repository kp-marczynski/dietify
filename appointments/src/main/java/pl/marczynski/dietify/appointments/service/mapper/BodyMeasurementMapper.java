package pl.marczynski.dietify.appointments.service.mapper;

import pl.marczynski.dietify.appointments.domain.*;
import pl.marczynski.dietify.appointments.service.dto.BodyMeasurementDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link BodyMeasurement} and its DTO {@link BodyMeasurementDTO}.
 */
@Mapper(componentModel = "spring", uses = {AppointmentMapper.class})
public interface BodyMeasurementMapper extends EntityMapper<BodyMeasurementDTO, BodyMeasurement> {

    @Mapping(source = "appointment.id", target = "appointmentId")
    BodyMeasurementDTO toDto(BodyMeasurement bodyMeasurement);

    @Mapping(source = "appointmentId", target = "appointment")
    BodyMeasurement toEntity(BodyMeasurementDTO bodyMeasurementDTO);

    default BodyMeasurement fromId(Long id) {
        if (id == null) {
            return null;
        }
        BodyMeasurement bodyMeasurement = new BodyMeasurement();
        bodyMeasurement.setId(id);
        return bodyMeasurement;
    }
}
