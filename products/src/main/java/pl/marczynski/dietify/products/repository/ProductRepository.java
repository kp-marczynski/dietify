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

    @Query(value = "select distinct product from Product product left join fetch product.suitableDiets left join fetch product.unsuitableDiets where product.authorId =:authorId or product.authorId is null",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findAllWithEagerRelationships(Long authorId, Pageable pageable);

    @Query("select distinct product from Product product left join fetch product.suitableDiets left join fetch product.unsuitableDiets where product.authorId =:authorId or product.authorId is null")
    List<Product> findAllWithEagerRelationships(Long authorId);

    @Query("select product from Product product" +
        " left join fetch product.suitableDiets" +
        " left join fetch product.unsuitableDiets" +
        " left join fetch product.householdMeasures" +
        " left join fetch product.nutritionData" +
        " where product.id =:id")
    Optional<Product> findOneWithEagerRelationships(@Param("id") Long id);

    @Query(value = "select distinct product from Product product where lower(product.description) like concat('%',lower(:searchPhrase),'%') and (product.authorId =:authorId or product.authorId is null)",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findByDescriptionContainingIgnoreCase(String searchPhrase, Long authorId, Pageable pageable);

    @Query(value = "select distinct product from Product product where lower(product.description) like concat('%',lower(:searchPhrase),'%') and product.language =:language and (product.authorId =:authorId or product.authorId is null)",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findByDescriptionContainingIgnoreCaseAndLanguage(String searchPhrase, String language, Long authorId, Pageable pageable);

    @Query(value = "select distinct product from Product product where lower(product.description) like concat('%',lower(:searchPhrase),'%') and product.language =:language and product.subcategory.id =:subcategoryId and (product.authorId =:authorId or product.authorId is null)",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findByDescriptionContainingIgnoreCaseAndSubcategoryCategoryIdAndLanguage(String searchPhrase, Long subcategoryId, String language, Long authorId, Pageable pageable);

    @Query(value = "select distinct product from Product product where lower(product.description) like concat('%',lower(:searchPhrase),'%') and product.subcategory.id =:subcategoryId and (product.authorId =:authorId or product.authorId is null)",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findByDescriptionContainingIgnoreCaseAndSubcategoryId(String searchPhrase, Long subcategoryId, Long authorId, Pageable pageable);

    @Query(value = "select distinct product from Product product where product.authorId =:authorId or product.authorId is null",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findAllByAuthorId(Long authorId, Pageable pageable);
}
