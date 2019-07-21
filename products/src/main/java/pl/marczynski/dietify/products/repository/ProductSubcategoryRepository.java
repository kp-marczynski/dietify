package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.ProductSubcategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductSubcategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductSubcategoryRepository extends JpaRepository<ProductSubcategory, Long> {

}
