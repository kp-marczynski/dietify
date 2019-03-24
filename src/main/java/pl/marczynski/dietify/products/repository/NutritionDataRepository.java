package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.NutritionData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NutritionData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutritionDataRepository extends JpaRepository<NutritionData, Long> {

}
