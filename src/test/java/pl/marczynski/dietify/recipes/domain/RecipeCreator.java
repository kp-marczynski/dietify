package pl.marczynski.dietify.recipes.domain;

import pl.marczynski.dietify.core.web.rest.TestUtil;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;

public class RecipeCreator {
    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PREPARATION_TIME_MINUTES = 0;
    private static final Integer UPDATED_PREPARATION_TIME_MINUTES = 1;

    private static final Double DEFAULT_NUMBER_OF_PORTIONS = 0D;
    private static final Double UPDATED_NUMBER_OF_PORTIONS = 1D;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LAST_EDIT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_EDIT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_IS_VISIBLE = false;
    private static final Boolean UPDATED_IS_VISIBLE = true;

    private static final Boolean DEFAULT_IS_LOCKED = false;
    private static final Boolean UPDATED_IS_LOCKED = true;

    private static final Long DEFAULT_LANGUAGE_ID = 1L;
    private static final Long UPDATED_LANGUAGE_ID = 2L;

    public static Recipe createEntity(RecipeSection recipeSection) {
        Recipe recipe = new Recipe()
            .name(DEFAULT_NAME)
            .preparationTimeMinutes(DEFAULT_PREPARATION_TIME_MINUTES)
            .numberOfPortions(DEFAULT_NUMBER_OF_PORTIONS)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastEditDate(DEFAULT_LAST_EDIT_DATE)
            .isVisible(DEFAULT_IS_VISIBLE)
            .isLocked(DEFAULT_IS_LOCKED)
            .languageId(DEFAULT_LANGUAGE_ID);
        // Add required entity
        recipe.getRecipeSections().add(recipeSection);
        return recipe;
    }

    public static Recipe createEntity(EntityManager em) {
        RecipeSection recipeSection = RecipeSectionCreator.createEntity(em);
        return createEntity(recipeSection);
    }
}
