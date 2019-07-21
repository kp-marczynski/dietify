package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.ProductBasicNutritionData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductBasicNutritionData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductBasicNutritionDataRepository extends JpaRepository<ProductBasicNutritionData, Long> {

}
