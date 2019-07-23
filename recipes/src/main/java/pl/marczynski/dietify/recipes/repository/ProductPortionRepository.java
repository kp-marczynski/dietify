package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.ProductPortion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductPortion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductPortionRepository extends JpaRepository<ProductPortion, Long> {

}
