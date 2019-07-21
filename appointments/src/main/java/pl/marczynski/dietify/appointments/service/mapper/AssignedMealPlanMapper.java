package pl.marczynski.dietify.appointments.service.mapper;

import pl.marczynski.dietify.appointments.domain.*;
import pl.marczynski.dietify.appointments.service.dto.AssignedMealPlanDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link AssignedMealPlan} and its DTO {@link AssignedMealPlanDTO}.
 */
@Mapper(componentModel = "spring", uses = {AppointmentMapper.class})
public interface AssignedMealPlanMapper extends EntityMapper<AssignedMealPlanDTO, AssignedMealPlan> {

    @Mapping(source = "appointment.id", target = "appointmentId")
    AssignedMealPlanDTO toDto(AssignedMealPlan assignedMealPlan);

    @Mapping(source = "appointmentId", target = "appointment")
    AssignedMealPlan toEntity(AssignedMealPlanDTO assignedMealPlanDTO);

    default AssignedMealPlan fromId(Long id) {
        if (id == null) {
            return null;
        }
        AssignedMealPlan assignedMealPlan = new AssignedMealPlan();
        assignedMealPlan.setId(id);
        return assignedMealPlan;
    }
}
