import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
                path: 'meal-plan',
                loadChildren: './meal-plan/meal-plan.module#DietifyMealPlanModule'
            },
            {
                path: 'meal-definition',
                loadChildren: './meal-definition/meal-definition.module#DietifyMealDefinitionModule'
            },
            {
                path: 'meal-plan-day',
                loadChildren: './meal-plan-day/meal-plan-day.module#DietifyMealPlanDayModule'
            },
            {
                path: 'meal',
                loadChildren: './meal/meal.module#DietifyMealModule'
            },
            {
                path: 'meal-recipe',
                loadChildren: './meal-recipe/meal-recipe.module#DietifyMealRecipeModule'
            },
            {
                path: 'meal-product',
                loadChildren: './meal-product/meal-product.module#DietifyMealProductModule'
            },
            {
                path: 'meal-plan-suitable-for-diet',
                loadChildren: './meal-plan-suitable-for-diet/meal-plan-suitable-for-diet.module#DietifyMealPlanSuitableForDietModule'
            },
            {
                path: 'meal-plan-unsuitable-for-diet',
                loadChildren: './meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet.module#DietifyMealPlanUnsuitableForDietModule'
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
