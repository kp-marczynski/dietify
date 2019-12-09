package pl.marczynski.dietify.appointments.repository;

import pl.marczynski.dietify.appointments.domain.OwnedKitchenAppliance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OwnedKitchenAppliance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OwnedKitchenApplianceRepository extends JpaRepository<OwnedKitchenAppliance, Long> {

}
