package pl.marczynski.dietify.mealplans.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import pl.marczynski.dietify.core.service.MailService;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.repository.MealPlanRepository;
import pl.marczynski.dietify.mealplans.service.MealPlanService;
import pl.marczynski.dietify.mealplans.service.dto.MailableMealPlanDto;

import java.util.Locale;
import java.util.Optional;

/**
 * Service Implementation for managing MealPlan.
 */
@Service
@Transactional
public class MealPlanServiceImpl implements MealPlanService {

    private final Logger log = LoggerFactory.getLogger(MealPlanServiceImpl.class);

    private final MealPlanRepository mealPlanRepository;

    private final CacheManager cacheManager;
    private final MailService mailService;

    private final String MAILABLE_MEAL_PLAN = "mailableMealPlan";

    public MealPlanServiceImpl(MealPlanRepository mealPlanRepository, CacheManager cacheManager, MailService mailService) {
        this.mealPlanRepository = mealPlanRepository;
        this.cacheManager = cacheManager;
        this.mailService = mailService;
    }

    /**
     * Save a mealPlan.
     *
     * @param mealPlan the entity to save
     * @return the persisted entity
     */
    @Override
    public MealPlan save(MealPlan mealPlan) {
        log.debug("Request to save MealPlan : {}", mealPlan);
        clearProductCaches(mealPlan);
        return mealPlanRepository.save(mealPlan);
    }

    /**
     * Get all the mealPlans.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MealPlan> findAll(Pageable pageable) {
        log.debug("Request to get all MealPlans");
        return mealPlanRepository.findAll(pageable);
    }


    /**
     * Get one mealPlan by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealPlan> findOne(Long id) {
        log.debug("Request to get MealPlan : {}", id);
        return mealPlanRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the mealPlan by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) throws NotFoundException {
        log.debug("Request to delete MealPlan : {}", id);
        Optional<MealPlan> mealPlan = mealPlanRepository.findOneWithEagerRelationships(id);
        if (!mealPlan.isPresent()) {
            throw new NotFoundException("Meal plan not found");
        }
        this.clearProductCaches(id);
        mealPlanRepository.deleteById(id);
    }

    @Override
    public void send(MailableMealPlanDto mailableMealPlan) {
        Locale locale = Locale.forLanguageTag("pl_PL");
        Context context = new Context(locale);
        context.setVariable(MAILABLE_MEAL_PLAN, mailableMealPlan);
        mailService.sendEmailFromTemplate(mailableMealPlan.recipientEmail, "mail/mealPlanEmail", "email.mealplan.title", context, locale);
    }

    private void clearProductCaches(MealPlan mealPlan) {
        if (mealPlan.getId() != null) {
            clearProductCaches(mealPlan.getId());
        }
    }

    private void clearProductCaches(long mealPlanId) {
        Cache cache = cacheManager.getCache(MealPlanRepository.MEALPLAN_EAGER_BY_ID_CACHE);
        if (cache != null) {
            cache.evict(mealPlanId);
        }
    }
}
