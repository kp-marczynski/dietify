package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.DietTypeTranslation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DietTypeTranslation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DietTypeTranslationRepository extends JpaRepository<DietTypeTranslation, Long> {

}
