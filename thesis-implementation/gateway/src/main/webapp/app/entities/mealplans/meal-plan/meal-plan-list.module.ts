import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {GatewaySharedModule} from 'app/shared';
import {MealPlanComponent} from './';

@NgModule({
  imports: [GatewaySharedModule, RouterModule],
  declarations: [MealPlanComponent],
  entryComponents: [MealPlanComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealPlansMealPlanListModule {
}
