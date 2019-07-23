package pl.marczynski.dietify.mealplans.service;

import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.service.dto.MailableMealPlanDto;
import pl.marczynski.dietify.mealplans.service.dto.ShoplistDto;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MealPlan.
 */
public interface MealPlanService {

    /**
     * Save a mealPlan.
     *
     * @param mealPlan the entity to save
     * @return the persisted entity
     */
    MealPlan save(MealPlan mealPlan);

    /**
     * Get all the mealPlans.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MealPlan> findAll(Pageable pageable);


    /**
     * Get the "id" mealPlan.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MealPlan> findOne(Long id);

    /**
     * Delete the "id" mealPlan.
     *
     * @param id the id of the entity
     */
    void delete(Long id) throws NotFoundException;

    void send(MailableMealPlanDto mailableMealPlan);

    void sendShoplist(ShoplistDto shoplist);
}
