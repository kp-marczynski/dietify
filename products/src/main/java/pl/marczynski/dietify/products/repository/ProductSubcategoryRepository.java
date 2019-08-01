package pl.marczynski.dietify.products.repository;

import org.springframework.data.repository.query.Param;
import pl.marczynski.dietify.products.domain.ProductSubcategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ProductSubcategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductSubcategoryRepository extends JpaRepository<ProductSubcategory, Long> {
    @Query("select productSubcategory from ProductSubcategory productSubcategory where productSubcategory.category.id = :productCategoryId and productSubcategory in (select distinct product.subcategory from Product product where product.language = :language)")
    List<ProductSubcategory> findAllByCategoryIdAndProductLanguage(@Param("productCategoryId") Long productCategoryId, @Param("language") String language);

    @Query("select productSubcategory from ProductSubcategory productSubcategory where productSubcategory not in (select distinct product.subcategory from Product product)")
    List<ProductSubcategory> findAllNotAssignedToProducts();
}
