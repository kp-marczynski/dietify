package pl.marczynski.dietify.appointments.repository;

import pl.marczynski.dietify.appointments.domain.Dietetician;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dietetician entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DieteticianRepository extends JpaRepository<Dietetician, Long> {

}
