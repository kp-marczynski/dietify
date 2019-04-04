package pl.marczynski.dietify.recipes.service.impl;

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
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.domain.RecipeCreator;
import pl.marczynski.dietify.recipes.repository.RecipeRepository;
import pl.marczynski.dietify.recipes.service.RecipeService;

import javax.persistence.EntityManager;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
@WithMockUser(username = "user", authorities = {"ROLE_USER"}, password = "user")
public class RecipeServiceIntegrationTest {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private EntityManager em;

    @Mock
    private UserRepository userRepositoryMock;

    private Recipe recipe;

    @Before
    public void setup() {
        Optional<User> user = userRepositoryMock.findOneByLogin("user");
        when(userRepositoryMock.findCurrentUser()).thenReturn(user);
        this.recipe = recipeService.save(RecipeCreator.createEntity(em));
    }

    @Test
    @Transactional
    public void shouldStoreRecipeInCacheAfterGetEagerById() {
        //when
        recipeService.findOne(this.recipe.getId());

        //then
        assertThat(cacheManager.getCacheNames()).contains(RecipeRepository.RECIPES_EAGER_BY_ID_CACHE);
        Object o = cacheManager.getCache(RecipeRepository.RECIPES_EAGER_BY_ID_CACHE).get(this.recipe.getId()).get();
        assertThat(o).isInstanceOf(Recipe.class);
        Recipe result = (Recipe) o;
        assertThat(result).isEqualTo(this.recipe);
    }

    @Test
    @Transactional
    public void shouldRemoveRecipeFromCacheWhenUpdatingRecipe() {
        //given
        recipeService.findOne(this.recipe.getId());
        this.recipe.setNumberOfPortions(this.recipe.getNumberOfPortions() + 1);

        //when
        recipeService.save(this.recipe);

        //then
        assertThat(cacheManager.getCacheNames()).contains(RecipeRepository.RECIPES_EAGER_BY_ID_CACHE);
        assertThat(cacheManager.getCache(RecipeRepository.RECIPES_EAGER_BY_ID_CACHE).get(this.recipe.getId())).isNull();
    }

    @Test
    @Transactional
    public void shouldRemoveRecipeFromCacheWhenDeletingRecipe() {
        //given
        recipeService.findOne(this.recipe.getId());

        //when
        recipeService.delete(this.recipe.getId());

        //then
        assertThat(cacheManager.getCacheNames()).contains(RecipeRepository.RECIPES_EAGER_BY_ID_CACHE);
        assertThat(cacheManager.getCache(RecipeRepository.RECIPES_EAGER_BY_ID_CACHE).get(this.recipe.getId())).isNull();
    }

}
