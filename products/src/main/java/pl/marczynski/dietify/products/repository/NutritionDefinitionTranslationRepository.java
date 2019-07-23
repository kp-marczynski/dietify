package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.NutritionDefinitionTranslation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NutritionDefinitionTranslation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutritionDefinitionTranslationRepository extends JpaRepository<NutritionDefinitionTranslation, Long> {

}
