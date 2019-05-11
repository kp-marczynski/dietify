package pl.marczynski.dietify.mealplans.service.impl;

import javassist.NotFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.CacheManager;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.core.DietifyApp;
import pl.marczynski.dietify.core.domain.User;
import pl.marczynski.dietify.core.repository.UserRepository;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import pl.marczynski.dietify.mealplans.domain.MealPlanCreator;
import pl.marczynski.dietify.mealplans.repository.MealPlanRepository;
import pl.marczynski.dietify.mealplans.service.MealPlanService;

import javax.persistence.EntityManager;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
@WithMockUser(username = "user", authorities = {"ROLE_USER"}, password = "user")
public class MealPlanServiceIntegrationTest {
    @Autowired
    private MealPlanService mealPlanService;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private EntityManager em;

    @Mock
    private UserRepository userRepositoryMock;

    private MealPlan mealPlan;

    @Before
    public void setup() {
        Optional<User> user = userRepositoryMock.findOneByLogin("user");
        when(userRepositoryMock.findCurrentUser()).thenReturn(user);
        this.mealPlan = mealPlanService.save(MealPlanCreator.createEntity());
    }

    @Test
    @Transactional
    public void shouldStoreProductInCacheAfterGetEagerById() {
        //when
        mealPlanService.findOne(this.mealPlan.getId());

        //then
        assertThat(cacheManager.getCacheNames()).contains(MealPlanRepository.MEALPLAN_EAGER_BY_ID_CACHE);
        Object o = cacheManager.getCache(MealPlanRepository.MEALPLAN_EAGER_BY_ID_CACHE).get(this.mealPlan.getId()).get();
        assertThat(o).isInstanceOf(MealPlan.class);
        MealPlan result = (MealPlan) o;
        assertThat(result).isEqualTo(this.mealPlan);
    }

    @Test
    @Transactional
    public void shouldRemoveProductFromCacheWhenUpdatingProduct() {
        //given
        mealPlanService.findOne(this.mealPlan.getId());
        this.mealPlan.setName("UPDATED");

        //when
        mealPlanService.save(this.mealPlan);

        //then
        assertThat(cacheManager.getCacheNames()).contains(MealPlanRepository.MEALPLAN_EAGER_BY_ID_CACHE);
        assertThat(cacheManager.getCache(MealPlanRepository.MEALPLAN_EAGER_BY_ID_CACHE).get(this.mealPlan.getId())).isNull();
    }

    @Test
    @Transactional
    public void shouldRemoveProductFromCacheWhenDeletingProduct() {
        //given
        mealPlanService.findOne(this.mealPlan.getId());

        //when
        try {
            mealPlanService.delete(this.mealPlan.getId());
        } catch (NotFoundException e) {
            fail();
        }

        //then
        assertThat(cacheManager.getCacheNames()).contains(MealPlanRepository.MEALPLAN_EAGER_BY_ID_CACHE);
        assertThat(cacheManager.getCache(MealPlanRepository.MEALPLAN_EAGER_BY_ID_CACHE).get(this.mealPlan.getId())).isNull();
    }

}
