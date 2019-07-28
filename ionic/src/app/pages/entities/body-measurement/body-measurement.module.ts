import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { BodyMeasurementPage } from './body-measurement';
import { BodyMeasurementUpdatePage } from './body-measurement-update';
import { BodyMeasurement, BodyMeasurementService, BodyMeasurementDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class BodyMeasurementResolve implements Resolve<BodyMeasurement> {
  constructor(private service: BodyMeasurementService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BodyMeasurement> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<BodyMeasurement>) => response.ok),
        map((bodyMeasurement: HttpResponse<BodyMeasurement>) => bodyMeasurement.body)
      );
    }
    return of(new BodyMeasurement());
  }
}

const routes: Routes = [
    {
      path: '',
      component: BodyMeasurementPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: BodyMeasurementUpdatePage,
      resolve: {
        data: BodyMeasurementResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: BodyMeasurementDetailPage,
      resolve: {
        data: BodyMeasurementResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: BodyMeasurementUpdatePage,
      resolve: {
        data: BodyMeasurementResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        BodyMeasurementPage,
        BodyMeasurementUpdatePage,
        BodyMeasurementDetailPage
    ],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes)
    ]
})
export class BodyMeasurementPageModule {
}
