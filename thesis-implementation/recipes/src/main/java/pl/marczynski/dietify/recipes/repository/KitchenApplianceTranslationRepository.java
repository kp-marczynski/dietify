package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.KitchenApplianceTranslation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the KitchenApplianceTranslation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KitchenApplianceTranslationRepository extends JpaRepository<KitchenApplianceTranslation, Long> {

}
