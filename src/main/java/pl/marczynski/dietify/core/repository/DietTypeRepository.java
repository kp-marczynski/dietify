package pl.marczynski.dietify.core.repository;

import pl.marczynski.dietify.core.domain.DietType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DietType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DietTypeRepository extends JpaRepository<DietType, Long> {

}
