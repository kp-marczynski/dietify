package pl.marczynski.dietify.recipes.service.impl;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;
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

    @Autowired
    private UserRepository userRepository;

    private Recipe recipe;

    @Before
    public void setup() {
        Optional<User> user = userRepository.findCurrentUser();
        this.recipe = RecipeCreator.createEntity(em);
    }

    @Test
    @Transactional
    public void shouldStoreRecipeInCacheAfterGetEagerById() {
        //giveb
        recipeService.save(this.recipe);
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
        recipeService.save(recipe);
        recipeService.findOne(this.recipe.getId());

        //when
        try {
            recipeService.delete(this.recipe.getId());
        } catch (Exception e) {
            fail("Exception was thrown");
        }

        //then
        assertThat(cacheManager.getCacheNames()).contains(RecipeRepository.RECIPES_EAGER_BY_ID_CACHE);
        assertThat(cacheManager.getCache(RecipeRepository.RECIPES_EAGER_BY_ID_CACHE).get(this.recipe.getId())).isNull();
    }

    @Test
    @Transactional
    public void shouldFindRecipeBySearchPhrase() {
        //given
        String searchPhrase = "aa";
        Recipe recipe1 = RecipeCreator.createEntity(em);
        recipe1.name(searchPhrase);

        Recipe recipe2 = RecipeCreator.createEntity(em);
        recipe2.name("bbbb");

        Recipe recipe3 = RecipeCreator.createEntity(em);
        recipe3.name("b" + searchPhrase + "c");

        recipe1 = recipeService.save(recipe1);
        recipe2 = recipeService.save(recipe2);
        recipe3 = recipeService.save(recipe3);

        //when
        Page<Recipe> result = recipeService.findByNameContaining(searchPhrase, PageRequest.of(0, 10));

        //then
        assertThat(result.getTotalElements()).isEqualTo(2);
        assertThat(result.getContent()).containsAll(Arrays.asList(recipe1, recipe3));
        assertThat(result.getContent()).doesNotContain(recipe2);
    }

    @Test
    @Transactional
    public void shouldFindRecipeBySearchPhraseIgnoreingCase() {
        //given
        String searchPhrase = "aa";
        Recipe recipe1 = RecipeCreator.createEntity(em);
        recipe1.name(searchPhrase.toUpperCase());

        recipe1 = recipeService.save(recipe1);

        //when
        Page<Recipe> result = recipeService.findByNameContaining(searchPhrase, PageRequest.of(0, 10));

        //then
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getContent()).contains(recipe1);
    }
}
