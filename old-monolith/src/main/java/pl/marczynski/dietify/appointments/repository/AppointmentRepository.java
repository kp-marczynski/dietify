package pl.marczynski.dietify.appointments.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.marczynski.dietify.appointments.domain.Appointment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Appointment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Page<Appointment> findAllByPatientCardDieteticianUserId(Long dieteticianId, Pageable pageable);
}
