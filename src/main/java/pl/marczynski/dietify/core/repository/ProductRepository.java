package pl.marczynski.dietify.core.repository;

import pl.marczynski.dietify.core.domain.Product;
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
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select product from Product product where product.author.login = ?#{principal.username}")
    List<Product> findByAuthorIsCurrentUser();

    @Query(value = "select distinct product from Product product left join fetch product.suitableDiets left join fetch product.unsuitableDiets",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct product from Product product left join fetch product.suitableDiets left join fetch product.unsuitableDiets")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product left join fetch product.suitableDiets left join fetch product.unsuitableDiets left join fetch product.householdMeasures left join fetch product.nutritionData where product.id =:id")
    Optional<Product> findOneWithEagerRelationships(@Param("id") Long id);

}
