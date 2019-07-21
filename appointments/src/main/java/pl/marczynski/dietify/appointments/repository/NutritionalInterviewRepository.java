package pl.marczynski.dietify.appointments.repository;

import pl.marczynski.dietify.appointments.domain.NutritionalInterview;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NutritionalInterview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutritionalInterviewRepository extends JpaRepository<NutritionalInterview, Long> {

}
