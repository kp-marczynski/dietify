package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.PreparationStep;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PreparationStep entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PreparationStepRepository extends JpaRepository<PreparationStep, Long> {

}
