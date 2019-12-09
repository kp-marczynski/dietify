package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.DishTypeTranslation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DishTypeTranslation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DishTypeTranslationRepository extends JpaRepository<DishTypeTranslation, Long> {

}
