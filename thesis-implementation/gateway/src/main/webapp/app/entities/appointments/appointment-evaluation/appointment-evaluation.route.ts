import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppointmentEvaluation } from 'app/shared/model/appointments/appointment-evaluation.model';
import { AppointmentEvaluationService } from './appointment-evaluation.service';
import { AppointmentEvaluationComponent } from './appointment-evaluation.component';
import { AppointmentEvaluationDetailComponent } from './appointment-evaluation-detail.component';
import { AppointmentEvaluationUpdateComponent } from './appointment-evaluation-update.component';
import { AppointmentEvaluationDeletePopupComponent } from './appointment-evaluation-delete-dialog.component';
import { IAppointmentEvaluation } from 'app/shared/model/appointments/appointment-evaluation.model';

@Injectable({ providedIn: 'root' })
export class AppointmentEvaluationResolve implements Resolve<IAppointmentEvaluation> {
  constructor(private service: AppointmentEvaluationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAppointmentEvaluation> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AppointmentEvaluation>) => response.ok),
        map((appointmentEvaluation: HttpResponse<AppointmentEvaluation>) => appointmentEvaluation.body)
      );
    }
    return of(new AppointmentEvaluation());
  }
}

export const appointmentEvaluationRoute: Routes = [
  {
    path: '',
    component: AppointmentEvaluationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.appointmentsAppointmentEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AppointmentEvaluationDetailComponent,
    resolve: {
      appointmentEvaluation: AppointmentEvaluationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsAppointmentEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AppointmentEvaluationUpdateComponent,
    resolve: {
      appointmentEvaluation: AppointmentEvaluationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsAppointmentEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AppointmentEvaluationUpdateComponent,
    resolve: {
      appointmentEvaluation: AppointmentEvaluationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsAppointmentEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const appointmentEvaluationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AppointmentEvaluationDeletePopupComponent,
    resolve: {
      appointmentEvaluation: AppointmentEvaluationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsAppointmentEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
