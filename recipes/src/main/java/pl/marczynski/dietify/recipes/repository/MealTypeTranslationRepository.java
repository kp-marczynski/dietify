package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.MealTypeTranslation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealTypeTranslation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealTypeTranslationRepository extends JpaRepository<MealTypeTranslation, Long> {

}
