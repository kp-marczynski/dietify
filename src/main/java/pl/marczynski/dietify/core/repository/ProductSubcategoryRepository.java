package pl.marczynski.dietify.core.repository;

import pl.marczynski.dietify.core.domain.ProductSubcategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductSubcategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductSubcategoryRepository extends JpaRepository<ProductSubcategory, Long> {

}
