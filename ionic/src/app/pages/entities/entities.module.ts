import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';
import { EntitiesPage } from './entities.page';

const routes: Routes = [
  {
    path: '',
    component: EntitiesPage,
    data: {
      authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
  , {
    path: 'user-extra-info',
    loadChildren: './user-extra-info/user-extra-info.module#UserExtraInfoPageModule'
  }
  , {
    path: 'landing-page-card',
    loadChildren: './landing-page-card/landing-page-card.module#LandingPageCardPageModule'
  }
  , {
    path: 'product',
    loadChildren: './product/product.module#ProductPageModule'
  }
  , {
    path: 'product-subcategory',
    loadChildren: './product-subcategory/product-subcategory.module#ProductSubcategoryPageModule'
  }
  , {
    path: 'product-category',
    loadChildren: './product-category/product-category.module#ProductCategoryPageModule'
  }
  , {
    path: 'product-category-translation',
    loadChildren: './product-category-translation/product-category-translation.module#ProductCategoryTranslationPageModule'
  }
  , {
    path: 'nutrition-data',
    loadChildren: './nutrition-data/nutrition-data.module#NutritionDataPageModule'
  }
  , {
    path: 'nutrition-definition',
    loadChildren: './nutrition-definition/nutrition-definition.module#NutritionDefinitionPageModule'
  }
  , {
    path: 'nutrition-definition-translation',
    loadChildren: './nutrition-definition-translation/nutrition-definition-translation.module#NutritionDefinitionTranslationPageModule'
  }
  , {
    path: 'household-measure',
    loadChildren: './household-measure/household-measure.module#HouseholdMeasurePageModule'
  }
  , {
    path: 'diet-type',
    loadChildren: './diet-type/diet-type.module#DietTypePageModule'
  }
  , {
    path: 'diet-type-translation',
    loadChildren: './diet-type-translation/diet-type-translation.module#DietTypeTranslationPageModule'
  }
  , {
    path: 'product-basic-nutrition-data',
    loadChildren: './product-basic-nutrition-data/product-basic-nutrition-data.module#ProductBasicNutritionDataPageModule'
  }
  , {
    path: 'recipe',
    loadChildren: './recipe/recipe.module#RecipePageModule'
  }
  , {
    path: 'meal-type',
    loadChildren: './meal-type/meal-type.module#MealTypePageModule'
  }
  , {
    path: 'meal-type-translation',
    loadChildren: './meal-type-translation/meal-type-translation.module#MealTypeTranslationPageModule'
  }
  , {
    path: 'dish-type',
    loadChildren: './dish-type/dish-type.module#DishTypePageModule'
  }
  , {
    path: 'dish-type-translation',
    loadChildren: './dish-type-translation/dish-type-translation.module#DishTypeTranslationPageModule'
  }
  , {
    path: 'kitchen-appliance',
    loadChildren: './kitchen-appliance/kitchen-appliance.module#KitchenAppliancePageModule'
  }
  , {
    path: 'kitchen-appliance-translation',
    loadChildren: './kitchen-appliance-translation/kitchen-appliance-translation.module#KitchenApplianceTranslationPageModule'
  }
  , {
    path: 'recipe-suitable-for-diet',
    loadChildren: './recipe-suitable-for-diet/recipe-suitable-for-diet.module#RecipeSuitableForDietPageModule'
  }
  , {
    path: 'recipe-unsuitable-for-diet',
    loadChildren: './recipe-unsuitable-for-diet/recipe-unsuitable-for-diet.module#RecipeUnsuitableForDietPageModule'
  }
  , {
    path: 'recipe-section',
    loadChildren: './recipe-section/recipe-section.module#RecipeSectionPageModule'
  }
  , {
    path: 'product-portion',
    loadChildren: './product-portion/product-portion.module#ProductPortionPageModule'
  }
  , {
    path: 'preparation-step',
    loadChildren: './preparation-step/preparation-step.module#PreparationStepPageModule'
  }
  , {
    path: 'recipe-basic-nutrition-data',
    loadChildren: './recipe-basic-nutrition-data/recipe-basic-nutrition-data.module#RecipeBasicNutritionDataPageModule'
  }
  , {
    path: 'meal-plan',
    loadChildren: './meal-plan/meal-plan.module#MealPlanPageModule'
  }
  , {
    path: 'meal-definition',
    loadChildren: './meal-definition/meal-definition.module#MealDefinitionPageModule'
  }
  , {
    path: 'meal-plan-suitable-for-diet',
    loadChildren: './meal-plan-suitable-for-diet/meal-plan-suitable-for-diet.module#MealPlanSuitableForDietPageModule'
  }
  , {
    path: 'meal-plan-unsuitable-for-diet',
    loadChildren: './meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet.module#MealPlanUnsuitableForDietPageModule'
  }
  , {
    path: 'meal-plan-day',
    loadChildren: './meal-plan-day/meal-plan-day.module#MealPlanDayPageModule'
  }
  , {
    path: 'meal',
    loadChildren: './meal/meal.module#MealPageModule'
  }
  , {
    path: 'meal-recipe',
    loadChildren: './meal-recipe/meal-recipe.module#MealRecipePageModule'
  }
  , {
    path: 'meal-product',
    loadChildren: './meal-product/meal-product.module#MealProductPageModule'
  }
  , {
    path: 'appointment',
    loadChildren: './appointment/appointment.module#AppointmentPageModule'
  }
  , {
    path: 'body-measurement',
    loadChildren: './body-measurement/body-measurement.module#BodyMeasurementPageModule'
  }
  , {
    path: 'patient-card',
    loadChildren: './patient-card/patient-card.module#PatientCardPageModule'
  }
  , {
    path: 'nutritional-interview',
    loadChildren: './nutritional-interview/nutritional-interview.module#NutritionalInterviewPageModule'
  }
  , {
    path: 'assigned-meal-plan',
    loadChildren: './assigned-meal-plan/assigned-meal-plan.module#AssignedMealPlanPageModule'
  }
  , {
    path: 'owned-kitchen-appliance',
    loadChildren: './owned-kitchen-appliance/owned-kitchen-appliance.module#OwnedKitchenAppliancePageModule'
  }
  , {
    path: 'custom-nutritional-interview-question',
    loadChildren: './custom-nutritional-interview-question/custom-nutritional-interview-question.module#CustomNutritionalInterviewQuestionPageModule'
  }
  , {
    path: 'custom-nutritional-interview-question-template',
    loadChildren: './custom-nutritional-interview-question-template/custom-nutritional-interview-question-template.module#CustomNutritionalInterviewQuestionTemplatePageModule'
  }
  , {
    path: 'appointment-evaluation',
    loadChildren: './appointment-evaluation/appointment-evaluation.module#AppointmentEvaluationPageModule'
  }
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild(routes), TranslateModule],
  declarations: [EntitiesPage]
})
export class EntitiesPageModule {}
