package pl.marczynski.dietify.mealplans.repository;

import pl.marczynski.dietify.mealplans.domain.MealProduct;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealProductRepository extends JpaRepository<MealProduct, Long> {

}
