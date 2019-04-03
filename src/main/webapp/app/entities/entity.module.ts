import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'language',
                loadChildren: './language/language.module#DietifyLanguageModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#DietifyProductModule'
            },
            {
                path: 'product-subcategory',
                loadChildren: './product-subcategory/product-subcategory.module#DietifyProductSubcategoryModule'
            },
            {
                path: 'product-category',
                loadChildren: './product-category/product-category.module#DietifyProductCategoryModule'
            },
            {
                path: 'nutrition-definition',
                loadChildren: './nutrition-definition/nutrition-definition.module#DietifyNutritionDefinitionModule'
            },
            {
                path: 'diet-type',
                loadChildren: './diet-type/diet-type.module#DietifyDietTypeModule'
            },
            {
                path: 'recipe',
                loadChildren: './recipe/recipe.module#DietifyRecipeModule'
            },
            {
                path: 'dish-type',
                loadChildren: './dish-type/dish-type.module#DietifyDishTypeModule'
            },
            {
                path: 'meal-type',
                loadChildren: './meal-type/meal-type.module#DietifyMealTypeModule'
            },
            {
                path: 'kitchen-appliance',
                loadChildren: './kitchen-appliance/kitchen-appliance.module#DietifyKitchenApplianceModule'
            },
            {
                path: 'recipe-section',
                loadChildren: './recipe-section/recipe-section.module#DietifyRecipeSectionModule'
            },
            {
                path: 'preparation-step',
                loadChildren: './preparation-step/preparation-step.module#DietifyPreparationStepModule'
            },
            {
                path: 'product-portion',
                loadChildren: './product-portion/product-portion.module#DietifyProductPortionModule'
            },
            {
                path: 'recipe-suitable-for-diet',
                loadChildren: './recipe-suitable-for-diet/recipe-suitable-for-diet.module#DietifyRecipeSuitableForDietModule'
            },
            {
                path: 'recipe-unsuitable-for-diet',
                loadChildren: './recipe-unsuitable-for-diet/recipe-unsuitable-for-diet.module#DietifyRecipeUnsuitableForDietModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DietifyEntityModule {}
