package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.RecipeUnsuitableForDiet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RecipeUnsuitableForDiet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipeUnsuitableForDietRepository extends JpaRepository<RecipeUnsuitableForDiet, Long> {

}
