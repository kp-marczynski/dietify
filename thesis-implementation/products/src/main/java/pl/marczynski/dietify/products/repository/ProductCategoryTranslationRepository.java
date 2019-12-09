package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.ProductCategoryTranslation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductCategoryTranslation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductCategoryTranslationRepository extends JpaRepository<ProductCategoryTranslation, Long> {

}
