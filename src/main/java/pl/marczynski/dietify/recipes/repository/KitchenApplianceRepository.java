package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.KitchenAppliance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the KitchenAppliance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KitchenApplianceRepository extends JpaRepository<KitchenAppliance, Long> {

}
