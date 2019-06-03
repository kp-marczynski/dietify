package pl.marczynski.dietify.core.repository;

import pl.marczynski.dietify.core.domain.PatientCard;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PatientCard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PatientCardRepository extends JpaRepository<PatientCard, Long> {

}
