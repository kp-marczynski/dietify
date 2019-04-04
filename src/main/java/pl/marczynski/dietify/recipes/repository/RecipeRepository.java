package pl.marczynski.dietify.recipes.repository;

import org.springframework.cache.annotation.Cacheable;
import pl.marczynski.dietify.recipes.domain.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Recipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    String RECIPES_EAGER_BY_ID_CACHE = "recipesEagerById";

    @Query(value = "select distinct recipe from Recipe recipe left join fetch recipe.kitchenAppliances left join fetch recipe.dishTypes left join fetch recipe.mealTypes",
        countQuery = "select count(distinct recipe) from Recipe recipe")
    Page<Recipe> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct recipe from Recipe recipe left join fetch recipe.kitchenAppliances left join fetch recipe.dishTypes left join fetch recipe.mealTypes")
    List<Recipe> findAllWithEagerRelationships();

    @Cacheable(cacheNames = RECIPES_EAGER_BY_ID_CACHE)
    @Query("select recipe from Recipe recipe " +
        "left join fetch recipe.kitchenAppliances " +
        "left join fetch recipe.dishTypes " +
        "left join fetch recipe.mealTypes " +
        "left join fetch recipe.recipeSections " +
        "left join fetch recipe.suitableForDiets " +
        "left join fetch recipe.unsuitableForDiets " +
        "where recipe.id =:id")
    Optional<Recipe> findOneWithEagerRelationships(@Param("id") Long id);

}
