package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.RecipeSuitableForDiet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RecipeSuitableForDiet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipeSuitableForDietRepository extends JpaRepository<RecipeSuitableForDiet, Long> {

}
