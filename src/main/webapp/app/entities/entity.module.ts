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
                path: 'household-measure',
                loadChildren: './household-measure/household-measure.module#DietifyHouseholdMeasureModule'
            },
            {
                path: 'nutrition-definition',
                loadChildren: './nutrition-definition/nutrition-definition.module#DietifyNutritionDefinitionModule'
            },
            {
                path: 'nutrition-data',
                loadChildren: './nutrition-data/nutrition-data.module#DietifyNutritionDataModule'
            },
            {
                path: 'diet-type',
                loadChildren: './diet-type/diet-type.module#DietifyDietTypeModule'
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
