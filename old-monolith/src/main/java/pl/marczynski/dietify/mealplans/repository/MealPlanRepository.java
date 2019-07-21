package pl.marczynski.dietify.mealplans.repository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.marczynski.dietify.mealplans.domain.MealPlan;

import java.util.Optional;


/**
 * Spring Data  repository for the MealPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
    String MEALPLAN_EAGER_BY_ID_CACHE = "mealplanEagerById";

    @Cacheable(cacheNames = MEALPLAN_EAGER_BY_ID_CACHE)
    @Query("select mealPlan from MealPlan mealPlan " +
        "left join fetch mealPlan.mealDefinitions " +
        "left join fetch mealPlan.tagsGoodFors " +
        "left join fetch mealPlan.tagsBadFors " +
        "left join fetch mealPlan.days days " +
        "left join fetch days.meals meals " +
        "left join fetch meals.mealRecipes " +
        "left join fetch meals.mealProducts " +
        "where mealPlan.id =:id")
    Optional<MealPlan> findOneWithEagerRelationships(@Param("id") Long id);
}
