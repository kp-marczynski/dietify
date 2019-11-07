package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Product entity.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select distinct product from Product product left join fetch product.suitableDiets left join fetch product.unsuitableDiets",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct product from Product product left join fetch product.suitableDiets left join fetch product.unsuitableDiets")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product" +
        " left join fetch product.suitableDiets" +
        " left join fetch product.unsuitableDiets" +
        " left join fetch product.householdMeasures" +
        " left join fetch product.nutritionData" +
        " where product.id =:id")
    Optional<Product> findOneWithEagerRelationships(@Param("id") Long id);

    Page<Product> findByDescriptionContainingIgnoreCase(String searchPhrase, Pageable pageable);

    Page<Product> findByDescriptionContainingIgnoreCaseAndLanguage(String searchPhrase, String language, Pageable pageable);

    Page<Product> findByDescriptionContainingIgnoreCaseAndSubcategoryCategoryIdAndLanguage(String searchPhrase, Long categoryId, String language, Pageable pageable);

    Page<Product> findByDescriptionContainingIgnoreCaseAndSubcategoryId(String searchPhrase, Long subcategoryId, Pageable pageable);

}
