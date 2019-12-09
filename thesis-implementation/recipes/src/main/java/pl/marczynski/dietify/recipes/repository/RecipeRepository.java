package pl.marczynski.dietify.recipes.repository;

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
@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query(value = "select distinct recipe from Recipe recipe" +
        " left join fetch recipe.kitchenAppliances" +
        " left join fetch recipe.dishTypes" +
        " left join fetch recipe.mealTypes" +
        " left join fetch recipe.recipeSections" +
        " where recipe.authorId =:author",
        countQuery = "select count(distinct recipe) from Recipe recipe")
    Page<Recipe> findAllWithEagerRelationships(Long author, Pageable pageable);

    @Query("select recipe from Recipe recipe" +
        " left join fetch recipe.kitchenAppliances" +
        " left join fetch recipe.dishTypes" +
        " left join fetch recipe.mealTypes" +
        " left join fetch recipe.recipeSections" +
        " where recipe.id =:id")
    Optional<Recipe> findOneWithEagerRelationships(@Param("id") Long id);

    Page<Recipe> findByNameContainingIgnoreCaseAndAuthorId(String searchPhrase, Long authorId, Pageable pageable);

    Page<Recipe> findByNameContainingIgnoreCaseAndLanguageAndAuthorId(String searchPhrase, String language, Long authorId, Pageable pageable);

    @Modifying
    @Query(value = "update Recipe recipe set recipe.isFinal = true where recipe.id = :recipeId")
    void changeToFinal(@Param("recipeId") Long recipeId);
}
