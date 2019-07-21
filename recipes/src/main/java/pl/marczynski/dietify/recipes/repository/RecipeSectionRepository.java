package pl.marczynski.dietify.recipes.repository;

import pl.marczynski.dietify.recipes.domain.RecipeSection;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RecipeSection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipeSectionRepository extends JpaRepository<RecipeSection, Long> {

}
