import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-entities',
  templateUrl: 'entities.page.html',
  styleUrls: ['entities.page.scss']
})
export class EntitiesPage {
  entities: Array<any> = [
    {name: 'UserExtraInfo', component: 'UserExtraInfoPage', route: 'user-extra-info'},
    {name: 'LandingPageCard', component: 'LandingPageCardPage', route: 'landing-page-card'},
    {name: 'Product', component: 'ProductPage', route: 'product'},
    {name: 'ProductSubcategory', component: 'ProductSubcategoryPage', route: 'product-subcategory'},
    {name: 'ProductCategory', component: 'ProductCategoryPage', route: 'product-category'},
    {name: 'ProductCategoryTranslation', component: 'ProductCategoryTranslationPage', route: 'product-category-translation'},
    {name: 'NutritionData', component: 'NutritionDataPage', route: 'nutrition-data'},
    {name: 'NutritionDefinition', component: 'NutritionDefinitionPage', route: 'nutrition-definition'},
    {name: 'NutritionDefinitionTranslation', component: 'NutritionDefinitionTranslationPage', route: 'nutrition-definition-translation'},
    {name: 'HouseholdMeasure', component: 'HouseholdMeasurePage', route: 'household-measure'},
    {name: 'DietType', component: 'DietTypePage', route: 'diet-type'},
    {name: 'DietTypeTranslation', component: 'DietTypeTranslationPage', route: 'diet-type-translation'},
    {name: 'ProductBasicNutritionData', component: 'ProductBasicNutritionDataPage', route: 'product-basic-nutrition-data'},
    {name: 'Recipe', component: 'RecipePage', route: 'recipe'},
    {name: 'MealType', component: 'MealTypePage', route: 'meal-type'},
    {name: 'MealTypeTranslation', component: 'MealTypeTranslationPage', route: 'meal-type-translation'},
    {name: 'DishType', component: 'DishTypePage', route: 'dish-type'},
    {name: 'DishTypeTranslation', component: 'DishTypeTranslationPage', route: 'dish-type-translation'},
    {name: 'KitchenAppliance', component: 'KitchenAppliancePage', route: 'kitchen-appliance'},
    {name: 'KitchenApplianceTranslation', component: 'KitchenApplianceTranslationPage', route: 'kitchen-appliance-translation'},
    {name: 'RecipeSuitableForDiet', component: 'RecipeSuitableForDietPage', route: 'recipe-suitable-for-diet'},
    {name: 'RecipeUnsuitableForDiet', component: 'RecipeUnsuitableForDietPage', route: 'recipe-unsuitable-for-diet'},
    {name: 'RecipeSection', component: 'RecipeSectionPage', route: 'recipe-section'},
    {name: 'ProductPortion', component: 'ProductPortionPage', route: 'product-portion'},
    {name: 'PreparationStep', component: 'PreparationStepPage', route: 'preparation-step'},
    {name: 'RecipeBasicNutritionData', component: 'RecipeBasicNutritionDataPage', route: 'recipe-basic-nutrition-data'},
    {name: 'MealPlan', component: 'MealPlanPage', route: 'meal-plan'},
    {name: 'MealDefinition', component: 'MealDefinitionPage', route: 'meal-definition'},
    {name: 'MealPlanSuitableForDiet', component: 'MealPlanSuitableForDietPage', route: 'meal-plan-suitable-for-diet'},
    {name: 'MealPlanUnsuitableForDiet', component: 'MealPlanUnsuitableForDietPage', route: 'meal-plan-unsuitable-for-diet'},
    {name: 'MealPlanDay', component: 'MealPlanDayPage', route: 'meal-plan-day'},
    {name: 'Meal', component: 'MealPage', route: 'meal'},
    {name: 'MealRecipe', component: 'MealRecipePage', route: 'meal-recipe'},
    {name: 'MealProduct', component: 'MealProductPage', route: 'meal-product'},
    {name: 'Appointment', component: 'AppointmentPage', route: 'appointment'},
    {name: 'BodyMeasurement', component: 'BodyMeasurementPage', route: 'body-measurement'},
    {name: 'PatientCard', component: 'PatientCardPage', route: 'patient-card'},
    {name: 'NutritionalInterview', component: 'NutritionalInterviewPage', route: 'nutritional-interview'},
    {name: 'AssignedMealPlan', component: 'AssignedMealPlanPage', route: 'assigned-meal-plan'},
    {name: 'OwnedKitchenAppliance', component: 'OwnedKitchenAppliancePage', route: 'owned-kitchen-appliance'},
    {name: 'CustomNutritionalInterviewQuestion', component: 'CustomNutritionalInterviewQuestionPage', route: 'custom-nutritional-interview-question'},
    {name: 'CustomNutritionalInterviewQuestionTemplate', component: 'CustomNutritionalInterviewQuestionTemplatePage', route: 'custom-nutritional-interview-question-template'},
    {name: 'AppointmentEvaluation', component: 'AppointmentEvaluationPage', route: 'appointment-evaluation'},
    /* jhipster-needle-add-entity-page - JHipster will add entity pages here */
  ];

  constructor(public navController: NavController) {}

  openPage(page) {
    this.navController.navigateForward('/tabs/entities/' + page.route);
  }

}
