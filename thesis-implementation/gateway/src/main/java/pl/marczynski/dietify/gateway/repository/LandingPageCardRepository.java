package pl.marczynski.dietify.gateway.repository;

import pl.marczynski.dietify.gateway.domain.LandingPageCard;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LandingPageCard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LandingPageCardRepository extends JpaRepository<LandingPageCard, Long> {

}
