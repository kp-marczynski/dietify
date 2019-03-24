package pl.marczynski.dietify.products.repository;

import pl.marczynski.dietify.products.domain.HouseholdMeasure;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HouseholdMeasure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HouseholdMeasureRepository extends JpaRepository<HouseholdMeasure, Long> {

}
