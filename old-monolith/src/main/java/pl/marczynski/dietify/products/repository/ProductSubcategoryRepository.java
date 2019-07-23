package pl.marczynski.dietify.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.marczynski.dietify.core.domain.Language;
import pl.marczynski.dietify.products.domain.ProductSubcategory;

import java.util.List;


/**
 * Spring Data  repository for the ProductSubcategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductSubcategoryRepository extends JpaRepository<ProductSubcategory, Long> {

    @Query("select productSubcategory from ProductSubcategory productSubcategory where productSubcategory.category.id = :productCategoryId and productSubcategory in (select distinct product.subcategory from Product product where product.language.id = :languageId)")
    List<ProductSubcategory> findAllByCategoryIdAndProductLanguage(@Param("productCategoryId") Long productCategoryId, @Param("languageId") Long languageId);

    @Query("select productSubcategory from ProductSubcategory productSubcategory where productSubcategory not in (select distinct product.subcategory from Product product)")
    List<ProductSubcategory> findAllNotAssignedToProducts();
}
