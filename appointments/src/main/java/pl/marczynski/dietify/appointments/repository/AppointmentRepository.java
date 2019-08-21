package pl.marczynski.dietify.appointments.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import pl.marczynski.dietify.appointments.domain.Appointment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pl.marczynski.dietify.appointments.domain.enumeration.AppointmentState;

import javax.validation.constraints.NotNull;
import java.util.Optional;


/**
 * Spring Data  repository for the Appointment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("select appointment from Appointment appointment" +
        " left join fetch appointment.nutritionalInterview" +
        " left join fetch appointment.bodyMeasurement" +
        " left join fetch appointment.mealPlans" +
        " where appointment.id =:id")
    Optional<Appointment> findOneWithEagerRelationships(@Param("id") Long id);

    Page<Appointment> findAllByAppointmentState(@NotNull AppointmentState appointmentState, Pageable pageable);

    Page<Appointment> findAllByAppointmentStateAndPatientCardPatientId(@NotNull AppointmentState appointmentState, @NotNull Long patientCard_patientId, Pageable pageable);

    Page<Appointment> findAllByPatientCardPatientId(@NotNull Long patientCard_patientId, Pageable pageable);
}
