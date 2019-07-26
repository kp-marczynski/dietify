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

import { AppointmentEvaluationPage } from './appointment-evaluation';
import { AppointmentEvaluationUpdatePage } from './appointment-evaluation-update';
import { AppointmentEvaluation, AppointmentEvaluationService, AppointmentEvaluationDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class AppointmentEvaluationResolve implements Resolve<AppointmentEvaluation> {
  constructor(private service: AppointmentEvaluationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppointmentEvaluation> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AppointmentEvaluation>) => response.ok),
        map((appointmentEvaluation: HttpResponse<AppointmentEvaluation>) => appointmentEvaluation.body)
      );
    }
    return of(new AppointmentEvaluation());
  }
}

const routes: Routes = [
    {
      path: '',
      component: AppointmentEvaluationPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: AppointmentEvaluationUpdatePage,
      resolve: {
        data: AppointmentEvaluationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: AppointmentEvaluationDetailPage,
      resolve: {
        data: AppointmentEvaluationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: AppointmentEvaluationUpdatePage,
      resolve: {
        data: AppointmentEvaluationResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        AppointmentEvaluationPage,
        AppointmentEvaluationUpdatePage,
        AppointmentEvaluationDetailPage
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
export class AppointmentEvaluationPageModule {
}
