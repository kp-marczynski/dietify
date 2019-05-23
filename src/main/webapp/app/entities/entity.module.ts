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
                path: 'dietetician',
                loadChildren: './dietetician/dietetician.module#DietifyDieteticianModule'
            },
            {
                path: 'patient',
                loadChildren: './patient/patient.module#DietifyPatientModule'
            },
            {
                path: 'patient-card',
                loadChildren: './patient-card/patient-card.module#DietifyPatientCardModule'
            },
            {
                path: 'appointment',
                loadChildren: './appointment/appointment.module#DietifyAppointmentModule'
            },
            {
                path: 'body-measurment',
                loadChildren: './body-measurment/body-measurment.module#DietifyBodyMeasurmentModule'
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
