package pl.marczynski.dietify.recipes.domain;

import javax.persistence.EntityManager;

public class RecipeSectionCreator {
    private static final String DEFAULT_SECTION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SECTION_NAME = "BBBBBBBBBB";

    public static RecipeSection createEntity(ProductPortion productPortion, PreparationStep preparationStep) {
        RecipeSection recipeSection = new RecipeSection()
            .sectionName(DEFAULT_SECTION_NAME);

        recipeSection.getProductPortions().add(productPortion);
        recipeSection.getPreparationSteps().add(preparationStep);
        return recipeSection;
    }

    public static RecipeSection createEntity(EntityManager em) {
        ProductPortion productPortion = ProductPortionCreator.createEntity();
        PreparationStep preparationStep = PreparationStepCreator.createEntity();
        return createEntity(productPortion, preparationStep);
    }
}
