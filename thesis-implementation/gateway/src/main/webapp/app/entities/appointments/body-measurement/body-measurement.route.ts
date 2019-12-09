import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';
import { BodyMeasurementService } from './body-measurement.service';
import { BodyMeasurementComponent } from './body-measurement.component';
import { BodyMeasurementDetailComponent } from './body-measurement-detail.component';
import { BodyMeasurementUpdateComponent } from './body-measurement-update.component';
import { BodyMeasurementDeletePopupComponent } from './body-measurement-delete-dialog.component';
import { IBodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';

@Injectable({ providedIn: 'root' })
export class BodyMeasurementResolve implements Resolve<IBodyMeasurement> {
  constructor(private service: BodyMeasurementService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBodyMeasurement> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<BodyMeasurement>) => response.ok),
        map((bodyMeasurement: HttpResponse<BodyMeasurement>) => bodyMeasurement.body)
      );
    }
    return of(new BodyMeasurement());
  }
}

export const bodyMeasurementRoute: Routes = [
  {
    path: '',
    component: BodyMeasurementComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsBodyMeasurement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BodyMeasurementDetailComponent,
    resolve: {
      bodyMeasurement: BodyMeasurementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsBodyMeasurement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BodyMeasurementUpdateComponent,
    resolve: {
      bodyMeasurement: BodyMeasurementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsBodyMeasurement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BodyMeasurementUpdateComponent,
    resolve: {
      bodyMeasurement: BodyMeasurementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsBodyMeasurement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const bodyMeasurementPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BodyMeasurementDeletePopupComponent,
    resolve: {
      bodyMeasurement: BodyMeasurementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsBodyMeasurement.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
