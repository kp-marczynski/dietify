package pl.marczynski.dietify.core.repository;

import pl.marczynski.dietify.core.domain.BodyMeasurment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BodyMeasurment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BodyMeasurmentRepository extends JpaRepository<BodyMeasurment, Long> {

}
