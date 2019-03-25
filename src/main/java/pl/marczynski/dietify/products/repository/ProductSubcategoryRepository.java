package pl.marczynski.dietify.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.marczynski.dietify.products.domain.ProductSubcategory;

import java.util.List;


/**
 * Spring Data  repository for the ProductSubcategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductSubcategoryRepository extends JpaRepository<ProductSubcategory, Long> {

    List<ProductSubcategory> findAllByCategory_Id(Long productCategoryId);
}
