package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.MealType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealTypeRepository extends JpaRepository<MealType, Long> {

}
