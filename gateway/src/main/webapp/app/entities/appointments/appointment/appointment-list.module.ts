import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {GatewaySharedModule} from 'app/shared';
import {AppointmentComponent} from './';

@NgModule({
  imports: [GatewaySharedModule, RouterModule],
  declarations: [AppointmentComponent],
  entryComponents: [AppointmentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [AppointmentComponent]
})
export class AppointmentsAppointmentListModule {
}
