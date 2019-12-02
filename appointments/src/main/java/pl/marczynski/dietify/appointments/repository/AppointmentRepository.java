package pl.marczynski.dietify.appointments.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import pl.marczynski.dietify.appointments.domain.Appointment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pl.marczynski.dietify.appointments.domain.BmiResult;
import pl.marczynski.dietify.appointments.domain.enumeration.AppointmentState;

import javax.validation.constraints.NotNull;
import java.util.List;
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

    Page<Appointment> findAllByAppointmentStateAndPatientCardDietitianId(@NotNull AppointmentState appointmentState, Long dietitianId, Pageable pageable);

    Page<Appointment> findAllByAppointmentStateAndPatientCardDietitianIdAndPatientCardPatientId(@NotNull AppointmentState appointmentState, Long dietitianId, @NotNull Long patientCard_patientId, Pageable pageable);

    Page<Appointment> findAllByPatientCardDietitianIdAndPatientCardPatientId(Long dietitianId, @NotNull Long patientCard_patientId, Pageable pageable);

    Page<Appointment> findAllByPatientCardDietitianId(Long dietitianId, Pageable pageable);

    @Query(value = "select new pl.marczynski.dietify.appointments.domain.BmiResult(appointment.appointmentDate, appointment.bodyMeasurement.weight, appointment.bodyMeasurement.height) from Appointment appointment where appointment.patientCard.id = :patientCardId and appointment.bodyMeasurement.weight is not null and appointment.bodyMeasurement.height is not null")
    List<BmiResult> calculateBMI(@Param("patientCardId")Long patientCardId);
}
