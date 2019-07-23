package pl.marczynski.dietify.appointments.repository;

import pl.marczynski.dietify.appointments.domain.BodyMeasurment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BodyMeasurment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BodyMeasurmentRepository extends JpaRepository<BodyMeasurment, Long> {

}
