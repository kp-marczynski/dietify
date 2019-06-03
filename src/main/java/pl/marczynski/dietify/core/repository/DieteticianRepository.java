package pl.marczynski.dietify.core.repository;

import pl.marczynski.dietify.core.domain.Dietetician;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dietetician entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DieteticianRepository extends JpaRepository<Dietetician, Long> {

}
