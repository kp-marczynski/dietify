package pl.marczynski.dietify.appointments.repository;

import pl.marczynski.dietify.appointments.domain.BodyMeasurement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BodyMeasurement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BodyMeasurementRepository extends JpaRepository<BodyMeasurement, Long> {

}
