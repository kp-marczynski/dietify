package pl.marczynski.dietify.recipes.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.core.DietifyApp;
import pl.marczynski.dietify.recipes.domain.Recipe;
import pl.marczynski.dietify.recipes.domain.RecipeCreator;

import javax.persistence.EntityManager;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class RecipeRepositoryTest {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private EntityManager em;


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

        recipe1 = recipeRepository.saveAndFlush(recipe1);
        recipe2 = recipeRepository.saveAndFlush(recipe2);
        recipe3 = recipeRepository.saveAndFlush(recipe3);

        //when
        Page<Recipe> result = recipeRepository.findByNameContainingIgnoreCase(searchPhrase, PageRequest.of(0, 10));

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

        recipe1 = recipeRepository.saveAndFlush(recipe1);

        //when
        Page<Recipe> result = recipeRepository.findByNameContainingIgnoreCase(searchPhrase, PageRequest.of(0, 10));

        //then
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getContent()).contains(recipe1);
    }

}
