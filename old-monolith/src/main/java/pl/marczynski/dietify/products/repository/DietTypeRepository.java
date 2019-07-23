package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.DietType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DietType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DietTypeRepository extends JpaRepository<DietType, Long> {

}
