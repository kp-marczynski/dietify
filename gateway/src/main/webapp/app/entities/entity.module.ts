import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user-extra-info',
        loadChildren: './user-extra-info/user-extra-info.module#GatewayUserExtraInfoModule'
      },
      {
        path: 'landing-page-card',
        loadChildren: './landing-page-card/landing-page-card.module#GatewayLandingPageCardModule'
      },
      {
        path: 'product',
        loadChildren: './products/product/product.module#ProductsProductModule'
      },
      {
        path: 'product-subcategory',
        loadChildren: './products/product-subcategory/product-subcategory.module#ProductsProductSubcategoryModule'
      },
      {
        path: 'product-category',
        loadChildren: './products/product-category/product-category.module#ProductsProductCategoryModule'
      },
      {
        path: 'product-category-translation',
        loadChildren: './products/product-category-translation/product-category-translation.module#ProductsProductCategoryTranslationModule'
      },
      {
        path: 'nutrition-definition',
        loadChildren: './products/nutrition-definition/nutrition-definition.module#ProductsNutritionDefinitionModule'
      },
      {
        path: 'nutrition-definition-translation',
        loadChildren:
          './products/nutrition-definition-translation/nutrition-definition-translation.module#ProductsNutritionDefinitionTranslationModule'
      },
      {
        path: 'diet-type',
        loadChildren: './products/diet-type/diet-type.module#ProductsDietTypeModule'
      },
      {
        path: 'diet-type-translation',
        loadChildren: './products/diet-type-translation/diet-type-translation.module#ProductsDietTypeTranslationModule'
      },
      {
        path: 'recipe',
        loadChildren: './recipes/recipe/recipe.module#RecipesRecipeModule'
      },
      {
        path: 'recipe-basic-nutrition-data',
        loadChildren: './recipes/recipe-basic-nutrition-data/recipe-basic-nutrition-data.module#RecipesRecipeBasicNutritionDataModule'
      },
      {
        path: 'dish-type',
        loadChildren: './recipes/dish-type/dish-type.module#RecipesDishTypeModule'
      },
      {
        path: 'dish-type-translation',
        loadChildren: './recipes/dish-type-translation/dish-type-translation.module#RecipesDishTypeTranslationModule'
      },
      {
        path: 'meal-type',
        loadChildren: './recipes/meal-type/meal-type.module#RecipesMealTypeModule'
      },
      {
        path: 'meal-type-translation',
        loadChildren: './recipes/meal-type-translation/meal-type-translation.module#RecipesMealTypeTranslationModule'
      },
      {
        path: 'kitchen-appliance',
        loadChildren: './recipes/kitchen-appliance/kitchen-appliance.module#RecipesKitchenApplianceModule'
      },
      {
        path: 'kitchen-appliance-translation',
        loadChildren:
          './recipes/kitchen-appliance-translation/kitchen-appliance-translation.module#RecipesKitchenApplianceTranslationModule'
      },
      {
        path: 'recipe-section',
        loadChildren: './recipes/recipe-section/recipe-section.module#RecipesRecipeSectionModule'
      },
      {
        path: 'preparation-step',
        loadChildren: './recipes/preparation-step/preparation-step.module#RecipesPreparationStepModule'
      },
      {
        path: 'product-portion',
        loadChildren: './recipes/product-portion/product-portion.module#RecipesProductPortionModule'
      },
      {
        path: 'recipe-suitable-for-diet',
        loadChildren: './recipes/recipe-suitable-for-diet/recipe-suitable-for-diet.module#RecipesRecipeSuitableForDietModule'
      },
      {
        path: 'recipe-unsuitable-for-diet',
        loadChildren: './recipes/recipe-unsuitable-for-diet/recipe-unsuitable-for-diet.module#RecipesRecipeUnsuitableForDietModule'
      },
      {
        path: 'meal-plan',
        loadChildren: './mealplans/meal-plan/meal-plan.module#MealplansMealPlanModule'
      },
      {
        path: 'meal-definition',
        loadChildren: './mealplans/meal-definition/meal-definition.module#MealplansMealDefinitionModule'
      },
      {
        path: 'meal-plan-day',
        loadChildren: './mealplans/meal-plan-day/meal-plan-day.module#MealplansMealPlanDayModule'
      },
      {
        path: 'meal',
        loadChildren: './mealplans/meal/meal.module#MealplansMealModule'
      },
      {
        path: 'meal-recipe',
        loadChildren: './mealplans/meal-recipe/meal-recipe.module#MealplansMealRecipeModule'
      },
      {
        path: 'meal-product',
        loadChildren: './mealplans/meal-product/meal-product.module#MealplansMealProductModule'
      },
      {
        path: 'meal-plan-suitable-for-diet',
        loadChildren: './mealplans/meal-plan-suitable-for-diet/meal-plan-suitable-for-diet.module#MealplansMealPlanSuitableForDietModule'
      },
      {
        path: 'meal-plan-unsuitable-for-diet',
        loadChildren:
          './mealplans/meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet.module#MealplansMealPlanUnsuitableForDietModule'
      },
      {
        path: 'patient-card',
        loadChildren: './appointments/patient-card/patient-card.module#AppointmentsPatientCardModule'
      },
      {
        path: 'appointment',
        loadChildren: './appointments/appointment/appointment.module#AppointmentsAppointmentModule'
      },
      {
        path: 'body-measurement',
        loadChildren: './appointments/body-measurement/body-measurement.module#AppointmentsBodyMeasurementModule'
      },
      {
        path: 'nutritional-interview',
        loadChildren: './appointments/nutritional-interview/nutritional-interview.module#AppointmentsNutritionalInterviewModule'
      },
      {
        path: 'custom-nutritional-interview-question',
        loadChildren:
          './appointments/custom-nutritional-interview-question/custom-nutritional-interview-question.module#AppointmentsCustomNutritionalInterviewQuestionModule'
      },
      {
        path: 'custom-nutritional-interview-question-template',
        loadChildren:
          './appointments/custom-nutritional-interview-question-template/custom-nutritional-interview-question-template.module#AppointmentsCustomNutritionalInterviewQuestionTemplateModule'
      },
      {
        path: 'owned-kitchen-appliance',
        loadChildren: './appointments/owned-kitchen-appliance/owned-kitchen-appliance.module#AppointmentsOwnedKitchenApplianceModule'
      },
      {
        path: 'assigned-meal-plan',
        loadChildren: './appointments/assigned-meal-plan/assigned-meal-plan.module#AppointmentsAssignedMealPlanModule'
      },
      {
        path: 'appointment-evaluation',
        loadChildren: './appointments/appointment-evaluation/appointment-evaluation.module#AppointmentsAppointmentEvaluationModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
