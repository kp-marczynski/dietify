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

import { AppointmentPage } from './appointment';
import { AppointmentUpdatePage } from './appointment-update';
import { Appointment, AppointmentService, AppointmentDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class AppointmentResolve implements Resolve<Appointment> {
  constructor(private service: AppointmentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Appointment> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Appointment>) => response.ok),
        map((appointment: HttpResponse<Appointment>) => appointment.body)
      );
    }
    return of(new Appointment());
  }
}

const routes: Routes = [
    {
      path: '',
      component: AppointmentPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: AppointmentUpdatePage,
      resolve: {
        data: AppointmentResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: AppointmentDetailPage,
      resolve: {
        data: AppointmentResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: AppointmentUpdatePage,
      resolve: {
        data: AppointmentResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        AppointmentPage,
        AppointmentUpdatePage,
        AppointmentDetailPage
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
export class AppointmentPageModule {
}
